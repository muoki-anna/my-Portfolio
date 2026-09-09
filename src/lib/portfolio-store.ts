import { useState, useEffect, useCallback } from "react";
import { projectsData, type Project } from "./projects-data";
import { blogPosts, type BlogPost } from "./blog-data";

export interface SkillCategory {
  id: string;
  title: string;
  iconName: "Palette" | "Database" | "Terminal" | "Cpu" | "Globe" | "Zap" | "Layers";
  items: string[];
}

export const defaultSkillsData: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    iconName: "Palette",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    id: "backend",
    title: "Backend",
    iconName: "Database",
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
    id: "tools",
    title: "Tools & DevOps",
    iconName: "Terminal",
    items: ["Git", "GitHub", "VS Code", "Android Studio", "Figma"],
  },
  {
    id: "core",
    title: "Core CS",
    iconName: "Cpu",
    items: ["Data Structures", "Algorithms", "OOP", "System Design"],
  },
];

const STORAGE_KEYS = {
  PROJECTS: "muoki_portfolio_projects_v1",
  BLOGS: "muoki_portfolio_blogs_v1",
  SKILLS: "muoki_portfolio_skills_v1",
  AUTH: "muoki_admin_auth_v1",
  PASSWORD: "muoki_admin_password_v1",
};

const DEFAULT_ADMIN = {
  email: "muokianna10@gmail.com",
  defaultPassword: "admin123",
};

// Safe localStorage readers
export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") return projectsData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) return projectsData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : projectsData;
  } catch {
    return projectsData;
  }
}

export function getStoredBlogs(): BlogPost[] {
  if (typeof window === "undefined") return blogPosts;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOGS);
    if (!raw) return blogPosts;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : blogPosts;
  } catch {
    return blogPosts;
  }
}

export function getStoredSkills(): SkillCategory[] {
  if (typeof window === "undefined") return defaultSkillsData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SKILLS);
    if (!raw) return defaultSkillsData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultSkillsData;
  } catch {
    return defaultSkillsData;
  }
}

export function getAdminPassword(): string {
  if (typeof window === "undefined") return DEFAULT_ADMIN.defaultPassword;
  try {
    return localStorage.getItem(STORAGE_KEYS.PASSWORD) || DEFAULT_ADMIN.defaultPassword;
  } catch {
    return DEFAULT_ADMIN.defaultPassword;
  }
}

export function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!auth) return false;
    const data = JSON.parse(auth);
    // Token valid for 7 days
    if (data.timestamp && Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
      return true;
    }
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    return false;
  } catch {
    return false;
  }
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === "undefined") return;
  if (value) {
    localStorage.setItem(
      STORAGE_KEYS.AUTH,
      JSON.stringify({ timestamp: Date.now(), user: DEFAULT_ADMIN.email })
    );
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
  notifyStorageChange();
}

function notifyStorageChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portfolio_data_updated"));
  }
}

// Convert uploaded image file to Base64 data url for instant embedding
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

// Reactive Hook
export function usePortfolioStore() {
  const [projects, setProjects] = useState<Project[]>(getStoredProjects);
  const [blogs, setBlogs] = useState<BlogPost[]>(getStoredBlogs);
  const [skills, setSkills] = useState<SkillCategory[]>(getStoredSkills);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isUserAuthenticated);

  const refresh = useCallback(() => {
    setProjects(getStoredProjects());
    setBlogs(getStoredBlogs());
    setSkills(getStoredSkills());
    setIsAuthenticated(isUserAuthenticated());
  }, []);

  useEffect(() => {
    refresh();

    const handleUpdate = () => {
      refresh();
    };

    window.addEventListener("portfolio_data_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("portfolio_data_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [refresh]);

  // Project Mutations
  const saveProject = (project: Project) => {
    const current = getStoredProjects();
    const existingIndex = current.findIndex((p) => p.id === project.id);
    let updated: Project[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = project;
    } else {
      updated = [project, ...current];
    }
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    notifyStorageChange();
  };

  const deleteProject = (id: string) => {
    const current = getStoredProjects();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    notifyStorageChange();
  };

  // Blog Mutations
  const saveBlog = (post: BlogPost, originalSlug?: string) => {
    const current = getStoredBlogs();
    const targetSlug = originalSlug || post.slug;
    const existingIndex = current.findIndex((p) => p.slug === targetSlug);
    let updated: BlogPost[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = post;
    } else {
      updated = [post, ...current];
    }
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
    notifyStorageChange();
  };

  const deleteBlog = (slug: string) => {
    const current = getStoredBlogs();
    const updated = current.filter((p) => p.slug !== slug);
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
    notifyStorageChange();
  };

  // Skill Mutations
  const saveSkillCategory = (category: SkillCategory) => {
    const current = getStoredSkills();
    const index = current.findIndex((c) => c.id === category.id);
    let updated: SkillCategory[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = category;
    } else {
      updated = [...current, category];
    }
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
    notifyStorageChange();
  };

  const deleteSkillCategory = (id: string) => {
    const current = getStoredSkills();
    const updated = current.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
    notifyStorageChange();
  };

  const addSkillToCategory = (categoryId: string, skillName: string) => {
    const trimmed = skillName.trim();
    if (!trimmed) return;
    const current = getStoredSkills();
    const updated = current.map((cat) => {
      if (cat.id === categoryId && !cat.items.includes(trimmed)) {
        return { ...cat, items: [...cat.items, trimmed] };
      }
      return cat;
    });
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
    notifyStorageChange();
  };

  const removeSkillFromCategory = (categoryId: string, skillName: string) => {
    const current = getStoredSkills();
    const updated = current.map((cat) => {
      if (cat.id === categoryId) {
        return { ...cat, items: cat.items.filter((s) => s !== skillName) };
      }
      return cat;
    });
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
    notifyStorageChange();
  };

  // Auth Mutations
  const login = (password: string): boolean => {
    const correctPassword = getAdminPassword();
    if (password === correctPassword) {
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthenticated(false);
  };

  const updatePassword = (newPassword: string) => {
    localStorage.setItem(STORAGE_KEYS.PASSWORD, newPassword);
    notifyStorageChange();
  };

  // Reset to Factory Defaults
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.BLOGS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    notifyStorageChange();
  };

  return {
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
    adminEmail: DEFAULT_ADMIN.email,
  };
}
