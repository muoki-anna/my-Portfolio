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
} from "lucide-react";

import heroVisual from "@/assets/hero-binary-green.jpg";
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
    href: "mailto:muokianna10@gmail.com",
    label: "Email",
  },
];

const skills = [
  {
    title: "Frontend",
    icon: Palette,
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    title: "Backend",
    icon: Database,
    items: [
      "Node.js",
      "Python",
      "Java",
      "Kotlin",
      "PostgreSQL",
      "PHP",
      "REST APIs",
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    items: ["Git", "GitHub", "VS Code", "Android Studio", "Figma"],
  },
  {
    title: "Core CS",
    icon: Cpu,
    items: ["Data Structures", "Algorithms", "OOP", "System Design"],
  },
];

function Index() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
          {/* Hero content */}
          <div className="order-2 lg:order-1">
            <div className="mb-4 flex">
              <img
                src="/favicon.ico"
                alt="Muoki Anna Logo"
                className="h-24 w-24 rounded-2xl border-2 border-primary/20 bg-secondary/50 p-2 shadow-lg shadow-primary/5 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-primary/20"
              />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5 text-sm font-medium text-purple-soft">
              <Sparkles className="h-4 w-4" />
              <span>Software Developer</span>
            </div>

            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
              Building elegant solutions with a{" "}
              <span className="text-gradient">creative touch</span>.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
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

          {/* Hero visual */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-square max-w-md lg:max-w-none">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/30 to-purple-soft/20 blur-2xl" />

              <img
                src={heroVisual}
                alt="Abstract digital tech background with glowing matrix green binary codes and circuit patterns"
                width={1024}
                height={1024}
                className="relative h-full w-full rounded-[2rem] object-cover glow-green"
              />
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
              const Icon = skill.icon;

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
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:p-8">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-soft/20 blur-3xl" />

            <div className="relative text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Let’s build something together
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
                I’m open to internships, collaborations, and exciting
                opportunities. Drop me a message and let’s chat.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:muokianna10@gmail.com"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 sm:w-auto"
                >
                  <Send className="h-4 w-4" />
                  Send an email
                </a>

                <a
                  href="https://linkedin.com/in/muoki-anna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:w-auto"
                >
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </div>

              <div className="mt-8 flex justify-center gap-3">
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
          </div>
        </div>
      </footer>
    </div>
  );
}