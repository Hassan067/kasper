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

/* ---------- Start App ---------- */
initMobileMenu();
/* ---------- End App ---------- */
