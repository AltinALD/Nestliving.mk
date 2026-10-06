document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
const form = document.querySelector("#visit-form");

function onScroll() {
  header.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.72);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

function closeNav() {
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  header.classList.remove("menu-open");
  document.body.style.overflow = "";
}

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
  header.classList.toggle("menu-open", !open);
  document.body.style.overflow = open ? "" : "hidden";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.removeAttribute("src");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-zoom]").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImg.src = button.dataset.zoom;
    lightboxImg.alt = button.dataset.caption || "";
    lightboxCaption.textContent = button.dataset.caption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox-close").focus();
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!lightbox.hidden) closeLightbox();
    if (nav.classList.contains("is-open")) closeNav();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    "Здраво Nest Living, сакам да закажам средба за Eden Residence.",
    `Име: ${data.get("name")}`,
    `Телефон: ${data.get("phone")}`,
    `Интерес: ${data.get("type")}`
  ].join("\n");
  window.open(`https://wa.me/38976680660?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
