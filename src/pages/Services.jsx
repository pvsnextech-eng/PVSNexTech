import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Users,
  Shield,
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  Search,
  ClipboardList,
  Code2,
  TrendingUp,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Hero from "../components/ui/Hero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import siteConfig from "../config/siteConfig";

const serviceIcons = {
  salesforce: <Cloud className="w-10 h-10" />,
  "veeva-crm": <Users className="w-10 h-10" />,
  "veeva-vault": <Shield className="w-10 h-10" />,
  tableau: <BarChart3 className="w-10 h-10" />,
};

const serviceAccentBg = {
  salesforce: "from-[#00A1E0]/10 to-[#00A1E0]/5",
  "veeva-crm": "from-[#FF7900]/10 to-[#FF7900]/5",
  "veeva-vault": "from-[#FF7900]/10 to-[#FF7900]/5",
  tableau: "from-[#00A1E0]/10 to-[#00A1E0]/5",
};

function ServiceSection({ service, index }) {
  const [expanded, setExpanded] = useState(false);
  const [ref, isVisible] = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <section
      id={service.id}
      className={`section-padding scroll-mt-24 ${isEven ? "bg-white" : "bg-gray-50"}`}
    >
      <div className="container-max">
        <div
          ref={ref}
          className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
        >
          {/* Visual / Icon Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12"
          >
            <div
              className={`relative rounded-3xl p-12 bg-gradient-to-br ${serviceAccentBg[service.id]} overflow-hidden`}
            >
              {/* Decorative circles */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
                style={{ backgroundColor: `${service.accent}10` }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full"
                style={{ backgroundColor: `${service.accent}08` }}
              />
              <div className="relative z-10 text-center">
                <div
                  className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-xl"
                  style={{
                    backgroundColor: service.accent,
                    boxShadow: `0 20px 40px ${service.accent}30`,
                  }}
                >
                  <span className="text-white">{serviceIcons[service.id]}</span>
                </div>
                <h3
                  className="text-3xl font-extrabold mb-2"
                  style={{ color: service.accent }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm">{service.tagline}</p>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-7/12"
          >
            <span
              className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: service.accent }}
            >
              {service.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-5">
              {service.tagline}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

            {/* Service items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {service.items.slice(0, expanded ? undefined : 6).map((item) => (
                <div key={item} className="flex items-center gap-3 py-2">
                  <CheckCircle2
                    className="w-5 h-5 shrink-0"
                    style={{ color: service.accent }}
                  />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {service.items.length > 6 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-sm font-semibold mb-4 cursor-pointer transition-colors"
                style={{ color: service.accent }}
              >
                {expanded ? "Show Less" : `Show All ${service.items.length} Services`}
                {expanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const { hash } = useLocation();

  // Scroll to anchor on mount
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [hash]);

  const processSteps = siteConfig.deliveryProcess;
  const processIcons = [
    <Search className="w-8 h-8" />,
    <ClipboardList className="w-8 h-8" />,
    <Code2 className="w-8 h-8" />,
    <TrendingUp className="w-8 h-8" />,
  ];

  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════════ */}
      <Hero
        bgVariant="services"
        badge="OUR SERVICES"
        title={
          <>
            Technology Solutions for a{" "}
            <span className="text-[#00A1E0]">Smarter</span>{" "}
            <span className="text-[#FF7900]">Tomorrow</span>
          </>
        }
        description="We help businesses modernize operations, improve customer experiences and unlock valuable insights through enterprise technology."
        primaryCta={{ label: "Contact Our Experts", to: "/contact" }}
        secondaryCta={{
          label: "View Services",
          onClick: () => {
            const el = document.getElementById("services-list");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          },
        }}
      />

      {/* Quick jump service pills */}
      <div className="bg-[#061D3F] border-b border-white/10 py-4 px-4">
        <div className="container-max flex flex-wrap justify-center gap-2.5">
          {siteConfig.services.map((svc) => (
            <a
              key={svc.id}
              href={`#${svc.id}`}
              className="px-4 py-2 rounded-full glass text-xs sm:text-sm font-medium text-white hover:bg-white/20 transition-all duration-200"
            >
              {svc.title}
            </a>
          ))}
        </div>
      </div>

      {/* ═══ SERVICE SECTIONS ════════════════════════════════ */}
      <div id="services-list">
        {siteConfig.services.map((service, i) => (
          <ServiceSection key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* ═══ DELIVERY PROCESS ════════════════════════════════ */}
      <section className="section-padding bg-gradient-navy text-white">
        <div className="container-max">
          <SectionHeading
            subtitle="Our Approach"
            title="Delivery Process"
            description="A proven methodology to ensure every project is delivered with excellence."
            light
          />
          <div className="relative">
            <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-sf-blue via-orange to-sf-blue opacity-20" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-sf-blue/20 text-sf-blue flex items-center justify-center mb-5">
                    {processIcons[i]}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="text-center mt-14">
            <Button to="/contact" variant="secondary" size="lg">
              Contact Our Experts <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
