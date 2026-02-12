// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Catalog filter + search
const grid = document.getElementById("catalogGrid");
const buttons = document.querySelectorAll("[data-filter]");
const searchInput = document.getElementById("searchInput");

function applyCatalogFilter() {
  if (!grid) return;

  const activeBtn = document.querySelector("[data-filter].is-active");
  const filter = activeBtn ? activeBtn.dataset.filter : "all";
  const query = (searchInput?.value || "").trim().toLowerCase();

  const items = grid.querySelectorAll(".product");
  items.forEach((item) => {
    const cat = item.dataset.cat;
    const name = (item.dataset.name || "").toLowerCase();
    const text = item.innerText.toLowerCase();
    const matchFilter = (filter === "all") || (cat === filter);
    const matchSearch = !query || name.includes(query) || text.includes(query);

    item.style.display = (matchFilter && matchSearch) ? "flex" : "none";
  });
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    applyCatalogFilter();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", applyCatalogFilter);
  applyCatalogFilter();
}

// Contact form -> mailto
const form = document.getElementById("requestForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get("name");
    const phone = data.get("phone");
    const type = data.get("type");
    const comment = data.get("comment") || "";

    const subject = encodeURIComponent("Заявка на меблі (сайт)");
    const body = encodeURIComponent(
      `Ім'я: ${name}\nТелефон: ${phone}\nТип: ${type}\n\nКоментар:\n${comment}\n\nАдреса фабрики: вул. Чигирина 111, с. Руська Поляна, Черкаська обл.`
    );

    // Для практичної: можна вказати умовну пошту, наприклад info@rmk.ua
    const email = "info@example.com";
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });
}
