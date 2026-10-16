'use strict';

/* =====================================================
   ДАННЫЕ РАСПИСАНИЯ (здесь удобно вносить правки)
   Формат пары: L(номер пары 0–4, часть, 'Предмет', 'Аудитория')
   часть: 0 – первая половина (45 мин), 1 – вторая половина, 2 – вся пара
   ===================================================== */

const L = (s, h, name, room = '') => ({ s, h, name, room });

const FIZ = L(1, 1, 'Физ-ра', 'с/з');
const IST = L(2, 2, 'Ист. Бел. Государственности', '310');
const MAT = L(3, 2, 'Матем. в проф. деят.', '302');

const MON = [
  FIZ,
  L(2, 2, 'Иностранный язык', '119, 168'),
  L(3, 2, 'Инженерная графика', '317, 319'),
  L(4, 2, 'Тех. Электроника', '110'),
];
const FRI = [
  L(0, 2, 'Сетевые технологии', '104'),
  L(1, 0, 'Астрономия', '311'),
  FIZ,
  L(2, 2, 'Общая физика', '311'),
];

// 1-я неделя: пн–сб
const WEEK_A = [
  MON,
  [L(0, 2, 'Общая физика', '216'), L(1, 2, 'ТЭЦ', '206'), IST, MAT],
  [L(0, 2, 'Иностранный язык', '213, 216'), L(1, 0, 'Охрана труда', '219'), FIZ, L(2, 2, 'Матем. в проф. деят.', '302')],
  [L(1, 2, 'Охрана труда', '201'), L(2, 2, 'ТЭЦ', '206'), L(3, 2, 'Ист. Бел. Государственности', '310')],
  FRI,
  [L(1, 2, 'Астрономия', '309'), L(2, 2, 'Инф. Технологии', '321, 318'), L(3, 2, 'Охрана окр. сред.', '311')],
];
// 2-я неделя: пн–сб
const WEEK_B = [
  MON,
  [L(0, 2, 'Общая физика', '216'), L(1, 2, 'ТЭЦ', '206'), IST, MAT],
  [L(1, 0, 'Охрана труда', '219'), FIZ, L(2, 2, 'Матем. в проф. деят.', '302'), L(3, 2, 'Тех. Электроника', '110')],
  [L(0, 2, 'Инф. Технологии', '321, 318'), L(1, 2, 'Охрана труда', '201'), L(2, 2, 'ТЭЦ', '206')],
  FRI,
  [L(2, 2, 'Инф. Технологии', '321, 318'), L(3, 2, 'Охрана окр. сред.', '311')],
];

const TEACH = {
  'Физ-ра': 'Аврамова Т. П., Воропаев И. В.',
  'Иностранный язык': 'Соколова А. А., Филосенко О. В.',
  'Инженерная графика': 'Влас Л. П., Кот М. А.',
  'Тех. Электроника': 'Кот Л. М.',
  'Общая физика': 'Василевский Г. В., Шило П. Н.',
  'ТЭЦ': 'Позняк А. В., Семёнова Д. В.',
  'Ист. Бел. Государственности': 'Ведерникова Л. Э.',
  'Матем. в проф. деят.': 'Щасная А. В.',
  'Охрана труда': 'Жигадло Т. В.',
  'Сетевые технологии': 'Шиян-Фролова А. П.',
  'Астрономия': 'Василевский Г. В., Шило П. Н.',
  'Инф. Технологии': 'Юган О. Г., Винькова Т. И.',
  'Охрана окр. сред.': 'Прадун Т. А.',
};

// Отменённые пары: 'дд.мм': 'начало названия предмета'
const DEL = { '27.10': 'Ист.', '29.10': 'Ист.' };

// Доставленные пары: 'дд.мм': [пары]
const HIST5 = L(4, 2, 'Ист. Бел. Государственности');
const OT = (h, room) => L(3, h, 'Охрана труда', room);
const ADD = {
  '21.10': [L(4, 2, 'Охрана окр. сред.', '311')],
  '11.11': [OT(0, '211')],
  '19.11': [OT(2, '308')],
  '20.11': [HIST5],
  '25.11': [OT(0, '211')],
  '27.11': [HIST5],
  '03.12': [OT(2, '308')],
  '09.12': [OT(0, '211')],
  '11.12': [HIST5],
  '17.12': [OT(2, '308')],
  '23.12': [OT(0, '211')],
};

// Праздничные дни Беларуси (img – необязательная картинка на фон)
const HOLIDAYS = {
  '07.11': { name: 'День Октябрьской революции', img: 'img/lenin.jpg' },
  '25.12': { name: 'Рождество Христово (католическое)' },
  '01.01': { name: 'Новый год', img: 'img/ded-moroz.jpg' },
  '02.01': { name: 'Новый год', img: 'img/snegurochka.jpg' },
  '07.01': { name: 'Рождество Христово (православное)' },
};

const SESSION_FROM = new Date(2027, 0, 5);
const SESSION_TO = new Date(2027, 0, 11);

