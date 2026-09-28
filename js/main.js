/* ==========================================================
   Kasper | Main JavaScript File
   Each feature lives in its own init function.
   All init functions are called once at the bottom of the file.
   ========================================================== */

"use strict";

/* ---------- Start Helpers ---------- */
// true when the user asked the operating system to reduce motion
function userPrefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Run callback ONE time, the first time element becomes visible on screen.
// threshold = how much of the element must be visible (0.4 = 40%)
function onFirstVisible(element, callback, threshold = 0.4) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect(); // stop watching: we only need it once
        callback();
      }
    },
    { threshold }
  );

  observer.observe(element);
}
/* ---------- End Helpers ---------- */

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
    { rootMargin: "-50% 0px -49% 0px" }
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
  const initialButton = document.querySelector(".portfolio .shuffle button.active") || filterButtons[0];
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
  const reduceMotion = userPrefersReducedMotion();

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
    if (reduceMotion) return;
    stopAutoplay(); // never run two timers at the same time
    timerId = setInterval(() => goToSlide(currentIndex + 1), AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    clearInterval(timerId);
    timerId = null;
  }

  // Arrows
  if (prevButton) prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
  if (nextButton) nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));

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
  const initialIndex = [...slides].findIndex((slide) => slide.classList.contains("active"));
  goToSlide(initialIndex === -1 ? 0 : initialIndex);
  startAutoplay();
}
/* ---------- End Landing Slider ---------- */

/* ---------- Start Stats Counters ---------- */
function initStatsCounters() {
  const stats = document.querySelector(".stats");
  const numbers = document.querySelectorAll(".stats .number");

  if (!stats || numbers.length === 0) return;
  if (userPrefersReducedMotion()) return; // keep the final numbers written in the HTML

  const DURATION = 2000; // milliseconds
  const formatter = new Intl.NumberFormat("en-US"); // 1236 -> "1,236"

  // Remember each final number, then start the display from zero
  numbers.forEach((numberElement) => {
    numberElement.dataset.target = numberElement.textContent.replace(/\D/g, ""); // "1,236" -> "1236"
    numberElement.textContent = "0";
  });

  function animateNumber(numberElement) {
    const target = Number(numberElement.dataset.target);
    const startTime = performance.now();

    // requestAnimationFrame calls this before every screen repaint (~60 times per second)
    function update(now) {
      const progress = Math.min((now - startTime) / DURATION, 1); // goes from 0 to 1
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out: fast start, slow finish

      numberElement.textContent = formatter.format(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  onFirstVisible(stats, () => numbers.forEach(animateNumber), 0.5);
}
/* ---------- End Stats Counters ---------- */

/* ---------- Start Skill Bars ---------- */
function initSkillBars() {
  const skills = document.querySelector(".our-skills .skills");

  if (!skills) return;
  if (userPrefersReducedMotion()) return; // keep the bars full

  // CSS keeps the bars at width 0 while this class is on the element
  skills.classList.add("is-waiting");

  // Removing the class lets each bar grow back to its inline width (90%, 85%...)
  onFirstVisible(skills, () => skills.classList.remove("is-waiting"), 0.3);
}
/* ---------- End Skill Bars ---------- */

/* ---------- Start Form Validation ---------- */
// Simple email check: something@something.something (no spaces)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The rules live in the HTML (required, minlength, type="email").
// This function only turns a broken rule into a friendly message.
function getErrorMessage(field) {
  const value = field.value.trim();
  const label = field.labels.length > 0 ? field.labels[0].textContent.trim() : field.name;

  if (field.required && value === "") {
    return `${label} is required.`;
  }

  if (field.type === "email" && value !== "" && !EMAIL_PATTERN.test(value)) {
    return "Please enter a valid email address (example: name@mail.com).";
  }

  if (field.minLength > 0 && value !== "" && value.length < field.minLength) {
    return `${label} must be at least ${field.minLength} characters.`;
  }

  return ""; // empty string = no error
}

// Write (or clear) the message in the element linked by aria-describedby
function showFieldError(field, message) {
  const errorElement = document.getElementById(field.getAttribute("aria-describedby"));

  field.setAttribute("aria-invalid", message ? "true" : "false");

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function validateField(field) {
  const message = getErrorMessage(field);
  showFieldError(field, message);
  return message === "";
}

function initFormValidation(form) {
  const fields = form.querySelectorAll("input:not([type='submit']), textarea");
  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (event) => {
    if (status) {
      status.textContent = "";
      status.classList.remove("is-error");
    }

    let firstInvalidField = null;

    fields.forEach((field) => {
      const isValid = validateField(field);
      if (!isValid && !firstInvalidField) {
        firstInvalidField = field;
      }
    });

    if (firstInvalidField) {
      event.preventDefault(); // stop sending: there is something to fix first
      firstInvalidField.focus(); // take the user straight to the first problem
      return;
    }

    // Everything is valid: let the browser send the form to the PHP handler (action="...").
    // Disable the button so a double click does not send the same data twice.
    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton) submitButton.disabled = true;
  });

  // Once a field shows an error, re-check it on every key press so the error disappears when fixed
  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });
  });
}

function initForms() {
  document.querySelectorAll(".contact form, .subscribe form").forEach(initFormValidation);
}
/* ---------- End Form Validation ---------- */

/* ---------- Start App ---------- */
initMobileMenu();
initActiveNavLink();
initPortfolioFilter();
initLandingSlider();
initStatsCounters();
initSkillBars();
initForms();
/* ---------- End App ---------- */
