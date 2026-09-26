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
/* ---------- Start App ---------- */
initMobileMenu();
initActiveNavLink();
initPortfolioFilter();
/* ---------- End App ---------- */
