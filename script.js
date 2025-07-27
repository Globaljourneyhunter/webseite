document.addEventListener("DOMContentLoaded", async () => {
  await loadSidebar();
});

async function loadSidebar() {
  try {
    const res = await fetch("sidebar.html"); // ✅ Pfad korrigiert
    const html = await res.text();
    const sidebarPlaceholder = document.getElementById("sidebar-placeholder");

    if (sidebarPlaceholder) {
      sidebarPlaceholder.innerHTML = html;
      highlightCurrentLink();
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
document.addEventListener("DOMContentLoaded", async () => {
  await loadSidebar();

  const hamburger = document.getElementById("hamburger-button");
  hamburger?.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("open");
  });
});

async function loadSidebar() {
  try {
    const res = await fetch("sidebar.html");
    const html = await res.text();
    const sidebarPlaceholder = document.getElementById("sidebar-placeholder");

    if (sidebarPlaceholder) {
      sidebarPlaceholder.innerHTML = html;
      highlightCurrentLink();
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
