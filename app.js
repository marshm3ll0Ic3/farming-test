const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const renderList = (container, items, template) => {
  container.innerHTML = items.map(template).join('');
};

const heroMetricsEl = $('#heroMetrics');
renderList(heroMetricsEl, heroMetrics, (metric) => `
  <div class="hero-metric">
    <div>
      <p>${metric.label}</p>
      <strong>${metric.value}</strong>
    </div>
    <span>${metric.trend}</span>
  </div>
`);

renderList($('#howSteps'), howItWorks, (step) => `
  <article class="glass">
    <h3>${step.icon} ${step.title}</h3>
    <p>${step.body}</p>
  </article>
`);

const drawSparkline = (canvas, data) => {
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = '#33c27f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  data.forEach((value, index) => {
    const x = (index / (data.length - 1)) * (w - 10) + 5;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const y = h - ((value - min) / (max - min || 1)) * (h - 10) - 5;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
};

const kpiGrid = $('#kpiGrid');
kpiGrid.innerHTML = kpis.map((kpi, idx) => `
  <article class="glass kpi-card">
    <p>${kpi.icon} ${kpi.title}</p>
    <h3>${kpi.value}</h3>
    <small>${kpi.change}</small>
    <canvas class="sparkline" id="spark-${idx}" aria-hidden="true"></canvas>
    <button class="pill">${kpi.cta}</button>
  </article>
`).join('');

kpis.forEach((kpi, idx) => {
  drawSparkline(document.getElementById(`spark-${idx}`), kpi.spark);
});

const drawPriceChart = (range = 7) => {
  const canvas = document.getElementById('priceChart');
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = 220;
  ctx.clearRect(0, 0, width, height);
  const crops = Object.keys(priceSeries[range]);
  const colors = ['#33c27f', '#0e8f55', '#ffc94c'];
  crops.forEach((crop, idx) => {
    const series = priceSeries[range][crop];
    const min = Math.min(...series);
    const max = Math.max(...series);
    ctx.strokeStyle = colors[idx];
    ctx.lineWidth = 3;
    ctx.beginPath();
    series.forEach((value, i) => {
      const x = (i / (series.length - 1)) * (width - 20) + 10;
      const y = height - ((value - min) / (max - min || 1)) * (height - 20) - 10;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  });
  renderList($('#chartLegend'), crops, (crop, idx) => `<span><i style="background:${colors[idx]}"></i>${crop}</span>`);
};

drawPriceChart();

$$('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    drawPriceChart(parseInt(btn.dataset.range, 10));
  });
});

renderList($('#inventoryBars'), inventory, (item) => {
  const total = item.available + item.committed + item.stored;
  const segments = [
    { label: 'Available', value: item.available, color: 'rgba(51,194,127,0.8)' },
    { label: 'Committed', value: item.committed, color: 'rgba(255,201,76,0.8)' },
    { label: 'Stored', value: item.stored, color: 'rgba(14,143,85,0.6)' },
  ];
  return `
    <div class="inventory-row">
      <p><strong>${item.crop}</strong> · ${total.toLocaleString()} kg</p>
      <div class="inventory-bar" role="progressbar" aria-valuenow="${item.available}" aria-valuemax="${total}">
        ${segments.map(seg => `<span style="width:${(seg.value / total) * 100}% ; background:${seg.color}" title="${seg.label}: ${seg.value.toLocaleString()} kg"></span>`).join('')}
      </div>
    </div>
  `;
});

const kanbanBoard = $('#kanbanBoard');
kanbanBoard.innerHTML = Object.entries(kanbanColumns).map(([column, cards]) => `
  <div class="column">
    <h4>${column}</h4>
    ${cards.map(card => `<div class="card">${card}</div>`).join('')}
  </div>
`).join('');

renderList($('#logisticsTable'), logisticsBids, (bid) => `
  <tr>
    <td>${bid.route}</td>
    <td>${bid.bid}</td>
    <td>${bid.eta}</td>
    <td>${bid.rating}</td>
    <td><span class="badge">${bid.status}</span></td>
  </tr>
`);

