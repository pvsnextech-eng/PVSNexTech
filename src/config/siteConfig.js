/**
 * ============================================================
 * PVS NexTech — Site Configuration
 * ============================================================
 * Edit THIS FILE to update company details, services, training
 * programs, timeline milestones, social links, and more.
 *
 * Placeholders are marked with square brackets, e.g.
 * "[Add verified address]". Replace them with real information
 * before deploying to production.
 * ============================================================
 */

const siteConfig = {
  /* ── Company ─────────────────────────────────────────────── */
  companyName: "PVS NexTech",
  tagline: "IT Services & Consulting",
  shortIntro:
    "PVS NexTech is an IT services and consulting company specializing in Salesforce, Veeva CRM, Veeva Vault, and Tableau solutions.",

  /* ── Contact Details ─────────────────────────────────────── */
  address: "[Add verified address]",
  phone: "[Add verified phone number]",
  email: "[Add verified email address]",
  workingHours: "Monday – Friday, 9:00 AM – 6:00 PM",

  /* ── Google Maps ─────────────────────────────────────────── */
  // Paste a Google Maps embed URL here once available.
  // Example: "https://www.google.com/maps/embed?pb=..."
  mapEmbedUrl: "",

  /* ── Social Links ────────────────────────────────────────── */
  socialLinks: {
    linkedin: "[Add LinkedIn URL]",
    youtube: "[Add YouTube URL]",
    x: "[Add X / Twitter URL]",
    instagram: "[Add Instagram URL]",
  },

  /* ── Navigation ──────────────────────────────────────────── */
  navLinks: [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    {
      label: "Services",
      path: "/services",
      dropdown: [
        { label: "Salesforce", anchor: "salesforce" },
        { label: "Veeva CRM", anchor: "veeva-crm" },
        { label: "Veeva Vault", anchor: "veeva-vault" },
        { label: "Tableau", anchor: "tableau" },
      ],
    },
    { label: "Training", path: "/training" },
    { label: "Contact Us", path: "/contact" },
  ],

  /* ── Services ────────────────────────────────────────────── */
  services: [
    {
      id: "salesforce",
      title: "Salesforce",
      accent: "#00A1E0",
      tagline: "Transform Your Business with Salesforce",
      description:
        "We deliver end-to-end Salesforce solutions — from implementation and customization to integration and ongoing support — helping organizations streamline operations and drive growth.",
      items: [
        "Administration",
        "Sales Cloud",
        "Service Cloud",
        "Experience Cloud",
        "Agentforce",
        "Apex Development",
        "Lightning Web Components",
        "Salesforce Flows",
        "Integrations",
        "Implementation and Support",
      ],
    },
    {
      id: "veeva-crm",
      title: "Veeva CRM",
      accent: "#FF7900",
      tagline: "Accelerate Life Sciences Engagement",
      description:
        "We help life sciences organizations optimize customer engagement, streamline field operations, and manage healthcare professional interactions through Veeva CRM.",
      items: [
        "Configuration",
        "Healthcare Professional Engagement",
        "Key Account Management",
        "Approved Email",
        "Call Reporting",
        "Closed Loop Marketing",
        "Integrations and Support",
      ],
    },
    {
      id: "veeva-vault",
      title: "Veeva Vault",
      accent: "#FF7900",
      tagline: "Streamline Regulated Content Management",
      description:
        "We configure and optimize Veeva Vault to help organizations manage documents, automate workflows, and maintain compliance across quality and regulatory processes.",
      items: [
        "Document Management",
        "Document Types and Fields",
        "Document Lifecycles",
        "Workflows",
        "Field Dependencies",
        "Document Relationships",
        "Security and Permissions",
        "Quality and Regulatory Processes",
        "Vault Configuration and Support",
      ],
    },
    {
      id: "tableau",
      title: "Tableau",
      accent: "#00A1E0",
      tagline: "Turn Data into Actionable Insights",
      description:
        "We design and build interactive Tableau dashboards and analytics solutions that help organizations visualize data, track KPIs, and make informed business decisions.",
      items: [
        "Interactive Dashboards",
        "Data Visualization",
        "Data Preparation",
        "KPI Reporting",
        "Business Intelligence",
        "Salesforce Data Analytics",
        "Dashboard Optimization",
      ],
    },
  ],

  /* ── Training Programs ───────────────────────────────────── */
  trainingPrograms: [
    {
      id: "salesforce-training",
      title: "Salesforce Training",
      accent: "#00A1E0",
      description:
        "Build a strong foundation in Salesforce through structured modules covering administration, development, and practical project exercises.",
      modules: [
        "Fundamentals",
        "Administration",
        "Sales Cloud and Service Cloud",
        "Apex Programming",
        "Apex Triggers",
        "Lightning Web Components",
        "Flows",
        "SOQL and SOSL",
        "Integrations",
        "Practical Project Exercises",
      ],
    },
    {
      id: "veeva-vault-training",
      title: "Veeva Vault Training",
      accent: "#FF7900",
      description:
        "Gain practical expertise in Veeva Vault through structured learning covering document management, workflows, security, and hands-on configuration exercises.",
      modules: [
        "Introduction to Veeva Vault",
        "Vault Applications",
        "Document Types and Fields",
        "Document Lifecycles",
        "Document Workflows",
        "Field Dependencies",
        "Document Relationships",
        "Document Security",
        "Vault Configuration",
        "Practical Exercises",
      ],
    },
  ],

  /* ── About — Journey / Timeline ──────────────────────────── */
  // Replace placeholders below with real milestones.
  timeline: [
    {
      year: "[Year]",
      title: "Company Founded",
      description: "[Add verified founding details]",
    },
    {
      year: "[Year]",
      title: "First Major Milestone",
      description: "[Add verified milestone details]",
    },
    {
      year: "[Year]",
      title: "Service Expansion",
      description: "[Add verified expansion details]",
    },
    {
      year: "[Year]",
      title: "Training Launch",
      description: "[Add verified training launch details]",
    },
  ],

  /* ── About — Values ──────────────────────────────────────── */
  values: [
    {
      title: "Customer First",
      description:
        "We put our customers at the center of everything we do, ensuring solutions that truly address their needs.",
    },
    {
      title: "Integrity",
      description:
        "We operate with transparency, honesty, and accountability in every engagement.",
    },
    {
      title: "Innovation",
      description:
        "We embrace new technologies and creative approaches to solve complex business challenges.",
    },
    {
      title: "Excellence",
      description:
        "We are committed to delivering the highest quality in every solution and interaction.",
    },
    {
      title: "Teamwork",
      description:
        "We collaborate across teams and with our clients to achieve shared goals and lasting success.",
    },
  ],

  /* ── Delivery Process (Services page) ────────────────────── */
  deliveryProcess: [
    {
      step: 1,
      title: "Discover",
      description: "We learn about your business, goals, and challenges.",
    },
    {
      step: 2,
      title: "Plan",
      description:
        "We define the roadmap, scope, and architecture for your solution.",
    },
    {
      step: 3,
      title: "Implement",
      description:
        "We build, configure, and customize the solution to your requirements.",
    },
    {
      step: 4,
      title: "Optimize",
      description:
        "We refine, test, and continuously improve for long-term success.",
    },
  ],

  /* ── Home — Process Steps ────────────────────────────────── */
  homeProcess: [
    {
      step: 1,
      title: "Discover",
      description:
        "We understand your business needs, challenges, and goals to lay the foundation for success.",
    },
    {
      step: 2,
      title: "Design",
      description:
        "We craft tailored solutions and architecture aligned with your objectives and technology landscape.",
    },
    {
      step: 3,
      title: "Deliver",
      description:
        "We build, test, and deploy solutions with precision and close collaboration with your team.",
    },
    {
      step: 4,
      title: "Support",
      description:
        "We provide ongoing maintenance, optimization, and support to ensure lasting value.",
    },
  ],

  /* ── SEO Defaults ────────────────────────────────────────── */
  seo: {
    home: {
      title: "PVS NexTech — IT Services & Consulting | Salesforce, Veeva, Tableau",
      description:
        "PVS NexTech delivers innovative Salesforce, Veeva CRM, Veeva Vault, and Tableau solutions. IT services, consulting, and training for digital transformation.",
    },
    about: {
      title: "About Us — PVS NexTech | Technology Solutions & Consulting",
      description:
        "Learn about PVS NexTech — an IT services and consulting company delivering Salesforce, Veeva CRM, Veeva Vault, and Tableau solutions with a customer-first approach.",
    },
    services: {
      title: "Our Services — PVS NexTech | Salesforce, Veeva CRM, Veeva Vault, Tableau",
      description:
        "Explore PVS NexTech services: Salesforce implementation, Veeva CRM configuration, Veeva Vault document management, and Tableau data visualization solutions.",
    },
    training: {
      title: "Training Programs — PVS NexTech | Salesforce & Veeva Vault Training",
      description:
        "Build your career with PVS NexTech Salesforce and Veeva Vault training programs. Structured learning, hands-on practice, and real-world scenarios.",
    },
    contact: {
      title: "Contact Us — PVS NexTech | Get in Touch",
      description:
        "Connect with PVS NexTech to discuss Salesforce, Veeva CRM, Veeva Vault, and Tableau requirements. Contact our team for expert consultation.",
    },
  },
};

export default siteConfig;
