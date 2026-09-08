import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  Code2,
  FolderGit2,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Terminal,
  Server,
  Layout,
  Menu,
  X,
} from "lucide-react";
import { projectsData, type Project } from "@/lib/projects-data";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TechIcon } from "@/components/TechIcon";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects | Muoki Anna" },
      {
        name: "description",
        content:
          "Explore software projects built by Muoki Anna — featuring backend systems, RESTful APIs, and full-stack web applications.",
      },
      { property: "og:title", content: "Projects | Muoki Anna" },
      {
        property: "og:description",
        content:
          "Explore software projects built by Muoki Anna — featuring backend systems, RESTful APIs, and full-stack web applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

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

type CategoryFilter = "All" | "Backend" | "Full Stack";

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  const categories: { label: CategoryFilter; icon: typeof Code2; count: number }[] = [
    { label: "All", icon: Layers, count: projectsData.length },
    {
      label: "Backend",
      icon: Server,
      count: projectsData.filter((p) => p.category === "Backend").length,
    },
    {
      label: "Full Stack",
      icon: Layout,
      count: projectsData.filter((p) => p.category === "Full Stack").length,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link
            to="/"
            className="font-display text-xl font-semibold tracking-tight text-foreground"
          >
            Muoki<span className="text-primary">.</span>Anna
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-7 md:flex">
            <li>
              <Link
                to="/"
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="text-sm font-bold text-primary transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
              >
                Blog
              </Link>
            </li>
            <li>
              <a
                href="/#resume"
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
              >
                Resume
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </a>
            </li>
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
              <li>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-sm font-semibold text-primary"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="/#resume"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Contact
                </a>
              </li>
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

      <main className="px-6 pb-20 pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <a
              href="https://github.com/Muoki-Anna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Github className="h-3.5 w-3.5" />
              github.com/Muoki-Anna
            </a>
          </div>

          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 md:p-12">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-soft/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-3.5 py-1 text-xs font-medium text-purple-soft">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Featured Engineering Work</span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Projects &{" "}
                <span className="text-gradient">Architectures</span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                A showcase of production-ready REST backends, full-stack web
                applications, and developer tooling. Built with clean code, modern
                patterns, and a focus on performance.
              </p>

              {/* Filter Tabs */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeFilter === cat.label;
                  return (
                    <button
                      key={cat.label}
                      type="button"
                      onClick={() => setActiveFilter(cat.label)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                          : "border border-border/60 bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{cat.label}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                          isActive
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="mt-12 space-y-10">
            {filteredProjects.map((project: Project, index: number) => (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-glow hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  {/* Visual Preview */}
                  <div className="relative aspect-video overflow-hidden border-b border-border/40 bg-secondary/30 lg:col-span-5 lg:aspect-auto lg:h-full lg:border-b-0 lg:border-r">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      width={1680}
                      height={720}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 lg:p-6"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/30 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col p-6 sm:p-8 lg:col-span-7 lg:py-8 lg:pr-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {project.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {project.year}
                        </span>
                      </div>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/60 px-3.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>Source Code</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-purple-soft">
                      {project.tagline}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-4">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Key Architecture & Highlights
                      </h3>
                      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                        {project.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground shadow-2xs transition-all hover:border-primary/40 hover:bg-secondary"
                        >
                          <TechIcon name={tag} className="h-3.5 w-3.5 shrink-0" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-transform hover:scale-105"
                      >
                        <FolderGit2 className="h-4 w-4" />
                        Explore Repository
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Application
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* GitHub CTA Banner */}
          <div className="mt-16 rounded-3xl border border-border/60 bg-gradient-to-br from-card to-secondary/30 p-8 text-center md:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Terminal className="h-7 w-7" />
            </div>

            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl">
              More Projects on GitHub
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              I’m constantly experimenting with new frameworks, backend designs,
              and open-source utilities. Check out my GitHub repositories for more code.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/Muoki-Anna"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105"
              >
                <Github className="h-4 w-4" />
                Visit github.com/Muoki-Anna
              </a>

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 px-6 py-7">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Muoki Anna. Built with ❤️.
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link to="/projects" className="text-foreground font-semibold">
              Projects
            </Link>
            <Link to="/blog" className="hover:text-foreground">
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
