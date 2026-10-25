/* Course page renderer — fills course.html from courses-data.js */

(function () {
  const params = new URLSearchParams(location.search);
  const slug = params.get("course") in COURSES ? params.get("course") : "web-development";
  const c = COURSES[slug];

  /* ---------- Title & hero ---------- */
  document.title = `${c.title} Course — Ignis Tech`;
  document.getElementById("cEyebrow").textContent = `Ignis Tech · ${c.title}`;
  document.getElementById("cTitle").textContent = c.title;
  document.getElementById("cTagline").textContent = c.tagline;

  const metaIcons = { duration: "clock", level: "gauge", format: "monitor", outcome: "award" };
  document.getElementById("cMeta").innerHTML = Object.entries(c.details)
    .map(
      ([k, v]) =>
        `<span class="meta-chip"><i data-lucide="${metaIcons[k]}"></i>${v}</span>`
    )
    .join("");

  /* ---------- Placeholder image builder ----------
     Shows a labelled box until a real file exists at the path;
     the moment you drop the JPG in, it replaces the box. */
  function ph(src, ratio, note) {
    return `<div class="ph" data-ratio="${ratio}">
      <div class="ph-label"><b>PLACEHOLDER IMAGE</b><span>${note}</span><code>${src}</code></div>
      <img src="${src}" alt="" onerror="this.parentElement.classList.add('missing')" />
    </div>`;
  }

  document.getElementById("cHeroImg").innerHTML = ph(c.images.hero, "4/3", "recommended 1200×900");
  document.getElementById("cBuildImg").innerHTML = ph(c.images.build, "4/3", "recommended 1200×900");
  document.getElementById("cClassImg").innerHTML = ph(c.images.classroom, "4/3", "recommended 1200×900");

  /* ---------- Roadmap timeline ---------- */
  document.getElementById("cRoadmap").innerHTML = c.roadmap
    .map(
      (s, i) => `<li class="stage reveal">
        <div class="stage-num">${String(i + 1).padStart(2, "0")}</div>
        <div class="stage-body">
          <h3>${s.title}</h3>
          <ul class="stage-bullets">
            ${s.bullets.map((b) => `<li><i data-lucide="check"></i>${b}</li>`).join("")}
          </ul>
        </div>
      </li>`
    )
    .join("");

  /* ---------- Details cards ---------- */
  const detailCards = [
    { icon: "timer", label: "Schedule", value: c.details.duration },
    { icon: "gauge", label: "Skill Level", value: c.details.level },
    { icon: "monitor", label: "Format", value: c.details.format },
    { icon: "award", label: "You Walk Away With", value: c.details.outcome },
  ];
  document.getElementById("cDetails").innerHTML = detailCards
    .map(
      (d) => `<div class="detail-card reveal">
        <i data-lucide="${d.icon}"></i>
        <span class="detail-label">${d.label}</span>
        <span class="detail-value">${d.value}</span>
      </div>`
    )
    .join("");

  document.getElementById("cBuildDesc").textContent = c.buildDesc;

  /* ---------- Enroll CTAs (pre-filled WhatsApp) ---------- */
  const msg = encodeURIComponent(`Hi, I'd like to enroll in ${c.title}`);
  const wa = `https://wa.me/${WHATSAPP}?text=${msg}`;
  ["cEnrollTop", "cEnrollBuild", "cEnrollBig"].forEach((id) => {
    document.getElementById(id).href = wa;
  });

  /* ---------- Shared UI behaviour (icons, reveals, navbar) ---------- */
  if (window.lucide) lucide.createIcons();

  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
})();
