const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const careerChoices = document.querySelectorAll("[data-career-choice]");
const careerLabel = document.querySelector("#career-label");
const careerSummary = document.querySelector("#career-summary");
const careerCopy = {
  programming: {
    label: "DESARROLLO DE SOFTWARE · .NET",
    summary: "Aplicaciones web, .NET y bases de datos.",
  },
  security: {
    label: "CIBERSEGURIDAD · ANÁLISIS JUNIOR",
    summary: "Aprendizaje en análisis junior, redes y protección digital.",
  },
};
careerChoices.forEach((choice) => choice.addEventListener("click", () => {
  const focus = choice.dataset.careerChoice;
  const copy = careerCopy[focus];
  if (!copy) return;
  document.body.dataset.career = focus;
  careerChoices.forEach((tab) => tab.setAttribute("aria-pressed", String(tab === choice)));
  if (careerLabel) careerLabel.textContent = copy.label;
  if (careerSummary) careerSummary.textContent = copy.summary;
}));

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  nav?.classList.toggle("is-open", !isOpen);
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Abrir menú");
  nav.classList.remove("is-open");
}));

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const glow = document.querySelector(".cursor-glow");
if (!motionPreference.matches && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow?.style.setProperty("left", `${event.clientX}px`);
    glow?.style.setProperty("top", `${event.clientY}px`);
  }, { passive: true });

  const visual = document.querySelector(".hero-visual");
  const avatar = document.querySelector("[data-tilt]");
  visual?.addEventListener("pointermove", (event) => {
    if (!avatar) return;
    const bounds = visual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    avatar.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -9}deg) translate3d(${x * 5}px, ${y * 5}px, 8px)`;
  });
  visual?.addEventListener("pointerleave", () => {
    if (avatar) avatar.style.transform = "rotateY(0) rotateX(0) translate3d(0, 0, 0)";
  });
}

if (!motionPreference.matches && "IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal-ready");
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".section-heading,.about-grid,.principles,.journey-intro,.journey-grid,.journey-footer,.projects-intro,.project-tile,.project-footnote,.contact-panel").forEach((item) => observer.observe(item));
}
