import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cloud,
  BarChart3,
  Shield,
  Zap,
  Users,
  Lightbulb,
  Target,
  Headphones,
  ArrowRight,
  TrendingUp,
  Database,
  Settings,
  FileText,
  Layers,
  Search,
  Palette,
  Rocket,
  LifeBuoy,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Hero from "../components/ui/Hero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import siteConfig from "../config/siteConfig";

/* ── 3D Letter Component ──────────────────────────────────── */
function Letter3D({ char, color1, color2, className = "" }) {
  return (
    <motion.div
      className={`relative select-none ${className}`}
      initial={{ scale: 0.7, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
    >
      {/* Shadow layer */}
      <span
        className="absolute inset-0 text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-black leading-none"
        style={{
          color: "transparent",
          WebkitTextStroke: `3px ${color2}20`,
          transform: "translate(8px, 8px)",
        }}
      >
        {char}
      </span>
      {/* Main letter */}
      <span
        className="relative text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[14rem] xl:text-[18rem] font-black leading-none"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: `drop-shadow(0 0 40px ${color1}40)`,
        }}
      >
        {char}
      </span>
    </motion.div>
  );
}

/* ── Animated Particle Dots ───────────────────────────────── */
function ParticleDots({ color, count = 20 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.4,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

/* ── Home Page ─────────────────────────────────────────────── */
export default function Home() {
  const expertiseCards = [
    {
      id: "salesforce",
      title: "Salesforce",
      description: "End-to-end Salesforce solutions — implementation, customization, and support.",
      icon: <Cloud className="w-7 h-7" />,
      accent: "#00A1E0",
    },
    {
      id: "veeva-crm",
      title: "Veeva CRM",
      description: "Optimize life sciences engagement with Veeva CRM configuration and support.",
      icon: <Users className="w-7 h-7" />,
      accent: "#FF7900",
    },
    {
      id: "veeva-vault",
      title: "Veeva Vault",
      description: "Streamline regulated content management with Veeva Vault solutions.",
      icon: <Shield className="w-7 h-7" />,
      accent: "#FF7900",
    },
    {
      id: "tableau",
      title: "Tableau",
      description: "Turn data into actionable insights with interactive dashboards and analytics.",
      icon: <BarChart3 className="w-7 h-7" />,
      accent: "#00A1E0",
    },
  ];

  const whyCards = [
    { title: "Technical Expertise", description: "Deep knowledge across Salesforce, Veeva, and Tableau ecosystems.", icon: <Settings className="w-7 h-7" /> },
    { title: "Customer-Centric Approach", description: "Solutions designed around your unique business needs and goals.", icon: <Target className="w-7 h-7" /> },
    { title: "Scalable Solutions", description: "Architecture that grows with your organization and evolving requirements.", icon: <Layers className="w-7 h-7" /> },
    { title: "Innovation", description: "Leveraging the latest technologies to keep you ahead of the curve.", icon: <Lightbulb className="w-7 h-7" /> },
  ];

  const processIcons = [
    <Search className="w-8 h-8" />,
    <Palette className="w-8 h-8" />,
    <Rocket className="w-8 h-8" />,
    <LifeBuoy className="w-8 h-8" />,
  ];

  return (
    <main>
      {/* ═══ 1. HERO SECTION ═══════════════════════════════════ */}
      <Hero
        isHome
        bgVariant="home"
        badge="IT SERVICES &amp; CONSULTING"
        title={
          <>
            Your Trusted Partner for{" "}
            <span className="text-[#00A1E0]">Salesforce</span>,{" "}
            <span className="text-[#FF7900]">Veeva</span> &amp;{" "}
            <span className="text-[#00A1E0]">Tableau</span> Solutions
          </>
        }
        description="PVS NexTech delivers scalable, customer-centric technology solutions that help businesses and life sciences organizations simplify operations and grow with confidence."
        primaryCta={{ label: "Get in Touch", to: "/contact" }}
        secondaryCta={{ label: "Explore Services", to: "/services" }}
      />


      {/* ═══ ANIMATED PVS IDENTITY ═══════════════════════════ */}

      {/* ── P — PROGRESS ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-navy text-white section-padding">
        <ParticleDots color="#00A1E0" count={25} />
        {/* Decorative grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-sf-blue"
              style={{ top: `${12 + i * 12}%`, left: 0, right: 0 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
        </div>
        <div className="container-max relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-20">
            <div className="flex-shrink-0 overflow-hidden">
              <Letter3D char="P" color1="#00A1E0" color2="#33B4E6" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <motion.span
                className="inline-block text-sf-blue text-sm font-semibold uppercase tracking-widest mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                P — Progress
              </motion.span>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Progress Through People
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Our people, processes and expertise drive digital transformation and create new possibilities for businesses.
              </motion.p>
              <motion.div
                className="mt-8 flex items-center gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {[TrendingUp, Users, Zap].map((Icon, i) => (
                  <div key={i} className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon className="w-6 h-6 text-sf-blue" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── V — VEEVA ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white section-padding">
        <ParticleDots color="#FF7900" count={18} />
        <div className="container-max relative z-10">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-20">
            <div className="flex-shrink-0 overflow-hidden">
              <Letter3D char="V" color1="#FF7900" color2="#FF9633" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block text-orange text-sm font-semibold uppercase tracking-widest mb-3">
                V — Veeva
              </span>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Accelerating Life Sciences
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600 leading-relaxed max-w-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Helping life sciences organizations streamline operations and manage regulated content through Veeva solutions.
              </motion.p>
              {/* Interactive panels */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/services#veeva-crm"
                  className="p-5 rounded-xl border-2 border-orange/20 hover:border-orange bg-orange/5 hover:bg-orange/10 transition-all duration-300 group"
                >
                  <h4 className="font-bold text-navy mb-1 group-hover:text-orange transition-colors">
                    Veeva CRM
                  </h4>
                  <p className="text-sm text-gray-500">
                    Customer engagement for life sciences
                  </p>
                </Link>
                <Link
                  to="/services#veeva-vault"
                  className="p-5 rounded-xl border-2 border-orange/20 hover:border-orange bg-orange/5 hover:bg-orange/10 transition-all duration-300 group"
                >
                  <h4 className="font-bold text-navy mb-1 group-hover:text-orange transition-colors">
                    Veeva Vault
                  </h4>
                  <p className="text-sm text-gray-500">
                    Regulated content and document management
                  </p>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── S — SALESFORCE ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-navy text-white section-padding">
        <ParticleDots color="#00A1E0" count={22} />
        {/* Animated cloud shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-sf-blue/5"
              style={{
                width: 200 + i * 60,
                height: 200 + i * 60,
                right: `${-5 + i * 15}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        <div className="container-max relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-20">
            <div className="flex-shrink-0 overflow-hidden">
              <Letter3D char="S" color1="#00A1E0" color2="#0081B3" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block text-sf-blue text-sm font-semibold uppercase tracking-widest mb-3">
                S — Salesforce
              </span>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Smarter Solutions for a Connected World
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300 leading-relaxed max-w-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Delivering intelligent Salesforce solutions and transforming business data into actionable insights.
              </motion.p>
              {/* Salesforce & Tableau cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/services#salesforce"
                  className="p-5 rounded-xl glass hover:bg-white/15 transition-all duration-300 group"
                >
                  <Cloud className="w-8 h-8 text-sf-blue mb-2" />
                  <h4 className="font-bold mb-1">Salesforce</h4>
                  <p className="text-sm text-gray-400">
                    CRM, cloud solutions, and development
                  </p>
                </Link>
                <Link
                  to="/services#tableau"
                  className="p-5 rounded-xl glass hover:bg-white/15 transition-all duration-300 group"
                >
                  <BarChart3 className="w-8 h-8 text-sf-blue mb-2" />
                  <h4 className="font-bold mb-1">Tableau</h4>
                  <p className="text-sm text-gray-400">
                    Dashboards, analytics, and data insights
                  </p>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OUR EXPERTISE ═══════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <SectionHeading
            subtitle="What We Do"
            title="Our Expertise"
            description="We specialize in four core technology platforms to help organizations transform and grow."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseCards.map((card, i) => (
              <Card
                key={card.id}
                accent={card.accent}
                icon={card.icon}
                title={card.title}
                description={card.description}
                delay={i * 0.1}
                onClick={() => {}}
                className="group"
              >
                <Link
                  to={`/services#${card.id}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold transition-colors"
                  style={{ color: card.accent }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY PVS NEXTECH ═════════════════════════════════ */}
      <section className="section-padding bg-gradient-navy text-white">
        <div className="container-max">
          <SectionHeading
            subtitle="Why Us"
            title="Why PVS NexTech"
            description="We combine deep technical expertise with a customer-first approach to deliver solutions that create real business value."
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl glass card-hover text-center"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-5 ${
                    i % 2 === 0
                      ? "bg-sf-blue/20 text-sf-blue"
                      : "bg-orange/20 text-orange"
                  }`}
                >
                  <span>{card.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR PROCESS ═════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <SectionHeading
            subtitle="How We Work"
            title="Our Process"
            description="A structured approach to ensure every engagement delivers measurable results."
          />
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-sf-blue via-orange to-sf-blue opacity-20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {siteConfig.homeProcess.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center relative"
                >
                  <div
                    className={`relative z-10 w-16 h-16 mx-auto rounded-2xl text-white flex items-center justify-center shadow-lg mb-5 ${
                      i % 2 === 0
                        ? "bg-gradient-to-br from-sf-blue to-sf-blue-dark shadow-sf-blue/20"
                        : "bg-gradient-to-br from-orange to-orange-dark shadow-orange/20"
                    }`}
                  >
                    {processIcons[i]}
                  </div>
                  <div className="absolute top-0 right-0 text-7xl font-black text-gray-100 -z-0 select-none opacity-50">
                    {String(step.step).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PVS BRAND IDENTITY IMAGE (Commented out) ═══════ */}
      {/*
      <section className="bg-white">
        <div className="container-max px-4 md:px-8 pb-0">
          <img
            src="/assets/pvs-brand-identity.png"
            alt="PVS NexTech Brand Identity — People, Veeva, Salesforce"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      </section>
      */}
    </main>
  );
}