const cropSet = [...new Set(marketData.map(d => d.crop))];
const countySet = [...new Set(marketData.map(d => d.county))];
const gradeSet = [...new Set(marketData.map(d => d.grade))];

const populateSelect = (select, list) => {
  select.innerHTML = '<option value="">All</option>' + list.map(item => `<option value="${item}">${item}</option>`).join('');
};

populateSelect($('#cropFilter'), cropSet);
populateSelect($('#countyFilter'), countySet);
populateSelect($('#gradeFilter'), gradeSet);

const renderMarket = () => {
  const crop = $('#cropFilter').value;
  const county = $('#countyFilter').value;
  const grade = $('#gradeFilter').value;
  const filtered = marketData.filter(item => (!crop || item.crop === crop) && (!county || item.county === county) && (!grade || item.grade === grade));
  renderList($('#marketTable'), filtered, (item) => `
    <div class="market-card">
      <h3>${item.crop} · ${item.grade}</h3>
      <p>${item.county}</p>
      <p class="value">KSh ${item.price}/kg</p>
      <small>Min ${item.min} · Max ${item.max}</small>
    </div>
  `);
};

['#cropFilter', '#countyFilter', '#gradeFilter'].forEach(sel => {
  $(sel).addEventListener('change', renderMarket);
});
$('#resetFilters').addEventListener('click', () => {
  ['#cropFilter', '#countyFilter', '#gradeFilter'].forEach(sel => $(sel).value = '');
  renderMarket();
});
renderMarket();

let produce = [...produceSeed];
const produceList = $('#produceList');
const renderProduce = () => {
  if (!produce.length) {
    $('#emptyState').hidden = false;
    produceList.innerHTML = '';
    return;
  }
  $('#emptyState').hidden = true;
  renderList(produceList, produce, (item) => `
    <article class="glass card">
      <h3>${item.crop} · ${item.grade}</h3>
      <p>${item.qty.toLocaleString()} kg @ KSh ${item.price}</p>
      <p>${item.warehouse}</p>
      <span class="badge">${item.status}</span>
    </article>
  `);
};
renderProduce();

$('#produceForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  produce.push({ crop: data.crop, grade: data.grade, qty: Number(data.qty), price: Number(data.price), warehouse: data.warehouse || 'Unassigned', status: data.status });
  form.reset();
  renderProduce();
});

$('#prefillOnion').addEventListener('click', () => {
  produce.push({ crop: 'Onion', grade: 'A', qty: 1500, price: 88, warehouse: 'Kirinyaga Solar Dry', status: 'Draft' });
  renderProduce();
});

renderList($('#transactionTable'), transactions, (txn) => `
  <tr>
    <td>${txn.ref}</td>
    <td>${txn.type}</td>
    <td>KSh ${txn.amount.toLocaleString()}</td>
    <td><span class="badge">${txn.status}</span></td>
    <td>${txn.date}</td>
  </tr>
`);

renderList($('#accountingCards'), accountingCards, (card) => `
  <article class="card">
    <h3>${card.title}</h3>
    <p>${card.value}</p>
    <small>${card.detail}</small>
  </article>
`);

$('#expenseInsight').textContent = '⚠️ Fertilizer costs up 25% this month';

renderList($('#buyerCards'), buyers, (buyer) => `
  <article class="card">
    <h3>${buyer.name}</h3>
    <p>${buyer.badge}</p>
    <p>${buyer.detail}</p>
    <strong>${buyer.price}</strong>
    <div class="button-row">
      <button class="pill">Chat</button>
      <button class="pill">Add to Cart</button>
    </div>
  </article>
`);

const threadList = $('#threadList');
renderList(threadList, threads, (thread) => `
  <div class="thread" data-id="${thread.id}">
    <h4>${thread.title}</h4>
    <small>${thread.participants.join(', ')}</small>
    <p>${thread.last}</p>
  </div>
`);

let activeThread = null;
const chatWindow = $('#chatWindow');

