import projectMedicore from "@/assets/project-medicore.png";
import projectPulse254 from "@/assets/project-pulse254.png";
import projectGrowthspire from "@/assets/project-growthspire.png";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Backend" | "Full Stack" | "All";
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  features: string[];
  year: string;
}

export const projectsData: Project[] = [
  {
    id: "medicore-api",
    title: "MediCore API",
    tagline: "Clinical Management REST Backend",
    description:
      "A secure, enterprise-grade RESTful clinical backend built with Java 17 and Spring Boot 3. Provides JPA persistence, role-based JWT authentication, patient history tracking, and telemetry for healthcare operations.",
    category: "Backend",
    tags: ["Java 17", "Spring Boot 3", "JPA / Hibernate", "JWT", "PostgreSQL", "REST API"],
    image: projectMedicore,
    githubUrl: "https://github.com/Muoki-Anna/medical-api",
    features: [
      "Role-based access control with stateless JWT authentication",
      "Patient records, clinical consultation logs, and staff assignments",
      "Automated database migrations and transactional JPA repositories",
      "Robust exception handling and REST API error formatting",
    ],
    year: "2024",
  },
  {
    id: "pulse254",
    title: "Pulse254",
    tagline: "Community & Local News Web Platform",
    description:
      "A responsive, community-driven web application tailored for Kenyan audiences — surfacing local pulse updates, community stories, and interactive trends with a modern TypeScript and React stack.",
    category: "Full Stack",
    tags: ["TypeScript", "React", "Tailwind CSS", "Vite", "Responsive Design"],
    image: projectPulse254,
    githubUrl: "https://github.com/Muoki-Anna/Pulse254",
    features: [
      "Dynamic feed layout with responsive card interactions",
      "Tailored UI components optimized for fast loading on all devices",
      "Clean TypeScript models for article submissions and user tags",
      "Modern dark/light compatible styling system",
    ],
    year: "2024",
  },
  {
    id: "growthspire-backend",
    title: "GrowthSpire Backend",
    tagline: "Productivity & Growth Platform Service",
    description:
      "A modular PHP-powered backend architecture for personal growth tracking and productivity metrics. Features clean request routing, normalized data models, and scalable API endpoints.",
    category: "Backend",
    tags: ["PHP", "REST APIs", "MySQL", "Backend Architecture", "Data Modeling"],
    image: projectGrowthspire,
    githubUrl: "https://github.com/Muoki-Anna/GrowthSpire-Backend",
    features: [
      "Lightweight routing layer handling structured JSON endpoints",
      "Normalized relational schema for milestones and activity tracking",
      "Input validation and sanitization for secure user input processing",
      "Modular service controllers for easy feature expansion",
    ],
    year: "2023",
  },
];
