import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

/**
 * Reusable section heading with scroll-reveal animation.
 * Props: subtitle (small text above), title, description, light (white text), center.
 */
export default function SectionHeading({
  subtitle,
  title,
  description,
  light = false,
  center = true,
  className = "",
}) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-8 md:mb-14 ${center ? "text-center" : ""} ${className}`}
    >
      {subtitle && (
        <span
          className={`inline-block text-sm font-semibold uppercase tracking-widest mb-3 ${
            light ? "text-sf-blue-light" : "text-sf-blue"
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg max-w-3xl leading-relaxed ${
            center ? "mx-auto" : ""
          } ${light ? "text-gray-300" : "text-gray-600"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
