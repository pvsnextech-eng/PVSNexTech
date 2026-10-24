import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

/**
 * Reusable Button component.
 * Variants: primary (blue), secondary (orange), outline.
 * Can render as <button>, <Link>, or <a>.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variants = {
    primary:
      "bg-sf-blue text-white hover:bg-sf-blue-dark focus:ring-sf-blue shadow-lg shadow-sf-blue/20 hover:shadow-xl hover:shadow-sf-blue/30",
    secondary:
      "bg-orange text-white hover:bg-orange-dark focus:ring-orange shadow-lg shadow-orange/20 hover:shadow-xl hover:shadow-orange/30",
    outline:
      "border-2 border-sf-blue text-sf-blue hover:bg-sf-blue hover:text-white focus:ring-sf-blue",
    "outline-white":
      "border-2 border-white text-white hover:bg-white hover:text-navy focus:ring-white",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${
    disabled || loading ? "opacity-60 pointer-events-none" : ""
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
