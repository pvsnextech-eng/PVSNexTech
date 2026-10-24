import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import siteConfig from "../config/siteConfig";

/**
 * Sticky header: nav LEFT, logo RIGHT.
 * Desktop dropdown for Services. Mobile hamburger with slide-in + accordion.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();

  // Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinkClass = (isActive) =>
    `relative text-sm font-medium transition-colors duration-200 py-2 ${
      isActive
        ? "text-orange"
        : "text-gray-200 hover:text-white"
    }`;

  const activeUnderline = (isActive) =>
    isActive ? (
      <motion.span
        layoutId="nav-underline"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange rounded-full"
      />
    ) : null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 shadow-xl" : "py-4"
      }`}
      style={{ background: "rgba(6, 29, 63, 0.97)", backdropFilter: "blur(12px)" }}
    >
      <div className="container-max flex items-center justify-between px-4 md:px-8">
        {/* ── Desktop Nav (LEFT) ──────────────────────── */}
        <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
          {siteConfig.navLinks.map((link) =>
            link.dropdown ? (
              /* Services with hover dropdown + click to navigate */
              <div
                key={link.label}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${navLinkClass(isActive || pathname.startsWith(link.path))} flex items-center gap-1`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                      {activeUnderline(isActive || pathname.startsWith(link.path))}
                    </>
                  )}
                </NavLink>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-56 py-2 rounded-xl glass shadow-2xl"
                    >
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.anchor}
                          to={`${link.path}#${sub.anchor}`}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-5 py-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors duration-150"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) => navLinkClass(isActive)}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {activeUnderline(isActive)}
                  </>
                )}
              </NavLink>
            )
          )}
        </nav>

        {/* ── Mobile Hamburger (LEFT) ─────────────────── */}
        <button
          className="lg:hidden text-white p-2 -ml-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* ── Logo (RIGHT) ────────────────────────────── */}
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="PVS NexTech Home">
          <img
            src="/assets/pvs-nextech-logo.png"
            alt="PVS NexTech Logo"
            className={`transition-all duration-300 w-auto object-contain ${scrolled ? "h-14 md:h-16" : "h-16 md:h-20"}`}
            loading="eager"
          />
        </Link>
      </div>

      {/* ── Mobile Slide-In Menu ──────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 lg:hidden z-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-navy-dark z-50 flex flex-col p-6 pt-20 overflow-y-auto lg:hidden"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {siteConfig.navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="border-b border-white/10">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between py-4 text-base font-medium text-gray-200 hover:text-white"
                      aria-expanded={mobileServicesOpen}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 pb-2"
                        >
                          {/* View All Services */}
                          <Link
                            to={link.path}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between py-2.5 text-sm font-semibold text-[#00A1E0] hover:text-white transition-colors border-b border-white/10 mb-1 pr-2"
                          >
                            <span>View All Services</span>
                            <span>→</span>
                          </Link>
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.anchor}
                              to={`${link.path}#${sub.anchor}`}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2.5 text-sm text-gray-300 hover:text-orange transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 text-base font-medium border-b border-white/10 transition-colors ${
                        isActive ? "text-orange" : "text-gray-200 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
