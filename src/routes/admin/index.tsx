import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Lock,
  Unlock,
  Shield,
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Cpu,
  Settings,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Eye,
  Save,
  X,
  Upload,
  Check,
  Copy,
  LogOut,
  ArrowUpRight,
  Code2,
  RefreshCw,
  Download,
  FileText,
  KeyRound,
  AlertTriangle,
} from "lucide-react";
import {
  usePortfolioStore,
  fileToBase64,
  type SkillCategory,
} from "@/lib/portfolio-store";
import { type Project } from "@/lib/projects-data";
import { type BlogPost } from "@/lib/blog-data";
import { TechIcon } from "@/components/TechIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Portal | Muoki Anna" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type TabType = "overview" | "projects" | "blogs" | "skills" | "sync";

function AdminPage() {
  const {
    projects,
    blogs,
    skills,
    isAuthenticated,
    login,
    logout,
    updatePassword,
    saveProject,
    deleteProject,
    saveBlog,
    deleteBlog,
    saveSkillCategory,
    deleteSkillCategory,
    addSkillToCategory,
    removeSkillFromCategory,
    resetToDefaults,
    adminEmail,
  } = usePortfolioStore();

  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Login form state
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Project Editor state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Blog Editor state
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [originalBlogSlug, setOriginalBlogSlug] = useState<string>("");
  const [isNewBlog, setIsNewBlog] = useState(false);
  const [blogPreviewMode, setBlogPreviewMode] = useState<"edit" | "preview" | "split">("split");

  // Skill Category state
  const [newCatTitle, setNewCatTitle] = useState("");
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});

  // Settings state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [copiedCodeTab, setCopiedCodeTab] = useState<string | null>(null);

  // Stats calculation
  const totalSkills = useMemo(() => {
    return skills.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [skills]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = login(loginPassword);
    if (success) {
      toast.success("Welcome back, Anna!");
      setLoginPassword("");
    } else {
      setLoginError("Incorrect passcode. Please try again.");
      toast.error("Invalid passcode");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    logout();
    toast.info("Logged out from admin portal");
  };

  // Project Actions
  const handleOpenNewProject = () => {
    const newP: Project = {
      id: "project-" + Date.now(),
      title: "",
      tagline: "",
      description: "",
      category: "Full Stack",
      tags: [],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      githubUrl: "https://github.com/Muoki-Anna/",
      liveUrl: "",
      features: [""],
      year: new Date().getFullYear().toString(),
    };
    setEditingProject(newP);
    setIsNewProject(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title.trim()) {
      toast.error("Project title is required");
      return;
    }
    saveProject({
      ...editingProject,
      tags: editingProject.tags.filter((t) => t.trim().length > 0),
      features: editingProject.features.filter((f) => f.trim().length > 0),
    });
    toast.success(isNewProject ? "Project created successfully!" : "Project updated!");
    setEditingProject(null);
  };

  const handleProjectImageUpload = async (file: File) => {
    try {
      const base64 = await fileToBase64(file);
      if (editingProject) {
        setEditingProject({ ...editingProject, image: base64 });
        toast.success("Image uploaded successfully!");
      }
    } catch {
      toast.error("Failed to process image file");
    }
  };

  // Blog Actions
  const handleOpenNewBlog = () => {
    const newB: BlogPost = {
      slug: "new-article-" + Date.now(),
      title: "",
      excerpt: "",
      date: new Date().toISOString().split("T")[0],
      readingTime: "5 min read",
      tags: ["Tech", "Tutorial"],
      coverGradient: "from-primary/40 via-purple-soft/30 to-accent/20",
      content: `## Introduction\n\nWrite your thoughts here using markdown...\n\n### Key Takeaways\n- Point 1\n- Point 2\n\n\`\`\`javascript\nconsole.log("Hello from code!");\n\`\`\`\n`,
    };
    setEditingBlog(newB);
    setOriginalBlogSlug("");
    setIsNewBlog(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !editingBlog.title.trim()) {
      toast.error("Blog title is required");
      return;
    }
    const cleanSlug = editingBlog.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    saveBlog({ ...editingBlog, slug: cleanSlug }, originalBlogSlug || undefined);
    toast.success(isNewBlog ? "Blog article published!" : "Blog article updated!");
    setEditingBlog(null);
  };

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Skill Actions
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatTitle.trim()) return;
    const newCat: SkillCategory = {
      id: "cat-" + Date.now(),
      title: newCatTitle.trim(),
      iconName: "Palette",
      items: [],
    };
    saveSkillCategory(newCat);
    setNewCatTitle("");
    toast.success(`Category "${newCat.title}" created!`);
  };

  // Password update
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    updatePassword(newPassword);
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Admin password changed successfully!");
  };

  // Export JSON Backup
  const handleDownloadBackup = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      projects,
      blogs,
      skills,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `muoki-portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded!");
  };

  // Copy code to clipboard
  const handleCopyCodeSnippet = (type: "projects" | "blogs" | "skills") => {
    let code = "";
    if (type === "projects") {
      code = `export const projectsData: Project[] = ${JSON.stringify(projects, null, 2)};`;
    } else if (type === "blogs") {
      code = `export const blogPosts: BlogPost[] = ${JSON.stringify(blogs, null, 2)};`;
    } else {
      code = `export const defaultSkillsData = ${JSON.stringify(skills, null, 2)};`;
    }
    navigator.clipboard.writeText(code);
    setCopiedCodeTab(type);
    toast.success(`Copied updated ${type} TypeScript code to clipboard!`);
    setTimeout(() => setCopiedCodeTab(null), 3000);
  };

  // ==========================================
  // VIEW: LOGIN SCREEN (if not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <div className="relative w-full max-w-md">
          <div className="hidden dark:block absolute -left-12 -top-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="hidden dark:block absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-purple-soft/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-7 shadow-2xl backdrop-blur-md">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-foreground">
                    Admin Portal
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Muoki Anna Portfolio Management
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  disabled
                  value={adminEmail}
                  className="w-full rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    autoFocus
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter admin passcode"
                    className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="pointer-events-none absolute right-3.5 top-3 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>
                {loginError && (
                  <p className="mt-1.5 text-xs text-destructive font-medium">
                    {loginError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Unlock className="h-4 w-4" />
                <span>Sign in to Dashboard</span>
              </button>

              <div className="pt-2 text-center">
                <Link
                  to="/"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <span>Return to public portfolio</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-foreground">
                  Muoki Anna
                </span>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Portfolio Command Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <span>View Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <ThemeToggle />

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-6 border-t border-border/30">
          <div className="flex items-center gap-1 py-2">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "projects", label: `Projects (${projects.length})`, icon: FolderGit2 },
              { id: "blogs", label: `Blogs (${blogs.length})`, icon: BookOpen },
              { id: "skills", label: `Skills (${totalSkills})`, icon: Cpu },
              { id: "sync", label: "Sync & Export", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* ======================================= */}
        {/* TAB: OVERVIEW */}
        {/* ======================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Welcome, Anna 👋
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage all content across your portfolio in real time. Changes take effect immediately.
              </p>
            </div>

            {/* Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div
                onClick={() => setActiveTab("projects")}
                className="cursor-pointer rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FolderGit2 className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-primary">Manage →</span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {projects.length}
                  </span>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    Portfolio Projects
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("blogs")}
                className="cursor-pointer rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-soft/10 text-purple-soft">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-purple-soft">Write →</span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {blogs.length}
                  </span>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    Published Blog Posts
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("skills")}
                className="cursor-pointer rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-500">Edit →</span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {totalSkills}
                  </span>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    Technologies in {skills.length} Categories
                  </p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab("sync")}
                className="cursor-pointer rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Download className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-accent">Export →</span>
                </div>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-foreground">
                    Sync
                  </span>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    Download Code / Backup
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="rounded-2xl border border-border/60 bg-secondary/30 p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Quick Actions
              </h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Rapidly create new content for your portfolio:
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("projects");
                    handleOpenNewProject();
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-105 transition-transform"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Project</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("blogs");
                    handleOpenNewBlog();
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-4 py-2.5 text-xs font-semibold text-foreground shadow-2xs hover:bg-secondary transition-colors"
                >
                  <Edit3 className="h-4 w-4 text-purple-soft" />
                  <span>Write Blog Article</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("skills")}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-4 py-2.5 text-xs font-semibold text-foreground shadow-2xs hover:bg-secondary transition-colors"
                >
                  <Plus className="h-4 w-4 text-emerald-500" />
                  <span>Add Tech Skill</span>
                </button>
              </div>
            </div>

            {/* Recent Items Preview */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground">
                    Featured Projects
                  </h3>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="text-xs text-primary font-medium hover:underline"
                  >
                    View all ({projects.length})
                  </button>
                </div>
                <div className="space-y-3">
                  {projects.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-11 w-11 rounded-lg object-cover bg-secondary"
                        />
                        <div>
                          <div className="font-semibold text-sm text-foreground">
                            {p.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {p.category} • {p.year}
                          </div>
                        </div>
                      </div>
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {p.tags.length} tags
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-foreground">
                    Recent Blog Posts
                  </h3>
                  <button
                    onClick={() => setActiveTab("blogs")}
                    className="text-xs text-purple-soft font-medium hover:underline"
                  >
                    View all ({blogs.length})
                  </button>
                </div>
                <div className="space-y-3">
                  {blogs.slice(0, 3).map((b) => (
                    <div
                      key={b.slug}
                      className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 p-3"
                    >
                      <div className="min-w-0 flex-1 pr-3">
                        <div className="font-semibold text-sm text-foreground truncate">
                          {b.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {b.date} • {b.readingTime}
                        </div>
                      </div>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: b.slug }}
                        target="_blank"
                        className="shrink-0 p-1.5 text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* TAB: PROJECTS MANAGER */}
        {/* ======================================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Projects Manager
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add, edit, or delete projects featured on your portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenNewProject}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:scale-105 transition-transform self-start"
              >
                <Plus className="h-4 w-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:border-primary/50"
                >
                  <div className="relative aspect-video overflow-hidden bg-secondary/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="rounded-full bg-background/90 px-2.5 py-0.5 text-[11px] font-semibold text-foreground backdrop-blur-md shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-base font-bold text-foreground">
                          {project.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {project.tagline}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {project.year}
                      </span>
                    </div>

                    <p className="mt-3 flex-1 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border/60 bg-secondary/60 px-2 py-0.5 text-[11px] font-medium text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="rounded-md bg-secondary/40 px-2 py-0.5 text-[11px] text-muted-foreground">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            title="GitHub"
                          >
                            <FolderGit2 className="h-4 w-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                            title="Live Demo"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject({ ...project });
                            setIsNewProject(false);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete "${project.title}"?`)) {
                              deleteProject(project.id);
                              toast.success("Project deleted");
                            }
                          }}
                          className="inline-flex items-center rounded-lg border border-destructive/30 bg-destructive/10 p-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          title="Delete Project"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit / Create Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm overflow-y-auto">
                <div className="relative w-full max-w-2xl rounded-3xl border border-border/80 bg-card p-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-5">
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {isNewProject ? "Create New Project" : `Edit Project: ${editingProject.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, title: e.target.value })
                          }
                          placeholder="e.g. MediCore API"
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={editingProject.tagline}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, tagline: e.target.value })
                          }
                          placeholder="e.g. Clinical Management Backend"
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Category
                        </label>
                        <select
                          value={editingProject.category}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              category: e.target.value as Project["category"],
                            })
                          }
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        >
                          <option value="Backend">Backend</option>
                          <option value="Full Stack">Full Stack</option>
                          <option value="All">Other / General</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Year
                        </label>
                        <input
                          type="text"
                          value={editingProject.year}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, year: e.target.value })
                          }
                          placeholder="2026"
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Image Section */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Project Image
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <input
                          type="text"
                          value={editingProject.image}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, image: e.target.value })
                          }
                          placeholder="Image URL or upload below"
                          className="flex-1 w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                        <label className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border/80 bg-secondary px-3.5 py-2 text-xs font-semibold text-foreground cursor-pointer hover:bg-secondary/80">
                          <Upload className="h-3.5 w-3.5" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleProjectImageUpload(file);
                            }}
                          />
                        </label>
                      </div>
                      {editingProject.image && (
                        <div className="mt-2 h-24 w-40 rounded-xl overflow-hidden border border-border/60">
                          <img
                            src={editingProject.image}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={editingProject.description}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, description: e.target.value })
                        }
                        placeholder="Detailed overview of what the project accomplishes..."
                        className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1.5">
                        Tech Stack Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingProject.tags.join(", ")}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            tags: e.target.value.split(",").map((s) => s.trim()),
                          })
                        }
                        placeholder="e.g. Java 17, Spring Boot, PostgreSQL, Docker"
                        className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                      />
                    </div>

                    {/* Links */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          GitHub Repository URL
                        </label>
                        <input
                          type="url"
                          value={editingProject.githubUrl}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, githubUrl: e.target.value })
                          }
                          placeholder="https://github.com/..."
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Live Demo URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={editingProject.liveUrl || ""}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, liveUrl: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Features List */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-medium text-foreground">
                          Key Features (Bullet points)
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setEditingProject({
                              ...editingProject,
                              features: [...editingProject.features, ""],
                            })
                          }
                          className="text-xs text-primary font-semibold hover:underline"
                        >
                          + Add bullet
                        </button>
                      </div>
                      <div className="space-y-2">
                        {editingProject.features.map((feat, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => {
                                const copy = [...editingProject.features];
                                copy[idx] = e.target.value;
                                setEditingProject({ ...editingProject, features: copy });
                              }}
                              placeholder={`Feature point #${idx + 1}`}
                              className="flex-1 rounded-xl border border-border/80 bg-secondary/40 px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
                            />
                            {editingProject.features.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = editingProject.features.filter((_, i) => i !== idx);
                                  setEditingProject({ ...editingProject, features: copy });
                                }}
                                className="rounded-lg p-1.5 text-destructive hover:bg-destructive/10"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="rounded-xl border border-border/80 px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md hover:scale-105 transition-transform"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Project</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* TAB: BLOGS MANAGER & WRITER */}
        {/* ======================================= */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Blog Writer & Manager
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Draft, publish, and format tutorials and developer notes.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenNewBlog}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:scale-105 transition-transform self-start"
              >
                <Plus className="h-4 w-4" />
                <span>Write Article</span>
              </button>
            </div>

            {/* Articles List */}
            <div className="space-y-4">
              {blogs.map((post) => (
                <div
                  key={post.slug}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:border-primary/50"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-bold text-foreground truncate">
                        {post.title}
                      </h3>
                      <span className="rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] text-muted-foreground font-mono">
                        /{post.slug}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                      <span>•</span>
                      <div className="flex gap-1">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-border/50 bg-secondary/40 px-1.5 py-0.5 text-[10px] text-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      target="_blank"
                      className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-secondary/40 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingBlog({ ...post });
                        setOriginalBlogSlug(post.slug);
                        setIsNewBlog(false);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-secondary/40 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete "${post.title}"?`)) {
                          deleteBlog(post.slug);
                          toast.success("Blog deleted");
                        }
                      }}
                      className="rounded-lg border border-destructive/30 bg-destructive/10 p-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Blog Post Editor Modal */}
            {editingBlog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm overflow-y-auto">
                <div className="relative w-full max-w-5xl rounded-3xl border border-border/80 bg-card p-6 shadow-2xl my-6 max-h-[92vh] flex flex-col">
                  <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {isNewBlog ? "Write New Blog Post" : `Editing: ${editingBlog.title}`}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Supports standard GitHub-flavored Markdown
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex rounded-lg border border-border/70 bg-secondary/40 p-0.5 text-xs">
                        <button
                          type="button"
                          onClick={() => setBlogPreviewMode("edit")}
                          className={`rounded-md px-2.5 py-1 font-medium ${
                            blogPreviewMode === "edit" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
                          }`}
                        >
                          Code
                        </button>
                        <button
                          type="button"
                          onClick={() => setBlogPreviewMode("split")}
                          className={`rounded-md px-2.5 py-1 font-medium ${
                            blogPreviewMode === "split" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
                          }`}
                        >
                          Split
                        </button>
                        <button
                          type="button"
                          onClick={() => setBlogPreviewMode("preview")}
                          className={`rounded-md px-2.5 py-1 font-medium ${
                            blogPreviewMode === "preview" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
                          }`}
                        >
                          Preview
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSaveBlog} className="flex-1 overflow-y-auto space-y-4 pr-1">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingBlog.title}
                          onChange={(e) => {
                            const title = e.target.value;
                            setEditingBlog({
                              ...editingBlog,
                              title,
                              slug: isNewBlog ? generateSlugFromTitle(title) : editingBlog.slug,
                            });
                          }}
                          placeholder="e.g. Scaling REST APIs with Java & Spring"
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          URL Slug *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingBlog.slug}
                          onChange={(e) =>
                            setEditingBlog({ ...editingBlog, slug: e.target.value })
                          }
                          placeholder="scaling-rest-apis-java-spring"
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-sm font-mono text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={editingBlog.date}
                          onChange={(e) =>
                            setEditingBlog({ ...editingBlog, date: e.target.value })
                          }
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Estimated Read Time
                        </label>
                        <input
                          type="text"
                          value={editingBlog.readingTime}
                          onChange={(e) =>
                            setEditingBlog({ ...editingBlog, readingTime: e.target.value })
                          }
                          placeholder="e.g. 8 min read"
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={editingBlog.tags.join(", ")}
                          onChange={(e) =>
                            setEditingBlog({
                              ...editingBlog,
                              tags: e.target.value.split(",").map((t) => t.trim()),
                            })
                          }
                          placeholder="Java, Spring Boot, Backend"
                          className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Short Excerpt / Summary *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={editingBlog.excerpt}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, excerpt: e.target.value })
                        }
                        placeholder="A concise summary of the blog post for preview cards and SEO..."
                        className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                      />
                    </div>

                    {/* Markdown Editor & Live Preview */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Markdown Content *
                      </label>

                      <div
                        className={`grid gap-4 ${
                          blogPreviewMode === "split"
                            ? "grid-cols-1 md:grid-cols-2"
                            : "grid-cols-1"
                        }`}
                      >
                        {blogPreviewMode !== "preview" && (
                          <textarea
                            required
                            rows={14}
                            value={editingBlog.content}
                            onChange={(e) =>
                              setEditingBlog({ ...editingBlog, content: e.target.value })
                            }
                            placeholder="## Your Heading\n\nWrite your article here..."
                            className="w-full rounded-xl border border-border/80 bg-secondary/30 p-3.5 font-mono text-xs text-foreground focus:border-primary focus:outline-hidden"
                          />
                        )}

                        {blogPreviewMode !== "edit" && (
                          <div className="rounded-xl border border-border/70 bg-secondary/20 p-4 max-h-[350px] overflow-y-auto prose prose-sm dark:prose-invert">
                            <div className="text-xs font-medium text-muted-foreground border-b border-border/40 pb-2 mb-3">
                              Live Preview
                            </div>
                            <div className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-foreground">
                              {editingBlog.content}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="rounded-xl border border-border/80 px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md hover:scale-105 transition-transform"
                      >
                        <Save className="h-4 w-4" />
                        <span>Publish Article</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* TAB: SKILLS & TOOLS MANAGER */}
        {/* ======================================= */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Skills & Tools Manager
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Categorize and add programming languages, frameworks, and dev tools as you learn them.
                </p>
              </div>

              {/* Add Category Form */}
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <input
                  type="text"
                  value={newCatTitle}
                  onChange={(e) => setNewCatTitle(e.target.value)}
                  placeholder="New Category Title (e.g. Cloud)"
                  className="rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:scale-105 transition-transform"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Category</span>
                </button>
              </form>
            </div>

            {/* Categories List */}
            <div className="grid gap-6 md:grid-cols-2">
              {skills.map((category) => (
                <div
                  key={category.id}
                  className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-bold text-base text-foreground">
                        {category.title}
                      </span>
                      <span className="rounded-full bg-secondary/70 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                        {category.items.length} items
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete category "${category.title}"?`)) {
                          deleteSkillCategory(category.id);
                          toast.success("Category deleted");
                        }
                      }}
                      className="rounded-lg p-1 text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[60px]">
                    {category.items.map((skill) => (
                      <div
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-secondary/50 px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs group"
                      >
                        <TechIcon name={skill} className="h-3.5 w-3.5 shrink-0" />
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkillFromCategory(category.id, skill)}
                          className="ml-1 rounded-full p-0.5 text-muted-foreground opacity-60 hover:opacity-100 hover:text-destructive transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {category.items.length === 0 && (
                      <p className="text-xs text-muted-foreground italic py-2">
                        No skills in this category yet.
                      </p>
                    )}
                  </div>

                  {/* Add skill input */}
                  <div className="flex gap-2 pt-2 border-t border-border/30">
                    <input
                      type="text"
                      value={newSkillInputs[category.id] || ""}
                      onChange={(e) =>
                        setNewSkillInputs({ ...newSkillInputs, [category.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = newSkillInputs[category.id];
                          if (val) {
                            addSkillToCategory(category.id, val);
                            setNewSkillInputs({ ...newSkillInputs, [category.id]: "" });
                            toast.success(`Added "${val}" to ${category.title}!`);
                          }
                        }
                      }}
                      placeholder="Add skill (e.g. Docker, GraphQL)"
                      className="flex-1 rounded-xl border border-border/80 bg-secondary/30 px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const val = newSkillInputs[category.id];
                        if (val) {
                          addSkillToCategory(category.id, val);
                          setNewSkillInputs({ ...newSkillInputs, [category.id]: "" });
                          toast.success(`Added "${val}" to ${category.title}!`);
                        }
                      }}
                      className="inline-flex items-center gap-1 rounded-xl bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/80"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* TAB: SYNC & SETTINGS */}
        {/* ======================================= */}
        {activeTab === "sync" && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Data Sync & Admin Settings
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Export your portfolio dataset, synchronize with Git, and manage security settings.
              </p>
            </div>

            {/* Backup & Export Card */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    Export Portfolio Backup
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Download your complete portfolio data as a JSON file.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-105 transition-transform"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Backup JSON</span>
                </button>
              </div>
            </div>

            {/* Git Code Generator */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-soft/10 text-purple-soft">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    Copy Code for Git / Repository
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Generate formatted TypeScript arrays to paste directly into your source code files.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyCodeSnippet("projects")}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary"
                >
                  {copiedCodeTab === "projects" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>Copy Projects Code (projects-data.ts)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyCodeSnippet("blogs")}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary"
                >
                  {copiedCodeTab === "blogs" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>Copy Blogs Code (blog-data.ts)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyCodeSnippet("skills")}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary"
                >
                  {copiedCodeTab === "skills" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>Copy Skills Code</span>
                </button>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    Change Admin Password
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Update the passcode required to access this dashboard.
                  </p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="mt-4 max-w-md space-y-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    New Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 characters)"
                    className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:scale-105 transition-transform"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Update Password</span>
                </button>
              </form>
            </div>

            {/* Factory Reset */}
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-destructive">
                    Reset Portfolio Data
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Revert all projects, blog articles, and skills back to original factory defaults.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to revert all custom portfolio edits back to original factory defaults? This action cannot be undone."
                      )
                    ) {
                      resetToDefaults();
                      toast.success("Portfolio data reset to initial defaults");
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-destructive/40 bg-card px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Reset All Data to Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
