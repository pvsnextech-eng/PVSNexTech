import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  Users,
  Code,
  CheckCircle2,
  HelpCircle,
  Award,
  ArrowRight,
  Send,
  Calendar,
  Building,
  Mail,
  Phone,
  User,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Hero from "../components/ui/Hero";
import { useToast } from "../components/ui/Toast";
import { isValidEmail, isValidPhone, sanitize } from "../utils/validation";
import siteConfig from "../config/siteConfig";

export default function Training() {
  const toast = useToast();
  const [selectedCourse, setSelectedCourse] = useState("Salesforce Training");
  const [activeModalCourse, setActiveModalCourse] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    collegeOrOrg: "",
    graduationYear: "",
    interestedTraining: "Salesforce Training",
    currentExperience: "",
    message: "",
    botField: "", // honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCoursePrefill = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setFormData((prev) => ({ ...prev, interestedTraining: courseTitle }));
    const formEl = document.getElementById("enquiry-form-section");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      errs.phone = "Please enter a valid phone number (min 7 digits)";
    }
    if (!formData.qualification.trim()) errs.qualification = "Qualification is required";
    if (!formData.collegeOrOrg.trim()) errs.collegeOrOrg = "College or Organization is required";
    if (!formData.graduationYear.trim()) errs.graduationYear = "Graduation Year is required";
    if (!formData.interestedTraining) errs.interestedTraining = "Please select a training program";
    if (!formData.message.trim()) errs.message = "Message or goals are required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.botField) {
      // Honeypot triggered
      toast.success("Enquiry received successfully! Our team will contact you shortly.");
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
      const response = await fetch("/api/training-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: sanitize(formData.fullName),
          email: sanitize(formData.email),
          phone: sanitize(formData.phone),
          qualification: sanitize(formData.qualification),
          collegeOrOrg: sanitize(formData.collegeOrOrg),
          graduationYear: sanitize(formData.graduationYear),
          interestedTraining: sanitize(formData.interestedTraining),
          currentExperience: sanitize(formData.currentExperience),
          message: sanitize(formData.message),
          botField: formData.botField,
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        toast.success("Enquiry submitted successfully! We will get in touch with details.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          qualification: "",
          collegeOrOrg: "",
          graduationYear: "",
          interestedTraining: selectedCourse,
          currentExperience: "",
          message: "",
          botField: "",
        });
        setErrors({});
      } else {
        toast.error(resData.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again or reach out to us via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const approachSteps = [
    { title: "Learn", desc: "Master core concepts through structured sessions led by industry professionals." },
    { title: "Practice", desc: "Engage with guided lab exercises and real configuration tasks." },
    { title: "Build", desc: "Work on hands-on project scenarios simulating enterprise requirements." },
    { title: "Prepare", desc: "Gain interview preparation tips, resume guidance, and technical evaluation." },
  ];

  const whoCanJoin = [
    { title: "Fresh Graduates", desc: "Kickstart your technology career in high-demand enterprise software platforms.", icon: <GraduationCap className="w-6 h-6 text-sf-blue" /> },
    { title: "IT Professionals", desc: "Expand your skill set and transition into specialized Salesforce or Veeva Vault consulting.", icon: <Code className="w-6 h-6 text-orange" /> },
    { title: "Career Switchers", desc: "Transition from non-tech or generic domains into enterprise cloud solutions.", icon: <Briefcase className="w-6 h-6 text-sf-blue" /> },
    { title: "Professionals Looking to Upskill", desc: "Deepen your domain knowledge and stay ahead with cutting-edge platforms.", icon: <Award className="w-6 h-6 text-orange" /> },
  ];

  const whyChooseUs = [
    "Structured Learning",
    "Hands-On Practice",
    "Real-World Scenarios",
    "Technical Guidance",
    "Interview Preparation",
    "Skill Development",
  ];

  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════════ */}
      <Hero
        bgVariant="training"
        badge="PVS NEXTECH TRAINING"
        title={
          <>
            <span className="text-[#00A1E0]">Learn</span> Today.{" "}
            <span className="text-[#FF7900]">Lead</span> Tomorrow.
          </>
        }
        subtitle="Build Your Career with Salesforce & Veeva Vault Training."
        description="Develop practical technical skills through structured learning, real-world scenarios and hands-on exercises."
        primaryCta={{
          label: "Explore Training Programs",
          onClick: () => {
            const el = document.getElementById("training-programs");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          },
        }}
        secondaryCta={{
          label: "Enquire Now",
          onClick: () => {
            const el = document.getElementById("enquiry-form-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          },
        }}
      />

      {/* ═══ EXACTLY TWO PROGRAMS ════════════════════════════ */}
      <section id="training-programs" className="section-padding bg-gray-50 scroll-mt-20">
        <div className="container-max">
          <SectionHeading
            subtitle="Curriculum"
            title="Featured Training Programs"
            description="Focused tracks designed to build in-depth technical confidence and enterprise readiness."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteConfig.trainingPrograms.map((prog) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-md border-t-4 card-hover flex flex-col justify-between"
                style={{ borderColor: prog.accent }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${prog.accent}15`, color: prog.accent }}
                    >
                      Enterprise Track
                    </span>
                    <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                      <Clock className="w-4 h-4" /> Comprehensive
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">{prog.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{prog.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3 tracking-wider">
                      Core Modules Highlight
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {prog.modules.slice(0, 6).map((mod) => (
                        <div key={mod} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: prog.accent }} />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveModalCourse(prog)}
                  >
                    View Course Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCoursePrefill(prog.title)}
                  >
                    Enquire Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRAINING APPROACH ═══════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <SectionHeading
            subtitle="Methodology"
            title="Our Training Approach"
            description="Learn → Practice → Build → Prepare: A step-by-step pathway to technical mastery."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachSteps.map((step, idx) => (
              <div key={step.title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center relative overflow-hidden">
                <span className="absolute -right-2 -bottom-2 text-6xl font-black text-gray-200/50 select-none">
                  0{idx + 1}
                </span>
                <div className="w-12 h-12 rounded-xl bg-navy text-sf-blue flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {idx + 1}
                </div>
                <h4 className="text-xl font-bold text-navy mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHO CAN JOIN & WHY CHOOSE US ════════════════════ */}
      <section className="section-padding bg-gradient-navy text-white">
        <div className="container-max">
          <SectionHeading
            subtitle="Target Audience"
            title="Who Can Join?"
            description="Our training programs are structured to support learners across diverse backgrounds."
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {whoCanJoin.map((item) => (
              <div key={item.title} className="p-6 rounded-xl glass card-hover">
                <div className="mb-4">{item.icon}</div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 md:p-12 rounded-2xl bg-navy-light/60 border border-white/10 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-8">
              Why Choose PVS NexTech Training?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {whyChooseUs.map((item) => (
                <div key={item} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-orange mb-2" />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRAINING ENQUIRY FORM ═══════════════════════════ */}
      <section id="enquiry-form-section" className="section-padding bg-gray-50 scroll-mt-20">
        <div className="container-max max-w-4xl mx-auto">
          <SectionHeading
            subtitle="Enrollment"
            title="Training Enquiry Form"
            description="Take the next step in your career. Submit your details and our training coordinator will reach out."
          />

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 sm:p-8 md:p-10 shadow-lg border border-gray-100">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
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
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
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

              {/* Qualification */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.qualification ? "border-red-500" : "border-gray-200"
                  } focus:outline-none focus:ring-2 focus:ring-sf-blue`}
                  placeholder="e.g. B.Tech / B.E. / MCA / B.Sc"
                />
                {errors.qualification && <p className="text-xs text-red-500 mt-1">{errors.qualification}</p>}
              </div>

              {/* College/Organization */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  College / Organization <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.collegeOrOrg}
                    onChange={(e) => setFormData({ ...formData, collegeOrOrg: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                      errors.collegeOrOrg ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-sf-blue`}
                    placeholder="University or current company name"
                  />
                </div>
                {errors.collegeOrOrg && <p className="text-xs text-red-500 mt-1">{errors.collegeOrOrg}</p>}
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Graduation Year <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                      errors.graduationYear ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-sf-blue`}
                    placeholder="e.g. 2024 / 2025"
                  />
                </div>
                {errors.graduationYear && <p className="text-xs text-red-500 mt-1">{errors.graduationYear}</p>}
              </div>

              {/* Interested Training */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Interested Training <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.interestedTraining}
                  onChange={(e) => setFormData({ ...formData, interestedTraining: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sf-blue bg-white"
                >
                  <option value="Salesforce Training">Salesforce Training</option>
                  <option value="Veeva Vault Training">Veeva Vault Training</option>
                </select>
              </div>

              {/* Current Experience */}
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Current Experience
                </label>
                <input
                  type="text"
                  value={formData.currentExperience}
                  onChange={(e) => setFormData({ ...formData, currentExperience: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sf-blue"
                  placeholder="e.g. Fresher / 1-2 years in QA / Non-IT"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-navy mb-2">
                Your Career Goals / Questions <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full p-4 rounded-xl border ${
                  errors.message ? "border-red-500" : "border-gray-200"
                } focus:outline-none focus:ring-2 focus:ring-sf-blue`}
                placeholder="Tell us about your learning goals, current background, or any specific questions..."
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              loading={isSubmitting}
              className="w-full md:w-auto"
            >
              <Send className="w-5 h-5 mr-2" /> Submit Enquiry
            </Button>
          </form>
        </div>
      </section>

      {/* ═══ COURSE DETAILS MODAL ════════════════════════════ */}
      <AnimatePresence>
        {activeModalCourse && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
            onClick={() => setActiveModalCourse(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b pb-4 mb-6">
                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-block"
                    style={{
                      backgroundColor: `${activeModalCourse.accent}15`,
                      color: activeModalCourse.accent,
                    }}
                  >
                    Curriculum Syllabus
                  </span>
                  <h3 className="text-2xl font-bold text-navy">{activeModalCourse.title}</h3>
                </div>
                <button
                  onClick={() => setActiveModalCourse(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {activeModalCourse.description}
              </p>

              <h4 className="text-lg font-bold text-navy mb-4">Complete Modules Covered:</h4>
              <div className="space-y-3 mb-8">
                {activeModalCourse.modules.map((mod, idx) => (
                  <div key={mod} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="w-6 h-6 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-gray-800 font-medium text-sm">{mod}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" size="sm" onClick={() => setActiveModalCourse(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleCoursePrefill(activeModalCourse.title);
                    setActiveModalCourse(null);
                  }}
                >
                  Enquire for This Program
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
