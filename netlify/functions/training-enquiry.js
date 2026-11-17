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

      const recipient = process.env.TRAINING_NOTIFICATION_EMAIL || process.env.SMTP_USER;
      await transporter.sendMail({
        from: `"PVS NexTech Training" <${process.env.SMTP_USER}>`,
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

async function processTrainingEnquiry(data) {
  try {
    const {
      fullName,
      email,
      phone,
      qualification,
      collegeOrOrg,
      graduationYear,
      interestedTraining,
      currentExperience,
      message,
      botField,
    } = data || {};

    // Honeypot check
    if (botField) {
      return { status: 200, data: { success: true, message: "Enquiry received." } };
    }

    // Validation
    if (
      !fullName ||
      !email ||
      !phone ||
      !qualification ||
      !collegeOrOrg ||
      !graduationYear ||
      !interestedTraining ||
      !message
    ) {
      return {
        status: 400,
        data: {
          success: false,
          message: "Missing required fields. Please fill in all required training information.",
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
      `INSERT INTO training_enquiries
       (full_name, email, phone, qualification, college_or_org, graduation_year, interested_training, current_experience, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        fullName,
        email,
        phone,
        qualification,
        collegeOrOrg,
        graduationYear,
        interestedTraining,
        currentExperience || null,
        message,
      ]
    );
    console.log("[DB] Training enquiry saved to Neon ✅");

    // Optional email notification
    await sendNotificationEmail(
      `[Training Enquiry] ${interestedTraining} - ${fullName}`,
      `New Training Registration Enquiry:
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Qualification: ${qualification}
College / Org: ${collegeOrOrg}
Graduation Year: ${graduationYear}
Interested Track: ${interestedTraining}
Current Experience: ${currentExperience || "N/A"}
Goals / Questions:
${message}`
    );

    return {
      status: 200,
      data: {
        success: true,
        message: "Thank you! Your training enquiry has been received. Our coordinator will contact you.",
      },
    };
  } catch (error) {
    console.error("[DB] Error handling training submission:", error);
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

  const result = await processTrainingEnquiry(body);
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

  const result = await processTrainingEnquiry(body);
  return {
    statusCode: result.status,
    headers,
    body: JSON.stringify(result.data),
  };
};

