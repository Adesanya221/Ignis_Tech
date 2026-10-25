/* Ignis Tech — UI interactions */

/* ---------- Render Lucide icons ---------- */
if (window.lucide) lucide.createIcons();

/* ---------- Hero background video: pause for reduced-motion users ---------- */
const heroBgVideo = document.querySelector(".hero-bg-video");
if (heroBgVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroBgVideo.pause();
  heroBgVideo.removeAttribute("autoplay");
  heroBgVideo.style.display = "none";
}

/* ---------- Navbar background on scroll ---------- */
const navbar = document.getElementById("navbar");
const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 30);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Active link highlighting ---------- */
const navLinks = document.getElementById("navLinks");
const sections = [...document.querySelectorAll("section[id], footer[id]")];
const linkMap = new Map(
  [...navLinks.querySelectorAll(".nav-link")].map((a) => [a.getAttribute("href").slice(1), a])
);

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      linkMap.forEach((a) => a.classList.remove("active"));
      const link = linkMap.get(entry.target.id);
      if (link) link.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => activeObserver.observe(s));

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Intro video: always looping, no controls ---------- */
const aboutVideo = document.querySelector(".video-loop video");
if (aboutVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  aboutVideo.pause();
  aboutVideo.removeAttribute("autoplay");
}

/* ---------- Lenis smooth scrolling (plugin) ---------- */
let lenis = null;
if (window.Lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);

  // Route anchor clicks through Lenis for buttery scroll-to-section
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      lenis.scrollTo(id, { offset: -70 });
      history.replaceState(null, "", id);
    }
  });
}

/* ---------- Spotlight hover: track pointer over cards ---------- */
const spotlightCards = document.querySelectorAll(".service-card, .ai-card, .about-benefits li");
spotlightCards.forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

/* ---------- 3D tilt on the hero photo ---------- */
const heroVisual = document.querySelector(".hero-visual");
const finePointer = window.matchMedia("(pointer: fine)").matches;
if (heroVisual && finePointer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVisual.classList.add("tilt");
  heroVisual.parentElement.classList.add("tilt-wrap");
  const MAX = 6; // degrees
  heroVisual.addEventListener("pointermove", (e) => {
    const r = heroVisual.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    heroVisual.style.transform = `rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg)`;
  });
  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.transform = "";
  });
}

/* ---------- Signup form (demo — connect to your backend later) ---------- */
const form = document.getElementById("joinForm");
const status = document.getElementById("formStatus");
const submitBtn = form.querySelector("button[type=submit]");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const interest = form.interest.value;

  if (!name || !email || !interest) {
    status.textContent = "Please fill in all fields.";
    status.className = "form-status err";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = "Please enter a valid email address.";
    status.className = "form-status err";
    return;
  }

  // Demo submit — replace with a fetch() to your API / Google Form / Formspree
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating Account…";

  setTimeout(() => {
    status.textContent = `Welcome aboard, ${name.split(" ")[0]}! 🔥 Check your email to finish setting up your account.`;
    status.className = "form-status ok";
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = "Create Account →";
  }, 900);
});

/* ---------- Booking form → WhatsApp ---------- */
const WHATSAPP_NUMBER = "2349058177116"; // +234 905 817 7116
const bookForm = document.getElementById("bookForm");
const bookStatus = document.getElementById("bookStatus");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Honeypot: real users never fill this — bots do. Silently drop them.
  if (bookForm.company.value) {
    bookStatus.textContent = "Thank you! We'll be in touch shortly.";
    bookStatus.className = "form-status ok";
    return;
  }

  const name = bookForm.name.value.trim();
  const phone = bookForm.phone.value.trim();
  const service = bookForm.service.value;
  const message = bookForm.message.value.trim();

  if (!name || !phone || !service) {
    bookStatus.textContent = "Please fill in your name, phone number and select a service.";
    bookStatus.className = "form-status err";
    return;
  }
  if ((phone.match(/\d/g) || []).length < 7) {
    bookStatus.textContent = "Please enter a valid phone / WhatsApp number.";
    bookStatus.className = "form-status err";
    return;
  }

  // Compose the booking message with the visitor's info
  const lines = [
    `Hi Ignis Tech! New booking enquiry from the website:`,
    ``,
    `👤 Name: ${name}`,
    `📞 Phone: ${phone}`,
    `🎯 Service: ${service}`,
  ];
  if (message) lines.push(`📝 Details: ${message}`);

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

  bookStatus.textContent = `Opening WhatsApp to send your booking, ${name.split(" ")[0]}…`;
  bookStatus.className = "form-status ok";
  window.open(waUrl, "_blank", "noopener");

  setTimeout(() => {
    bookStatus.textContent = "✓ Sent! If WhatsApp didn't open, tap the Chat on WhatsApp button beside the form.";
    bookForm.reset();
  }, 1500);
});
