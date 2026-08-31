export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverGradient: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "starting-your-tech-journey",
    title: "Starting Your Tech Journey: A Beginner's Roadmap to Web Development",
    excerpt:
      "Feeling overwhelmed by all the programming languages and frameworks out there? Here's the honest, step-by-step path I wish someone had shown me when I was starting out — from HTML basics to building real projects.",
    date: "2026-08-31",
    readingTime: "12 min read",
    tags: ["Beginners", "HTML", "CSS", "JavaScript", "Career"],
    coverGradient: "from-primary/40 via-purple-soft/30 to-accent/20",
    content: `## Hey, Future Developer 👋

If you're reading this, chances are you've been thinking about getting into tech — maybe you've been Googling "how to start coding" at 2 AM, scrolling through countless YouTube tutorials, and feeling completely overwhelmed by the sheer number of languages, frameworks, and opinions out there.

I've been there. Literally.

When I first started learning, I didn't know the difference between a programming language and a framework. I thought HTML was "coding." I had no idea what a terminal was. And honestly? **That's completely fine.** Everyone starts somewhere.

This blog is for you — the absolute beginner who wants a clear, no-nonsense roadmap. No fluff, no gatekeeping. Just the path I wish someone had laid out for me.

---

## Why Start with Web Development?

Before we dive in, let me tell you why web development is the best entry point into tech:

- **You see results immediately.** Write a few lines of HTML, refresh your browser, and boom — something appears on screen. That instant feedback loop is incredibly motivating.
- **You don't need expensive tools.** A laptop, a browser, and a free text editor is literally all you need.
- **Jobs are everywhere.** Every business needs a website. The demand for web developers isn't going anywhere.
- **It's a gateway.** Once you understand the web, branching into mobile development, backend engineering, DevOps, or even AI becomes much easier.

---

## Phase 1: HTML — The Skeleton 🦴

**What it is:** HTML (HyperText Markup Language) is the structure of every web page. It's not a programming language — it's a *markup* language. Think of it as the skeleton of a building.

**What you'll learn:**
- How to create headings, paragraphs, and lists
- Adding images and links
- Building forms (text inputs, buttons, checkboxes)
- Understanding the document structure (\`<html>\`, \`<head>\`, \`<body>\`)
- Semantic elements like \`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`

**Your first milestone:** Build a simple personal profile page with your name, a short bio, a photo, and links to your social media.

