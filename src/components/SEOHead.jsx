import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import siteConfig from "../config/siteConfig";

/**
 * Updates the document <title> and <meta name="description">
 * based on the current route.
 */
export default function SEOHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = siteConfig.seo;
    let meta;
    if (pathname === "/") meta = seo.home;
    else if (pathname.startsWith("/about")) meta = seo.about;
    else if (pathname.startsWith("/services")) meta = seo.services;
    else if (pathname.startsWith("/training")) meta = seo.training;
    else if (pathname.startsWith("/contact")) meta = seo.contact;
    else meta = seo.home;

    document.title = meta.title;

    let descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", meta.description);

    // Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);
  }, [pathname]);

  return null;
}
