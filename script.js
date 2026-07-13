(() => {
  const c = window.HAUCK_STAGE_CONFIG || {},
    links = c.links || {},
    root = document.getElementById("plans");
  if (root)
    root.innerHTML = (c.plans || [])
      .map(
        (p) =>
          `<article class="plan ${p.featured ? "featured" : ""}"><p class="eyebrow">${p.kicker}</p><h3>${p.name}</h3><p class="desc">${p.description}</p><small>${p.note}</small><p class="price">${p.price}</p><ul>${p.features.map((f) => `<li>${f}</li>`).join("")}</ul><a class="btn ${p.featured ? "primary" : "ghost"}" href="${links.whatsapp || "#"}">${p.cta}</a></article>`,
      )
      .join("");
  document.querySelectorAll("[data-link]").forEach((el) => {
    const href = links[el.dataset.link];
    if (href) {
      el.href = href;
      if (href.startsWith("http")) {
        el.target = "_blank";
        el.rel = "noopener";
      }
    }
  });

  const header = document.querySelector("header"),
    menu = document.querySelector(".menu");
  if (header && menu) {
    menu.setAttribute("aria-expanded", "false");
    menu.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });
    header.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