const openThread = (id) => {
  activeThread = threads.find(t => t.id === id);
  $$('#threadList .thread').forEach(el => el.classList.toggle('active', el.dataset.id === id));
  if (!activeThread) return;
  $('#chatTitle').textContent = activeThread.title;
  chatWindow.innerHTML = activeThread.messages.map(msg => `<div class="message-bubble ${msg.from === 'You' ? 'me' : ''}">${msg.body}</div>`).join('');
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

threadList.addEventListener('click', (e) => {
  const target = e.target.closest('.thread');
  if (target) openThread(target.dataset.id);
});

$('#chatForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!activeThread) return;
  const formData = new FormData(e.target);
  const body = formData.get('message');
  if (!body) return;
  const message = { body, from: 'You' };
  activeThread.messages.push(message);
  chatWindow.innerHTML += `<div class="message-bubble me">${body}</div>`;
  e.target.reset();
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

renderList($('#coopTargets'), coopTargets, (target) => {
  const percent = Math.round((target.current / target.target) * 100);
  return `
    <div class="coop-target">
      <h4>${target.title}</h4>
      <p>Target ${target.target.toLocaleString()} kg · Current ${target.current.toLocaleString()} kg</p>
      <div class="inventory-bar"><span style="width:${percent}% ; background:rgba(51,194,127,0.9)"></span></div>
      <p>Minimum price KSh ${target.minPrice} · Deadline ${target.deadline}</p>
    </div>
  `;
});

renderList($('#coopFeed'), coopFeed, (item) => `<p>${item.body} <small>${item.time}</small></p>`);

renderList($('#receiptCards'), receipts, (receipt) => `
  <div class="receipt">
    <h4>${receipt.crop} · ${receipt.grade}</h4>
    <p>${receipt.qty.toLocaleString()} kg · Expires ${receipt.expiry}</p>
    <p>${receipt.warehouse}</p>
    <small>Lien: ${receipt.lien}</small>
  </div>
`);

renderList($('#alertCards'), alerts, (alert) => `
  <article class="alert-card">
    <h3>${alert.crop}</h3>
    <p>${alert.direction}</p>
    <small>${alert.channel}</small>
  </article>
`);

$('#schemaBlock').textContent = schema;

renderList($('#faqList'), faq, (item, idx) => `
  <div class="faq-item">
    <button aria-expanded="${idx === 0}">${item.q}</button>
    <p ${idx !== 0 ? 'hidden' : ''}>${item.a}</p>
  </div>
`);

renderList($('#testimonialGrid'), testimonials, (testimony) => `
  <article class="card">
    <p>“${testimony.quote}”</p>
    <strong>${testimony.name}</strong>
  </article>
`);

$('#faqList').addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const item = e.target.closest('.faq-item');
  const paragraph = item.querySelector('p');
  const expanded = e.target.getAttribute('aria-expanded') === 'true';
  e.target.setAttribute('aria-expanded', !expanded);
  paragraph.hidden = expanded;
});

const heroTicker = () => {
  heroMetrics.push(heroMetrics.shift());
  renderList(heroMetricsEl, heroMetrics, (metric) => `
    <div class="hero-metric">
      <div>
        <p>${metric.label}</p>
        <strong>${metric.value}</strong>
      </div>
      <span>${metric.trend}</span>
    </div>
  `);
};
setInterval(heroTicker, 5000);

$('#fab').addEventListener('click', () => {
  $('#produce').scrollIntoView({ behavior: 'smooth' });
});

const mpesaTimeline = $('#mpesaTimeline');
renderList(mpesaTimeline, mpesaTimelineSeed, (item) => `<div class="timeline-item">${item}</div>`);

$('#simulatePayment').addEventListener('click', () => {
  mpesaTimeline.insertAdjacentHTML('afterbegin', `<div class="timeline-item">Sandbox payment successful · ${new Date().toLocaleTimeString()}</div>`);
});

$('#themeToggle').addEventListener('change', (e) => {
  document.documentElement.classList.toggle('dark', e.target.value === 'dark');
});

const navLinks = $$('.nav-link');
navLinks.forEach(btn => {
  btn.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.target;
    if (target && document.getElementById(target)) {
      document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
};
registerServiceWorker();
