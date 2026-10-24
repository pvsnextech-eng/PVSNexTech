import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building,
  User,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Hero from "../components/ui/Hero";
import { useToast } from "../components/ui/Toast";
import { isValidEmail, isValidPhone, sanitize } from "../utils/validation";
import siteConfig from "../config/siteConfig";

export default function Contact() {
  const toast = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    serviceInterestedIn: "Salesforce",
    message: "",
    botField: "", // honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = "Please enter a valid phone number";
    }
    if (!formData.company.trim()) errs.company = "Company / Organization is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.botField) {
      // Spam honeypot hit
      toast.success("Thank you! Your message has been sent successfully.");
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fill in all required fields accurately.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: sanitize(formData.fullName),
          phone: sanitize(formData.phone),
          email: sanitize(formData.email),
          company: sanitize(formData.company),
          serviceInterestedIn: sanitize(formData.serviceInterestedIn),
          message: sanitize(formData.message),
          botField: formData.botField,
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        toast.success("Thank you! Your message has been sent. We'll be in touch soon.");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          company: "",
          serviceInterestedIn: "Salesforce",
          message: "",
          botField: "",
        });
        setErrors({});
      } else {
        toast.error(resData.message || "Failed to send message. Please try again later.");
      }
    } catch (err) {
      toast.error("Network error. Please try again or reach out directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyConnectCards = [
    {
      title: "Expert Consultation",
      desc: "Connect directly with experienced enterprise technology practitioners.",
      icon: <User className="w-6 h-6 text-sf-blue" />,
    },
    {
      title: "Tailored Solutions",
      desc: "We analyze your specific requirements to design custom roadmaps.",
      icon: <CheckCircle2 className="w-6 h-6 text-orange" />,
    },
    {
      title: "Responsive Communication",
      desc: "Prompt, transparent communication throughout every stage of collaboration.",
      icon: <MessageSquare className="w-6 h-6 text-sf-blue" />,
    },
    {
      title: "Long-Term Support",
      desc: "Committed to post-deployment success, optimization, and continuous care.",
      icon: <ShieldCheck className="w-6 h-6 text-orange" />,
    },
  ];

  const contactCards = [
    {
      label: "Office Location",
      val: siteConfig.address,
      icon: <MapPin className="w-6 h-6 text-sf-blue" />,
    },
    {
      label: "Phone",
      val: siteConfig.phone,
      icon: <Phone className="w-6 h-6 text-orange" />,
      href: `tel:${siteConfig.phone}`,
    },
    {
      label: "Email",
      val: siteConfig.email,
      icon: <Mail className="w-6 h-6 text-sf-blue" />,
      href: `mailto:${siteConfig.email}`,
    },
    {
      label: "Working Hours",
      val: siteConfig.workingHours,
      icon: <Clock className="w-6 h-6 text-orange" />,
    },
  ];

  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════════ */}
      <Hero
        bgVariant="contact"
        badge="GET IN TOUCH"
        title={
          <>
            Let's Build Something <span className="text-[#00A1E0]">Great</span>{" "}
            <span className="text-[#FF7900]">Together</span>
          </>
        }
        description="Connect with our team to discuss Salesforce, Veeva CRM, Veeva Vault and Tableau requirements."
        primaryCta={{
          label: "Send a Message",
          onClick: () => {
            const el = document.getElementById("contact-form-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          },
        }}
      />

      {/* ═══ GET IN TOUCH 4 CARDS ════════════════════════════ */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container-max px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card) => (
              <div
                key={card.label}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-gray-50 shrink-0">{card.icon}</div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    {card.label}
                  </h4>
                  {card.href ? (
                    <a
                      href={card.val.startsWith("[") ? "#" : card.href}
                      className="text-sm font-semibold text-navy hover:text-sf-blue transition-colors break-words"
                    >
                      {card.val}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-navy break-words">{card.val}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORM & MAP SECTION ══════════════════════════════ */}
      <section id="contact-form-section" className="section-padding bg-white scroll-mt-20">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <SectionHeading
                subtitle="Send A Message"
                title="Tell Us About Your Goals"
                description="Our consultants are ready to assist you. Fill out the form below and we'll reply within 24 hours."
                center={false}
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="botField"
                    tabIndex="-1"
                    value={formData.botField}
                    onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                          errors.fullName ? "border-red-500" : "border-gray-200"
                        } focus:outline-none focus:ring-2 focus:ring-sf-blue`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                          errors.phone ? "border-red-500" : "border-gray-200"
                        } focus:outline-none focus:ring-2 focus:ring-sf-blue`}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        } focus:outline-none focus:ring-2 focus:ring-sf-blue`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Company / Organization <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                          errors.company ? "border-red-500" : "border-gray-200"
                        } focus:outline-none focus:ring-2 focus:ring-sf-blue`}
                        placeholder="Company name"
                      />
                    </div>
                    {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                  </div>
                </div>

                {/* Service Interested In */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Service Interested In <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.serviceInterestedIn}
                    onChange={(e) => setFormData({ ...formData, serviceInterestedIn: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sf-blue bg-white"
                  >
                    <option value="Salesforce">Salesforce</option>
                    <option value="Veeva CRM">Veeva CRM</option>
                    <option value="Veeva Vault">Veeva Vault</option>
                    <option value="Tableau">Tableau</option>
                    <option value="Training">Training</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-4 rounded-xl border ${
                      errors.message ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-sf-blue`}
                    placeholder="Provide a brief overview of your business needs, project scope, or query..."
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  <Send className="w-5 h-5 mr-2" /> Send Message
                </Button>
              </form>
            </div>

            {/* Map and Office Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h4 className="text-lg font-bold text-navy mb-3">Office Location</h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {siteConfig.address}
                </p>

                {siteConfig.mapEmbedUrl && siteConfig.mapEmbedUrl.trim() !== "" ? (
                  <div className="w-full h-72 rounded-xl overflow-hidden shadow-inner border border-gray-200">
                    <iframe
                      title="PVS NexTech Office Location"
                      src={siteConfig.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : (
                  <div className="w-full h-72 rounded-xl bg-gray-200/60 border border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-6 text-gray-500">
                    <MapPin className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="font-semibold text-navy">Map coming soon</span>
                    <span className="text-xs text-gray-400 mt-1 max-w-xs">
                      A live map will display here once verified office coordinates or embed link is added in siteConfig.
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-gradient-navy text-white p-6 rounded-2xl">
                <h4 className="text-lg font-bold mb-2">Direct Inquiry</h4>
                <p className="text-gray-300 text-sm mb-4">
                  For immediate assistance or consultation schedules:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-200">
                    <Phone className="w-4 h-4 text-sf-blue" />
                    <span>{siteConfig.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <Mail className="w-4 h-4 text-orange" />
                    <span>{siteConfig.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY CONNECT WITH US ═════════════════════════════ */}
      <section className="section-padding bg-gray-50 border-t border-gray-100">
        <div className="container-max">
          <SectionHeading
            subtitle="Partnership"
            title="Why Connect with Us?"
            description="We build long-standing relationships based on technical acumen, trust, and execution excellence."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyConnectCards.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 card-hover">
                <div className="mb-4">{item.icon}</div>
                <h4 className="text-lg font-bold text-navy mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
