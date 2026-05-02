/**
 * The Freelancer Stack — shared chrome (nav + footer).
 * Use <body data-page="categories|blog|about"> (omit or use "home" for homepage).
 * Logo links home; no separate Home nav item.
 */
(function () {
  function navLink(href, label, pageKey) {
    var current = document.body.getAttribute("data-page") || "";
    var isActive = current === pageKey;
    var cls =
      "text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors rounded-none " +
      (isActive ? "text-ink" : "text-muted hover:text-ink");
    return '<a href="' + href + '" class="' + cls + '">' + label + "</a>";
  }

  var header =
    '<header class="sticky top-0 z-50 border-b border-border bg-page">' +
    '<nav class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4" aria-label="Main">' +
    '<a href="/index.html" class="font-serif text-xl sm:text-2xl font-semibold text-ink tracking-tight shrink-0">' +
    "The Freelancer Stack" +
    "</a>" +
    '<div class="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 sm:ml-auto">' +
    '<div class="flex flex-wrap items-center gap-x-5 gap-y-2">' +
    navLink("/categories.html", "Categories", "categories") +
    navLink("/blog.html", "Blog", "blog") +
    navLink("/about.html", "About", "about") +
    "</div>" +
    '<a href="/blog/vpn-cafe-wifi-freelancers.html" class="inline-block px-2.5 py-1 bg-accent text-white text-[10px] font-semibold uppercase tracking-[0.12em] rounded-none whitespace-nowrap hover:bg-[#A85226] transition-colors">New: VPN guide</a>' +
    '<span class="text-[11px] uppercase tracking-[0.14em] text-muted font-medium whitespace-nowrap">Vol. 1 — May 2026</span>' +
    "</div>" +
    "</nav></header>";

  var year = new Date().getFullYear();
  var footer =
    '<footer class="mt-auto bg-footer text-page">' +
    '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 gap-12 text-[15px] leading-relaxed text-footerMuted">' +
    "<div>" +
    '<p class="font-serif text-xl font-semibold text-page mb-3">The Freelancer Stack</p>' +
    "<p>Independent picks for freelancers who want fewer regret subscriptions. Some links are affiliate links — never extra cost to you, always disclosed.</p>" +
    "</div>" +
    "<div>" +
    '<p class="font-serif text-lg font-semibold text-page mb-3">Explore</p>' +
    '<ul class="space-y-2">' +
    '<li><a href="/categories.html" class="text-page hover:underline underline-offset-4 decoration-white/40 rounded-none">All categories</a></li>' +
    '<li><a href="/blog.html" class="text-page hover:underline underline-offset-4 decoration-white/40 rounded-none">Blog</a></li>' +
    '<li><a href="/about.html" class="text-page hover:underline underline-offset-4 decoration-white/40 rounded-none">About</a></li>' +
    "</ul></div></div>" +
    '<div class="max-w-6xl mx-auto px-4 sm:px-6 pb-10 pt-2 border-t border-white/10 text-xs text-footerMuted">' +
    "&copy; " +
    year +
    " The Freelancer Stack. Written by freelancers, for freelancers." +
    "</div></footer>";

  function inject() {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = header;
    if (f) f.innerHTML = footer;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
