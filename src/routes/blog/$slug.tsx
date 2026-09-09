import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  ChevronUp,
  Menu,
  X,
  Lock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getBlogPost, getAllBlogPosts, type BlogPost as BlogPostType } from "@/lib/blog-data";
import { usePortfolioStore } from "@/lib/portfolio-store";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    return {
      meta: post
        ? [
            { title: `${post.title} | Muoki Anna` },
            { name: "description", content: post.excerpt },
            { property: "og:title", content: post.title },
            { property: "og:description", content: post.excerpt },
            { property: "og:type", content: "article" },
            { name: "twitter:card", content: "summary_large_image" },
          ]
        : [{ title: "Blog | Muoki Anna" }],
    };
  },
  component: BlogPost,
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    return { post, slug: params.slug };
  },
});

const socialLinks = [
  { icon: Github, href: "https://github.com/Muoki-Anna", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/muoki-anna",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:muokianna10@gmail.com", label: "Email" },
];

/* ------------------------------------------------------------------ */
/*  Simple Markdown-to-JSX renderer                                   */
/* ------------------------------------------------------------------ */

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} className="my-6">
          {lang && (
            <div className="rounded-t-lg border border-b-0 border-border/60 bg-secondary/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {lang}
            </div>
          )}
          <pre
            className={`overflow-x-auto ${lang ? "rounded-b-lg rounded-t-none" : "rounded-lg"} border border-border/60 bg-secondary/40 p-4`}
          >
            <code className="text-sm leading-relaxed text-foreground/90">
              {codeLines.join("\n")}
            </code>
          </pre>
        </div>
      );
      continue;
    }

    // Tables
    if (line.includes("|") && i + 1 < lines.length && lines[i + 1]?.match(/^\|[\s-:|]+\|$/)) {
      const headerCells = line
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      i += 2; // skip header and separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(
          lines[i]
            .split("|")
            .filter((c) => c.trim())
            .map((c) => c.trim())
        );
        i++;
      }
      elements.push(
        <div key={key++} className="my-6 overflow-x-auto">
          <table className="w-full border-collapse rounded-lg border border-border/60 text-sm">
            <thead>
              <tr className="bg-secondary/60">
                {headerCells.map((cell, ci) => (
                  <th
                    key={ci}
                    className="border border-border/40 px-4 py-2.5 text-left font-semibold text-foreground"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="transition-colors hover:bg-secondary/30"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border border-border/40 px-4 py-2.5 text-muted-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal rules
    if (line.trim() === "---") {
      elements.push(
        <hr
          key={key++}
          className="my-8 border-t border-border/40"
        />
      );
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h4
          key={key++}
          className="mb-3 mt-8 font-display text-lg font-bold tracking-tight text-foreground"
        >
          {renderInline(line.slice(4))}
        </h4>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h3
          key={key++}
          className="mb-4 mt-10 font-display text-2xl font-bold tracking-tight text-foreground"
        >
          {renderInline(line.slice(3))}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquotes
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={key++}
          className="my-6 border-l-4 border-primary/40 bg-primary/5 py-3 pl-5 pr-4 text-muted-foreground italic"
        >
          {quoteLines.map((ql, qi) => (
            <p key={qi}>{renderInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Ordered lists
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol
          key={key++}
          className="my-4 list-decimal space-y-2 pl-6 text-muted-foreground"
        >
          {listItems.map((item, li) => (
            <li key={li} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered lists
    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul
          key={key++}
          className="my-4 list-disc space-y-2 pl-6 text-muted-foreground"
        >
          {listItems.map((item, li) => (
            <li key={li} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Paragraphs
    elements.push(
      <p
        key={key++}
        className="my-4 leading-relaxed text-muted-foreground"
      >
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

/** Render inline markdown: bold, italic, code, links, emoji */
function renderInline(text: string): React.ReactNode {
  // Split by different inline patterns
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let inlineKey = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Italic
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Link
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    // Find earliest match
    const matches = [
      boldMatch ? { type: "bold", match: boldMatch } : null,
      italicMatch ? { type: "italic", match: italicMatch } : null,
      codeMatch ? { type: "code", match: codeMatch } : null,
      linkMatch ? { type: "link", match: linkMatch } : null,
    ]
      .filter(Boolean)
      .sort((a, b) => (a!.match.index ?? 0) - (b!.match.index ?? 0));

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const earliest = matches[0]!;
    const idx = earliest.match.index ?? 0;

    // Text before match
    if (idx > 0) {
      parts.push(remaining.slice(0, idx));
    }

    switch (earliest.type) {
      case "bold":
        parts.push(
          <strong key={inlineKey++} className="font-semibold text-foreground">
            {earliest.match[1]}
          </strong>
        );
        remaining = remaining.slice(idx + earliest.match[0].length);
        break;
      case "italic":
        parts.push(
          <em key={inlineKey++}>{earliest.match[1]}</em>
        );
        remaining = remaining.slice(idx + earliest.match[0].length);
        break;
      case "code":
        parts.push(
          <code
            key={inlineKey++}
            className="rounded bg-secondary/80 px-1.5 py-0.5 font-mono text-[0.85em] text-purple-soft"
          >
            {earliest.match[1]}
          </code>
        );
        remaining = remaining.slice(idx + earliest.match[0].length);
        break;
      case "link":
        parts.push(
          <a
            key={inlineKey++}
            href={earliest.match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-purple-soft hover:decoration-purple-soft/50"
          >
            {earliest.match[1]}
          </a>
        );
        remaining = remaining.slice(idx + earliest.match[0].length);
        break;
    }
  }

  return parts.length === 1 ? parts[0] : parts;
}

/* ------------------------------------------------------------------ */
/*  Blog Post Page                                                     */
/* ------------------------------------------------------------------ */

function BlogPost() {
  const loaderData = Route.useLoaderData() as { post?: BlogPostType; slug: string };
  const { blogs } = usePortfolioStore();
  const post = blogs.find((b) => b.slug === loaderData.slug) || loaderData.post;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowScrollTop(scrollTop > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Post Not Found</h1>
        <p className="mt-3 text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" /> Back to All Articles
        </Link>
      </div>
    );
  }

  // Get related posts
  const allPosts = blogs.length > 0 ? blogs : getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Reading progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5">
        <div
          className="h-full bg-gradient-to-r from-primary to-purple-soft transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

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
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
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

      {/* Article Header */}
      <section className="relative overflow-hidden px-6 pb-8 pt-24 md:pb-10 md:pt-28">
        <div className="absolute inset-0 bg-gradient-radial opacity-30" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            to="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>

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
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-medium text-foreground">Muoki Anna</span>
            </div>
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
        </div>
      </section>

      {/* Article Content */}
      <article className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl text-base md:text-[1.0625rem]">
          {renderMarkdown(post.content)}
        </div>
      </article>

      {/* Share / Author card */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">
                  Written by Muoki Anna
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Software developer sharing lessons from the journey. If this
                  helped you, share it with someone who's just starting out!
                </p>
                <div className="mt-3 flex justify-center gap-2 sm:justify-start">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-secondary/60 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 pb-16 md:pb-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">
              Keep reading
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to="/blog/$slug"
                  params={{ slug: related.slug }}
                  className="group rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {related.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 px-2 py-0.5 text-[0.65rem] font-medium text-purple-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold transition-colors group-hover:text-primary">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border/40 px-6 py-7">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Muoki Anna. Built with care.
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link to="/projects" className="transition-colors hover:text-foreground">
              Projects
            </Link>
            <Link to="/blog" className="transition-colors hover:text-foreground">
              All Posts
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

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/90 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:border-primary/40 hover:text-primary"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
