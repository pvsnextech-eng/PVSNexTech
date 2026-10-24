/**
 * Validate email format.
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate phone: digits, spaces, dashes, parens, optional leading +. Min 7 digits.
 */
export function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return /^[+\d][\d\s\-()]{6,19}$/.test(phone) && digits.length >= 7;
}

/**
 * Basic HTML entity sanitizer for display purposes.
 */
export function sanitize(str) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}
