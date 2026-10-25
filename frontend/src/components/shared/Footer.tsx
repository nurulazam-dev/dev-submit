import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ],
  account: [
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "Student Dashboard", href: "/dashboard" },
  ],
};

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/nurulazam-dev",
    icon: ExternalLink,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nurulazam-dev",
    icon: ExternalLink,
  },
];

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/dev-submit-logo.png"
                width={40}
                height={40}
                alt="Dev Submit logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold tracking-tight">
                Dev Submit
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-muted-foreground">
              A project submission platform where students submit their work and
              administrators review submissions and provide feedback.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Platform
            </h3>

            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboards */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Dashboards
            </h3>

            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>

            <p className="text-sm leading-6 text-muted-foreground">
              Have a question or need help with the platform?
            </p>

            <a
              href="https://github.com/nurulazam-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail size={17} />
              <span>Contact via GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Dev Submit. All rights reserved.
            </p>

            <p className="text-xs text-muted-foreground">
              Built for students and developers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
