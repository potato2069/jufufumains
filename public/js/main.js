// Mobile nav toggle
const toggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });
}

// Highlight the active nav link based on current URL
document.querySelectorAll(".nav-link").forEach((link) => {
  const href = link.getAttribute("href");
  const path = window.location.pathname;

  if (href === "/" && path === "/") {
    link.classList.add("nav-link--active");
  } else if (href !== "/" && path.startsWith(href)) {
    link.classList.add("nav-link--active");
  }
});
