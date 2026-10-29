
const BUSINESS = {
  name: 'Palitaw Balls ni Rene',
  phone: '09755764321',
  facebook: 'https://www.facebook.com/profile.php?id=61593609072567',
  messenger: 'https://www.facebook.com/profile.php?id=61593609072567',
  whatsapp: '',
  location: 'Borongan',
  hours: '7:30am-12:00am'
};

const SAMPLE_PRICES = true;

const PRODUCTS = [
  { id: 'classic', name: 'Choco Palitaw', img: 'image/Ballsnim.jpg', price: 30,
    desc: 'Rice cake with chocolate feeling and rolled with choco powder.', detail: 'Classic' },
  { id: 'cheese', name: 'Ube Cheese Palitaw', img: 'image/Ube Cake Balls.jpg', price: 40,
    desc: 'Our Ube cheese palitaw', detail: 'Flavor: cheese (confirm)' },
  { id: 'special', name: 'Combo Palitaw', img: 'image/Chocolate and Ube Rice Cake Balls.png', price: 90,
    desc: 'choco and ube palitaw.', detail: 'Special' },
  { id: 'new', name: 'New Flavor Palitaw', img: 'image/RobertBalls.jpg', price: 50,
    desc: '.Our new  innovation the matcha palitaw', detail: 'New / seasonal' }
];

const TEAM = [
  ['Chief Executive Officer', 'Leads the business and keeps the recipes true to tradition.'],
  ['Operation Officer', 'Oversees daily operations and keeps orders running smoothly.'],
  ['Finance Officer', 'Manages the business’s money, records expenses and sales, and ensures that funds are used wisely.'],
  ['Marketing Officer', 'Promotes our palitaw, attracts customers, and creates strategies to increase sales and make our business known.'],
  ['Production Staff', 'Prepares and packages fresh, delicious, and high-quality palitaw while maintaining cleanliness and product quality.'],
  ['Supply Staff', 'Staff manages ingredients and materials, ensures enough supplies are available, and helps maintain smooth business operations.'],
  ['Sales and Customer care Staff', 'Assists customers, takes orders, promotes our palitaw, and ensures friendly service and customer satisfaction.'],
  ['Quality Checker', 'Ensures that every palitaw is fresh, clean, delicious, and meets our quality standards before being sold to customers.'],
  ['Inventory Manager', 'Monitors stock levels, tracks ingredients and supplies, and ensures everything is available for smooth palitaw production.'],
  ['Delivery and Logistics Coordinator', 'Plans pickups and deliveries so orders arrive fresh.']
].map(([role, bio], i) => ({
  name: ['Natalie, Delino', 'Ruth Nicole, Barcelon', 'Krishna Canites', 'Jhon Riz', 'Roldan', 'Ken Zulita', 'Allan, Agayan', 'Joana Marie D, Abad', 'Jacob, Naraja', 'Ronel, Guab'][i], role, bio,
  img: [
    'teamImage/Natalie.jpg',
    'teamImage/Ruth.jpg',
    'teamImage/Krishnamae.jpg',
    'teamImage/jhonRiz.jpg',
    'teamImage/Roldan.jpg',
    'teamImage/Ken.jpg',
    'teamImage/Allan.jpg',
    'teamImage/Joana.jpg',
    'teamImage/Jacob.jpg',
    'teamImage/Ronel.jpg'
  ][i]
}));

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const peso = n => '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
document.documentElement.classList.add('js');

function photo(src, alt, label) {
  return `<div class="ph"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" width="400" height="400"
    onload="this.parentNode.classList.add('has-img')" onerror="this.remove()">
    <span class="ph-label">${esc(label)}<br><small>${esc(src)}</small></span></div>`;
}

$$('[data-biz="name"]').forEach(el => el.textContent = BUSINESS.name);
document.title = BUSINESS.name + ' | Homemade Filipino Palitaw';
$('#year').textContent = new Date().getFullYear();

