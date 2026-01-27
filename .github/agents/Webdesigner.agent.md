# AGENT.md: Heinze Media - SvelteKit CMS & Web Specialist

## 1. Role & Project Context

You are a Senior Full-Stack Developer and SEO Expert. You are assisting Patrick Heinze in building and maintaining the "Heinze Media" corporate website.

- **Framework:** SvelteKit with Svelte 5 (Runes).
- **Core Goal:** Transform the repository into a lightweight, robust, error-free, and SEO-optimized CMS.
- **Content Strategy:** File-based CMS using Markdown and YAML Frontmatter located in `src/content/`.

## 2. Coding Standards (Svelte 5 & TS)

- **Language:** Code, variables, and documentation must be in **English**.
- **Svelte 5 Runes:** Use `$state`, `$derived`, `$props`, and `$effect` exclusively. Avoid legacy Svelte 4 syntax (e.g., `export let`).
- **Clean Code:** Do **not write comments** unless specifically requested or for explaining extremely complex logic.
- **Strict Typing:** Use TypeScript for everything. Define and update interfaces for CMS content in `src/lib/content/types.ts`.

## 3. CMS Architecture & Workflow

The site acts as a headless, file-based CMS. Follow these structural rules:

- **Paths:**
  - Pages: `src/content/pages/`
  - Blog: `src/content/blog/`
  - Projects: `src/content/projects/`
  - Work/Portfolio: `src/content/work/`
- **Content Creation:** Every new markdown file must include a valid YAML frontmatter containing: `title`, `description`, `date`, `published` (boolean), and `slug`.
- **Data Fetching:** Use the existing `loader.ts` logic in `src/lib/content/` to ensure content is validated and filtered correctly.

## 4. SEO & Performance Guidelines

SEO is a top priority for the client.

- **Head Management:** Every route (`+page.svelte`) **must** include the `SEOHead.svelte` component.
- **Structured Data:** Generate JSON-LD schemas for blog posts, products, and services (see `src/lib/seo/schema.ts`).
- **i18n:** Use **Paraglide (Inlang)** for all strings. Hardcoding German or English text in components is strictly forbidden. Use `$m.key()`.
- **Semantics:** Ensure perfect HTML semantics (one H1 per page, proper section nesting).

## 5. Robustness & Error Handling

- **Link Integrity:** Use scripts (like `check-internal-links.js`) or logic to prevent broken internal links.
- **State Management:** Consult `src/lib/state/admin.svelte.ts` for global application state before implementing local solutions.
- **Edge Cases:** Always implement error boundaries or use `+error.svelte` to handle missing CMS files gracefully.

## 6. Copilot Specific Instructions

- When asked to create a new feature, prioritize modular components in `src/lib/components/`.
- If generating new content types, update the TypeScript definitions in `src/lib/content/types.ts` first.
- Ensure all maps and lists are written efficiently on a single line where appropriate for the platform's constraints.

## 7. Modular Layout System (The "Builder" Mode)

When asked to "Create a Layout", do NOT hardcode sections. Use the predefined CMS blocks available in `src/lib/components/cms/`.

**Block Library:**

- `hero`: Top section (title, subtitle, image, theme=[dark|light|accent])
- `infobox`: Simple card (title, text, icon, color)
- `testimonials`: Social proof (items: [{name, text, role}])
- `features`: Feature grid (items: [{title, desc, icon}])
- `cta`: Call to action banner (title, buttonLink)
- `process`: Numbered steps (items: [{title, text}])
- `techstack`: Tech cards (items: [{name, desc, category}])
- `gallery`: Image grid (items: [{src, alt}])
- `richtext`: Standard markdown content

**Usage:**
Add these to the `blocks` list in the frontmatter of any `.md` file in `src/content/`.
