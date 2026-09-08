import React from "react";

interface TechIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "h-4 w-4 shrink-0", ...props }: TechIconProps) {
  const normalized = name.toLowerCase().trim();

  // 1. React
  if (normalized === "react" || normalized === "react.js" || normalized === "reactjs") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  // 2. TypeScript
  if (normalized === "typescript" || normalized === "ts") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M4 10.5h8M8 10.5v8.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M13.5 17.5c1 .9 2.5 1.2 4 .5.9-.4 1.3-1.1 1.3-1.8 0-1.7-2.8-1.7-3.8-2.3-.9-.5-1.2-1.3-1.2-2.1 0-1.8 1.6-3 3.8-2.6 1.1.2 2 .7 2.6 1.4"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 3. Tailwind CSS
  if (normalized.includes("tailwind")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
          fill="#06B6D4"
        />
      </svg>
    );
  }

  // 4. Next.js
  if (normalized.includes("next")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <circle cx="12" cy="12" r="11" fill="currentColor" className="text-zinc-900 dark:text-zinc-100" />
        <path
          d="M8.5 7.5v9M15.5 7.5v9M8.5 7.5l7 9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white dark:text-zinc-900"
        />
      </svg>
    );
  }

  // 5. Node.js
  if (normalized.includes("node")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path
          d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z"
          fill="#5FA04E"
        />
        <path
          d="M12 4.5l6.5 3.75v7.5L12 19.5 5.5 15.75v-7.5L12 4.5z"
          fill="#339933"
        />
        <path
          d="M10 9v6l4-6v6"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 6. Python
  if (normalized.includes("python")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path
          d="M11.8 2c-3.1 0-5 1.4-5 3.8v2.2h5.2v.7H4.5C2.6 8.7 1 10.3 1 12.8c0 2.5 1.5 3.9 3.5 3.9h1.9v-2.7c0-2 1.7-3.7 3.7-3.7h5.1c1.6 0 2.8-1.3 2.8-2.8V5.8c0-2.3-2.1-3.8-6.2-3.8z"
          fill="#3776AB"
        />
        <circle cx="8.5" cy="4.5" r="0.9" fill="#FFFFFF" />
        <path
          d="M12.2 22c3.1 0 5-1.4 5-3.8V16h-5.2v-.7h7.5c1.9 0 3.5-1.6 3.5-4.1 0-2.5-1.5-3.9-3.5-3.9h-1.9v2.7c0 2-1.7 3.7-3.7 3.7H8.8c-1.6 0-2.8 1.3-2.8 2.8v2.5c0 2.3 2.1 3.8 6.2 3.8z"
          fill="#FFD43B"
        />
        <circle cx="15.5" cy="19.5" r="0.9" fill="#3776AB" />
      </svg>
    );
  }

  // 7. Java
  if (normalized.includes("java") && !normalized.includes("script")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        {/* Steam */}
        <path
          d="M7 6c1.5-2 3-2 4.5 0M9.5 2c2-1 4-1 5 1M6 10c2-1.5 3.5-1.5 5 0"
          stroke="#F89820"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Cup */}
        <path
          d="M4 13h13c0 4-3 7-6.5 7S4 17 4 13z"
          fill="#5382A1"
        />
        {/* Handle */}
        <path
          d="M17 14c2 0 3.5 1 3.5 2.5S19 19 17 19"
          stroke="#5382A1"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Saucer */}
        <path
          d="M2 21c4 1.5 12 1.5 16 0"
          stroke="#F89820"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 8. Kotlin
  if (normalized.includes("kotlin")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <defs>
          <linearGradient id="kotlin-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F52FF" />
            <stop offset="50%" stopColor="#C711E1" />
            <stop offset="100%" stopColor="#FF6000" />
          </linearGradient>
        </defs>
        <path d="M22 2H2v20h20L12 12l10-10zM12 12L2 22h10l5-5-5-5z" fill="url(#kotlin-grad)" />
      </svg>
    );
  }

  // 9. PostgreSQL
  if (normalized.includes("postgres")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path
          d="M12 3C7 3 4 6.5 4 11c0 3.5 1.5 6 4 7.5V21l3-1.5v-2c.3.1.7.1 1 .1 5 0 8-3.5 8-8s-3-6.6-8-6.6z"
          fill="#336791"
        />
        <circle cx="9" cy="9" r="1.2" fill="#FFFFFF" />
        <path
          d="M9 13.5c1.5 1.2 3.5 1.2 5 0"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 10. PHP
  if (normalized.includes("php")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <ellipse cx="12" cy="12" rx="11" ry="7" fill="#777BB4" />
        <path
          d="M6.5 9.5v5M6.5 9.5h2.2a1.4 1.4 0 010 2.8H6.5M11 9.5v5M11 12.2h2.5M13.5 9.5v5M16.5 9.5v5M16.5 9.5h2.2a1.4 1.4 0 010 2.8h-2.2"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 11. REST APIs / API
  if (normalized.includes("api") || normalized.includes("rest")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <rect x="2" y="5" width="20" height="14" rx="4" fill="#6366F1" fillOpacity="0.2" stroke="#6366F1" strokeWidth="1.6" />
        <circle cx="7" cy="12" r="1.5" fill="#6366F1" />
        <circle cx="17" cy="12" r="1.5" fill="#6366F1" />
        <path d="M8.5 12h7" stroke="#6366F1" strokeWidth="1.6" strokeDasharray="1.5 1.5" />
        <path d="M12 9l2 3-2 3" stroke="#6366F1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 12. Git
  if (normalized === "git") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path
          d="M21.7 10.8L13.2 2.3c-.4-.4-1-.4-1.4 0l-2.1 2.1 2.6 2.6c.5-.2 1-.1 1.4.3.4.4.5.9.3 1.4l2.5 2.5c.5-.2 1.1-.1 1.4.3.5.5.5 1.4 0 1.9s-1.4.5-1.9 0c-.4-.4-.5-1-.3-1.4l-2.4-2.4v5.3c.2.1.4.3.5.5.5.5.5 1.4 0 1.9s-1.4.5-1.9 0c-.5-.5-.5-1.4 0-1.9.2-.2.4-.4.6-.5V8.9c-.2-.1-.4-.3-.6-.5-.4-.4-.5-1-.3-1.4L9.1 4.4 2.3 11.2c-.4.4-.4 1 0 1.4l8.5 8.5c.4.4 1 .4 1.4 0l9.5-9.5c.4-.4.4-1.1 0-1.5"
          fill="#F05032"
        />
      </svg>
    );
  }

  // 13. GitHub
  if (normalized.includes("github")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }

  // 14. VS Code
  if (normalized.includes("vscode") || normalized.includes("vs code")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path
          d="M17.5 2.2l-9.3 8.7L4.5 8 2 9.5l4.3 3.5L2 16.5 4.5 18l3.7-2.9 9.3 8.7L22 21.8V4.2L17.5 2.2z"
          fill="#007ACC"
        />
        <path
          d="M17.5 2.2L9.2 10.1l3.5 2.9 4.8-4.2V2.2z"
          fill="#1F9CF0"
        />
        <path
          d="M17.5 23.8v-6.6l-4.8-4.2-3.5 2.9 8.3 7.9z"
          fill="#0065A9"
        />
      </svg>
    );
  }

  // 15. Android Studio / Android
  if (normalized.includes("android")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path
          d="M6 18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-7H6v7z"
          fill="#3DDC84"
        />
        <path
          d="M7.5 9c.5-3 3-5 4.5-5s4 2 4.5 5h-9z"
          fill="#3DDC84"
        />
        <line x1="8.5" y1="4" x2="6.5" y2="1.5" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="15.5" y1="4" x2="17.5" y2="1.5" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9.5" cy="6.5" r="0.8" fill="#FFFFFF" />
        <circle cx="14.5" cy="6.5" r="0.8" fill="#FFFFFF" />
      </svg>
    );
  }

  // 16. Figma
  if (normalized.includes("figma")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path d="M8 2h4v5H8a2.5 2.5 0 010-5z" fill="#F24E1E" />
        <path d="M12 2h4a2.5 2.5 0 010 5h-4V2z" fill="#FF7262" />
        <path d="M8 7h4v5H8a2.5 2.5 0 010-5z" fill="#A259FF" />
        <circle cx="14.5" cy="9.5" r="2.5" fill="#1ABCFE" />
        <path d="M8 12h4v5a2.5 2.5 0 01-2.5 2.5A2.5 2.5 0 017 17a2.5 2.5 0 011-5z" fill="#0ACF83" />
      </svg>
    );
  }

  // 17. Spring Boot
  if (normalized.includes("spring")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path
          d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z"
          fill="#6DB33F"
          fillOpacity="0.2"
          stroke="#6DB33F"
          strokeWidth="1.5"
        />
        <path
          d="M8.5 16.5C8 12 11 8.5 16 8c-.5 4.5-3.5 8-7.5 8.5z"
          fill="#6DB33F"
        />
      </svg>
    );
  }

  // 18. Data Structures
  if (normalized.includes("data structure") || normalized.includes("tree")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <circle cx="12" cy="5" r="2.5" fill="#EC4899" />
        <circle cx="6" cy="18" r="2.5" fill="#8B5CF6" />
        <circle cx="18" cy="18" r="2.5" fill="#3B82F6" />
        <path d="M10.5 7L7.5 15.5M13.5 7l3 8.5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>
    );
  }

  // 19. Algorithms
  if (normalized.includes("algorithm")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <path
          d="M4 6h7M4 12h11M4 18h6"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="17" cy="6" r="2.5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
        <path d="M17 8.5v3l-2 1.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="18" r="2.5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
      </svg>
    );
  }

  // 20. OOP (Object Oriented Programming)
  if (normalized.includes("oop") || normalized.includes("object")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#F59E0B" fillOpacity="0.8" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#F59E0B" fillOpacity="0.4" stroke="#F59E0B" strokeWidth="1.2" />
        <rect x="8.5" y="14" width="7" height="7" rx="1.5" fill="#F59E0B" />
        <path d="M6.5 10v2a1.5 1.5 0 001.5 1.5h1M17.5 10v2a1.5 1.5 0 01-1.5 1.5h-1" stroke="#F59E0B" strokeWidth="1.2" />
      </svg>
    );
  }

  // 21. System Design
  if (normalized.includes("system") || normalized.includes("architecture")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
        <rect x="2" y="3" width="6" height="5" rx="1" fill="#06B6D4" />
        <rect x="16" y="3" width="6" height="5" rx="1" fill="#06B6D4" />
        <rect x="9" y="16" width="6" height="5" rx="1" fill="#3B82F6" />
        <path d="M5 8v3a2 2 0 002 2h10a2 2 0 002-2V8M12 13v3" stroke="#06B6D4" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  // Default fallback code icon
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...props}>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
