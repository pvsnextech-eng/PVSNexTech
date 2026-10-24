# PVS NexTech — Corporate Website & Backend

Production-ready corporate web application for **PVS NexTech — IT Services & Consulting**, built to multinational IT consulting standards (Accenture / Cognizant level polish).

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, React Router v7, Tailwind CSS v4, Framer Motion, Lucide React icons
- **Typography:** Inter (via Google Fonts)
- **Backend:** Node.js + Express with Helmet security, CORS origin restrictions, IP rate limiting, input sanitization, honeypot spam protection, and Nodemailer SMTP integration
- **Brand Colors:**
  - Dark Navy: `#061D3F`
  - Salesforce Blue: `#00A1E0`
  - Orange: `#FF7900`
  - White: `#FFFFFF`

---

## 📁 Project Structure

```
├── public/
│   ├── assets/
│   │   ├── pvs-nextech-logo.png      # Brand logo (exact from assets)
│   │   ├── hero-image.png            # Uncropped Progress Through Technology hero
│   │   └── pvs-brand-identity.png    # Brand identity (People, Veeva, Salesforce)
│   ├── robots.txt                    # Search engine instructions
│   └── sitemap.xml                   # XML sitemap (5 official pages)
├── server/
│   └── index.js                      # Secure Express form handler
├── src/
│   ├── config/
│   │   └── siteConfig.js             # Central editable company configuration
│   ├── components/
│   │   ├── Header.jsx                # Sticky header, dropdown, mobile drawer
│   │   ├── Footer.jsx                # 4-column footer with modals & back-to-top
│   │   ├── ScrollToTop.jsx           # Auto scroll & anchor handler
│   │   ├── SEOHead.jsx               # Per-page SEO title & OpenGraph tags
│   │   └── ui/
│   │       ├── Button.jsx            # Multi-variant button component
│   │       ├── Card.jsx              # Hover lift card component
│   │       ├── SectionHeading.jsx    # Animated section header
│   │       └── Toast.jsx             # Notification toast provider
│   ├── pages/
│   │   ├── Home.jsx                  # Hero, 3D P-V-S animations, Expertise, Process, Identity
│   │   ├── About.jsx                 # Mission, Vision, Values, Timeline, Why Choose Us
│   │   ├── Services.jsx              # Salesforce, Veeva CRM, Veeva Vault, Tableau
│   │   ├── Training.jsx              # Salesforce & Veeva Vault programs + Enquiry form
│   │   └── Contact.jsx               # 4 contact cards, map fallback, validated form
│   ├── utils/
│   │   └── validation.js             # Form validation & HTML entity sanitization
│   ├── App.jsx                       # Routing setup (strictly 5 pages)
│   ├── index.css                     # Design tokens & glassmorphism utilities
│   └── main.jsx                      # App root mount
├── .env.example                      # SMTP & server configuration guide
├── package.json
└── vite.config.js
```

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Backend Server (Port 3001)
```bash
npm run server
```

### 3. Start the Frontend Dev Server (Port 5173)
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## ⚙️ Environment & SMTP Setup

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update SMTP variables with your credentials:
```env
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password
CONTACT_NOTIFICATION_EMAIL=info@pvsnextech.com
TRAINING_NOTIFICATION_EMAIL=training@pvsnextech.com
```
*Note: If SMTP variables are not configured, incoming submissions are safely logged to the backend console without throwing errors.*

---

## ✏️ How to Edit Content & Placeholders

All company details, contact information, service offerings, and timeline milestones are centralized in a single file:
👉 **`src/config/siteConfig.js`**

### Verified Placeholders to Update Before Production:
1. `address`: Replace `"[Add verified address]"` with your official office address.
2. `phone`: Replace `"[Add verified phone number]"` with your verified telephone number.
3. `email`: Replace `"[Add verified email address]"` with your company contact email.
4. `mapEmbedUrl`: Add your Google Maps iframe embed URL. When empty, a clean *"Map coming soon"* placeholder is displayed automatically.
5. `socialLinks`:
   - `linkedin`: Replace `"[Add LinkedIn URL]"`
   - `youtube`: Replace `"[Add YouTube URL]"`
   - `x`: Replace `"[Add X / Twitter URL]"`
   - `instagram`: Replace `"[Add Instagram URL]"`
6. `timeline`: Update the `year`, `title`, and `description` milestones with verified company founding and growth dates.
