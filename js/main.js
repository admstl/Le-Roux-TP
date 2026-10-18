const burger = document.getElementById('burger'), nav = document.getElementById('nav');
burger.addEventListener('click', () => burger.setAttribute('aria-expanded', nav.classList.toggle('open')));
nav.addEventListener('click', e => { if (e.target.tagName === 'A' && !e.target.parentElement.classList.contains('dd')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

// Lien actif selon la page
const here = location.pathname.split('/').pop() || 'index.html';
nav.querySelectorAll('a').forEach(a => { if (a.getAttribute('href') === here) a.classList.add('on'); });

// Statut du standard (lundi-vendredi 8h-17h30, heure de Paris)
(function () {
  const el = document.getElementById('status'); if (!el) return;
  const n = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  const t = n.getHours() + n.getMinutes() / 60, d = n.getDay();
  const open = d >= 1 && d <= 5 && t >= 8 && t < 17.5;
  el.textContent = open ? 'Standard ouvert jusqu’à 17h30 · Landudec' : 'Standard fermé · réouverture à 8h en semaine';
  el.classList.toggle('open', open);
})();
