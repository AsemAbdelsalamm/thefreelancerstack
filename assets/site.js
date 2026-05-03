/**
 * The Freelancer Stack — shared chrome (nav + footer).
 * Use <body data-page="categories|platforms|blog|about"> (omit or use "home" for homepage).
 * Logo links home; no separate Home nav item.
 */
(function () {
  function navLink(href, label, pageKey) {
    var current = document.body.getAttribute("data-page") || "";
    var isActive = current === pageKey;
    var cls =
      "text-sm sm:text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors rounded-none " +
      (isActive ? "text-ink" : "text-muted hover:text-ink");
    return '<a href="' + href + '" class="' + cls + '">' + label + "</a>";
  }

  function navLinkMobile(href, label, pageKey) {
    var current = document.body.getAttribute("data-page") || "";
    var isActive = current === pageKey;
    var cls =
      "block py-3.5 text-[15px] font-semibold uppercase tracking-[0.12em] transition-colors " +
      (isActive ? "text-ink" : "text-muted hover:text-ink");
    return '<a href="' + href + '" class="' + cls + '">' + label + "</a>";
  }

  var burgerSvg =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    "</svg>";

  var header =
    '<header class="sticky top-0 z-50 border-b border-border bg-page relative">' +
    '<nav class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-nowrap items-center justify-between gap-3 py-4" aria-label="Main">' +
    '<a href="/index.html" class="font-serif text-lg sm:text-2xl font-semibold text-ink tracking-tight min-w-0 flex-1 sm:flex-initial pr-2">' +
    "The Freelancer Stack" +
    "</a>" +
    '<div class="hidden sm:flex flex-wrap items-center justify-end gap-x-4 gap-y-2 shrink-0">' +
    '<div class="flex flex-wrap items-center gap-x-4 gap-y-2">' +
    navLink("/categories.html", "Categories", "categories") +
    navLink("/categories/freelance-platforms.html", "Platforms", "platforms") +
    navLink("/blog.html", "Blog", "blog") +
    navLink("/about.html", "About", "about") +
    "</div>" +
    '<a href="/blog/vpn-cafe-wifi-freelancers.html" class="inline-block px-2.5 py-1 bg-accent text-white text-[10px] font-semibold uppercase tracking-[0.12em] rounded-none whitespace-nowrap hover:bg-[#A85226] transition-colors">New: VPN guide</a>' +
    '<span class="text-[11px] uppercase tracking-[0.14em] text-muted font-medium whitespace-nowrap">Vol. 1 — May 2026</span>' +
    "</div>" +
    '<button type="button" id="site-nav-toggle" class="sm:hidden flex items-center justify-center w-11 h-11 shrink-0 rounded-none border border-border bg-surface text-ink hover:bg-warm transition-colors" aria-expanded="false" aria-controls="site-nav-dropdown" aria-label="Open menu">' +
    burgerSvg +
    "</button>" +
    "</nav>" +
    '<div id="site-nav-dropdown" class="site-nav-dropdown hidden sm:hidden absolute left-0 right-0 top-full border-b border-border bg-page shadow-[0_12px_24px_rgba(44,24,16,0.12)] z-50" role="navigation" aria-label="Mobile menu">' +
    '<div class="max-w-6xl mx-auto px-4 py-1 flex flex-col divide-y divide-border">' +
    navLinkMobile("/categories.html", "Categories", "categories") +
    navLinkMobile("/categories/freelance-platforms.html", "Platforms", "platforms") +
    navLinkMobile("/blog.html", "Blog", "blog") +
    navLinkMobile("/about.html", "About", "about") +
    '<a href="/blog/vpn-cafe-wifi-freelancers.html" class="block py-3.5 text-[15px] font-semibold uppercase tracking-[0.12em] text-accent hover:underline">New: VPN guide</a>' +
    '<p class="py-3 text-[15px] uppercase tracking-[0.14em] text-muted font-medium whitespace-nowrap">Vol. 1 — May 2026</p>' +
    "</div></div></header>";

  var year = new Date().getFullYear();
  var footer =
    '<footer class="mt-auto bg-footer text-page">' +
    '<div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 grid sm:grid-cols-2 gap-10 sm:gap-12 text-sm sm:text-[15px] leading-relaxed text-footerMuted">' +
    "<div>" +
    '<p class="font-serif text-xl font-semibold text-page mb-3">The Freelancer Stack</p>' +
    "<p>Independent picks for freelancers who want fewer regret subscriptions. Some links are affiliate links — never extra cost to you, always disclosed.</p>" +
    "</div>" +
    "<div>" +
    '<p class="font-serif text-lg font-semibold text-page mb-3">Explore</p>' +
    '<ul class="space-y-2">' +
    '<li><a href="/categories.html" class="text-page hover:underline underline-offset-4 decoration-white/40 rounded-none">All categories</a></li>' +
    '<li><a href="/categories/freelance-platforms.html" class="text-page hover:underline underline-offset-4 decoration-white/40 rounded-none">Freelance platforms</a></li>' +
    '<li><a href="/blog.html" class="text-page hover:underline underline-offset-4 decoration-white/40 rounded-none">Blog</a></li>' +
    '<li><a href="/about.html" class="text-page hover:underline underline-offset-4 decoration-white/40 rounded-none">About</a></li>' +
    "</ul></div></div>" +
    '<div class="max-w-6xl mx-auto px-4 sm:px-6 pb-10 pt-2 border-t border-white/10 text-sm sm:text-xs text-footerMuted">' +
    "&copy; " +
    year +
    " The Freelancer Stack. Written by freelancers, for freelancers." +
    "</div></footer>";

  function bindMobileNav() {
    var btn = document.getElementById("site-nav-toggle");
    var panel = document.getElementById("site-nav-dropdown");
    if (!btn || !panel) return;

    function closeMenu() {
      panel.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    }

    function openMenu() {
      panel.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close menu");
    }

    function isOpen() {
      return btn.getAttribute("aria-expanded") === "true";
    }

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (isOpen()) closeMenu();
      else openMenu();
    });

    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (e) {
      if (!isOpen()) return;
      if (btn.contains(e.target) || panel.contains(e.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener(
      "resize",
      function () {
        if (window.matchMedia("(min-width: 640px)").matches) closeMenu();
      },
      { passive: true }
    );
  }

  function inject() {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = header;
    if (f) f.innerHTML = footer;
    bindMobileNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();

/**
 * Blog index: category filtering + staggered reveal (load more).
 * Expects markup in blog.html — see [data-blog-matrix], #blog-load-more, [data-blog-filter].
 */
(function initBlogListing() {
  var INITIAL_VISIBLE = 9;
  var LOAD_STEP = 9;

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function setFilterButtonsActive(activeFilter) {
    qsa("[data-blog-filter]").forEach(function (btn) {
      var key = btn.getAttribute("data-blog-filter") || "all";
      var on = key === activeFilter;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("bg-ink", on);
      btn.classList.toggle("text-page", on);
      btn.classList.toggle("bg-surface", !on);
      btn.classList.toggle("text-muted", !on);
    });
  }

  function applyFeaturedShell(featuredArticles, shell) {
    if (!shell) return;
    var any = featuredArticles.some(function (el) {
      return !el.classList.contains("blog-filter-hidden");
    });
    shell.style.display = any ? "" : "none";
  }

  var HAIR =
    "blog-matrix-hair-bl blog-matrix-hair-bt blog-matrix-hair-br blog-matrix-hair-bb";

  function syncMatrixHairlines(matrixArticles) {
    var visible = matrixArticles.filter(function (el) {
      return (
        !el.classList.contains("blog-filter-hidden") &&
        !el.classList.contains("blog-paginated-hidden")
      );
    });
    var n = visible.length;
    var cols = window.matchMedia("(min-width: 768px)").matches ? 3 : 1;

    matrixArticles.forEach(function (el) {
      HAIR.split(" ").forEach(function (c) {
        el.classList.remove(c);
      });
    });

    visible.forEach(function (el, idx) {
      var col = idx % cols;
      if (col === 0) el.classList.add("blog-matrix-hair-bl");
      if (idx < cols) el.classList.add("blog-matrix-hair-bt");
      if (cols > 1) el.classList.add("blog-matrix-hair-br");
      el.classList.add("blog-matrix-hair-bb");
    });
  }

  function attach() {
    var matrixSection = document.querySelector("[data-blog-matrix]");
    var loadWrap = document.getElementById("blog-load-more-wrap");
    var loadBtn = document.getElementById("blog-load-more");
    if (!matrixSection || !loadBtn) return;

    var shell = document.querySelector("[data-blog-featured-shell]");
    var featuredArticles = qsa(".blog-feature-slot");
    var matrixArticles = qsa(".blog-matrix-cell", matrixSection);
    var filterButtons = qsa("[data-blog-filter]");

    var currentFilter = "all";
    var visibleLimit = INITIAL_VISIBLE;

    function categoryMatches(cat) {
      return currentFilter === "all" || cat === currentFilter;
    }

    function applyFiltering() {
      var allPieces = featuredArticles.concat(matrixArticles);
      allPieces.forEach(function (el) {
        var cat = el.getAttribute("data-blog-category") || "";
        var ok = categoryMatches(cat);
        el.classList.toggle("blog-filter-hidden", !ok);
      });

      featuredArticles.forEach(function (el) {
        el.classList.remove("blog-paginated-hidden");
      });

      applyFeaturedShell(featuredArticles, shell);

      visibleLimit = INITIAL_VISIBLE;
      applyPagination();
      setFilterButtonsActive(currentFilter);
    }

    function visibleMatrixPool() {
      return matrixArticles.filter(function (el) {
        return !el.classList.contains("blog-filter-hidden");
      });
    }

    function applyPagination() {
      var pool = visibleMatrixPool();
      pool.forEach(function (el, idx) {
        el.classList.toggle("blog-paginated-hidden", idx >= visibleLimit);
      });

      var hiddenByPage = pool.length > visibleLimit;
      loadBtn.disabled = !hiddenByPage;
      loadBtn.setAttribute("aria-disabled", hiddenByPage ? "false" : "true");
      if (loadWrap) loadWrap.hidden = !hiddenByPage;

      matrixSection.hidden = pool.length === 0;
      syncMatrixHairlines(matrixArticles);
    }

    window.addEventListener("resize", function () {
      syncMatrixHairlines(matrixArticles);
    });

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-blog-filter") || "all";
        currentFilter = key;
        applyFiltering();
      });
    });

    loadBtn.addEventListener("click", function () {
      if (loadBtn.disabled) return;
      visibleLimit += LOAD_STEP;
      applyPagination();
    });

    applyFiltering();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach);
  } else {
    attach();
  }
})();
