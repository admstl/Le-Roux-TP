(function () {
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches,
    touch = matchMedia("(hover: none)").matches;

  // Lueur au curseur + légère inclinaison 3D
  window.__spot = (c) => {
    c.addEventListener("mousemove", (e) => {
      const r = c.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;
      c.style.setProperty("--x", x + "px");
      c.style.setProperty("--y", y + "px");
      if (c.dataset.tilt && !still && !touch)
        c.style.transform = `perspective(900px) rotateX(${(0.5 - y / r.height) * 6}deg) rotateY(${(x / r.width - 0.5) * 8}deg) translateY(-3px)`;
    });
    c.addEventListener("mouseleave", () => {
      c.style.transform = "";
    });
  };
  $$(".bento .spot,.stat").forEach((c) => (c.dataset.tilt = 1));
  $$(".spot").forEach(window.__spot);

  // Titre mot par mot
  $$("[data-words]").forEach((el) => {
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    let i = 0;
    (function walk(n, g) {
      [...n.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((t) => {
            if (!t.trim()) {
              f.append(t);
              return;
            }
            const s = document.createElement("span");
            s.className = "w" + (g ? " grad" : "");
            s.style.setProperty("--i", i++);
            s.setAttribute("aria-hidden", "true");
            s.textContent = t;
            f.append(s);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1) {
          const isG = c.classList.contains("grad");
          walk(c, g || isG);
          if (isG) c.classList.remove("grad");
        }
      });
    })(el, false);
  });

  // Apparitions
  $$(".checks li").forEach((li, k) => {
    li.classList.add("reveal");
    li.style.transitionDelay = k * 90 + "ms";
  });
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  $$(".reveal").forEach((el) => io.observe(el));

  // Compteurs
  const cio = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        const t = +e.target.dataset.n,
          s = performance.now();
        (function tick(now) {
          const p = Math.min(1, (now - s) / 1500);
          e.target.textContent = Math.round(t * (1 - Math.pow(1 - p, 4)));
          if (p < 1 && !still) requestAnimationFrame(tick);
          else e.target.textContent = t;
        })(s);
      }),
    { threshold: 0.5 },
  );
  $$("[data-n]").forEach((el) => cio.observe(el));

  // Scroll : parallaxe, marquage routier
  const img = $("[data-par]"),
    steps = $(".steps");
  let tick = false;
  function onScroll() {
    tick = false;
    if (img && !still) {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight)
        img.style.transform = `translateY(${-(innerHeight - r.top) * 0.06}px)`;
    }
    if (steps) {
      const r = steps.getBoundingClientRect(),
        line = innerHeight * 0.6;
      steps.style.setProperty(
        "--p",
        Math.min(1, Math.max(0, (line - r.top) / r.height)),
      );
      $$("li", steps).forEach((li) =>
        li.classList.toggle("on", li.getBoundingClientRect().top < line),
      );
    }
  }
  addEventListener(
    "scroll",
    () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  addEventListener("resize", onScroll);
  onScroll();

  // Infobulle de la carte
  const tip = $("#tip");
  $$(".node").forEach((n) => {
    const on = () => {
        $("#tip-t").textContent = n.dataset.t;
        $("#tip-m").textContent = n.dataset.m;
        tip.classList.add("on");
      },
      off = () => tip.classList.remove("on");
    n.addEventListener("mouseenter", on);
    n.addEventListener("focus", on);
    n.addEventListener("mouseleave", off);
    n.addEventListener("blur", off);
  });
})();