### Pro Tips for HTML:
1. **Don't memorize every tag.** There are over 100 HTML elements. You'll use maybe 20 regularly. Learn those well and look up the rest when you need them.
2. **Write semantic HTML from day one.** Use \`<article>\` instead of \`<div>\` for blog posts, \`<nav>\` for navigation. It matters for accessibility and SEO.
3. **Validate your code.** Use the [W3C Validator](https://validator.w3.org/) to check for errors. It teaches you good habits early.

### Resources I Recommend:
- [MDN Web Docs — HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML) (the gold standard)
- freeCodeCamp's Responsive Web Design certification
- The Odin Project's Foundations course

**⏱ Estimated time: 1–2 weeks**

---

## Phase 2: CSS — The Style 🎨

**What it is:** CSS (Cascading Style Sheets) is what makes your HTML look good. Colors, fonts, spacing, layout, animations — that's all CSS.

**What you'll learn:**
- Colors, fonts, and text styling
- The box model (margin, border, padding, content)
- Flexbox — the modern way to layout elements in a row or column
- CSS Grid — for two-dimensional layouts
- Responsive design with media queries
- Transitions and simple animations

**Your second milestone:** Take the profile page you built with HTML and make it beautiful. Add colors, nice fonts, proper spacing, and make it look good on both desktop and mobile.

### Pro Tips for CSS:
1. **Master Flexbox first.** If I could only teach one CSS concept, it'd be Flexbox. It solves 80% of your layout problems. Play [Flexbox Froggy](https://flexboxfroggy.com/) — seriously, it's fun.
2. **Learn the box model inside out.** Most CSS frustration comes from not understanding how margin, padding, and borders interact.
3. **Don't skip responsive design.** Over 60% of web traffic is mobile. Your sites need to work on phones.
4. **Use CSS custom properties (variables).** They make your code cleaner and easier to maintain.

\`\`\`css
/* Example: CSS Custom Properties */
:root {
  --primary-color: #7c3aed;
  --text-color: #1a1a2e;
  --bg-color: #fafafa;
}

body {
  color: var(--text-color);
  background-color: var(--bg-color);
  font-family: 'Inter', sans-serif;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.button:hover {
  transform: scale(1.05);
}
\`\`\`

### The CSS Learning Trap ⚠️

Here's something nobody tells beginners: **CSS is deceptively hard.** The syntax is simple, but mastering layout and responsive design takes practice. Don't get discouraged if your div isn't centering properly (we've ALL been there).

The classic developer joke exists for a reason:
> "Two CSS properties walk into a bar. A barstool in a completely different bar falls over."

Stick with it. It clicks eventually.

**⏱ Estimated time: 2–3 weeks**

---

## Phase 3: JavaScript — The Brain 🧠

**What it is:** JavaScript is the programming language of the web. It makes things interactive — dropdown menus, form validation, dynamic content, animations, API calls, and so much more.

This is where you go from "making web pages" to "making web *applications*."

**What you'll learn:**
- Variables, data types, and operators
- Functions and scope
- Arrays and objects
- DOM manipulation (changing HTML/CSS with code)
- Events (clicks, keypresses, form submissions)
- Conditional logic (if/else) and loops
- Fetch API and working with data
- ES6+ features (arrow functions, destructuring, template literals)

**Your third milestone:** Build an interactive to-do list app. Users should be able to add tasks, mark them as complete, and delete them. Bonus: save the data to localStorage so it persists when they refresh.

### Pro Tips for JavaScript:
1. **Understand the fundamentals deeply.** Don't rush to React or any framework. If you don't understand plain JavaScript, frameworks will feel like magic — and not the good kind.
2. **Practice with small projects.** Build a calculator, a quiz app, a weather app. Each project teaches you something new.
3. **Learn to read error messages.** The console is your best friend. \`console.log()\` everything when debugging.
4. **Don't compare your progress to others.** Some people learn faster, some slower. Both are fine.

\`\`\`javascript
// Example: A simple todo item creator
function createTodoItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  li.classList.add('todo-item');

  // Click to toggle complete
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Double-click to remove
  li.addEventListener('dblclick', () => {
    li.remove();
  });

  return li;
}

// Usage
const form = document.querySelector('#todo-form');
const list = document.querySelector('#todo-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = form.querySelector('input');
  if (input.value.trim()) {
    list.appendChild(createTodoItem(input.value));
    input.value = '';
  }
});
\`\`\`

### The JavaScript Journey Map

Here's the thing about JavaScript — it's HUGE. You can't learn it all at once, and you don't need to. Here's the order I recommend:

1. **Weeks 1–2:** Variables, data types, functions, conditionals, loops
2. **Weeks 3–4:** Arrays, objects, array methods (map, filter, reduce)
3. **Weeks 5–6:** DOM manipulation, events, forms
4. **Weeks 7–8:** Asynchronous JS — promises, async/await, fetch API

**⏱ Estimated time: 6–8 weeks**

---

## What Comes Next? The Bigger Picture 🗺️

Once you're comfortable with HTML, CSS, and JavaScript, you've built a solid foundation. Here's what the path forward looks like:

### Level Up Your Frontend
- **Learn a framework:** React, Vue, or Svelte. I started with React and it changed everything.
- **TypeScript:** JavaScript with types. It catches errors before they happen. Worth learning early.
- **Tailwind CSS:** A utility-first CSS framework that speeds up styling dramatically.

### Explore the Backend
- **Node.js:** Run JavaScript on the server. Same language, new powers.
- **Databases:** PostgreSQL, MongoDB. Learn how data is stored and retrieved.
- **APIs:** Understand REST APIs, HTTP methods (GET, POST, PUT, DELETE), and how the frontend and backend communicate.

### Essential Developer Tools
- **Git & GitHub:** Version control. Learn this as early as possible. Every dev team uses it.
- **VS Code:** The industry-standard code editor. Learn its shortcuts.
- **The Terminal:** Get comfortable with the command line. It's less scary than it looks.

---

## Mistakes I Made (So You Don't Have To) 😅

**1. Tutorial hell.** I watched tutorial after tutorial without building anything on my own. Tutorials are great for learning concepts, but you only truly learn by struggling through your own projects.

**2. Trying to learn everything at once.** I'd jump from JavaScript to Python to Java in the same week. Pick one path and stick with it for at least 3 months.

**3. Not reading documentation.** I relied on YouTube and Stack Overflow for everything. Learning to read official docs (especially MDN) was a game-changer.

**4. Comparing myself to experienced developers.** I'd see someone's portfolio and feel terrible about my simple HTML page. Remember: they were once exactly where you are now.

**5. Not building projects early enough.** The best way to learn is by building. Start projects before you feel "ready" — you'll never feel fully ready.

---

## Your First 90-Day Plan 📅

Here's a concrete plan you can follow:

| Week | Focus | Project |
|------|-------|---------|
| 1–2 | HTML fundamentals | Personal profile page |
| 3–4 | CSS basics + Flexbox | Style your profile, make it responsive |
| 5 | CSS Grid + animations | Photo gallery or portfolio layout |
| 6–7 | JavaScript basics | Calculator app |
| 8–9 | DOM + Events | Interactive quiz app |
| 10–11 | Fetch API + async | Weather app using a free API |
| 12–13 | Combine everything | Full personal portfolio site |

By the end of 90 days, you'll have **multiple projects** to show, a **portfolio site** to host them on, and — most importantly — the confidence to keep going.

---

## Final Words of Encouragement 💜

Learning to code is hard. There will be days where nothing makes sense, where your code breaks for no apparent reason, where you question whether you're cut out for this.

**You are.**

Every single developer you admire — every one — started exactly where you are right now. Confused, overwhelmed, and wondering if they could actually do this. They stuck with it. So can you.

The tech industry needs more diverse voices, fresh perspectives, and passionate people. Your background, your story, your unique way of thinking — that's not a weakness. It's your superpower.

Start today. Write your first \`<h1>Hello World</h1>\`. It doesn't have to be perfect. It just has to exist.

And hey — if you ever get stuck, feel free to reach out. We're all figuring this out together. 🚀

---

*This is the first post in my "Tech for Beginners" series. Stay tuned for the next one where we'll dive deeper into CSS layouts and build a responsive portfolio from scratch.*
`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
