(() => {
  'use strict';

  const PRODUCTS = [
    { id: 1,  name: 'Luminária de Mesa Arco', category: 'Casa', price: 189.9, icon: '💡', color: '#f2b134', desc: 'Luminária com haste articulada e luz quente regulável.', specs: ['Altura: 45 cm', 'Lâmpada LED inclusa', 'Cabo de 1,8 m'] },
    { id: 2,  name: 'Vaso Cerâmica Terra', category: 'Casa', price: 79.0, icon: '🪴', color: '#7fb685', desc: 'Vaso esmaltado à mão, ideal para suculentas e ervas.', specs: ['Diâmetro: 16 cm', 'Furo para drenagem', 'Acompanha prato'] },
    { id: 3,  name: 'Manta de Algodão Listrada', category: 'Casa', price: 149.5, icon: '🛋️', color: '#e07a5f', desc: 'Manta macia e leve para sofá ou cama.', specs: ['130 × 180 cm', '100% algodão', 'Lavável na máquina'] },
    { id: 4,  name: 'Caderno Pautado A5', category: 'Escritório', price: 34.9, icon: '📓', color: '#3d5a80', desc: 'Capa dura, 160 páginas de papel que não mancha.', specs: ['Formato A5', 'Papel 90 g/m²', 'Marcador de fita'] },
    { id: 5,  name: 'Organizador de Mesa Madeira', category: 'Escritório', price: 119.0, icon: '🗂️', color: '#b08968', desc: 'Divisórias para canetas, cartões e celular.', specs: ['Madeira de reflorestamento', '5 compartimentos', '28 × 12 cm'] },
    { id: 6,  name: 'Cadeira Ergonômica Flex', category: 'Escritório', price: 899.0, icon: '🪑', color: '#4a5568', desc: 'Encosto em tela, ajuste de altura e apoio lombar.', specs: ['Suporta até 120 kg', 'Rodízios silenciosos', 'Garantia fictícia de 2 anos'] },
    { id: 7,  name: 'Fone Bluetooth Sonar', category: 'Tecnologia', price: 329.9, icon: '🎧', color: '#6c5ce7', desc: 'Fone sem fio com cancelamento de ruído e microfone.', specs: ['Bateria de 30 h', 'Bluetooth 5.3', 'Carregamento USB-C'] },
    { id: 8,  name: 'Carregador Sem Fio Disco', category: 'Tecnologia', price: 99.9, icon: '🔌', color: '#0f8b8d', desc: 'Base de carga rápida para celulares compatíveis.', specs: ['15 W', 'Base antiderrapante', 'Cabo incluso'] },
    { id: 9,  name: 'Teclado Mecânico Compacto', category: 'Tecnologia', price: 459.0, icon: '⌨️', color: '#2d3436', desc: 'Layout 75%, switches táteis e teclas PBT.', specs: ['Conexão USB e Bluetooth', 'Teclas em PBT', 'Layout ABNT2'] },
    { id: 10, name: 'Jogo de Facas Chef', category: 'Cozinha', price: 249.0, icon: '🔪', color: '#a0aec0', desc: 'Três facas de aço inox com cabo ergonômico.', specs: ['Aço inox', 'Lavagem manual', 'Bloco de madeira'] },
    { id: 11, name: 'Cafeteira Prensa Francesa', category: 'Cozinha', price: 89.9, icon: '☕', color: '#8d6e63', desc: 'Jarra de vidro borossilicato com filtro de aço.', specs: ['Capacidade: 600 ml', 'Vidro resistente', 'Fácil de limpar'] },
    { id: 12, name: 'Tábua de Corte Bambu', category: 'Cozinha', price: 64.5, icon: '🥖', color: '#c9a227', desc: 'Tábua dupla face com canaleta para líquidos.', specs: ['40 × 28 cm', 'Bambu natural', 'Pés antiderrapantes'] }
  ];

  const $ = (s) => document.querySelector(s);
  const money = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const CART_KEY = 'oficina-carrinho';

  // Imagem fictícia gerada em SVG (sem arquivos externos).
  const image = (p) => 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="${p.color}"/>` +
    `<circle cx="320" cy="50" r="90" fill="#fff" opacity=".15"/><circle cx="60" cy="280" r="110" fill="#000" opacity=".1"/>` +
    `<text x="200" y="185" font-size="110" text-anchor="middle">${p.icon}</text></svg>`);

  const state = { query: '', category: 'Todas', sort: 'default', cart: load() };
  let current = null;

  function load() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; }
  }
  function save() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch { /* ignora */ }
  }

  /* ---------- Catálogo ---------- */
  function filtered() {
    const q = state.query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) =>
      (state.category === 'Todas' || p.category === state.category) &&
      (!q || (p.name + ' ' + p.desc + ' ' + p.category).toLowerCase().includes(q)));
    if (state.sort === 'asc') list.sort((a, b) => a.price - b.price);
    else if (state.sort === 'desc') list.sort((a, b) => b.price - a.price);
    else if (state.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    return list;
  }

  function renderGrid() {
    const list = filtered();
    $('#grid').innerHTML = list.map((p) => `
      <article class="card">
        <button class="thumb" data-detail="${p.id}" aria-label="Ver detalhes de ${p.name}">
          <img src="${image(p)}" alt="Ilustração de ${p.name}" loading="lazy">
        </button>
        <div class="card-body">
          <p class="cat">${p.category}</p>
          <h3>${p.name}</h3>
          <p class="desc">${p.desc}</p>
          <p class="price">${money(p.price)}</p>
          <div class="actions">
            <button class="btn ghost" data-detail="${p.id}">Detalhes</button>
            <button class="btn" data-add="${p.id}">Adicionar</button>
          </div>
        </div>
      </article>`).join('');
    $('#empty').hidden = list.length > 0;
    $('#result-count').textContent = list.length === 1 ? '1 produto encontrado' : `${list.length} produtos encontrados`;
  }

  /* ---------- Detalhes ---------- */
  function openDetail(id) {
    current = PRODUCTS.find((p) => p.id === id);
    $('#d-img').src = image(current);
    $('#d-img').alt = 'Ilustração de ' + current.name;
    $('#d-cat').textContent = current.category;
    $('#d-title').textContent = current.name;
    $('#d-desc').textContent = current.desc;
    $('#d-specs').innerHTML = current.specs.map((s) => `<li>${s}</li>`).join('');
    $('#d-price').textContent = money(current.price);
    $('#product-dialog').showModal();
  }

  /* ---------- Carrinho ---------- */
  function add(id) {
    state.cart[id] = (state.cart[id] || 0) + 1;
    save(); renderCart();
    toast(PRODUCTS.find((p) => p.id === id).name + ' adicionado');
  }
  function setQty(id, qty) {
    if (qty <= 0) delete state.cart[id]; else state.cart[id] = qty;
    save(); renderCart();
  }
  function renderCart() {
    const items = Object.entries(state.cart).map(([id, qty]) => ({ p: PRODUCTS.find((x) => x.id === +id), qty })).filter((i) => i.p);
    const total = items.reduce((s, i) => s + i.p.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    $('#cart-count').textContent = count;
    $('#cart-total').textContent = money(total);
    $('#cart-list').innerHTML = items.length ? items.map(({ p, qty }) => `
      <li class="cart-item">
        <img src="${image(p)}" alt="">
        <div>
          <h4>${p.name}</h4>
          <small>${money(p.price)} · subtotal ${money(p.price * qty)}</small>
          <div class="qty">
            <button data-dec="${p.id}" aria-label="Diminuir quantidade">−</button>
            <span aria-label="Quantidade">${qty}</span>
            <button data-inc="${p.id}" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <button class="rm" data-rm="${p.id}">Remover</button>
      </li>`).join('') : '<li class="cart-empty">Seu carrinho está vazio. Adicione produtos do catálogo.</li>';
    $('#checkout').disabled = $('#clear-cart').disabled = !items.length;
  }
  function toggleCart(open) {
    $('#drawer').classList.toggle('open', open);
    $('#drawer').setAttribute('aria-hidden', String(!open));
    $('#overlay').hidden = !open;
    if (open) $('#close-cart').focus(); else $('#open-cart').focus();
  }
  let toastTimer;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  /* ---------- Eventos ---------- */
  function init() {
    const cats = ['Todas', ...new Set(PRODUCTS.map((p) => p.category))];
    $('#category').innerHTML = cats.map((c) => `<option>${c}</option>`).join('');
    $('#year').textContent = new Date().getFullYear();

    $('#search').addEventListener('input', (e) => { state.query = e.target.value; renderGrid(); });
    $('#category').addEventListener('change', (e) => { state.category = e.target.value; renderGrid(); });
    $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });
    $('#clear-filters').addEventListener('click', () => {
      state.query = ''; state.category = 'Todas'; state.sort = 'default';
      $('#search').value = ''; $('#category').value = 'Todas'; $('#sort').value = 'default';
      renderGrid();
    });

    $('#grid').addEventListener('click', (e) => {
      const d = e.target.closest('[data-detail]'), a = e.target.closest('[data-add]');
      if (d) openDetail(+d.dataset.detail);
      if (a) add(+a.dataset.add);
    });
    $('#d-add').addEventListener('click', () => { add(current.id); $('#product-dialog').close(); });
    $('#product-dialog').addEventListener('click', (e) => {
      if (e.target.matches('[data-close]') || e.target === e.currentTarget) e.currentTarget.close();
    });

    $('#open-cart').addEventListener('click', () => toggleCart(true));
    $('#close-cart').addEventListener('click', () => toggleCart(false));
    $('#overlay').addEventListener('click', () => toggleCart(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('#drawer').classList.contains('open')) toggleCart(false); });
    $('#cart-list').addEventListener('click', (e) => {
      const t = e.target;
      if (t.dataset.inc) setQty(+t.dataset.inc, state.cart[t.dataset.inc] + 1);
      if (t.dataset.dec) setQty(+t.dataset.dec, state.cart[t.dataset.dec] - 1);
      if (t.dataset.rm) setQty(+t.dataset.rm, 0);
    });
    $('#clear-cart').addEventListener('click', () => { state.cart = {}; save(); renderCart(); });
    $('#checkout').addEventListener('click', () => {
      toggleCart(false);
      state.cart = {}; save(); renderCart();
      toast('Pedido simulado concluído. Obrigado!');
    });

    renderGrid(); renderCart();
  }
  init();
})();
