import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Lightbulb,
  Award,
  Users2,
  Target,
  Layers,
  RefreshCw,
  Sparkles,
  Building2,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Hero from "../components/ui/Hero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import siteConfig from "../config/siteConfig";

export default function About() {
  const valueIcons = [
    <Heart className="w-7 h-7" />,
    <ShieldCheck className="w-7 h-7" />,
    <Lightbulb className="w-7 h-7" />,
    <Award className="w-7 h-7" />,
    <Users2 className="w-7 h-7" />,
  ];

  const whyChooseCards = [
    {
      title: "Domain Expertise",
      description: "Deep knowledge in Salesforce, Veeva CRM, Veeva Vault, and Tableau ecosystems.",
      icon: <Sparkles className="w-7 h-7" />,
    },
    {
      title: "End-to-End Solutions",
      description: "From consulting and implementation to training and ongoing support.",
      icon: <Layers className="w-7 h-7" />,
    },
    {
      title: "Customer-Centric Delivery",
      description: "Solutions designed around your business processes and objectives.",
      icon: <Target className="w-7 h-7" />,
    },
    {
      title: "Continuous Improvement",
      description: "We evolve with technology to keep your solutions current and competitive.",
      icon: <RefreshCw className="w-7 h-7" />,
    },
  ];

  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════════ */}
      <Hero
        bgVariant="about"
        badge="ABOUT US"
        title={
          <>
            Building Businesses with{" "}
            <span className="text-[#00A1E0]">Technology</span> and{" "}
            <span className="text-[#FF7900]">Trust</span>
          </>
        }
        description="PVS NexTech delivers innovative, scalable and customer-centric technology solutions across Salesforce, Veeva CRM, Veeva Vault and Tableau."
        primaryCta={{ label: "Get in Touch", to: "/contact" }}
      />

      {/* ═══ WHO WE ARE ══════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sf-blue text-sm font-semibold uppercase tracking-widest mb-3 inline-block">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-6">
                Your Technology Partner for Digital Transformation
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                PVS NexTech is an IT services and consulting company helping organizations improve efficiency and achieve digital transformation through enterprise technology solutions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We specialize in Salesforce, Veeva CRM, Veeva Vault, and Tableau — delivering solutions that streamline operations, enhance customer engagement, and unlock data-driven insights.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-navy rounded-2xl p-6 sm:p-10 text-white">
                <Building2 className="w-12 h-12 text-sf-blue mb-6" />
                <h3 className="text-2xl font-bold mb-4">IT Services & Consulting</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-sf-blue" /> Salesforce Solutions</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-orange" /> Veeva CRM & Vault</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-sf-blue" /> Tableau Analytics</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-orange" /> Training Programs</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ MISSION & VISION ════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-10 shadow-md border-t-4 border-sf-blue"
            >
              <span className="inline-block text-sf-blue text-sm font-semibold uppercase tracking-widest mb-3">
                Our Mission
              </span>
              <h3 className="text-2xl font-bold text-navy mb-4">
                Delivering Solutions That Matter
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg italic">
                "To deliver innovative, scalable and reliable technology solutions that create meaningful business value."
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-10 shadow-md border-t-4 border-orange"
            >
              <span className="inline-block text-orange text-sm font-semibold uppercase tracking-widest mb-3">
                Our Vision
              </span>
              <h3 className="text-2xl font-bold text-navy mb-4">
                A Trusted Technology Partner
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg italic">
                "To become a trusted technology consulting partner through expertise, innovation and customer success."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ══════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <SectionHeading
            subtitle="What Drives Us"
            title="Our Values"
            description="The principles that guide everything we do."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {siteConfig.values.map((value, i) => (
              <Card
                key={value.title}
                accent={i % 2 === 0 ? "#00A1E0" : "#FF7900"}
                icon={valueIcons[i]}
                title={value.title}
                description={value.description}
                delay={i * 0.08}
                className="text-center"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE PVS NEXTECH ═════════════════════════ */}
      <section className="section-padding bg-gradient-navy text-white">
        <div className="container-max">
          <SectionHeading
            subtitle="Our Advantage"
            title="Why Choose PVS NexTech"
            description="What sets us apart in delivering technology solutions."
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl glass card-hover text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-xl bg-sf-blue/20 flex items-center justify-center mb-5">
                  <span className="text-sf-blue">{card.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR JOURNEY / TIMELINE ═════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <SectionHeading
            subtitle="Our Journey"
            title="Milestones Along the Way"
            description="Key moments in our growth story."
          />
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sf-blue via-orange to-sf-blue opacity-30 -translate-x-1/2" />
            {siteConfig.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sf-blue border-4 border-white shadow-lg z-10" />
                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="inline-block text-sf-blue font-bold text-lg mb-1">
                    {item.year}
                  </span>
                  <h4 className="text-xl font-bold text-navy mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═════════════════════════════════════════════ */}
      <section className="section-padding bg-gradient-navy text-white text-center">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              Let's Build the Next Success Story Together
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to transform your business with technology? Let's start the conversation.
            </p>
            <Button to="/contact" variant="secondary" size="lg">
              Get in Touch <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
