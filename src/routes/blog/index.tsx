import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { usePortfolioStore } from "@/lib/portfolio-store";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog | Muoki Anna" },
      {
        name: "description",
        content:
          "Tech blog by Muoki Anna — beginner-friendly guides, tutorials, and lessons from my journey as a software developer.",
      },
      { property: "og:title", content: "Blog | Muoki Anna" },
      {
        property: "og:description",
        content:
          "Beginner-friendly tech guides, tutorials, and lessons from my journey as a software developer.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogIndex,
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

function BlogIndex() {
  const { blogs } = usePortfolioStore();
  const posts = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="text-sm font-medium text-foreground transition-colors"
              >
                Blog
              </Link>
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

        {/* Mobile menu dropdown */}
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
                  className="block py-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-sm font-semibold text-primary"
                >
                  Blog
                </Link>
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

      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 pb-10 pt-28 sm:pt-32 md:pb-14 md:pt-36">
        <div className="hidden dark:block absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="hidden dark:block absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
        <div className="hidden dark:block absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-purple-soft/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/60 px-4 py-1.5 text-sm font-medium text-purple-soft">
            <BookOpen className="h-4 w-4" />
            <span>Tech for Beginners</span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Lessons from my{" "}
            <span className="text-gradient">learning journey</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Real talk about starting out in tech — the wins, the struggles, and
            everything I wish someone had told me. Written for beginners, by
            someone who still remembers being one.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-6">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Gradient cover */}
                <div
                  className={`relative h-48 overflow-hidden bg-gradient-to-br ${post.coverGradient} md:h-56`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <Sparkles className="h-16 w-16 text-foreground/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-purple-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="mt-3 font-display text-xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-2xl">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground md:text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readingTime}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state - shown when no posts */}
          {posts.length === 0 && (
            <div className="py-20 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <h3 className="mt-4 font-display text-xl font-semibold">
                No posts yet
              </h3>
              <p className="mt-2 text-muted-foreground">
                Stay tuned — new content is coming soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:p-8">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple-soft/20 blur-3xl" />

            <div className="relative text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Want more beginner-friendly content?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Follow me on socials to stay updated with new posts, tutorials,
                and tips for your tech journey.
              </p>
              <div className="mt-6 flex justify-center gap-3">
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
            © {new Date().getFullYear()} Muoki Anna.
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link to="/projects" className="transition-colors hover:text-foreground">
              Projects
            </Link>
            <Link to="/blog" className="font-semibold text-foreground">
              Blog
            </Link>
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
