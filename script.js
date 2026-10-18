(() => {
  'use strict';
  const { STORE, CATEGORIES, PRODUCTS } = window;
  const $ = (s, r = document) => r.querySelector(s);
  const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const waLink = (text) => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;

  const state = { q: '', cat: 'todos', sort: 'default' };
  const cards = {}; // estado de cada card: variação, seletores, quantidade, recheio, observações

  /* ---------- Dados ---------- */
  // Produto simples vira uma variação única, para o restante do código tratar tudo igual.
  const variantsOf = (p) => (p.variants && p.variants.length ? p.variants
    : [{ label: p.name, options: {}, price: p.price, minimumQuantity: p.minimumQuantity, quantity: p.quantity }]);
  const flavorsOf = (p, v) => v.flavors ?? p.flavors ?? [];
  const notesOf = (p, v) => [...new Set([...(p.notes || []), ...(v.notes || [])])];
  const unitOf = (p) => p.unit || ['unidade', 'unidades'];
  const minPrice = (p) => Math.min(...variantsOf(p).map((v) => v.price));
  const minText = (p, v) => {
    const m = v.minimumQuantity || 0, u = unitOf(p);
    return m ? (v.minimumLabel || p.minimumLabel || `${m} ${m === 1 ? u[0] : u[1]}`) : null;
  };

  function stateOf(p) {
    if (!cards[p.id]) {
      const v = variantsOf(p)[0];
      cards[p.id] = { vi: 0, sel: { ...v.options }, qty: v.minimumQuantity || 1, flavor: '', note: '', open: false, warn: '' };
    }
    return cards[p.id];
  }

  /* ---------- Imagem provisória ---------- */
  const PLACEHOLDER = { macarons: ['#f8d5e5', '🍬'], pirulitos: ['#e9c9f0', '🍭'], lembrancinhas: ['#cdeee8', '🎁'], 'suspiros-modelados': ['#fde4ef', '☁️'],
    'centros-de-mesa': ['#f8d5e5', '💐'], 'torres-e-mini-suspiros': ['#e9c9f0', '🗼'], brownies: ['#e8cfd9', '🍫'], 'bem-casados': ['#cdeee8', '🤍'] };
  const placeholder = (cat) => {
    const [bg, icon] = PLACEHOLDER[cat] || ['#f8d5e5', '🍬'];
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="${bg}"/><text x="200" y="175" font-size="96" text-anchor="middle">${icon}</text></svg>`);
  };

  /* ---------- Card ---------- */
  function cardHTML(p) {
    const s = stateOf(p), vs = variantsOf(p), v = vs[s.vi], u = unitOf(p), fl = flavorsOf(p, v);
    const min = v.minimumQuantity || 0, mt = minText(p, v), cat = CATEGORIES.find((c) => c.id === p.category);
    const photo = p.images && p.images[0];

    const selectors = (p.selectors || []).map((sel) => {
      const vals = [...new Set(vs.map((x) => x.options[sel.key]))];
      return `<label class="f"><span>${esc(sel.label)}</span><select data-sel="${sel.key}">${vals.map((x) => `<option${x === s.sel[sel.key] ? ' selected' : ''}>${esc(x)}</option>`).join('')}</select></label>`;
    }).join('');

    let flavor = '';
    if (fl.length === 1) flavor = `<p class="info"><strong>Recheio:</strong> ${esc(fl[0])}</p>`;
    else if (fl.length > 1 && p.flavorChoice === 'one') {
      flavor = `<label class="f"><span>Recheio</span><select data-flavor><option value="">Escolha o recheio</option>${fl.map((x) => `<option${x === s.flavor ? ' selected' : ''}>${esc(x)}</option>`).join('')}</select></label>`;
    } else if (fl.length > 1) flavor = `<p class="info"><strong>Recheios disponíveis:</strong> ${fl.map(esc).join(', ')}</p>`;

    const meta = [v.quantity, v.flavorsNote].filter(Boolean).join(' · ');
    const notes = notesOf(p, v);
    const details = `<div class="details"${s.open ? '' : ' hidden'}>
      ${meta ? `<h4>Quantidade / tamanho</h4><p>${esc(meta)}</p>` : ''}
      ${fl.length ? `<h4>Recheios</h4><p>${fl.map(esc).join(', ')}</p>` : ''}
      ${notes.length ? `<h4>Observações</h4><ul>${notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
      ${vs.length > 1 ? `<h4>Todas as variações</h4><ul>${vs.map((x) => `<li>${esc(x.label)} — ${brl(x.price)}${x.minimumQuantity ? ` (mín. ${x.minimumQuantity})` : ''}</li>`).join('')}</ul>` : ''}
    </div>`;

    return `<article class="card" data-id="${p.id}">
      <div class="media"><img src="${photo ? esc(photo) : placeholder(p.category)}" width="400" height="300" loading="lazy" alt="${photo ? esc(p.name) : 'Imagem provisória de ' + esc(p.name)}">${photo ? '' : '<span class="prov">Foto provisória</span>'}</div>
      <div class="body">
        <p class="tag">${esc(p.badge || cat.name)}</p>
        <h3>${esc(p.name)}</h3>
        <p class="desc">${esc(p.description)}</p>
        <div class="price-row"><strong class="price">${brl(v.price)}</strong><span class="unit">${esc(p.priceUnit || '')}</span></div>
        <p class="min">${mt ? 'Pedido mínimo: ' + esc(mt) : 'Pedido mínimo: não informado'}</p>
        ${meta ? `<p class="meta">${esc(meta)}</p>` : ''}
        ${selectors}${flavor}
        <div class="qty"><button type="button" data-act="dec" aria-label="Diminuir quantidade">−</button>
          <input type="number" inputmode="numeric" data-qty min="${min || 1}" value="${s.qty}" aria-label="Quantidade em ${esc(u[1])}">
          <button type="button" data-act="inc" aria-label="Aumentar quantidade">+</button><small>${esc(u[1])}</small></div>
        <p class="est">Estimativa: ${brl(v.price * s.qty)}</p>
        <label class="f"><span>${p.customizable ? 'Tema, cores ou observações' : 'Observações'} (opcional)</span><textarea rows="2" data-note>${esc(s.note)}</textarea></label>
        ${s.warn ? `<p class="warn" role="alert">${esc(s.warn)}</p>` : ''}
        <div class="actions">
          <button type="button" class="btn" data-act="wa">Solicitar pelo WhatsApp</button>
          <button type="button" class="btn ghost" data-act="toggle" aria-expanded="${s.open}">${s.open ? 'Ocultar detalhes' : 'Ver detalhes'}</button>
        </div>
        ${details}
      </div></article>`;
  }

  function refresh(card, focus) {
    const p = PRODUCTS.find((x) => x.id === card.dataset.id);
    const t = document.createElement('template');
    t.innerHTML = cardHTML(p).trim();
    const fresh = t.content.firstElementChild;
    card.replaceWith(fresh);
    if (focus) { const el = fresh.querySelector(focus); if (el) el.focus(); }
  }

  function whatsappMessage(p, v, s, flavor) {
    const u = unitOf(p);
    return `Olá! Gostaria de solicitar um orçamento para o produto ${v.label}, na quantidade de ${s.qty} ${s.qty === 1 ? u[0] : u[1]}`
      + (flavor ? `, com recheio de ${flavor.toLowerCase()}` : '') + '.'
      + (s.note.trim() ? ` Observações: ${s.note.trim()}` : '');
  }

  function onClick(e) {
    const btn = e.target.closest('[data-act]'); if (!btn) return;
    const card = btn.closest('.card'), p = PRODUCTS.find((x) => x.id === card.dataset.id);
    const s = stateOf(p), v = variantsOf(p)[s.vi], min = v.minimumQuantity || 1, act = btn.dataset.act;
    s.warn = '';
    if (act === 'toggle') { s.open = !s.open; return refresh(card, '[data-act="toggle"]'); }
    if (act === 'inc') { s.qty += 1; return refresh(card, '[data-act="inc"]'); }
    if (act === 'dec') { s.qty = Math.max(min, s.qty - 1); return refresh(card, '[data-act="dec"]'); }
    if (act === 'wa') {
      const fl = flavorsOf(p, v);
      if (s.qty < min) { s.qty = min; s.warn = `O pedido mínimo é ${minText(p, v)}. A quantidade foi ajustada.`; return refresh(card, '[data-act="wa"]'); }
      if (fl.length > 1 && p.flavorChoice === 'one' && !s.flavor) { s.warn = 'Escolha o recheio antes de solicitar.'; return refresh(card, '[data-flavor]'); }
      const flavor = fl.length === 1 ? fl[0] : (p.flavorChoice === 'one' ? s.flavor : '');
      window.open(waLink(whatsappMessage(p, v, s, flavor)), '_blank', 'noopener');
      refresh(card, '[data-act="wa"]');
    }
  }

  function onChange(e) {
    const card = e.target.closest('.card'); if (!card) return;
    const p = PRODUCTS.find((x) => x.id === card.dataset.id), s = stateOf(p), vs = variantsOf(p);
    s.warn = '';
    if (e.target.dataset.sel) {
      const key = e.target.dataset.sel;
      const next = vs.findIndex((x) => Object.entries({ ...s.sel, [key]: e.target.value }).every(([k, val]) => x.options[k] === val));
      s.vi = next >= 0 ? next : vs.findIndex((x) => x.options[key] === e.target.value);
      s.sel = { ...vs[s.vi].options };
      const v = vs[s.vi];
      s.qty = Math.max(s.qty, v.minimumQuantity || 1);
      if (!flavorsOf(p, v).includes(s.flavor)) s.flavor = '';
      return refresh(card, `[data-sel="${key}"]`);
    }
    if (e.target.matches('[data-flavor]')) { s.flavor = e.target.value; return refresh(card, '[data-flavor]'); }
    if (e.target.matches('[data-qty]')) {
      const min = vs[s.vi].minimumQuantity || 1, n = Math.floor(Number(e.target.value)) || min;
      if (n < min) s.warn = `O pedido mínimo é ${minText(p, vs[s.vi])}. A quantidade foi ajustada.`;
      s.qty = Math.max(min, n);
      // Sem aviso, só atualiza a estimativa: recriar o card aqui faria o toque no botão do WhatsApp se perder.
      if (s.warn || String(s.qty) !== e.target.value) refresh(card, '[data-qty]');
      else card.querySelector('.est').textContent = `Estimativa: ${brl(vs[s.vi].price * s.qty)}`;
    }
  }

  function onInput(e) {
    if (!e.target.matches('[data-note]')) return;
    stateOf(PRODUCTS.find((x) => x.id === e.target.closest('.card').dataset.id)).note = e.target.value;
  }

  /* ---------- Página ---------- */
  function renderNav() {
    const items = [{ id: 'todos', name: 'Todos' }, ...CATEGORIES];
    $('#catnav').innerHTML = items.map((c) => `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="${c.id === state.cat}">${esc(c.name)}</button>`).join('');
    const on = $('#catnav [aria-pressed="true"]');
    if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  function render() {
    const q = norm(state.q.trim());
    let total = 0;
    $('#catalog').innerHTML = CATEGORIES.filter((c) => state.cat === 'todos' || c.id === state.cat).map((c) => {
      const list = PRODUCTS.filter((p) => p.category === c.id && (!q || norm(p.name + ' ' + variantsOf(p).map((v) => v.label).join(' ')).includes(q)));
      if (state.sort === 'asc') list.sort((a, b) => minPrice(a) - minPrice(b));
      if (state.sort === 'desc') list.sort((a, b) => minPrice(b) - minPrice(a));
      total += list.length;
      return list.length ? `<section class="cat" id="cat-${c.id}" aria-labelledby="t-${c.id}"><h2 id="t-${c.id}">${esc(c.name)}</h2><p>${esc(c.description)}</p><div class="grid">${list.map(cardHTML).join('')}</div></section>` : '';
    }).join('');
    $('#empty').hidden = total > 0;
    $('#count').textContent = total === 1 ? '1 produto encontrado' : `${total} produtos encontrados`;
  }

  function init() {
    const general = waLink('Olá! Gostaria de fazer uma encomenda.');
    ['#header-wa', '#cta-wa'].forEach((id) => { $(id).href = general; });
    $('#foot-wa').href = general; $('#foot-wa').textContent = `WhatsApp ${STORE.whatsappLabel}`;
    $('#foot-ig').href = `https://instagram.com/${STORE.instagram}`; $('#foot-ig').textContent = `Instagram @${STORE.instagram}`;

    $('#catnav').addEventListener('click', (e) => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      state.cat = b.dataset.cat; renderNav(); render();
      $('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    $('#search').addEventListener('input', (e) => { state.q = e.target.value; render(); });
    $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; render(); });
    $('#clear').addEventListener('click', () => {
      Object.assign(state, { q: '', cat: 'todos', sort: 'default' });
      $('#search').value = ''; $('#sort').value = 'default'; renderNav(); render();
    });
    const cat = $('#catalog');
    cat.addEventListener('click', onClick); cat.addEventListener('change', onChange); cat.addEventListener('input', onInput);

    const top = $('#totop');
    window.addEventListener('scroll', () => { top.hidden = window.scrollY < 600; }, { passive: true });
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    renderNav(); render();
  }
  init();
})();
