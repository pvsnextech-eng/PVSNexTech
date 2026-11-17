import pg from "pg";
import nodemailer from "nodemailer";

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_l65NGibojhQM@ep-snowy-smoke-b36lhxrs-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 2,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    });
    pool.on("error", (err) => {
      console.error("[DB] Idle client warning (non-fatal):", err.message);
    });
  }
  return pool;
}

async function sendNotificationEmail(subject, text) {
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.SMTP_USER;
      await transporter.sendMail({
        from: `"PVS NexTech Website" <${process.env.SMTP_USER}>`,
        to: recipient,
        subject,
        text,
      });
      console.log("[SMTP] Email sent successfully");
    } catch (err) {
      console.error("[SMTP] Error sending email (non-fatal):", err.message);
    }
  }
}

async function processContact(data) {
  try {
    const { fullName, phone, email, company, serviceInterestedIn, message, botField } = data || {};

    // Honeypot check
    if (botField) {
      return { status: 200, data: { success: true, message: "Message received." } };
    }

    // Validation
    if (!fullName || !phone || !email || !company || !message) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Missing required fields. Please complete all fields.",
        },
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { status: 400, data: { success: false, message: "Invalid email format." } };
    }

    // Save to Neon PostgreSQL
    const db = getPool();
    await db.query(
      `INSERT INTO contact_submissions (full_name, phone, email, company, service_interested_in, message)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [fullName, phone, email, company, serviceInterestedIn || null, message]
    );
    console.log("[DB] Contact submission saved to Neon ✅");

    // Optional email notification
    await sendNotificationEmail(
      `[New Inquiry] ${serviceInterestedIn || "General"} from ${fullName}`,
      `New contact inquiry received:
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Company: ${company}
Service Interested In: ${serviceInterestedIn || "General"}
Message:
${message}`
    );

    return {
      status: 200,
      data: {
        success: true,
        message: "Thank you! Your inquiry has been received. Our team will contact you shortly.",
      },
    };
  } catch (error) {
    console.error("[DB] Error handling contact submission:", error);
    return {
      status: 500,
      data: {
        success: false,
        message: "An internal error occurred. Please try again later.",
      },
    };
  }
}

// Netlify Functions v2 (Web API Standard)
export default async (req, context) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ success: false, message: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  let body = {};
  try {
    body = await req.json();
  } catch (e) {
    body = {};
  }

  const result = await processContact(body);
  return new Response(JSON.stringify(result.data), {
    status: result.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

// Netlify Functions v1 (Lambda Compatibility)
export const handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  let body = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (e) {
    body = {};
  }

  const result = await processContact(body);
  return {
    statusCode: result.status,
    headers,
    body: JSON.stringify(result.data),
  };
};