function renderContact() {
  const link = (v, href, text) => v ? `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text || v)}</a>` : '';
  const rows = [
    ['Phone', link(BUSINESS.phone, 'tel:' + BUSINESS.phone.replace(/[^\d+]/g, ''))],
    ['Facebook page', link(BUSINESS.facebook, BUSINESS.facebook, 'Visit our page')],
    ['Messenger ordering', link(BUSINESS.messenger, BUSINESS.messenger, 'Message us')],
    ['Location', esc(BUSINESS.location)],
    ['Business hours', esc(BUSINESS.hours)]
  ];
  $('#contactList').innerHTML = rows.map(([k, v]) =>
    `<dt>${k}</dt><dd class="${v ? '' : 'empty-val'}">${v || 'Not yet added by the owner'}</dd>`).join('');
}

function renderProducts() {
  $('#productGrid').innerHTML = PRODUCTS.map(p => `
    <article class="card glass reveal" data-id="${p.id}">
      ${photo(p.img, p.name, 'Product photo placeholder')}
      <div class="card-body">
        <h3>${esc(p.name)}</h3>
        <span class="tag">${esc(p.detail)}</span>
        <p>${esc(p.desc)}</p>
        <div class="price">${peso(p.price)}</div>
        <div class="buy">
          <div class="qty" role="group" aria-label="Quantity for ${esc(p.name)}">
            <button type="button" data-q="-1" aria-label="Decrease quantity">&minus;</button>
            <input type="number" min="1" max="99" value="1" inputmode="numeric" aria-label="Quantity">
            <button type="button" data-q="1" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn" type="button" data-add="${p.id}">Add to Cart</button>
        </div>
      </div>
    </article>`).join('');
  $('#priceNote').hidden = !SAMPLE_PRICES;
}

function renderTeam() {
  $('#teamGrid').innerHTML = TEAM.map(m => `
    <article class="card member glass reveal">
      ${photo(m.img, m.name + ', ' + m.role, 'Team photo placeholder')}
      <div class="card-body">
        <h3>${esc(m.name)}</h3>
        <span class="role">${esc(m.role)}</span>
        <p>${esc(m.bio)}</p>
      </div>
    </article>`).join('');
}

const appendixModal = $('#appendixModal');
const appendixModalImage = $('#appendixModalImage');

function openAppendixImage(src, alt) {
  if (!appendixModal || !appendixModalImage) return;
  appendixModalImage.src = src;
  appendixModalImage.alt = alt || 'Appendix image';
  appendixModal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeAppendixImage() {
  if (!appendixModal) return;
  appendixModal.hidden = true;
  document.body.style.overflow = '';
}

document.addEventListener('click', e => {
  const img = e.target.closest('.appendix-item img');
  if (img) {
    openAppendixImage(img.src, img.alt);
    return;
  }

  if (appendixModal && !appendixModal.hidden && e.target === appendixModal) {
    closeAppendixImage();
  }
});

if (appendixModal) {
  const closeBtn = $('.appendix-close', appendixModal);
  if (closeBtn) closeBtn.addEventListener('click', closeAppendixImage);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && appendixModal && !appendixModal.hidden) closeAppendixImage();
});

let cart = {};
try { cart = JSON.parse(localStorage.getItem('palitaw-cart')) || {}; } catch (e) { cart = {}; }
Object.keys(cart).forEach(id => { if (!PRODUCTS.some(p => p.id === id) || !(cart[id] > 0)) delete cart[id]; });

const save = () => { try { localStorage.setItem('palitaw-cart', JSON.stringify(cart)); } catch (e) {} };
const items = () => PRODUCTS.filter(p => cart[p.id]).map(p => ({ ...p, qty: cart[p.id], sub: cart[p.id] * p.price }));
const total = () => items().reduce((s, i) => s + i.sub, 0);
const count = () => items().reduce((s, i) => s + i.qty, 0);

