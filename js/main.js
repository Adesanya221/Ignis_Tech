/* Ignis Tech — UI interactions */

/* ---------- Render Lucide icons ---------- */
if (window.lucide) lucide.createIcons();

/* ---------- Hero videos: pause for reduced-motion users ---------- */
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("video[autoplay]").forEach((v) => {
    v.pause();
    v.removeAttribute("autoplay");
  });
  const heroBg = document.querySelector(".hero-bg-video");
  if (heroBg) heroBg.style.display = "none";
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
        const servicesGrid = entry.target.closest(".services-grid");
        if (servicesGrid) {
          servicesGrid.querySelectorAll(".service-card").forEach((card) => {
            card.classList.add("visible");
            obs.unobserve(card);
          });
        }
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
  document.documentElement.classList.add("lenis");
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      // real navbar height (it grows on mobile) + breathing room
      const navH = navbar ? navbar.offsetHeight : 70;
      // reveal the target's content immediately so nothing pops in mid-arrival
      document.querySelectorAll(`${id} .reveal`).forEach((el) => el.classList.add("visible"));
      lenis.scrollTo(id, { offset: -(navH + 12), duration: 1.1 });
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

/* ---------- Signup form (guarded — commented out in favor of WhatsApp booking) ---------- */
const form = document.getElementById("joinForm");
if (form) {
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
}

/* ---------- Booking form → WhatsApp ---------- */
const WHATSAPP_NUMBER = "2349058177116"; // +234 905 817 7116
const bookForm = document.getElementById("bookForm");
const bookStatus = document.getElementById("bookStatus");

if (bookForm) {
  // Pre-select service if passed in URL query e.g. ?service=web-development
  const urlParams = new URLSearchParams(window.location.search);
  const preselect = urlParams.get("service") || urlParams.get("course");
  if (preselect && bookForm.service) {
    const term = preselect.toLowerCase();
    for (let opt of bookForm.service.options) {
      if (opt.value.toLowerCase().includes(term)) {
        bookForm.service.value = opt.value;
        break;
      }
    }
  }

  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Honeypot: real users never fill this — bots do. Silently drop them.
    if (bookForm.company && bookForm.company.value) {
      if (bookStatus) {
        bookStatus.textContent = "Thank you! We'll be in touch shortly.";
        bookStatus.className = "form-status ok";
      }
      return;
    }

    const name = bookForm.name.value.trim();
    const phone = bookForm.phone.value.trim();
    const service = bookForm.service.value;
    const message = bookForm.message.value.trim();

    if (!name || !phone || !service) {
      if (bookStatus) {
        bookStatus.textContent = "Please fill in your name, phone number and select a service.";
        bookStatus.className = "form-status err";
      }
      return;
    }
    if ((phone.match(/\d/g) || []).length < 7) {
      if (bookStatus) {
        bookStatus.textContent = "Please enter a valid phone / WhatsApp number.";
        bookStatus.className = "form-status err";
      }
      return;
    }

    // Compose the booking message with the visitor's chosen service & info
    const lines = [
      `Hi Ignis Tech! New booking enquiry from the website:`,
      ``,
      `👤 Name: ${name}`,
      `📞 Phone: ${phone}`,
      `🎯 Service: ${service}`,
    ];
    if (message) lines.push(`📝 Details: ${message}`);

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

    if (bookStatus) {
      bookStatus.textContent = `Opening WhatsApp to send your booking, ${name.split(" ")[0]}…`;
      bookStatus.className = "form-status ok";
    }
    window.open(waUrl, "_blank", "noopener");

    setTimeout(() => {
      if (bookStatus) {
        bookStatus.textContent = "✓ Sent! If WhatsApp didn't open, reach out directly at +234 905 817 7116.";
      }
      bookForm.reset();
    }, 1500);
  });
}

/* ---------- Endless Courses Carousel: touch pause ---------- */
const coursesTrack = document.getElementById("coursesTrack");
if (coursesTrack) {
  coursesTrack.addEventListener("touchstart", () => {
    coursesTrack.style.animationPlayState = "paused";
  }, { passive: true });
  coursesTrack.addEventListener("touchend", () => {
    coursesTrack.style.animationPlayState = "running";
  }, { passive: true });
}
