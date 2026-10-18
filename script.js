(() => {
  'use strict';

  const PRODUCTS = [
    { id: 1,  name: 'Bolo de Morango com Chantilly', category: 'Bolos e tortas', price: 89.9, icon: '🍰', color: '#f9a8c0', desc: 'Massa fofinha, recheio de creme e morangos frescos.', specs: ['Serve até 10 fatias', 'Peso: 1,2 kg', 'Encomendar com 2 dias de antecedência'] },
    { id: 2,  name: 'Torta de Limão Siciliano', category: 'Bolos e tortas', price: 69.0, icon: '🥧', color: '#fbd38d', desc: 'Base crocante, creme cítrico e cobertura de merengue.', specs: ['Serve 8 fatias', 'Peso: 900 g', 'Manter refrigerada'] },
    { id: 3,  name: 'Caixa de Cupcakes (6 un.)', category: 'Bolos e tortas', price: 49.5, icon: '🧁', color: '#f4a6d7', desc: 'Seis cupcakes de baunilha com cobertura de buttercream rosa.', specs: ['6 unidades', 'Sabor baunilha', 'Embalagem para presente'] },
    { id: 4,  name: 'Brigadeiro Gourmet (12 un.)', category: 'Docinhos', price: 42.0, icon: '🍫', color: '#b5838d', desc: 'Brigadeiros de chocolate belga enrolados à mão.', specs: ['12 unidades', 'Chocolate 50% cacau', 'Validade: 7 dias'] },
    { id: 5,  name: 'Beijinho de Coco (12 un.)', category: 'Docinhos', price: 38.0, icon: '🥥', color: '#ffc8dd', desc: 'Docinho cremoso de coco com cravo na ponta.', specs: ['12 unidades', 'Coco ralado fresco', 'Validade: 7 dias'] },
    { id: 6,  name: 'Mini Donuts Glaceados (6 un.)', category: 'Docinhos', price: 29.9, icon: '🍩', color: '#ff8fab', desc: 'Donuts pequenos com glacê de morango e confeitos.', specs: ['6 unidades', 'Glacê de morango', 'Melhor consumo no mesmo dia'] },
    { id: 7,  name: 'Cookies de Chocolate (6 un.)', category: 'Biscoitos', price: 32.0, icon: '🍪', color: '#d4a5a5', desc: 'Cookies macios por dentro, com gotas de chocolate.', specs: ['6 unidades de 60 g', 'Gotas de chocolate meio amargo', 'Validade: 10 dias'] },
    { id: 8,  name: 'Macarons Rosa (8 un.)', category: 'Biscoitos', price: 54.9, icon: '🍥', color: '#f8b4d9', desc: 'Casquinhas delicadas recheadas com ganache de framboesa.', specs: ['8 unidades', 'Sem glúten (fictício)', 'Manter refrigerados'] },
    { id: 9,  name: 'Biscoitos Amanteigados (250 g)', category: 'Biscoitos', price: 24.5, icon: '🥠', color: '#fcd5ce', desc: 'Biscoitinhos de manteiga que derretem na boca.', specs: ['Pacote de 250 g', 'Receita da casa', 'Validade: 30 dias'] },
    { id: 10, name: 'Bombons Recheados (12 un.)', category: 'Chocolates', price: 59.9, icon: '🍬', color: '#e5989b', desc: 'Caixa com recheios de morango, caramelo e pistache.', specs: ['12 bombons', '3 sabores', 'Caixa presenteável'] },
    { id: 11, name: 'Chocolate Quente Cremoso (200 g)', category: 'Chocolates', price: 36.9, icon: '☕', color: '#c98b9b', desc: 'Mistura em pó para um chocolate quente espesso e doce.', specs: ['Rende 8 xícaras', 'Basta adicionar leite quente', 'Pote de 200 g'] },
    { id: 12, name: 'Barra de Chocolate ao Leite', category: 'Chocolates', price: 18.9, icon: '🍫', color: '#ffafcc', desc: 'Barra de 100 g com 40% de cacau e leite integral.', specs: ['100 g', '40% cacau', 'Sem conservantes (fictício)'] }
  ];

  const $ = (s) => document.querySelector(s);
  const money = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const CART_KEY = 'docerosa-carrinho';

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
