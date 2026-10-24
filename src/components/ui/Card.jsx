import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

/**
 * Reusable animated card with hover lift effect.
 * Props: accent (border-top colour), icon, title, description, children, delay.
 */
export default function Card({
  accent,
  icon,
  title,
  description,
  children,
  delay = 0,
  className = "",
  onClick,
  ...props
}) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-7 shadow-md card-hover overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      style={{
        borderTop: accent ? `4px solid ${accent}` : undefined,
      }}
      {...props}
    >
      {icon && (
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
          style={{ backgroundColor: accent ? `${accent}15` : "#00A1E015" }}
        >
          <span style={{ color: accent || "#00A1E0" }}>{icon}</span>
        </div>
      )}
      {title && (
        <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
      )}
      {description && (
        <p className="text-gray-600 leading-relaxed">{description}</p>
      )}
      {children}
    </motion.div>
  );
}
