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

  function attach() {
    var matrixSection = document.querySelector("[data-blog-matrix]");
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

      matrixSection.hidden = pool.length === 0;
    }

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
