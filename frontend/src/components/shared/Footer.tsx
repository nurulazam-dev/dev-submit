import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
// import logo from "/public/mna-serviceHub-logo.png";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Our Services", href: "/services" },
    { label: "Careers", href: "/job-posts" },
    { label: "Contact", href: "/contact-us" },
  ],
  support: [
    { label: "Help Center", href: "/contact-us" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-conditions" },
    { label: "Refund Policy", href: "/refund-cancellation-policy" },
  ],
  social: [
    {
      icon: Facebook,
      href: "https://www.facebook.com/nurulazam.dev",
      label: "Facebook",
    },
    { icon: Twitter, href: "https://x.com/nurulazam_dev", label: "Twitter" },
    {
      icon: Linkedin,
      href: "linkedin.com/in/nurulazam-dev",
      label: "LinkedIn",
    },
    { icon: Github, href: "https://github.com/nurulazam-dev", label: "GitHub" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t pt-10 pb-6 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <Image
                  // src={logo.src}
                  src="/mna-serviceHub-logo.png"
                  height={40}
                  width={40}
                  alt="MNA ServiceHub"
                  preload
                  className="h-10 w-auto object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                MNA ServiceHub
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              MNA ServiceHub acts as a centralized digital platform that enables
              all local service-related activities to be managed efficiently
              from a single place.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={item.label}
                >
                  <item.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
              <span> Raozan, Chattogram, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone size={18} className="shrink-0 text-primary" />
              <span>+880 1234-567890</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail size={18} className="shrink-0 text-primary" />
              <span>admin@mnaservicehub.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail size={18} className="shrink-0 text-primary" />
              <span>support@mnaservicehub.com</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              © {currentYear} MNA ServiceHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-primary">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
