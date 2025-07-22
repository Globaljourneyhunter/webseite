document.addEventListener("DOMContentLoaded", async () => {
  await loadSidebar();
});

async function loadSidebar() {
  const res = await fetch("sidebar.html");
  const html = await res.text();
  document.getElementById("sidebar-placeholder").innerHTML = html;

  const SUPABASE_URL = 'https://jerlamdfuqxydtekomxy.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) {
    window.location.href = "login.html";
    return;
  }

  // Logout-Button
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await supabaseClient.auth.signOut();
      window.location.href = "login.html";
    });
  }

  // Menü-Klicks
  document.querySelectorAll(".menu-toggle").forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      const li = toggle.parentElement;

      document.querySelectorAll(".sidebar li.has-submenu").forEach(otherLi => {
        if (otherLi !== li) {
          otherLi.classList.remove("active");
          const submenu = otherLi.querySelector("ul.submenu");
          if (submenu) submenu.style.display = "none";
        }
      });

      li.classList.toggle("active");
      const submenu = li.querySelector("ul.submenu");
      if (submenu) {
        submenu.style.display = li.classList.contains("active") ? "block" : "none";
      }
    });
  });

  markActiveSidebarLink();
  markSidebarViewed();
  setupIntroBoxes();
  setupOptionBoxes();

  const continueBtn = document.getElementById("continue-button");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const page = window.location.pathname.split("/").pop().replace(".html", "");
      localStorage.setItem(page + "-viewed", "true");
      markSidebarViewed();
    });
  }
}

// ✅ HIER NEU UND VERBESSERT
function markActiveSidebarLink() {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".sidebar ul.submenu").forEach(sub => {
    sub.style.display = "none";
  });

  document.querySelectorAll(".sidebar li a").forEach(link => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");

      const submenu = link.closest(".submenu");
      if (submenu) {
        submenu.style.display = "block";
        const parentLi = submenu.closest("li.has-submenu");
        if (parentLi) {
          parentLi.classList.add("active");
          const toggle = parentLi.querySelector(".menu-toggle");
          if (toggle) toggle.classList.add("active");
        }
      } else {
        const parentLi = link.closest("li.has-submenu");
        if (parentLi) {
          parentLi.classList.add("active");
          const submenu = parentLi.querySelector(".submenu");
          if (submenu) submenu.style.display = "block";

          const toggle = parentLi.querySelector(".menu-toggle");
          if (toggle) toggle.classList.add("active");
        }
      }
    } else {
      link.classList.remove("active");
    }
  });
}

function markSidebarViewed() {
  document.querySelectorAll(".sidebar li a").forEach(link => {
    const href = link.getAttribute("href");
    const page = href ? href.replace(".html", "") : "";
    if (page && localStorage.getItem(page + "-viewed") === "true") {
      link.classList.add("viewed");
    }
  });
}

function setupIntroBoxes() {
  const introBoxes = document.querySelectorAll('.intro-box');
  if (!introBoxes.length) return;

  introBoxes.forEach(box => {
    const key = box.getAttribute('data-box') + '-viewed';
    if (localStorage.getItem(key) === 'true') {
      box.classList.add('viewed');
    }

    box.addEventListener('click', () => {
      localStorage.setItem(key, 'true');
      box.classList.add('viewed');

      const target = box.dataset.box;
      if (target === 'was-sind-meilen') {
        window.location.href = 'was-sind-meilen.html';
      } else if (target === 'wie-funktionieren-meilenprogramme') {
        window.location.href = 'wie-funktionieren-meilenprogramme.html';
      } else if (target === 'warum-meilen-sammeln') {
        window.location.href = 'warum-meilen-sammeln.html';
      }
    });
  });
}

function setupOptionBoxes() {
  const boxes = document.querySelectorAll(".option-box");
  if (!boxes.length) return;

  boxes.forEach(box => {
    box.addEventListener("click", () => {
      const target = box.dataset.link;
      if (target) {
        window.location.href = target;
      }
    });
  });
}
