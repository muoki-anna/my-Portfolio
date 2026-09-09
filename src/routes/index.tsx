import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  Code2,
  Terminal,
  Palette,
  Cpu,
  Globe,
  Database,
  Zap,
  Send,
  FileText,
  Download,
  Menu,
  X,
  Check,
  Copy,
  MessageSquare,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { usePortfolioStore } from "@/lib/portfolio-store";

import heroVisual from "@/assets/hero image.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TechIcon } from "@/components/TechIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Muoki Anna | Software Developer",
      },
      {
        name: "description",
        content:
          "Portfolio of Muoki Anna — software developer building elegant, performant web and backend experiences.",
      },
      {
        property: "og:title",
        content: "Muoki Anna | Software Developer",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Muoki Anna — software developer building elegant, performant web and backend experiences.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Muoki-Anna",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/muoki-anna",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:muokianna10@gmail.com?subject=Inquiry%20from%20Portfolio&body=Hi%20Anna,%0A%0AI%20saw%20your%20portfolio%20and%20wanted%20to%20reach%20out%20regarding...",
    label: "Email",
  },
];

const ICON_MAP: Record<string, any> = {
  Palette,
  Database,
  Terminal,
  Cpu,
  Globe,
  Zap,
  Layers: Code2,
};

function Index() {
  const { skills } = usePortfolioStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText("muokianna10@gmail.com");
    setCopiedEmail(true);
    toast.success("Email copied: muokianna10@gmail.com");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleOpenGmail = (customSubject?: string, customBody?: string) => {
    const s = encodeURIComponent(customSubject || "Inquiry from Portfolio");
    const b = encodeURIComponent(
      customBody ||
        "Hi Anna,\n\nI came across your portfolio and wanted to reach out regarding..."
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=muokianna10@gmail.com&su=${s}&body=${b}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const s = encodeURIComponent(
      formState.subject || `Portfolio Inquiry from ${formState.name || "Visitor"}`
    );
    const b = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:muokianna10@gmail.com?subject=${s}&body=${b}`;
    setFormSubmitted(true);
    toast.success("Opening your email client to send to muokianna10@gmail.com!");
  };

  useEffect(() => {
    setIsMounted(true);

    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link
            to="/"
            className="font-display text-xl font-semibold tracking-tight text-foreground"
          >
            Muoki<span className="text-primary">.</span>Anna
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link
                    to={link.href}
                    className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="mx-1 hidden h-4 w-px bg-border/40 sm:block" />

            <div className="hidden sm:flex items-center gap-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-border/40 bg-background/95 px-6 py-4 backdrop-blur-lg md:hidden">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-3 border-t border-border/40 pt-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />

        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-purple-soft/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
            {/* Hero content - Extended across the page */}
            <div className="flex-1 min-w-0">
              <div className="mb-4 flex items-center gap-3.5">
                <img
                  src="/favicon.ico"
                  alt="Muoki Anna Logo"
                  className="h-14 w-14 rounded-2xl border-2 border-primary/30 bg-card p-1.5 shadow-md shadow-primary/10 transition-all duration-300 hover:scale-105 hover:border-primary/50"
                />
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5 text-sm font-medium text-purple-soft">
                  <Sparkles className="h-4 w-4" />
                  <span>Software Developer</span>
                </div>
              </div>

              <h1 className="font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Building elegant solutions with a{" "}
                <span className="text-gradient">creative touch</span>.
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Hi, I’m{" "}
                <span className="font-semibold text-foreground">
                  Muoki Anna
                </span>
                . I build clean, accessible, and performant web and backend
                experiences — from RESTful APIs to polished frontends.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
                >
                  <Code2 className="h-4 w-4" />
                  View Projects
                </Link>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Fast learner</span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>Remote-ready</span>
                </div>

                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span>Open source fan</span>
                </div>
              </div>
            </div>

            {/* Hero visual - Pushed to the right */}
            <div className="flex shrink-0 self-end md:self-start justify-end">
              <div className="group relative w-full max-w-[195px] sm:max-w-[215px] lg:max-w-[235px]">
                {/* Soft decorative ambient glow */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent blur-xl opacity-75 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Polished card container */}
                <div className="relative overflow-hidden rounded-[1.5rem] border border-border/90 bg-card/85 p-3 shadow-xl shadow-primary/5 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-primary/15">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-secondary/40">
                    <img
                      src={heroVisual}
                      alt="Muoki Anna - Software Developer"
                      width={1086}
                      height={1448}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-40" />
                  </div>
                </div>

                {/* Professional availability badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border/80 bg-background/95 px-3 py-1 text-xs font-medium text-foreground shadow-md backdrop-blur-md">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Available for hire
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                About Me
              </h2>

              <p className="mt-4 text-lg text-muted-foreground">
                I’m a software developer focused on modern web development,
                backend engineering, and clean software design. I enjoy
                shipping products that are both technically solid and
                delightful to use.
              </p>

              <p className="mt-3 text-lg text-muted-foreground">
                I love blending technical problem-solving with thoughtful
                design — whether I’m architecting a REST API in Spring Boot,
                wiring up a React frontend, or refining a UI animation.
                Curiosity and attention to detail guide every project I take
                on.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="font-display text-4xl font-bold text-primary">
                  2+
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  Years building software
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="font-display text-4xl font-bold text-primary">
                  20+
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  Projects built
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="font-display text-4xl font-bold text-primary">
                  5+
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  Stacks explored
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="font-display text-4xl font-bold text-primary">
                  ∞
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  Cups of coffee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Skills & Tools
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
              My toolkit is growing every semester. Here are the technologies
              I’m most comfortable with right now.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => {
              const Icon = (skill.iconName && ICON_MAP[skill.iconName]) || Terminal;

              return (
                <div
                  key={skill.title}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-glow hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-border/50 bg-secondary/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {skill.items.length} skills
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {skill.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <div
                        key={item}
                        className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground shadow-2xs transition-all duration-200 hover:border-primary/50 hover:bg-secondary hover:shadow-sm hover:scale-105"
                      >
                        <TechIcon name={item} className="h-4 w-4 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Resume */}
      <section id="resume" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:p-8">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-soft/20 blur-3xl" />

            <div className="relative grid gap-6 md:grid-cols-[auto,1fr] md:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="h-8 w-8" />
              </div>

              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Resume
                </h2>

                <p className="mt-2 text-lg text-muted-foreground">
                  Grab the latest version of my resume for a full overview of
                  my experience, education, and skills.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View in browser
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:p-10 shadow-xl">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-soft/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto max-w-2xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5 text-xs font-medium text-purple-soft">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Get In Touch</span>
                </div>

                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Let’s build something together
                </h2>

                <p className="mt-3 text-lg text-muted-foreground">
                  I’m open to internships, collaborations, and exciting opportunities. Drop me a message below or reach out directly to my email.
                </p>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,1.3fr] lg:gap-10 items-start">
                {/* Direct Contact Channels Card */}
                <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-secondary/30 p-5 sm:p-6 backdrop-blur-xs">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Direct Email & Channels
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Reach me directly at my primary inbox or connect professionally.
                    </p>
                  </div>

                  {/* Email address box with copy button */}
                  <div className="mt-1 rounded-xl border border-border/70 bg-card/80 p-3.5 shadow-2xs">
                    <div className="text-xs font-medium text-muted-foreground">
                      Primary Email
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-semibold text-foreground break-all">
                        muokianna10@gmail.com
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border/80 bg-secondary/80 px-2.5 py-1 text-xs font-medium text-foreground transition-all hover:bg-secondary hover:scale-105 active:scale-95"
                        aria-label="Copy email address"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-emerald-500 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Quick Mail Actions */}
                  <div className="flex flex-col gap-2.5">
                    {/* Open in Gmail Web */}
                    <button
                      type="button"
                      onClick={() => handleOpenGmail()}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Open in Gmail (Web)</span>
                    </button>

                    {/* Default Mail Client */}
                    <a
                      href="mailto:muokianna10@gmail.com?subject=Inquiry%20from%20Portfolio&body=Hi%20Anna,%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out%20regarding..."
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-2xs transition-all hover:bg-secondary hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Send className="h-4 w-4 text-primary" />
                      <span>Open Default Email App</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/in/muoki-anna"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/70 bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-2xs transition-all hover:bg-secondary hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Linkedin className="h-4 w-4 text-primary" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>

                  {/* Response time notice */}
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    <span>Typically responds within 24 hours</span>
                  </div>
                </div>

                {/* Built-in Message Form */}
                <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-7 shadow-sm">
                  <div className="mb-4">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Send a Quick Message
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fill out the form to prepare an email directly to muokianna10@gmail.com.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="rounded-xl border border-primary/30 bg-primary/10 p-5 text-center">
                      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary mb-3">
                        <Check className="h-5 w-5" />
                      </div>
                      <h4 className="font-display font-semibold text-foreground">
                        Email Ready to Send!
                      </h4>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                        Your message has been formatted for <strong>muokianna10@gmail.com</strong>. You can also open it directly in Gmail:
                      </p>
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenGmail(formState.subject, `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-105"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Open in Gmail</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormState({ name: "", email: "", subject: "", message: "" });
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary px-3.5 py-2 text-xs font-medium text-foreground hover:bg-secondary/80"
                        >
                          <span>Send another</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSendMessage} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            placeholder="Anna Muoki"
                            className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1.5">
                            Your Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          placeholder="Project Inquiry / Internship / Hello"
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          placeholder="Hi Anna, I'd like to collaborate on..."
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                          type="submit"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!formState.name || !formState.message) {
                              toast.error("Please enter your name and message first");
                              return;
                            }
                            handleOpenGmail(
                              formState.subject || `Inquiry from ${formState.name}`,
                              `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
                            );
                          }}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-secondary/60 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                        >
                          <Mail className="h-4 w-4 text-primary" />
                          <span>via Gmail</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-secondary/60 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-6 py-7">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Muoki Anna. Built with ❤️.
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/projects" className="transition-colors hover:text-foreground">
              Projects
            </Link>
            <Link to="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-xs opacity-60 transition-opacity hover:opacity-100 hover:text-primary"
              title="Admin Portal"
            >
              <Lock className="h-3 w-3" />
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}