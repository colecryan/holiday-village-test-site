// Shared header, footer, "Easier to read" settings and the ask-a-question box. Needs hv-data.js first.
// No menu bar of tabs: people ask, pick a door on the start page, or press Back.
const OFFICE = { phone: '(856) 866-1753', tel: '+18568661753' };
const LOGO = 'https://holidayvillage55.com/wp-content/themes/vlm/images/logo.png';
const PAGES = [
  ['residents.html', 'Residents’ page'], ['whats-on.html', "What's On"], ['news.html', 'News and The Villager'],
  ['forms.html', 'Forms and rules'], ['board.html', 'Board and meetings'], ['my-info.html', 'My Info'],
  ['new-here.html', 'New to the village'], ['visit.html', 'Thinking of moving here'], ['contact.html', 'Contact the office'],
];
const BACK = { residents: ['residents.html', 'Back to the residents’ page'], start: ['index.html', 'Back to the start page'] };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// The Workspace viewer sandboxes pages, where storage throws; then the reading settings ride along in the page address instead.
const store = { get: k => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
const canStore = (() => { try { return !!localStorage; } catch { return false; } })();

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const day0 = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
// Events from today on, soonest first.
function upcoming(n, today = day0(new Date())) {
  return EVENTS.filter(e => day0(e.d + 'T12:00') >= today).slice(0, n);
}
function eventCard(e) {
  const dt = new Date(e.d + 'T12:00');
  return `<article class="event"><div class="date"><small>${DAYS[dt.getDay()]}</small><b>${dt.getDate()}</b><small>${MONTHS[dt.getMonth()]}</small></div>
    <div><h3>${esc(e.t)}</h3><p class="when">${esc(e.when)}, ${esc(e.where)}</p><p>${esc(e.what)}</p></div>
    <div class="join"><span class="chip ${e.chip[0]}">${esc(e.chip[1])}</span>${e.join ? '<br>' + esc(e.join) : ''}</div></article>`;
}
function eventsAnswer() {
  const next = upcoming(3);
  return next.length ? `<div class="events">${next.map(eventCard).join('')}</div><p style="margin-top:12px">Every week: chair yoga, Mondays 11:15 a.m. and Wednesdays 9:30 a.m.</p>`
    : '<p>Nothing is listed for the next few weeks yet. The newest Villager will have the next events.</p>';
}
function answerHtml(x, speak = true) {
  const body = x.a === 'EVENTS' ? eventsAnswer() : x.a;
  return `<div class="answer-body">${body}</div><div class="answer-go">
    <a class="btn arrow" href="${x.go[0]}">${esc(x.go[1])}</a>${speak ? '<button type="button" class="btn light speak">Read this to me</button>' : ''}</div>`;
}

// Find answers by the words in them: a typed word counts when it starts a word in the question or its other words.
const STOP = new Set(['the', 'is', 'my', 'a', 'an', 'do', 'does', 'i', 'to', 'of', 'what', 'when', 'where', 'how', 'can', 'for', 'on', 'it', 'in', 'me', 'need', 'and', 'are', 'there', 'about', 'want', 'get', 'go', 'out', 'day']);
function findAnswers(text) {
  const words = text.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter(w => w.length > 1 && !STOP.has(w));
  if (!words.length) return [];
  return ANSWERS.map(x => {
    const hay = (x.q + ' ' + x.w).toLowerCase().split(/[^a-z0-9']+/);
    const hits = words.filter(w => hay.some(h => h.startsWith(w) || (w.length > 3 && h.length > 3 && w.startsWith(h))));
    return [hits.length / words.length, x];
  }).filter(([s]) => s >= 0.5).sort((a, b) => b[0] - a[0]).slice(0, 3).map(([, x]) => x);
}

(function () {
  const d = document.documentElement, body = document.body;

  // reading settings: text size, stronger contrast
  const SIZES = [['normal', 'Normal'], ['big', 'Large'], ['xl', 'Extra large']];
  const applySize = s => { d.classList.remove('big', 'xl'); if (s === 'big' || s === 'xl') d.classList.add(s); };
  const url = new URLSearchParams(location.search);
  applySize(url.get('size') || store.get('hv-size'));
  d.classList.toggle('strong', (url.get('contrast') || (store.get('hv-strong') === '1' ? 'on' : '')) === 'on');
  if (!canStore) document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || !/^[\w-]+\.html(#.*)?$/.test(a.getAttribute('href'))) return;
    const [file, hash] = a.getAttribute('href').split('#'), q = new URLSearchParams();
    if (d.classList.contains('big') || d.classList.contains('xl')) q.set('size', d.classList.contains('xl') ? 'xl' : 'big');
    if (d.classList.contains('strong')) q.set('contrast', 'on');
    a.href = file + (q.size ? '?' + q : '') + (hash ? '#' + hash : '');
  }, true);

  const back = BACK[body.dataset.back];
  const top = `<a class="skip" href="#main">Skip to the page</a>
  <header class="top"><div class="wrap">
    <a class="logo" href="index.html" aria-label="Holiday Village start page"><img src="${LOGO}" alt="Holiday Village" width="205" height="105"></a>
    <div class="ask" role="search">
      <label for="ask">What do you need?</label>
      <div class="ask-row"><input id="ask" type="search" placeholder='Try "trash day"' autocomplete="off"><button type="button" class="btn" id="ask-go">Find it</button></div>
    </div>
    <a class="call" href="tel:${OFFICE.tel}" aria-label="Call the office, ${OFFICE.phone}"><small>Call the office</small><span class="num">${OFFICE.phone}</span></a>
    <button type="button" class="comfort-btn" id="comfort-btn" aria-expanded="false" aria-controls="comfort"><b>Aa</b> <span>Easier to read</span></button>
  </div>
  <div class="comfort" id="comfort" hidden><div class="wrap">
    <div class="comfort-group"><span>Text size</span>
      ${SIZES.map(([k, t]) => `<button type="button" class="opt size-${k}" data-size="${k}" aria-pressed="false"><b>A</b>${t}</button>`).join('')}</div>
    <div class="comfort-group"><span>Colors</span><button type="button" class="opt" id="strong" aria-pressed="false"><b>&#9680;</b>Stronger contrast</button></div>
    <div class="comfort-group" id="read-group"><span>Listen</span><button type="button" class="opt" id="read-page" aria-pressed="false"><b>&#9654;</b><em>Read this page to me</em></button></div>
    <button type="button" class="btn light" id="comfort-close">Done</button>
  </div></div>
  <div class="answers" id="answers" hidden aria-live="polite"></div>
  </header>
  ${back ? `<div class="backbar"><div class="wrap"><a class="btn light back" href="${back[0]}">&larr; ${back[1]}</a></div></div>` : ''}`;

  const foot = `<footer class="foot"><div class="wrap">
    <div class="foot-grid">
      <div><h4>The village office</h4><p>1 Holiday Blvd.<br>Mount Laurel, NJ 08054</p><p><a href="tel:${OFFICE.tel}">${OFFICE.phone}</a></p></div>
      <div><h4>Office hours</h4><p>Monday, Tuesday, Wednesday and Friday: 9 a.m. to 3 p.m.</p><p>Thursday: 9 a.m. to 4 p.m.</p><p>Appointments by request.</p></div>
      <div><h4>Clubhouse</h4><p>Open every day, 6 a.m. to 11 p.m., with your key fob.</p></div>
      <div><h4>Every page</h4>${PAGES.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div>
    </div>
    <p class="mock">Test design for Holiday Village. Not the live site. Photos of people are free stand-in pictures until the village has its own.</p>
  </div></footer>`;

  document.querySelector('[data-top]').outerHTML = top;
  document.querySelector('[data-foot]').outerHTML = foot;

  // the "Easier to read" panel
  const panel = document.getElementById('comfort'), pBtn = document.getElementById('comfort-btn');
  const openPanel = open => { panel.hidden = !open; pBtn.setAttribute('aria-expanded', open); };
  pBtn.addEventListener('click', () => openPanel(panel.hidden));
  document.getElementById('comfort-close').addEventListener('click', () => { openPanel(false); pBtn.focus(); });
  const syncSize = () => {
    const now = d.classList.contains('xl') ? 'xl' : d.classList.contains('big') ? 'big' : 'normal';
    panel.querySelectorAll('[data-size]').forEach(b => b.setAttribute('aria-pressed', b.dataset.size === now));
    document.getElementById('strong').setAttribute('aria-pressed', d.classList.contains('strong'));
  };
  panel.querySelectorAll('[data-size]').forEach(b => b.addEventListener('click', () => { applySize(b.dataset.size); store.set('hv-size', b.dataset.size); syncSize(); }));
  document.getElementById('strong').addEventListener('click', () => { d.classList.toggle('strong'); store.set('hv-strong', d.classList.contains('strong') ? '1' : '0'); syncSize(); });
  syncSize();

  // read aloud with the browser's own voice: free, and nothing is sent anywhere
  const voice = window.speechSynthesis;
  let reading = null;
  const label = b => b.querySelector('em, .say');
  function stopReading() {
    if (voice) voice.cancel();
    if (reading) { reading.setAttribute('aria-pressed', 'false'); label(reading).textContent = reading.dataset.label; reading = null; }
  }
  function readAloud(btn, el) {
    if (reading === btn) return stopReading();
    stopReading();
    const u = new SpeechSynthesisUtterance(el.innerText.replace(/Read this to me|Stop reading/g, '').replace(/\s+/g, ' '));
    u.rate = 0.92; u.onend = () => { if (reading === btn) stopReading(); };
    btn.dataset.label ||= label(btn).textContent;
    label(btn).textContent = 'Stop reading';
    btn.setAttribute('aria-pressed', 'true'); reading = btn;
    voice.speak(u);
  }
  if (!voice) { document.getElementById('read-group').hidden = true; d.classList.add('no-voice'); }
  else document.getElementById('read-page').addEventListener('click', e => readAloud(e.currentTarget, document.getElementById('main')));
  document.addEventListener('click', e => {
    const b = e.target.closest('.speak');
    if (!b || !voice) return;
    if (!label(b)) b.innerHTML = '<span class="say">' + b.textContent + '</span>';
    readAloud(b, b.closest('.answer, details'));
  });

  // ask a question: answers appear right under the box, on the same page
  const input = document.getElementById('ask'), out = document.getElementById('answers');
  function show(text) {
    if (!text.trim()) { out.hidden = true; return; }
    const found = findAnswers(text);
    out.hidden = false;
    out.innerHTML = `<div class="wrap"><div class="answers-head"><h2>${found.length ? 'Here is what I found' : 'I couldn’t find that'}</h2>
      <button type="button" class="btn light" id="answers-close">Close</button></div>
      ${found.map(x => `<article class="answer"><h3>${esc(x.q)}</h3>${answerHtml(x)}</article>`).join('')}
      <p class="answers-call">${found.length ? 'Not what you need?' : 'Try a shorter word, like "pool" or "trash".'} The office will help: <a href="tel:${OFFICE.tel}">${OFFICE.phone}</a></p></div>`;
    document.getElementById('answers-close').addEventListener('click', () => { out.hidden = true; input.value = ''; input.focus(); });
  }
  let timer;
  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => show(input.value), 400); });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { clearTimeout(timer); show(input.value); }
    if (e.key === 'Escape') out.hidden = true;
  });
  document.getElementById('ask-go').addEventListener('click', () => { show(input.value); if (!input.value) input.focus(); });
  // a button elsewhere can ask for you: <button data-ask="trash">
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-ask]');
    if (!b) return;
    input.value = b.dataset.ask; show(b.dataset.ask);
    scrollTo({ top: 0, behavior: 'smooth' }); input.focus({ preventScroll: true });
  });
})();
