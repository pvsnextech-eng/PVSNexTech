import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import siteConfig from "../config/siteConfig";

/**
 * Sticky header: nav LEFT, logo RIGHT on desktop.
 * On mobile: logo LEFT, hamburger RIGHT with full-screen slide-in drawer.
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass = (isActive) =>
    `relative text-sm font-medium transition-colors duration-200 py-2 ${
      isActive ? "text-orange" : "text-gray-200 hover:text-white"
    }`;

  const activeUnderline = (isActive) =>
    isActive ? (
      <motion.span
        layoutId="nav-underline"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange rounded-full"
      />
    ) : null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 shadow-xl" : "py-3 md:py-4"
        }`}
        style={{ background: "rgba(6, 29, 63, 0.97)", backdropFilter: "blur(12px)" }}
      >
        <div className="container-max flex items-center justify-between px-4 md:px-8 w-full">
          {/* ── Logo: LEFT on Mobile, RIGHT on Desktop ──── */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 lg:order-2"
            aria-label="PVS NexTech Home"
          >
            <img
              src="/assets/pvs-nextech-logo.png"
              alt="PVS NexTech Logo"
              className={`transition-all duration-300 w-auto object-contain ${
                scrolled ? "h-10 sm:h-12 md:h-16" : "h-11 sm:h-14 md:h-20"
              }`}
              loading="eager"
            />
          </Link>

          {/* ── Desktop Nav: LEFT on Desktop (lg:order-1) ── */}
          <nav
            className="hidden lg:flex items-center gap-8 lg:order-1"
            role="navigation"
            aria-label="Main navigation"
          >
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

          {/* ── Mobile Hamburger: RIGHT on Mobile (lg:hidden) ── */}
          <button
            className="lg:hidden text-white p-2.5 rounded-lg hover:bg-white/10 transition-colors -mr-1 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer (Mounted to document.body to avoid parent CSS containment) ── */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <div className="fixed inset-0 z-[9999] lg:hidden">
                {/* Backdrop overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setMobileOpen(false)}
                />

                {/* Drawer panel sliding from right */}
                <motion.nav
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
                  className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#041228] text-white flex flex-col justify-between p-6 overflow-y-auto shadow-2xl border-l border-white/10"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                  <div>
                    {/* Drawer Header with Logo & Close button */}
                    <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-3">
                      <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                        <img
                          src="/assets/pvs-nextech-logo.png"
                          alt="PVS NexTech"
                          className="h-9 w-auto object-contain"
                        />
                      </Link>
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Close menu"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Navigation Options */}
                    <div className="divide-y divide-white/10">
                      {siteConfig.navLinks.map((link) =>
                        link.dropdown ? (
                          <div key={link.label} className="py-1">
                            <div className="flex items-center justify-between">
                              <NavLink
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                className={({ isActive }) =>
                                  `py-3 text-base font-semibold transition-colors ${
                                    isActive || pathname.startsWith(link.path)
                                      ? "text-orange"
                                      : "text-gray-200 hover:text-white"
                                  }`
                                }
                              >
                                {link.label}
                              </NavLink>
                              <button
                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                aria-label="Toggle services options"
                              >
                                <ChevronDown
                                  className={`w-5 h-5 transition-transform duration-200 ${
                                    mobileServicesOpen ? "rotate-180 text-orange" : ""
                                  }`}
                                />
                              </button>
                            </div>
                            <AnimatePresence>
                              {mobileServicesOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden pl-4 pb-2 space-y-1 border-l-2 border-orange/40 my-1 ml-2"
                                >
                                  {link.dropdown.map((sub) => (
                                    <Link
                                      key={sub.anchor}
                                      to={`${link.path}#${sub.anchor}`}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-2 text-sm text-gray-300 hover:text-orange transition-colors"
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
                              `block py-3.5 text-base font-semibold transition-colors ${
                                isActive ? "text-orange" : "text-gray-200 hover:text-white"
                              }`
                            }
                          >
                            {link.label}
                          </NavLink>
                        )
                      )}
                    </div>
                  </div>

                  {/* Drawer Footer with Quick Contact */}
                  <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                    <Link
                      to="/contact"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-3 px-4 rounded-xl bg-orange hover:bg-orange-dark text-white font-semibold text-center block transition-colors shadow-lg shadow-orange/30"
                    >
                      Get in Touch
                    </Link>
                    <div className="text-xs text-gray-400 text-center space-y-1">
                      <p>{siteConfig.phone}</p>
                      <p>{siteConfig.email}</p>
                    </div>
                  </div>
                </motion.nav>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
