// TODO : remplacer les URLs distantes par des photos locales (assets/img/*.webp).
// Les 6 premiers chantiers sont ceux affichés sur l'accueil.
(function () {
  const grid = document.getElementById("grid");
  if (!grid) return;
  const B = "https://www.lerouxtp.fr/wp-content/uploads/";
  const P = [
    {
      t: "Parking de Locmaria",
      p: "Quimper",
      c: "urbain",
      i:
        B +
        "2020/06/LE_ROUX_TP_travaux-publics-amenagement-demolition-quimper-locmaria-parking-finistere-bretagne-1-2.jpg",
    },
    {
      t: "Conserverie Gonidec – Les Mouettes d’Arvor",
      p: "Concarneau",
      c: "commerce",
      i: B + "2014/02/8.Gonidec-02.jpg",
    },
    {
      t: "Magasin Lidl",
      p: "Châteaulin",
      c: "commerce",
      i: "assets/img/lidl-chateaulin.jpeg",
    },
    {
      t: "Démolition d’une maison",
      p: "Gourlizon",
      c: "demolition",
      i:
        B +
        "2020/07/LE_ROUX_TP_travaux-publics-DEMOLITION-MAISON-GOURLIZON.jpg",
    },
    {
      t: "Cinéma Cinéville",
      p: "Pont-l’Abbé",
      c: "commerce",
      i: "assets/img/LE_ROUX_TP_travaux-publics-voirie-parking-enrobé-aménagement-cinema-cineville-pont-l-abbe-finistere-bretagne-1.jpg",
    },
    {
      t: "Magasin Lidl",
      p: "Plomeur",
      c: "commerce",
      i: "assets/img/LE_ROUX_TP_travaux-publics-voirie-parking-enrobé-aménagement-LIDL-supermarche-plomeur-finistere-bretagne-1.jpg",
    },
    {
      t: "Travaux de terrassement",
      p: "Terrassement",
      c: "terrass",
      i: B + "2014/01/6-NIVELEUSE.jpg",
    },
    {
      t: "Voirie et routes",
      p: "Travaux publics",
      c: "urbain",
      i: B + "2014/01/1.Voirie.jpg",
    },
    {
      t: "Laboratoire d’analyses médicales",
      p: "Construction immobilière",
      c: "terrass",
      i: B + "2014/01/1.Labo-01.jpg",
    },
    {
      t: "Voirie et parking du port",
      p: "Audierne",
      c: "urbain",
      i:
        B +
        "2020/07/LE_ROUX_TP_travaux-publics-amenagement-urbain-audierne-Credit-Pascal-Leopold-1-scaled.jpg",
    },
    {
      t: "Dune de la plage de Léhan",
      p: "Treffiagat",
      c: "enroch",
      i: "./assets/img/Dune-plage-Léhan.jpeg",
    },
  ];
  const cats = {
    all: "Tous",
    urbain: "Voirie et aménagement",
    commerce: "Commerces et industrie",
    demolition: "Démolition",
    enroch: "Enrochement",
    terrass: "Terrassement et construction",
  };
  const limit = +grid.dataset.limit || 0;
  const filters = document.getElementById("filters");
  const lb = document.getElementById("lb");
  let list = P;
  let cur = 0;

  function render(f) {
    list = P.filter((p) => f === "all" || p.c === f);
    if (limit) list = list.slice(0, limit);
    grid.innerHTML = list
      .map(
        (p, k) =>
          `<button class="card spot" data-tilt="1" data-k="${k}" type="button"><div class="im"><img src="${p.i}" alt="${p.t}, ${p.p}" loading="lazy"></div><div class="tx"><strong>${p.t}</strong><span>${p.p}</span></div></button>`,
      )
      .join("");
    if (filters)
      filters
        .querySelectorAll("button")
        .forEach((b) => b.setAttribute("aria-pressed", b.dataset.f === f));
    grid
      .querySelectorAll(".spot")
      .forEach((c) => window.__spot && window.__spot(c));
  }
  // Image introuvable : on affiche un encart propre au lieu du texte alternatif
  grid.addEventListener(
    "error",
    (e) => {
      if (e.target.tagName === "IMG")
        e.target.closest(".im").classList.add("noimg");
    },
    true,
  );

  function show(k) {
    cur = (k + list.length) % list.length;
    const p = list[cur];
    const img = document.getElementById("lb-img");
    img.src = p.i;
    img.alt = p.t;
    document.getElementById("lb-t").textContent = p.t;
    document.getElementById("lb-p").textContent = p.p;
  }

  if (filters) {
    filters.innerHTML = Object.entries(cats)
      .map(([k, v]) => `<button type="button" data-f="${k}">${v}</button>`)
      .join("");
    filters.addEventListener(
      "click",
      (e) => e.target.dataset.f && render(e.target.dataset.f),
    );
  }
  grid.addEventListener("click", (e) => {
    const c = e.target.closest(".card");
    if (c && lb) {
      show(+c.dataset.k);
      lb.showModal();
    }
  });
  if (lb) {
    document.getElementById("lb-prev").onclick = () => show(cur - 1);
    document.getElementById("lb-next").onclick = () => show(cur + 1);
    document.getElementById("lb-close").onclick = () => lb.close();
    lb.addEventListener("click", (e) => {
      if (e.target === lb) lb.close();
    });
    addEventListener("keydown", (e) => {
      if (!lb.open) return;
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }
  render("all");
})();