function renderCart() {
  const list = items();
  $('#cartCount').textContent = count();
  $('#cartEmpty').hidden = list.length > 0;
  $('#cartTotalRow').hidden = $('#orderForm').hidden = list.length === 0;
  $('#cartTotal').textContent = peso(total());
  $('#cartList').innerHTML = list.map(i => `
    <li class="cart-item" data-id="${i.id}">
      <strong>${esc(i.name)}</strong><span>${peso(i.sub)}</span>
      <div class="ctrl">
        <div class="qty">
          <button type="button" data-c="-1" aria-label="Decrease ${esc(i.name)}">&minus;</button>
          <span aria-live="polite">${i.qty}</span>
          <button type="button" data-c="1" aria-label="Increase ${esc(i.name)}">+</button>
        </div>
        <span>${peso(i.price)} each</span>
        <button class="link-btn" type="button" data-rm="1">Remove</button>
      </div>
    </li>`).join('');
  $('#summary').textContent = orderText(false);
}

function setQty(id, q) {
  q = Math.max(0, Math.min(99, q));
  q ? cart[id] = q : delete cart[id];
  save(); renderCart();
}

$('#productGrid').addEventListener('click', e => {
  const card = e.target.closest('.card'); if (!card) return;
  const input = $('input', card);
  const step = e.target.closest('[data-q]');
  if (step) { input.value = Math.max(1, Math.min(99, (parseInt(input.value, 10) || 1) + +step.dataset.q)); return; }
  const add = e.target.closest('[data-add]');
  if (add) {
    const q = Math.max(1, Math.min(99, parseInt(input.value, 10) || 1));
    setQty(add.dataset.add, (cart[add.dataset.add] || 0) + q);
    input.value = 1;
    add.textContent = 'Added!';
    setTimeout(() => add.textContent = 'Add to Cart', 1100);
  }
});

$('#cartList').addEventListener('click', e => {
  const row = e.target.closest('.cart-item'); if (!row) return;
  const id = row.dataset.id;
  if (e.target.closest('[data-rm]')) setQty(id, 0);
  const d = e.target.closest('[data-c]');
  if (d) setQty(id, (cart[id] || 0) + +d.dataset.c);
});

const drawer = $('#drawer'), overlay = $('#overlay');
let lastFocus = null;
function openCart() {
  lastFocus = document.activeElement;
  drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); overlay.hidden = false;
  document.body.style.overflow = 'hidden'; drawer.focus();
}
function closeCart() {
  drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); overlay.hidden = true;
  document.body.style.overflow = ''; if (lastFocus) lastFocus.focus();
}
$('#cartOpen').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });

function startOrder(target) {
  if (target === 'order' && count() > 0) return openCart();
  $('#products').scrollIntoView({ behavior: 'smooth' });
}
$('#navOrder').addEventListener('click', () => startOrder('order'));
$$('[data-go]').forEach(b => b.addEventListener('click', () => startOrder(b.dataset.go)));

const form = $('#orderForm');
const val = n => form.elements[n].value.trim();

function orderText(withCustomer) {
  const lines = items().map(i => `${i.qty} x ${i.name} @ ${peso(i.price)} = ${peso(i.sub)}`);
  if (!lines.length) return '';
  let t = `New order for ${BUSINESS.name}\n` + lines.join('\n') + `\nTotal: ${peso(total())}`;
  if (withCustomer) {
    t += `\n\nType: ${val('mode') || form.elements.mode.value}`;
    t += `\nName: ${val('name')}\nPhone: ${val('phone')}`;
    if (form.elements.mode.value === 'Delivery') t += `\nAddress: ${val('address')}`;
    if (val('notes')) t += `\nNotes: ${val('notes')}`;
  } else {
    t += '\n(Your details will be added when you place the order.)';
  }
  return t;
}

function setErr(field, message) {
  const el = field.closest('label'), err = el && $('.err', el);
  field.classList.toggle('invalid', !!message);
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (err) err.textContent = message || '';
}

function validate(f, rules) {
  let ok = true, first = null;
  Object.entries(rules).forEach(([name, rule]) => {
    const field = f.elements[name]; if (!field) return;
    const v = field.value.trim();
    const msg = rule(v);
    setErr(field, msg);
    if (msg) { ok = false; first = first || field; }
  });
  if (first) first.focus();
  return ok;
}
const required = label => v => v ? '' : `Please enter ${label}.`;
const phoneRule = v => !v ? 'Please enter your phone number.' : (/^[+()\d\s-]{7,20}$/.test(v) && (v.match(/\d/g) || []).length >= 7 ? '' : 'Enter a valid phone number.');

