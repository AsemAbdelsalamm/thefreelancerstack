import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const HEAD_OLD = `  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: { DEFAULT: '#1e3a5f', dark: '#0f2744', deeper: '#0a1628', light: '#2d4a6f' },
            accent: { DEFAULT: '#ff6b00', hover: '#e85d00' },
          },
          fontFamily: { sans: ['DM Sans', 'system-ui', 'sans-serif'] },
        },
      },
    };
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet">`;

const HEAD_NEW = `  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            page: '#FAF7F2',
            surface: '#FFFFFF',
            band: '#F2EBE0',
            ink: '#1A1A1A',
            muted: '#6B6560',
            accent: '#C4622D',
            border: '#E8E0D5',
            footer: '#2C1810',
            footerMuted: '#D7CEC7',
            star: '#E4A853',
            warm: '#EDE6DC',
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            serif: ['Playfair Display', 'Georgia', 'serif'],
          },
          boxShadow: {
            warm: '0 2px 14px rgba(44, 24, 16, 0.07), 0 1px 3px rgba(44, 24, 16, 0.05)',
          },
        },
      },
    };
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/editorial.css">`;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function patch(content, file) {
  let c = content;
  if (!c.includes(HEAD_OLD)) {
    if (c.includes("/assets/editorial.css")) return c;
    console.warn("no head match:", path.relative(root, file));
    return c;
  }
  c = c.replace(HEAD_OLD, HEAD_NEW);

  const pairs = [
    [
      'min-h-screen flex flex-col bg-navy-deeper text-slate-100 font-sans antialiased',
      "min-h-screen flex flex-col bg-page text-ink font-sans text-[17px] leading-[1.75] antialiased",
    ],
    ["bg-navy-dark/50", "bg-surface"],
    ["bg-navy-dark/40", "bg-surface"],
    ["bg-navy-dark/30", "bg-band"],
    ["border-navy-light", "border-border"],
    ["text-slate-400", "text-muted"],
    ["text-slate-300", "text-muted"],
    ["text-slate-500", "text-muted"],
    ["hover:text-white", "hover:text-ink"],
    ["hover:bg-navy-light", "hover:bg-warm"],
    ["hover:bg-accent-hover", "hover:bg-[#A85226]"],
    ["shadow-lg shadow-accent/20", "shadow-warm"],
    ["shadow-lg shadow-accent/15", "shadow-warm"],
    ["/assets/placeholder-tool.svg", "/assets/tool-line.svg"],
    ["rounded-2xl", "rounded-lg"],
    ["rounded-xl", "rounded-lg"],
    ["font-bold text-white", "font-semibold text-ink"],
    ["font-semibold text-white", "font-semibold text-ink"],
    ["font-bold ", "font-semibold "],
    [
      "list-disc list-inside space-y-2 text-muted leading-relaxed",
      "space-y-3 text-muted leading-relaxed",
    ],
    ["<p class=\"text-accent text-lg mt-2\"", '<p class="text-star text-lg mt-2"'],
    ['<p class="text-accent text-sm mt-1"', '<p class="text-star text-sm mt-1"'],
    ['<p class="text-accent text-sm" aria-label', '<p class="text-star text-sm" aria-label'],
    [
      'class="prose prose-invert prose-slate max-w-none space-y-6 text-muted leading-relaxed"',
      'class="space-y-6 text-muted leading-relaxed max-w-none"',
    ],
  ];

  for (const [a, b] of pairs) c = c.split(a).join(b);

  /* Blog index cards → magazine preview strip */
  c = c.replace(
    /<li class="rounded-lg border border-border bg-surface p-6 sm:p-8 hover:border-accent\/25 transition-colors">/g,
    '<li class="blog-card-preview p-6 sm:p-8">'
  );

  return c;
}

for (const file of walk(root)) {
  const rel = path.relative(root, file);
  if (rel.startsWith("node_modules")) continue;
  const raw = fs.readFileSync(file, "utf8");
  const next = patch(raw, file);
  if (next !== raw) fs.writeFileSync(file, next);
}

console.log("Done.");
