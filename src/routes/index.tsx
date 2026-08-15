import { useState, useEffect } from "react";
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
} from "lucide-react";

import heroVisual from "@/assets/tech-hero-visual.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import projectMedicore from "@/assets/project-medicore.png";
import projectPulse254 from "@/assets/project-pulse254.png";
import projectGrowthspire from "@/assets/project-growthspire.png";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muoki Anna | Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Muoki Anna — software developer building elegant, performant web and backend experiences.",
      },
      { property: "og:title", content: "Muoki Anna | Software Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Muoki Anna — software developer building elegant, performant web and backend experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Muoki-Anna", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/muoki-anna", label: "LinkedIn" },
  { icon: Mail, href: "mailto:muokianna10@gmail.com", label: "Email" },
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
    items: ["Node.js", "Python","Java","Kotlin", "PostgreSQL", "PHP", "REST APIs"],
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    items: ["Git","GitHub", "VS Code", "Android Studio", "Figma"],
  },
  {
    title: "Core CS",
    icon: Cpu,
    items: ["Data Structures", "Algorithms", "OOP", "System Design"],
  },
];

const projects = [
  {
    title: "MediCore API",
    description:
      "A secure, RESTful clinical backend built with Java 17 and Spring Boot 3 — JPA persistence, JWT auth, and real-time telemetry for managing patients, staff, and records.",
    tags: ["Java", "Spring Boot", "JWT", "REST"],
    image: projectMedicore,
    link: "https://github.com/Muoki-Anna/medical-api",
  },
  
    
  {
    title: "Pulse254",
    description:
      "A community-driven web app for Kenya — surfacing local pulse, updates, and stories with a modern TypeScript stack.",
    tags: ["TypeScript", "React", "Web"],
    image: projectPulse254,
    link: "https://github.com/Muoki-Anna/Pulse254",
  },
  {
    title: "GrowthSpire Backend",
    description:
      "A PHP-powered backend service for a growth and productivity platform — clean routing, data models, and API endpoints.",
    tags: ["PHP", "API", "Backend"],
    image: projectGrowthspire,
    link: "https://github.com/Muoki-Anna/GrowthSpire-Backend",
  },
  
];

function Index() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="font-display text-xl font-semibold tracking-tight text-foreground"
          >
            Muoki<span className="text-primary">.</span>Anna
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="h-4 w-px bg-border/40" />
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-purple-soft/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="mb-5 flex">
              <img
                src="/favicon.ico"
                alt="Muoki Anna Logo"
                className="h-28 w-28 rounded-2xl border-2 border-primary/20 bg-secondary/50 p-2 shadow-lg shadow-primary/5 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-lg"
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5 text-sm font-medium text-purple-soft">
              <Sparkles className="h-4 w-4" />
              <span>Software Developer</span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              Building elegant solutions with a{" "}
              <span className="text-gradient">creative touch</span>.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Hi, I’m <span className="font-semibold text-foreground">Muoki Anna</span>. I build
              clean, accessible, and performant web and backend experiences — from RESTful APIs to
              polished frontends.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
              >
                <Code2 className="h-4 w-4" />
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
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

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-square max-w-md lg:max-w-none">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/30 to-purple-soft/20 blur-2xl" />
              <img
                src={heroVisual}
                alt="Abstract digital tech background with glowing purple and blue code lines and circuit patterns"
                width={1024}
                height={1024}
                className="relative h-full w-full rounded-[2rem] object-cover glow-purple"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                About Me
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                I’m a software developer focused on modern web development, backend engineering, and
                clean software design. I enjoy shipping products that are both technically solid and
                delightful to use.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                I love blending technical problem-solving with thoughtful design — whether I’m
                architecting a REST API in Spring Boot, wiring up a React frontend, or refining a UI
                animation. Curiosity and attention to detail guide every project I take on.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <div className="font-display text-4xl font-bold text-primary">2+</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  Years building software
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <div className="font-display text-4xl font-bold text-primary">20+</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">Projects built</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <div className="font-display text-4xl font-bold text-primary">5+</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  Stacks explored
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <div className="font-display text-4xl font-bold text-primary">∞</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">Cups of coffee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Skills & Tools
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              My toolkit is growing every semester. Here are the technologies I’m most comfortable
              with right now.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-glow hover:bg-card/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <skill.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{skill.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Featured Projects
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                A selection of projects that showcase my development, design, and problem-solving
                skills.
              </p>
            </div>
            <a
              href="https://github.com/Muoki-Anna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Github className="h-4 w-4" />
              More on GitHub
            </a>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-glow hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="relative aspect-video overflow-hidden bg-secondary/30 border-b border-border/40">
                  <img
                    src={project.image}
                    alt={`${project.title} project thumbnail`}
                    width={1680}
                    height={720}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/10 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} project`}
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-purple-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Resume */}
      <section id="resume" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 md:p-12">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-soft/20 blur-3xl" />

            <div className="relative grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="h-10 w-10" />
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Resume
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  Grab the latest version of my resume for a full overview of my experience,
                  education, and skills.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
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
      <section id="contact" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 md:p-12">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-soft/20 blur-3xl" />

            <div className="relative text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Let’s build something together
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                I’m open to internships, collaborations, and exciting opportunities. Drop me a
                message and let’s chat.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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

              <div className="mt-10 flex justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-secondary/60 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Muoki Anna. Built with care.
          </p>
          <p className="text-sm text-muted-foreground">
            {!isMounted || isDark ? "Designed in the dark" : "Enjoyed in the light"}, powered by{" "}
            <span className="text-purple-soft">ANNA </span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
