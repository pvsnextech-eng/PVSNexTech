import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * Reusable Hero Component
 * 
 * Props:
 * - badge: string (e.g., "IT SERVICES & CONSULTING")
 * - title: ReactNode or string (with highlighted words in #00A1E0 or #FF7900)
 * - subtitle: string (optional secondary heading)
 * - description: string (max-w ~650px)
 * - primaryCta: { label: string, to?: string, onClick?: () => void }
 * - secondaryCta: { label: string, to?: string, onClick?: () => void }
 * - isHome: boolean (controls height and showcase display)
 * - bgVariant: 'home' | 'about' | 'services' | 'training' | 'contact'
 */
export default function Hero({
  badge,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  isHome = false,
  bgVariant = "home",
}) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      className={`relative w-full overflow-hidden text-white flex items-center border-b border-white/10 ${
        isHome
          ? "min-h-[60vh] md:min-h-[75vh] lg:min-h-[82vh] pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-36 lg:pb-20"
          : "min-h-[50vh] md:min-h-[46vh] lg:min-h-[52vh] pt-24 pb-10 md:pt-28 md:pb-14 lg:pt-34 lg:pb-16"
      }`}
      style={{
        background: "linear-gradient(135deg, #051838 0%, #08244E 38%, #0C366E 70%, #061F47 100%)",
      }}
    >
      {/* ── Background Tech Graphics, Glows & Patterns ─────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Luminous Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-[580px] h-[580px] rounded-full bg-[#00A1E0]/22 blur-[140px]" />
        <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] rounded-full bg-[#00C2FF]/16 blur-[130px]" />
        <div className="absolute bottom-0 right-10 w-[440px] h-[440px] rounded-full bg-[#FF7900]/16 blur-[150px]" />

        {/* Soft Modern Tech Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: "radial-gradient(#00C2FF 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Dynamic Curved Energy Beams & Swirling Arcs */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="beam-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C2FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00A1E0" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="beam-orange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFA000" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF7900" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFA000" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M -100 280 Q 400 170 900 310 T 1900 230" fill="none" stroke="url(#beam-blue)" strokeWidth="2.2" strokeDasharray="8 6" />
          <path d="M -100 390 Q 500 490 1100 330 T 1900 410" fill="none" stroke="url(#beam-orange)" strokeWidth="2" strokeDasharray="10 8" />
          <circle cx="900" cy="310" r="4" fill="#00C2FF" />
          <circle cx="1100" cy="330" r="4" fill="#FFA000" />
        </svg>

        {/* Soft Vignette Overlay for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#051838]/85 via-transparent to-[#051838]/40 pointer-events-none" />
      </div>

      {/* ── Hero Content ────────────────────────────────────────── */}
      <div className="container-max relative z-10 px-4 sm:px-6 md:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Text Column */}
          <motion.div
            className="flex-1 max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            {badge && (
              <motion.div variants={itemVariants} className="mb-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-sf-blue/20 text-[#33B4E6] border border-sf-blue/40 backdrop-blur-md shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
                  {badge}
                </span>
              </motion.div>
            )}

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.15] tracking-tight text-white mb-4"
            >
              {title}
            </motion.h1>

            {/* Optional Sub-heading */}
            {subtitle && (
              <motion.h2
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl font-semibold text-[#70D6FF] mb-4"
              >
                {subtitle}
              </motion.h2>
            )}

            {/* Description */}
            {description && (
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-gray-200 font-normal leading-relaxed max-w-[650px] mb-8 mx-auto lg:mx-0"
              >
                {description}
              </motion.p>
            )}

            {/* CTA Buttons */}
            {(primaryCta || secondaryCta) && (
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                {/* Primary CTA (Orange rounded button with arrow & hover animation) */}
                {primaryCta && (
                  primaryCta.to ? (
                    <Link
                      to={primaryCta.to}
                      className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FF7900] hover:bg-[#E06A00] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#FF7900]/30 hover:shadow-[#FF7900]/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF7900] focus:ring-offset-2 focus:ring-offset-[#051838]"
                    >
                      <span>{primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={primaryCta.onClick}
                      className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FF7900] hover:bg-[#E06A00] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#FF7900]/30 hover:shadow-[#FF7900]/50 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF7900] focus:ring-offset-2 focus:ring-offset-[#051838]"
                    >
                      <span>{primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  )
                )}

                {/* Secondary CTA (Outlined button) */}
                {secondaryCta && (
                  secondaryCta.to ? (
                    <Link
                      to={secondaryCta.to}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/40 hover:border-white text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#051838]"
                    >
                      {secondaryCta.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={secondaryCta.onClick}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/40 hover:border-white text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#051838]"
                    >
                      {secondaryCta.label}
                    </button>
                  )
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Corporate Building Image on Home */}
          {isHome ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex flex-col w-[400px] xl:w-[460px] rounded-3xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-2xl shadow-[#00A1E0]/20 relative overflow-hidden group hover:border-white/30 transition-all duration-500"
            >
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#00A1E0]/30 rounded-full blur-2xl pointer-events-none z-10" />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#FF7900]/25 rounded-full blur-2xl pointer-events-none z-10" />

              {/* Corporate Building Image */}
              <img
                src="/assets/corporate-building.jpg"
                alt="Corporate Building — PVS NexTech"
                className="w-full h-64 xl:h-72 object-cover object-center rounded-t-3xl"
              />

              {/* Bottom info strip */}
              <div className="relative z-10 flex items-center justify-between px-5 py-4 border-t border-white/10">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Consulting Partner
                </span>
                <span className="text-gray-400 font-medium text-xs">100% Scalable</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center p-6 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/15 shadow-xl shadow-sf-blue/10"
            >
              <img
                src="/assets/pvs-nextech-logo.png"
                alt="PVS NexTech"
                className="w-auto h-16 object-contain filter drop-shadow-[0_0_20px_rgba(0,161,224,0.35)]"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