// Первый понедельник семестра (неделя 1) и последний день календаря
const START = new Date(2026, 9, 12);
const END = new Date(2027, 0, 11);

// Время пар: [начало, конец 1-й половины, начало 2-й половины, конец]
const TIMES = [
  ['08:00', '08:45', '08:55', '09:40'],
  ['09:55', '10:40', '10:50', '11:35'],
  ['12:15', '13:00', '13:10', '13:55'],
  ['14:10', '14:55', '15:05', '15:50'],
  ['16:20', '17:05', '17:15', '18:00'],
];
const BREAKS = [
  ['11:35', '12:15', '🍴', 'Обед'],
  ['15:50', '16:20', '☕', 'Большой перерыв'],
];

/* ===================================================== */

const DAY = 864e5;
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const MONTHS_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const DOW = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const DOW_FULL = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const $ = (id) => document.getElementById(id);
const p2 = (n) => String(n).padStart(2, '0');
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const idx = (d) => Math.round((d - START) / DAY);
const key = (d) => p2(d.getDate()) + '.' + p2(d.getMonth() + 1);
const iso = (d) => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
const same = (a, b) => a.getTime() === b.getTime();
const clamp = (d) => (d < START ? START : d > END ? END : d);
const inSession = (d) => d >= SESSION_FROM && d <= SESSION_TO;
const hm = (s) => { const [h, m] = s.split(':'); return +h * 60 + +m; };
const hue = (s) => [...s].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 360;
const todayDate = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
const plural = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'занятие' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'занятия' : 'занятий');

function span(l) {
  const t = TIMES[l.s];
  return l.h === 2 ? [t[0], t[3]] : l.h === 0 ? [t[0], t[1]] : [t[2], t[3]];
}

function lessonsFor(d) {
  const n = idx(d), w = Math.floor(n / 7), dow = n % 7;
  if (dow === 6 || inSession(d)) return [];
  const k = key(d);
  const list = (w % 2 ? WEEK_B : WEEK_A)[dow].map((x) => ({ ...x, st: '' }));
  const del = DEL[k];
  if (del) list.forEach((x) => { if (x.name.startsWith(del)) x.st = 'del'; });
  (ADD[k] || []).forEach((x) => list.push({ ...x, st: 'add' }));
  if (HOLIDAYS[k]) list.forEach((x) => { x.st = 'hol'; });
  return list.sort((a, b) => hm(span(a)[0]) - hm(span(b)[0]));
}

/* ---------- Состояние ---------- */

let date = null;

function parseHash() {
  const m = /^#(\d{4})-(\d\d)-(\d\d)$/.exec(location.hash);
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return isNaN(d) ? null : d;
}

function go(d, dir) {
  d = clamp(d);
  if (date && same(d, date)) return;
  if (dir === undefined) dir = date ? Math.sign(d - date) : 0;
  date = d;
  try { history.replaceState(null, '', '#' + iso(d)); } catch (e) { /* file:// */ }
  render(dir);
}

function stepDay(step) {
  let d = addDays(date, step);
  if (idx(d) % 7 === 6) d = addDays(d, step); // воскресенье пропускаем
  if (d < START || d > END) return;
  go(d, step);
}

function stepWeek(step) {
  go(addDays(date, 7 * step), step);
}

/* ---------- Отрисовка ---------- */

function renderDays() {
  const w = Math.floor(idx(date) / 7);
  const mon = addDays(START, w * 7);
  const now = todayDate();
  $('days').innerHTML = [...Array(7)].map((_, i) => {
    const d = addDays(mon, i), k = key(d);
    const out = d < START || d > END;
    let dot = '';
    if (!out) {
      if (HOLIDAYS[k]) dot = 'bad';
      else if (inSession(d)) dot = 'ses';
      else {
        const ls = lessonsFor(d);
        if (ls.some((x) => x.st === 'add')) dot = 'ok';
        else if (ls.some((x) => x.st === 'del')) dot = 'bad';
      }
    }
    const cls = ['chip', i === 6 ? 'sun' : '', same(d, now) ? 'now' : ''].join(' ');
    return `<button class="${cls}" data-t="${d.getTime()}" aria-pressed="${same(d, date)}" ${out ? 'disabled' : ''}>` +
      `<small>${DOW[i]}</small><b>${d.getDate()}</b>${dot ? `<i class="${dot}"></i>` : ''}</button>`;
  }).join('');
}

function card(l) {
  const [a, b] = span(l);
  const room = l.room === 'с/з' ? 'спортзал' : l.room ? 'ауд. ' + l.room : (l.st === 'add' ? 'аудитория не указана' : '');
  const meta = [room, l.h === 2 ? '' : '45 мин'].filter(Boolean).join(' · ');
  const badge = { add: '<span class="badge ok">доп. пара</span>', del: '<span class="badge bad">отмена</span>', hol: '<span class="badge bad">праздник</span>' }[l.st] || '';
  const teach = TEACH[l.name];
  return `<div class="row"><div class="time"><b>${a}</b><span>${b}</span></div>` +
    `<article class="card ${l.st}" style="--h:${hue(l.name)}"><div class="ct"><h3>${l.name}</h3>${badge}</div>` +
    (meta ? `<p class="meta">${meta}</p>` : '') +
    (teach ? `<p class="teach">${teach}</p>` : '') +
    `</article></div>`;
}

