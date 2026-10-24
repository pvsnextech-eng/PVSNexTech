import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowUp } from "lucide-react";
import siteConfig from "../config/siteConfig";

/**
 * Footer — 4-column layout, identical on every page.
 * Includes back-to-top button and placeholder legal modals.
 */
export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    linkedin: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 22c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 2c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
      </svg>
    ),
    x: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="bg-gradient-navy text-gray-300">
        {/* Main Footer */}
        <div className="container-max section-padding !pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Logo & Intro */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <img
                src="/assets/pvs-nextech-logo.png"
                alt="PVS NexTech Logo"
                className="h-14 md:h-16 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              {siteConfig.shortIntro}
            </p>
            <div className="flex items-center gap-3">
              {Object.entries(siteConfig.socialLinks).map(([key, url]) => (
                <a
                  key={key}
                  href={url.startsWith("[") ? "#" : url}
                  target={url.startsWith("[") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 hover:bg-sf-blue hover:text-white transition-all duration-200 text-gray-400"
                >
                  {socialIcons[key]}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-sf-blue transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">Our Services</h4>
            <ul className="space-y-3">
              {siteConfig.services.map((svc) => (
                <li key={svc.id}>
                  <Link
                    to={`/services#${svc.id}`}
                    className="text-sm text-gray-400 hover:text-sf-blue transition-colors duration-200"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>{siteConfig.address}</li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-sf-blue transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-sf-blue transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.workingHours}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container-max flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-5 gap-3 text-xs text-gray-500">
            <p>© {currentYear} PVS NexTech. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPrivacy(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>|</span>
              <button
                onClick={() => setShowTerms(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-sf-blue text-white shadow-lg flex items-center justify-center hover:bg-sf-blue-dark transition-all duration-200 z-40 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" onClick={() => setShowPrivacy(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-navy mb-4">Privacy Policy</h3>
            <p className="text-gray-600 leading-relaxed">
              This is a placeholder privacy policy. PVS NexTech is committed to protecting your personal information.
              Please replace this content with your actual privacy policy before deploying to production.
            </p>
            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-6 px-6 py-2.5 bg-sf-blue text-white rounded-lg hover:bg-sf-blue-dark transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" onClick={() => setShowTerms(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-navy mb-4">Terms & Conditions</h3>
            <p className="text-gray-600 leading-relaxed">
              This is a placeholder terms and conditions document. Please replace this content with your actual terms
              and conditions before deploying to production.
            </p>
            <button
              onClick={() => setShowTerms(false)}
              className="mt-6 px-6 py-2.5 bg-sf-blue text-white rounded-lg hover:bg-sf-blue-dark transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
