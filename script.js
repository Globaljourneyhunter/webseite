document.addEventListener("DOMContentLoaded", async () => {
  await loadSidebar();

  // Hamburger Setup direkt aufrufen (für den Fall, dass HTML-Button bereits existiert)
  if (window.innerWidth <= 768) {
    setupHamburger();
  }
});

async function loadSidebar() {
  try {
    const res = await fetch("sidebar.html");
    const html = await res.text();
    const sidebarPlaceholder = document.getElementById("sidebar-placeholder");

    if (sidebarPlaceholder) {
      sidebarPlaceholder.innerHTML = html;
      highlightCurrentLink();

      // setupHamburger wird bereits oben bei DOMContentLoaded aufgerufen
    }
  } catch (error) {
    console.error("Sidebar konnte nicht geladen werden:", error);
  }
}

function highlightCurrentLink() {
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "") currentPage = "index.html";

  document.querySelectorAll(".sidebar li a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function setupHamburger() {
  const hamburger = document.getElementById("hamburger-button");
  const sidebar = document.querySelector(".sidebar");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  } else {
    // Falls Sidebar dynamisch nachgeladen wird
    const observer = new MutationObserver(() => {
      const hamburger = document.getElementById("hamburger-button");
      const sidebar = document.querySelector(".sidebar");

      if (hamburger && sidebar) {
        hamburger.addEventListener("click", () => {
          sidebar.classList.toggle("open");
        });
        observer.disconnect(); // Stoppt das Beobachten, wenn einmal verbunden
      }
    });

    const placeholder = document.getElementById("sidebar-placeholder");
    if (placeholder) {
      observer.observe(placeholder, {
        childList: true,
        subtree: true,
      });
    }
  }
}
