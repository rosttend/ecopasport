/* ---- Переключатель услуг в hero ---- */
const heroData = {
  passport: {
    title: 'Паспорт отходов <span class="accent">1–4 класса</span> — за 5 дней',
    lead: 'Определим класс опасности, оформим паспорт и согласуем. Без визитов в Росприроднадзор и очередей.',
    cta: 'Заказать паспорт'
  },
  bio: {
    title: 'Протокол биотестирования <span class="accent">5 класса</span> — за 3 дня',
    lead: 'Для 5 класса паспорт не нужен: аккредитованная лаборатория подтвердит класс опасности протоколом.',
    cta: 'Получить протокол'
  }
};

const heroTitle = document.getElementById('heroTitle');
const heroLead  = document.getElementById('heroLead');
const heroCta   = document.getElementById('heroCta');

document.querySelectorAll('.toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const d = heroData[btn.dataset.service];
    heroTitle.innerHTML = d.title;
    heroLead.textContent = d.lead;
    heroCta.innerHTML = d.cta + ' <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  });
});

/* ---- Калькулятор ---- */
const calcType   = document.getElementById('calcType');
const calcCount  = document.getElementById('calcCount');
const calcRegion = document.getElementById('calcRegion');
const calcPrice  = document.getElementById('calcPrice');
const calcTime   = document.getElementById('calcTime');

function formatPrice(n){
  return n.toLocaleString('ru-RU') + ' ₽';
}

function calc(){
  const type = calcType.value;
  const count = parseInt(calcCount.value, 10);
  const region = parseFloat(calcRegion.value);

  let base, perItem, days;
  if (type === 'passport') {
    base = 12000; perItem = 4500; days = 5;
  } else {
    base = 8000; perItem = 3200; days = 3;
  }

  // скидка за количество
  let discount = 1;
  if (count >= 8) discount = 0.85;
  else if (count >= 3) discount = 0.93;

  let price = (base + perItem * count) * discount * region;
  // округляем до 500
  price = Math.round(price / 500) * 500;

  const totalDays = days + Math.max(0, Math.floor(count / 3));

  calcPrice.textContent = formatPrice(price);
  calcTime.textContent = `Срок: около ${totalDays} рабочих дней`;
}

[calcType, calcCount, calcRegion].forEach(el => el.addEventListener('change', calc));
calc();

/* ---- Счетчики ---- */
const counters = document.querySelectorAll('[data-count]');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = cur + (target === 100 ? '%' : '+');
    }, 22);
    io.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => io.observe(c));

/* ---- Появление блоков ---- */
const rev = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      rev.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => rev.observe(el));