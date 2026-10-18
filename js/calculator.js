(function () {
  const $ = id => document.getElementById(id);
  if (!$('len')) return;
  const len = $('len'), wid = $('wid'), dep = $('dep'), mats = document.querySelectorAll('.mat');
  const colors = { Remblai: '#a89f91', Sable: '#e5c384', Gravillons: '#94a3b8', Grave: '#64748b' };
  let density = 1.7, name = 'Remblai';
  const fr = (n, d) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
  function compute() {
    const surf = (+len.value || 0) * (+wid.value || 0), vol = surf * ((+dep.value || 0) / 100), tons = vol * density * 1.1;
    $('o-surf').textContent = fr(surf, 1) + ' m²'; $('o-vol').textContent = fr(vol, 2) + ' m³'; $('o-ton').textContent = fr(tons, 1);
    $('layer').style.height = Math.min(60, Math.max(10, (+dep.value / 40) * 60)) + 'px'; $('layer').style.background = colors[name];
  }
  function pick(mat) { mats.forEach(m => { m.classList.toggle('on', m.dataset.name === mat); if (m.dataset.name === mat) { density = +m.dataset.d; name = mat; } }); }
  [len, wid, dep].forEach(i => i.addEventListener('input', compute));
  mats.forEach(b => b.addEventListener('click', () => { pick(b.dataset.name); compute(); }));
  document.querySelectorAll('[data-p]').forEach(b => b.addEventListener('click', () => {
    const [l, w, d, m] = b.dataset.p.split(','); len.value = l; wid.value = w; dep.value = d; pick(m); compute();
  }));
  $('to-quote').addEventListener('click', () => {
    $('f-type').value = 'Livraison de matériaux de carrière';
    $('f-msg').value = `Besoin estimé : ${$('o-surf').textContent} en ${name}, ${$('o-vol').textContent}, environ ${$('o-ton').textContent} tonnes.`;
    location.hash = '#contact'; $('f-msg').focus();
  });
  compute();
})();
