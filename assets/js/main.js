/* 猫二杯 · STRIVE "2" PURRFFECT — interactions */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header ---------- */
  var header = doc.querySelector(".site-header");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  var navToggle = doc.querySelector(".nav-toggle");
  var siteNav = doc.getElementById("site-nav");

  function setNav(open) {
    if (!navToggle || !siteNav) return;
    doc.body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    if (open) {
      var first = siteNav.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    }
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      setNav(!doc.body.classList.contains("nav-open"));
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setNav(false);
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && doc.body.classList.contains("nav-open")) {
        setNav(false);
        navToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) setNav(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = doc.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      reveals.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ---------- Cold mode easter egg ---------- */
  var coldButtons = doc.querySelectorAll("[data-cold-toggle]");
  var storageKey = "s2p-cold";

  function getCold() {
    try {
      return window.localStorage.getItem(storageKey) === "1";
    } catch (error) {
      return false;
    }
  }

  function applyCold(cold) {
    coldButtons.forEach(function (button) {
      button.classList.toggle("is-cold", cold);
      button.setAttribute("aria-pressed", String(cold));
      button.setAttribute(
        "aria-label",
        cold ? "赛事状态：冰冷筹备中，点击切换" : "赛事状态：火热筹备中，点击切换"
      );
      var label = button.querySelector("[data-status-label]");
      if (label) {
        label.textContent = cold ? "当前状态：冰冷筹备中" : "当前状态：火热筹备中";
      }
    });
  }

  if (coldButtons.length) {
    applyCold(getCold());
    coldButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var next = !button.classList.contains("is-cold");
        applyCold(next);
        try {
          window.localStorage.setItem(storageKey, next ? "1" : "0");
        } catch (error) {
          /* localStorage can be unavailable; the page still works. */
        }
      });
    });
  }

  /* ---------- Poster dialog ---------- */
  var posterTrigger = doc.querySelector("[data-poster-open]");
  var posterDialog = doc.getElementById("poster-dialog");
  if (posterTrigger && posterDialog && typeof posterDialog.showModal === "function") {
    posterTrigger.addEventListener("click", function (event) {
      event.preventDefault();
      posterDialog.showModal();
      doc.body.classList.add("dialog-open");
    });
    posterDialog.addEventListener("close", function () {
      doc.body.classList.remove("dialog-open");
    });
    posterDialog.addEventListener("click", function (event) {
      if (event.target === posterDialog) posterDialog.close();
    });
    var closeBtn = posterDialog.querySelector(".dialog-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        posterDialog.close();
      });
    }
  }

  /* ---------- Rules table of contents ---------- */
  var tocLinks = doc.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var sections = [];
    tocLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = doc.getElementById(id);
      if (section) sections.push({ link: link, section: section });
    });

    if (sections.length) {
      var tocObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            sections.forEach(function (item) {
              item.link.classList.toggle("is-active", item.section === entry.target);
            });
          });
        },
        { rootMargin: "-18% 0px -68% 0px", threshold: 0 }
      );
      sections.forEach(function (item) {
        tocObserver.observe(item.section);
      });
    }
  }

  /* ---------- Subtle hero mark parallax ---------- */
  var mark = doc.querySelector(".lockup-mark");
  var hero = doc.querySelector(".hero");
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  if (mark && hero && finePointer && !reduceMotion) {
    var raf = null;
    hero.addEventListener("mousemove", function (event) {
      if (raf) return;
      raf = window.requestAnimationFrame(function () {
        var rect = hero.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        mark.style.transform = "translate(" + x * 12 + "px," + y * 10 + "px)";
        raf = null;
      });
    });
    hero.addEventListener("mouseleave", function () {
      mark.style.transform = "";
    });
  }

  /* ---------- Anchor links: close mobile nav after jump ---------- */
  doc.addEventListener("click", function (event) {
    var anchor = event.target.closest('a[href^="#"]');
    if (anchor && doc.body.classList.contains("nav-open")) setNav(false);
  });
})();