function banner(kind, title, sub, img) {
  return `<section class="banner ${kind}${img ? ' img' : ''}"${img ? ` style="--bg-img:url('${img}')"` : ''}><b>${title}</b><span>${sub}</span></section>`;
}

function renderList(dir) {
  const k = key(date), dow = idx(date) % 7;
  const ls = lessonsFor(date);
  const active = ls.filter((x) => x.st === '' || x.st === 'add');
  let sub = '';
  if (active.length) {
    const first = Math.min(...active.map((x) => hm(span(x)[0])));
    const last = Math.max(...active.map((x) => hm(span(x)[1])));
    const f = (m) => p2(Math.floor(m / 60)) + ':' + p2(m % 60);
    sub = `${active.length} ${plural(active.length)} · ${f(first)}–${f(last)}`;
  }
  let html = `<div class="dayhead"><h2>${DOW_FULL[dow]}, ${date.getDate()} ${MONTHS[date.getMonth()]}</h2><span>${sub}</span></div>`;

  const hol = HOLIDAYS[k];
  if (hol) html += banner('hol', 'Праздничный день', hol.name + ', занятий нет', hol.img);
  if (inSession(date)) html += banner('ses', 'Сессия', '5–11 января, обычных занятий нет');

  if (!ls.length && !hol && !inSession(date)) {
    html += `<div class="empty"><b>${dow === 6 ? 'Воскресенье' : 'Занятий нет'}</b>${dow === 6 ? 'Занятий нет, можно отдохнуть' : 'В этот день пар нет'}</div>`;
  }

  let prevEnd = null;
  ls.forEach((l) => {
    const [a, b] = span(l);
    if (prevEnd) {
      BREAKS.forEach(([f, t, icon, label]) => {
        if (hm(prevEnd) <= hm(f) && hm(a) >= hm(t)) {
          html += `<div class="brk"><span>${icon}</span><span><b>${label}</b> ${f} – ${t}</span></div>`;
        }
      });
    }
    html += card(l);
    if (!prevEnd || hm(b) > hm(prevEnd)) prevEnd = b;
  });

  const el = $('list');
  el.classList.remove('l', 'r');
  void el.offsetWidth;
  if (dir) el.classList.add(dir > 0 ? 'l' : 'r');
  el.innerHTML = html;
}

function render(dir) {
  const w = Math.floor(idx(date) / 7);
  const mon = addDays(START, w * 7), sun = addDays(mon, 6);
  $('wnum').textContent = 'Неделя ' + (w % 2 + 1);
  $('wrange').textContent = `${mon.getDate()} ${MONTHS_SHORT[mon.getMonth()]} – ${sun.getDate()} ${MONTHS_SHORT[sun.getMonth()]}`;
  const opt = `${date.getFullYear()}-${date.getMonth()}`;
  if ([...$('month').options].some((o) => o.value === opt)) $('month').value = opt;
  $('today').hidden = same(clamp(todayDate()), date);
  $('prevW').disabled = w === 0;
  $('nextW').disabled = w >= Math.floor(idx(END) / 7);
  renderDays();
  renderList(dir);
  if (dir) window.scrollTo({ top: 0 });
}

/* ---------- События ---------- */

function swipe(el, cb) {
  let x = 0, y = 0;
  el.addEventListener('touchstart', (e) => { x = e.touches[0].clientX; y = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - x, dy = e.changedTouches[0].clientY - y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    cb(dx < 0 ? 1 : -1);
  }, { passive: true });
}

$('days').addEventListener('click', (e) => {
  const b = e.target.closest('.chip');
  if (b && !b.disabled) go(new Date(+b.dataset.t));
});
$('prevW').onclick = () => stepWeek(-1);
$('nextW').onclick = () => stepWeek(1);
$('today').onclick = () => go(todayDate());
$('month').onchange = (e) => {
  const [y, m] = e.target.value.split('-').map(Number);
  let d = new Date(y, m, 1);
  if (d < START) d = START;
  if (idx(d) % 7 === 6) d = addDays(d, 1);
  go(d);
};

swipe($('list'), stepDay);
swipe($('days'), stepWeek);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') $('sheet').hidden = true;
  if ($('sheet').hidden && e.target.tagName !== 'SELECT') {
    if (e.key === 'ArrowLeft') stepDay(-1);
    if (e.key === 'ArrowRight') stepDay(1);
  }
});

$('info').onclick = () => { $('sheet').hidden = false; };
$('close').onclick = () => { $('sheet').hidden = true; };
$('sheet').addEventListener('click', (e) => { if (e.target === $('sheet')) $('sheet').hidden = true; });

window.addEventListener('hashchange', () => {
  const d = parseHash();
  if (d) go(d);
});

/* ---------- Старт: открываем сегодняшний день ---------- */

go(parseHash() || todayDate(), 0);
