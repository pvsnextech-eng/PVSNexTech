import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

// ── PostgreSQL (Neon) Pool ────────────────────────────────
const { Pool } = pg;
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : null;

if (pool) {
  // Lightweight connectivity check — releases immediately so Neon doesn't
  // timeout an idle held connection and crash the server.
  pool.query('SELECT 1')
    .then(() => console.log("[DB] Connected to Neon PostgreSQL ✅"))
    .catch((err) => console.error("[DB] Connection error:", err.message));

  // Prevent stale idle-client disconnect from crashing the process.
  pool.on('error', (err) => {
    console.error('[DB] Unexpected idle client error (non-fatal):', err.message);
  });
} else {
  console.warn("[DB] DATABASE_URL not set — database saving disabled.");
}

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["POST", "GET"],
}));
app.use(express.json({ limit: "50kb" }));

// Rate Limiter: max 10 requests per 15 mins per IP
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again after 15 minutes.",
  },
});

// Helper: Configure Nodemailer transporter if SMTP settings exist
function getTransporter() {
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. Contact Form Endpoint
app.post("/api/contact", formLimiter, async (req, res) => {
  try {
    const { fullName, phone, email, company, serviceInterestedIn, message, botField } = req.body;

    // Honeypot check
    if (botField) {
      return res.status(200).json({ success: true, message: "Message received." });
    }

    // Validation
    if (!fullName || !phone || !email || !company || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields. Please complete all fields.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const transporter = getTransporter();
    if (transporter) {
      const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.SMTP_USER;
      await transporter.sendMail({
        from: `"PVS NexTech Website" <${process.env.SMTP_USER}>`,
        to: recipient,
        subject: `[New Inquiry] ${serviceInterestedIn || "General"} from ${fullName}`,
        text: `New contact inquiry received:
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Company: ${company}
Service Interested In: ${serviceInterestedIn}
Message:
${message}
`,
      });
    } else {
      console.log("[SMTP Not Configured] Logged Contact Form Inquiry:", {
        fullName, email, phone, company, serviceInterestedIn, message,
        receivedAt: new Date().toISOString(),
      });
    }

    // ── Save to Neon database ────────────────────────────
    if (pool) {
      await pool.query(
        `INSERT INTO contact_submissions (full_name, phone, email, company, service_interested_in, message)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [fullName, phone, email, company, serviceInterestedIn || null, message]
      );
      console.log("[DB] Contact submission saved ✅");
    }

    return res.status(200).json({
      success: true,
      message: "Thank you! Your inquiry has been received. Our team will contact you shortly.",
    });
  } catch (error) {
    console.error("Error handling contact submission:", error);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred. Please try again later.",
    });
  }
});

// 2. Training Enquiry Endpoint
app.post("/api/training-enquiry", formLimiter, async (req, res) => {
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
    } = req.body;

    // Honeypot check
    if (botField) {
      return res.status(200).json({ success: true, message: "Enquiry received." });
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
      return res.status(400).json({
        success: false,
        message: "Missing required fields. Please fill in all required training information.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const transporter = getTransporter();
    if (transporter) {
      const recipient = process.env.TRAINING_NOTIFICATION_EMAIL || process.env.SMTP_USER;
      await transporter.sendMail({
        from: `"PVS NexTech Training" <${process.env.SMTP_USER}>`,
        to: recipient,
        subject: `[Training Enquiry] ${interestedTraining} - ${fullName}`,
        text: `New Training Registration Enquiry:
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Qualification: ${qualification}
College / Org: ${collegeOrOrg}
Graduation Year: ${graduationYear}
Interested Track: ${interestedTraining}
Current Experience: ${currentExperience || "N/A"}
Goals / Questions:
${message}
`,
      });
    } else {
      console.log("[SMTP Not Configured] Logged Training Enquiry:", {
        fullName, email, phone, qualification, collegeOrOrg, graduationYear,
        interestedTraining, currentExperience, message,
        receivedAt: new Date().toISOString(),
      });
    }

    // ── Save to Neon database ────────────────────────────
    if (pool) {
      await pool.query(
        `INSERT INTO training_enquiries
         (full_name, email, phone, qualification, college_or_org, graduation_year, interested_training, current_experience, message)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [fullName, email, phone, qualification, collegeOrOrg, graduationYear,
         interestedTraining, currentExperience || null, message]
      );
      console.log("[DB] Training enquiry saved ✅");
    }

    return res.status(200).json({
      success: true,
      message: "Thank you! Your training enquiry has been received. Our coordinator will contact you.",
    });
  } catch (error) {
    console.error("Error handling training submission:", error);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`PVS NexTech Secure Backend server listening on port ${PORT}`);
});
