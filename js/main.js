/* ==========================================================
   Kasper | Main JavaScript File
   Each feature lives in its own init function.
   All init functions are called once at the bottom of the file.
   ========================================================== */

"use strict";

/* ---------- Start Mobile Menu ---------- */
function initMobileMenu() {
  const menuButton = document.querySelector(".toggle-menu");
  const menuList = document.querySelector("#main-nav");

  // Guard clause: stop here if the elements are not on the page
  if (!menuButton || !menuList) return;

  function isMenuOpen() {
    return menuList.classList.contains("open");
  }

  function openMenu() {
    menuList.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menuList.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  // 1) Toggle the menu when the button is clicked
  menuButton.addEventListener("click", () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // 2) Close the menu after choosing a link (event delegation: one listener for all links)
  menuList.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  // 3) Close the menu when clicking anywhere outside it
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = menuList.contains(event.target);
    const clickedOnButton = menuButton.contains(event.target);

    if (isMenuOpen() && !clickedInsideMenu && !clickedOnButton) {
      closeMenu();
    }
  });

  // 4) Close the menu with the Escape key and return focus to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
      menuButton.focus();
    }
  });
}
/* ---------- End Mobile Menu ---------- */

/* ---------- Start Active Nav Link On Scroll ---------- */
function initActiveNavLink() {
  const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');
  const sections = document.querySelectorAll("section");

  if (navLinks.length === 0 || sections.length === 0) return;

  // Highlight the link whose href matches the given section id
  function setActiveLink(sectionId) {
    navLinks.forEach((link) => {
      const isActive = link.hash === `#${sectionId}`;
      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // Not every section has a link in the nav (Design, Video, Stats...).
  // Those sections belong to the closest linked section above them,
  // e.g. while reading "Stats" the "About" link stays active.
  const linkedIds = new Set([...navLinks].map((link) => link.hash.slice(1)));
  const sectionToLinkId = new Map();
  let lastLinkedId = null;

  sections.forEach((section) => {
    if (linkedIds.has(section.id)) {
      lastLinkedId = section.id;
    }
    sectionToLinkId.set(section, lastLinkedId);
  });

  // rootMargin shrinks the viewport to a thin line in the middle of the screen.
  // A section becomes "current" when it crosses that line.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const linkId = sectionToLinkId.get(entry.target);
        if (entry.isIntersecting && linkId) {
          setActiveLink(linkId);
        }
      });
    },
    { rootMargin: "-50% 0px -49% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}
/* ---------- End Active Nav Link On Scroll ---------- */

/* ---------- Start Portfolio Filter ---------- */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".portfolio .shuffle button");
  const boxes = document.querySelectorAll(".portfolio .imgs-container .box");

  if (filterButtons.length === 0 || boxes.length === 0) return;

  // Only one button can be active at a time
  function setActiveButton(activeButton) {
    filterButtons.forEach((button) => {
      const isActive = button === activeButton;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  // Show the boxes that match the filter, hide the rest
  function filterBoxes(filter) {
    boxes.forEach((box) => {
      const matches = filter === "all" || box.dataset.category === filter;
      box.hidden = !matches;
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveButton(button);
      filterBoxes(button.dataset.filter);
    });
  });

  // Start from the button marked .active in the HTML (or the first one)
  const initialButton =
    document.querySelector(".portfolio .shuffle button.active") ||
    filterButtons[0];
  setActiveButton(initialButton);
  filterBoxes(initialButton.dataset.filter);
}
/* ---------- End Portfolio Filter ---------- */

/* ---------- Start Landing Slider ---------- */
function initLandingSlider() {
  const landing = document.querySelector(".landing");
  if (!landing) return;

  const slides = landing.querySelectorAll(".text .content");
  const bullets = landing.querySelectorAll(".bullets button");
  const prevButton = landing.querySelector(".prev");
  const nextButton = landing.querySelector(".next");

  if (slides.length === 0) return;

  const AUTOPLAY_DELAY = 5000; // milliseconds between slides
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let currentIndex = 0;
  let timerId = null;

  // Download every background once, so switching slides never shows an empty frame
  slides.forEach((slide) => {
    const preloadImage = new Image();
    preloadImage.src = slide.dataset.bg;
  });

  // The single place that changes the slider state
  function goToSlide(index) {
    // Wrap around: after the last slide go to the first, before the first go to the last
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    bullets.forEach((bullet, i) => {
      const isActive = i === currentIndex;
      bullet.classList.toggle("active", isActive);

      if (isActive) {
        bullet.setAttribute("aria-current", "true");
      } else {
        bullet.removeAttribute("aria-current");
      }
    });

    // The image path comes from the HTML (data-bg), so JS sets it inline
    landing.style.backgroundImage = `url("${slides[currentIndex].dataset.bg}")`;
  }

  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay(); // never run two timers at the same time
    timerId = setInterval(() => goToSlide(currentIndex + 1), AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    clearInterval(timerId);
    timerId = null;
  }

  // Arrows
  if (prevButton)
    prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
  if (nextButton)
    nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));

  // Bullets: the bullet number is the slide number
  bullets.forEach((bullet, i) => {
    bullet.addEventListener("click", () => goToSlide(i));
  });

  // Pause while the user is looking at / using the slider
  landing.addEventListener("mouseenter", stopAutoplay);
  landing.addEventListener("mouseleave", startAutoplay);
  landing.addEventListener("focusin", stopAutoplay);
  landing.addEventListener("focusout", startAutoplay);

  // Start from the slide marked .active in the HTML
  const initialIndex = [...slides].findIndex((slide) =>
    slide.classList.contains("active"),
  );
  goToSlide(initialIndex === -1 ? 0 : initialIndex);
  startAutoplay();
}
/* ---------- End Landing Slider ---------- */

/* ---------- Start App ---------- */
initMobileMenu();
initActiveNavLink();
initPortfolioFilter();
initLandingSlider();
/* ---------- End App ---------- */
