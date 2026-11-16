/**
 * AIMPRIMIR3D - Main JavaScript
 * Interacciones de navegación, scroll y utilidades globales.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Resaltar enlace activo según la página actual
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http")) return;

    if (
      (currentPath.endsWith("/") || currentPath.endsWith("index.html")) &&
      (href === "index.html" || href === "./" || href === "/")
    ) {
      link.classList.add("active");
    } else if (href.includes(currentPath.split("/").pop()) && currentPath !== "/") {
      link.classList.add("active");
    }
  });

  // 2. Comportamiento navbar al hacer scroll (sombra sutil)
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // 3. Smooth scroll para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length <= 1) return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 4. Actualización automática de año en el footer
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