$$('input[name=mode]', form).forEach(r => r.addEventListener('change', () => {
  const del = form.elements.mode.value === 'Delivery';
  $('#addrWrap').hidden = !del;
  if (!del) setErr(form.elements.address, '');
}));

function channel() {
  if (BUSINESS.whatsapp) return { type: 'WhatsApp', url: t => 'https://wa.me/' + BUSINESS.whatsapp.replace(/\D/g, '') + '?text=' + encodeURIComponent(t) };
  if (BUSINESS.messenger) return { type: 'Messenger', url: () => BUSINESS.messenger, copy: true };
  return null;
}
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); return true; } catch (e) { return false; }
}

let lastMessage = '';
form.addEventListener('submit', async e => {
  e.preventDefault();
  const msg = $('#orderMsg'); msg.className = 'msg'; $('#copyBtn').hidden = true;
  if (!count()) { msg.textContent = 'Your cart is empty. Add a palitaw first.'; msg.classList.add('bad'); return; }
  const del = form.elements.mode.value === 'Delivery';
  const ok = validate(form, {
    name: required('your name'), phone: phoneRule,
    address: v => del && !v ? 'Please enter your delivery address.' : ''
  });
  if (!ok) { msg.textContent = 'Please fix the highlighted fields.'; msg.classList.add('bad'); return; }

  lastMessage = orderText(true);
  $('#summary').textContent = lastMessage;
  const ch = channel();

  if (!ch) {
    msg.textContent = 'Order not sent. No ordering channel is set up yet. The owner must add a Messenger link or WhatsApp number in script.js. You can copy this message and send it yourself.';
    msg.classList.add('bad'); $('#copyBtn').hidden = false; return;
  }
  const copied = ch.copy ? await copyText(lastMessage) : false;
  window.open(ch.url(lastMessage), '_blank', 'noopener');
  msg.classList.add('ok');
  msg.textContent = ch.copy
    ? `${ch.type} opened. ${copied ? 'Your order message is copied: paste it and press send.' : 'Copy the order message below and send it.'} Your order is only placed once you send it.`
    : `${ch.type} opened with your order message. Your order is only placed once you press send there.`;
  $('#copyBtn').hidden = false;
});
$('#copyBtn').addEventListener('click', async () => {
  const msg = $('#orderMsg');
  msg.textContent = (await copyText(lastMessage)) ? 'Order message copied.' : 'Could not copy automatically. Select the summary text and copy it.';
});

$('#contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, msg = $('#contactMsg'); msg.className = 'msg';
  const ok = validate(f, { name: required('your name'), contact: required('your phone or email'), message: required('a message') });
  if (!ok) { msg.textContent = 'Please fix the highlighted fields.'; msg.classList.add('bad'); return; }
  const text = `Message for ${BUSINESS.name}\nFrom: ${f.elements.name.value.trim()}\nContact: ${f.elements.contact.value.trim()}\n\n${f.elements.message.value.trim()}`;
  const ch = channel();
  if (!ch) {
    const copied = await copyText(text);
    msg.textContent = 'Message not sent. No contact channel is set up yet. ' + (copied ? 'Your message was copied so you can send it yourself.' : 'Copy your message and send it yourself.');
    msg.classList.add('bad'); return;
  }
  const copied = ch.copy ? await copyText(text) : false;
  window.open(ch.url(text), '_blank', 'noopener');
  msg.classList.add('ok');
  msg.textContent = `${ch.type} opened. ${copied ? 'Message copied: paste and send it.' : 'Press send there to deliver it.'}`;
});

const burger = $('#burger'), menu = $('#menu');
function setMenu(open) { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); }
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
$$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', e => { if (!e.target.closest('.nav')) setMenu(false); });

function observeReveal() {
  const els = $$('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) return els.forEach(el => el.classList.add('in'));
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

renderContact(); renderProducts(); renderTeam(); renderCart(); observeReveal();
