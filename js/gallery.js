// TODO : remplacer les URLs distantes par des photos fournies, en WebP dans /assets
(function () {
  const grid = document.getElementById('grid'); if (!grid) return;
  const B = 'https://www.lerouxtp.fr/wp-content/uploads/';
  const P = [
    { t: 'Parking de Locmaria', p: 'Quimper', c: 'pro', i: B + '2020/06/LE_ROUX_TP_travaux-publics-amenagement-demolition-quimper-locmaria-parking-finistere-bretagne-1-2.jpg' },
    { t: 'Conserverie Gonidec – Les Mouettes d’Arvor', p: 'Concarneau', c: 'pro', i: B + '2014/02/8.Gonidec-02.jpg' },
    { t: 'Voirie et parking, port d’Audierne', p: 'Audierne', c: 'pro', i: B + '2020/07/LE-ROUX-TP-travaux-publics-am%C3%A9nagement-urbain-ville-port-audierne-parking-voirie-trottoirs-video-youtube.png' },
    { t: 'Dune de la plage de Léhan', p: 'Treffiagat', c: 'enroch', i: B + '2020/12/LE-ROUX-TP-travaux-publics-am%C3%A9nagement-plage-treffiagat-Lehan-enrochement-renforcement-littoral-finistere-decembre-2020-video-youtube.png' },
    { t: 'Magasin Lidl', p: 'Châteaulin', c: 'pro', i: B + '2020/06/lidl-thumb-video.jpg' },
    { t: 'Démolition d’une maison', p: 'Gourlizon', c: 'pro', i: B + '2020/07/LE_ROUX_TP_travaux-publics-DEMOLITION-MAISON-GOURLIZON.jpg' },
    { t: 'Cinéma Cinéville', p: 'Pont-l’Abbé', c: 'pro', i: B + '2020/06/LE_ROUX_TP_travaux-publics-voirie-parking-enrob%C3%A9-am%C3%A9nagement-cinema-cineville-pont-l-abbe-finistere-bretagne-1.jpg' },
    { t: 'Magasin Lidl', p: 'Plomeur', c: 'pro', i: B + '2020/06/LE_ROUX_TP_travaux-publics-voirie-parking-enrob%C3%A9-am%C3%A9nagement-LIDL-supermarche-plomeur-finistere-bretagne-1.jpg' },
    { t: 'Travaux de terrassement', p: 'Terrassement', c: 'pro', i: B + '2014/01/6-NIVELEUSE.jpg' },
    { t: 'Voirie et routes', p: 'Travaux publics', c: 'pro', i: B + '2014/01/1.Voirie.jpg' },
    { t: 'Laboratoire d’analyses médicales', p: 'Construction immobilière', c: 'pro', i: B + '2014/01/1.Labo-01.jpg' }
  ];
  const cats = { all: 'Tous', pro: 'Collectivités et pros', enroch: 'Enrochement' };
  const filters = document.getElementById('filters'), lb = document.getElementById('lb');
  let list = P, cur = 0;
  function render(f) {
    list = P.filter(p => f === 'all' || p.c === f);
    grid.innerHTML = list.map((p, k) => `<button class="card spot" data-tilt="1" data-k="${k}" type="button"><div class="im"><img src="${p.i}" alt="${p.t}, ${p.p}" loading="lazy"></div><div class="tx"><strong>${p.t}</strong><span>${p.p}</span></div></button>`).join('');
    filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.f === f));
    grid.querySelectorAll('.spot').forEach(c => window.__spot && window.__spot(c));
  }
  function show(k) { cur = (k + list.length) % list.length; const p = list[cur]; document.getElementById('lb-img').src = p.i; document.getElementById('lb-img').alt = p.t; document.getElementById('lb-t').textContent = p.t; document.getElementById('lb-p').textContent = p.p + ' (29)'; }
  filters.innerHTML = Object.entries(cats).map(([k, v]) => `<button type="button" data-f="${k}">${v}</button>`).join('');
  filters.addEventListener('click', e => e.target.dataset.f && render(e.target.dataset.f));
  grid.addEventListener('click', e => { const c = e.target.closest('.card'); if (c) { show(+c.dataset.k); lb.showModal(); } });
  document.getElementById('lb-prev').onclick = () => show(cur - 1);
  document.getElementById('lb-next').onclick = () => show(cur + 1);
  document.getElementById('lb-close').onclick = () => lb.close();
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  addEventListener('keydown', e => { if (!lb.open) return; if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  render('all');
})();
