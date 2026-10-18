/* Fonte única de dados do catálogo "Delícias da Jac" (Catálogo 2026).
   Para adicionar, remover ou alterar produtos, edite apenas este arquivo.
   - Produto simples: use `price` (e `minimumQuantity`, `quantity`, `notes`).
   - Produto com variações: use `variants` + `selectors` (um seletor por tipo de opção).
   - Fotos: coloque o arquivo em img/ e informe em `images`, ex.: ['img/brownie.jpg'].
     Enquanto `images` estiver vazio, o card mostra uma imagem provisória identificada. */
window.STORE = {
  brand: 'Delícias da Jac',
  whatsapp: '5521985075217',
  whatsappLabel: '(21) 98507-5217',
  instagram: 'deliciasda_jac'
};

window.CATEGORIES = [
  { id: 'macarons', name: 'Macarons', description: 'Macarons individuais, caixinhas presenteáveis e torres.' },
  { id: 'pirulitos', name: 'Pirulitos de Suspiro', description: 'Modelos simples, modelados e premium, com temas sob consulta.' },
  { id: 'lembrancinhas', name: 'Lembrancinhas', description: 'Saquinhos, caixinhas, rosas e bonequinhas, com laço e tag.' },
  { id: 'suspiros-modelados', name: 'Suspiros Modelados', description: 'Suspiros modelados e suspiros 3D, com ou sem recheio e caixinha.' },
  { id: 'centros-de-mesa', name: 'Centros de Mesa', description: 'Centros de mesa com pirulitos de roseta, modelados ou premium.' },
  { id: 'torres-e-mini-suspiros', name: 'Torres e Mini Suspiros', description: 'Torres de suspiros em dois tamanhos e mini suspiros vendidos por peso.' },
  { id: 'brownies', name: 'Brownies', description: 'Brownies de 4 cm e 5 cm, com ou sem laço.' },
  { id: 'bem-casados', name: 'Bem-casados e Bem-vividos', description: 'Com doce de leite e cobertura de açúcar, com ou sem laço.' }
];

const MACARON_RECHEIOS = ['Brigadeiro', 'Brigadeiro branco', 'Limão-siciliano', 'Maracujá', 'Caramelo', 'Ninho com Nutella', 'Pistache', 'Nozes'];
const CORES_ESPECIAIS = 'Cores especiais (neon, dourado e prateado): preço sob consulta.';
// [andares, macarons, limite de sabores, preço sem torre, preço com torre]
const TORRES_MACARON = [[4, 40, '2 sabores', 240, 274], [5, 60, 'Até 3 sabores', 360, 395], [6, 80, 'Até 3 sabores', 480, 540],
  [7, 100, '', 600, 680], [8, 130, '', 780, 880], [10, 200, '', 1100, 1200]];

window.PRODUCTS = [
  /* ---------- Macarons ---------- */
  { id: 'macaron-individual', category: 'macarons', name: 'Macaron individual', description: 'Macaron com sabores à escolha. Mínimo de 20 unidades da mesma cor.',
    price: 6, priceUnit: 'por unidade', minimumQuantity: 20, quantity: '1 unidade', unit: ['macaron', 'macarons'], images: [], variants: [],
    flavors: MACARON_RECHEIOS, customizable: true, notes: ['Mínimo 20 da mesma cor', CORES_ESPECIAIS], featured: true },
  { id: 'macaron-caixinha', category: 'macarons', name: 'Caixinha presenteável de macarons', description: 'Caixinha com 1, 2 ou 3 macarons, com fita e tag.',
    priceUnit: 'por caixinha', unit: ['caixinha', 'caixinhas'], images: [], selectors: [{ key: 'qtd', label: 'Macarons na caixinha' }],
    variants: [
      { label: 'Caixinha com 1 macaron', options: { qtd: '1 macaron' }, price: 8, quantity: '1 macaron' },
      { label: 'Caixinha com 2 macarons', options: { qtd: '2 macarons' }, price: 15, quantity: '2 macarons' },
      { label: 'Caixinha com 3 macarons', options: { qtd: '3 macarons' }, price: 22, quantity: '3 macarons' }],
    flavors: MACARON_RECHEIOS, customizable: true, notes: ['Fita e tag', CORES_ESPECIAIS] },
  { id: 'macaron-torre', category: 'macarons', name: 'Torre de macarons', description: 'Torres de 4 a 10 andares, nas versões sem torre e com torre (suporte).',
    priceUnit: 'por torre', unit: ['torre', 'torres'], images: [],
    selectors: [{ key: 'andares', label: 'Tamanho' }, { key: 'suporte', label: 'Suporte' }],
    variants: TORRES_MACARON.flatMap(([a, q, f, sem, com]) => [['sem torre', sem, 'Sem torre'], ['com torre', com, 'Com torre']].map(([s, price, lbl]) => ({
      label: `Torre de macarons ${a} andares - ${s}`, options: { andares: `${a} andares`, suporte: lbl }, price, quantity: `${q} macarons`,
      flavorsNote: f || null, notes: ['Consultar cores especiais'] }))),
    flavors: MACARON_RECHEIOS, customizable: true, notes: [CORES_ESPECIAIS], featured: true },

  /* ---------- Pirulitos de Suspiro ---------- */
  { id: 'pirulito-simples', category: 'pirulitos', name: 'Pirulito simples com laço', description: 'Pirulito de suspiro simples, com laço.',
    price: 5.5, priceUnit: 'por unidade', minimumQuantity: 10, quantity: '1 unidade', images: [], variants: [], badge: 'Simples', notes: [] },
  { id: 'pirulito-modelado-simples', category: 'pirulitos', name: 'Pirulito modelado simples', description: 'Pirulito de suspiro modelado. Temas sob consulta.',
    price: 6, priceUnit: 'por unidade', minimumQuantity: 10, quantity: '1 unidade', images: [], variants: [], badge: 'Modelado', customizable: true, notes: ['Temas sob consulta'] },
  { id: 'pirulito-modelado-premium', category: 'pirulitos', name: 'Pirulito modelado premium', description: 'Pirulito modelado premium, com personagens. Tema sob consulta.',
    price: 7.5, priceUnit: 'por unidade', minimumQuantity: 10, quantity: '1 unidade', images: [], variants: [], badge: 'Premium', customizable: true, notes: ['Personagens; tema sob consulta'] },
  { id: 'pirulito-brigadeiro', category: 'pirulitos', name: 'Pirulito recheado de brigadeiro', description: 'Pirulito de suspiro recheado de brigadeiro.',
    price: 6, priceUnit: 'por unidade', minimumQuantity: 10, quantity: '1 unidade', images: [], variants: [], flavors: ['Brigadeiro'], notes: [] },

  /* ---------- Lembrancinhas ---------- */
  { id: 'lembrancinha-mini-suspiros', category: 'lembrancinhas', name: 'Lembrancinha de mini suspiros', description: 'Mini suspiros em saquinho (cores comuns ou fortes) ou em caixinha, com laço e tag.',
    priceUnit: 'por unidade', images: [], selectors: [{ key: 'embalagem', label: 'Embalagem' }],
    variants: [
      { label: 'Saquinho com 15 mini suspiros', options: { embalagem: 'Saquinho' }, price: 5, minimumQuantity: 10, quantity: '15 mini suspiros' },
      { label: 'Saquinho com 15 mini suspiros - cores fortes', options: { embalagem: 'Saquinho – cores fortes' }, price: 5.5, minimumQuantity: 10, quantity: '15 mini suspiros' },
      { label: 'Caixinha com mini suspiros', options: { embalagem: 'Caixinha' }, price: 7, minimumQuantity: 10, quantity: '1 unidade' }],
    customizable: true, notes: ['Laço e tag'], featured: true },
  { id: 'lembrancinha-rosa', category: 'lembrancinhas', name: 'Rosa recheada', description: 'Rosa recheada de brigadeiro, no saquinho ou na caixinha.',
    priceUnit: 'por unidade', images: [], selectors: [{ key: 'embalagem', label: 'Embalagem' }],
    variants: [
      { label: 'Rosa recheada no saquinho', options: { embalagem: 'Saquinho' }, price: 5.5, minimumQuantity: 10, quantity: '1 unidade' },
      { label: 'Rosa recheada na caixinha', options: { embalagem: 'Caixinha' }, price: 7, minimumQuantity: 10, quantity: '1 unidade' }],
    flavors: ['Brigadeiro'], notes: ['Laço e tag'] },
  { id: 'lembrancinha-bonequinha', category: 'lembrancinhas', name: 'Bonequinha recheada', description: 'Bonequinha recheada de brigadeiro, com tema e cor personalizáveis.',
    price: 5.5, priceUnit: 'por unidade', minimumQuantity: 10, quantity: '1 unidade', images: [], variants: [], flavors: ['Brigadeiro'], customizable: true, notes: ['Tema e cor personalizáveis'] },
  { id: 'lembrancinha-adicional', category: 'lembrancinhas', name: 'Adicional suspiro temático central', description: 'Adicional por unidade, somado ao preço do saquinho.',
    price: 0.5, priceUnit: 'adicional por unidade', quantity: 'Adicional por unidade', unit: ['adicional', 'adicionais'], images: [], variants: [], customizable: true, notes: ['Somar ao preço do saquinho'] },

  /* ---------- Suspiros Modelados ---------- */
  { id: 'suspiro-modelado', category: 'suspiros-modelados', name: 'Suspiro modelado', description: 'Suspiro modelado sem recheio ou recheado de brigadeiro. Tema sob consulta.',
    priceUnit: 'por unidade', images: [], selectors: [{ key: 'recheio', label: 'Opção' }],
    variants: [
      { label: 'Suspiro modelado sem recheio', options: { recheio: 'Sem recheio' }, price: 7.5, minimumQuantity: 10, quantity: '1 unidade', flavors: [] },
      { label: 'Suspiro modelado recheado', options: { recheio: 'Recheado' }, price: 8, minimumQuantity: 10, quantity: '1 unidade', flavors: ['Brigadeiro'] }],
    badge: 'Modelado', customizable: true, notes: ['Tema sob consulta'] },
  { id: 'suspiro-3d', category: 'suspiros-modelados', name: 'Suspiro 3D', description: 'Suspiro 3D com recheio de Nutella ou brigadeiro, sem ou com caixinha. Tema sob consulta.',
    priceUnit: 'por unidade', images: [], selectors: [{ key: 'caixinha', label: 'Embalagem' }],
    variants: [
      { label: 'Suspiro 3D sem caixinha', options: { caixinha: 'Sem caixinha' }, price: 10, minimumQuantity: 10, quantity: '1 unidade' },
      { label: 'Suspiro 3D com caixinha', options: { caixinha: 'Com caixinha' }, price: 12, minimumQuantity: 10, quantity: '1 unidade' }],
    flavors: ['Nutella', 'Brigadeiro'], flavorChoice: 'one', badge: '3D', customizable: true, notes: ['Tema sob consulta'] },

  /* ---------- Centros de Mesa ---------- */
  { id: 'centro-de-mesa', category: 'centros-de-mesa', name: 'Centro de mesa com pirulitos', description: 'Centro de mesa com pirulitos de roseta, modelados ou premium.',
    priceUnit: 'por unidade', images: [], selectors: [{ key: 'versao', label: 'Versão' }],
    variants: [
      { label: 'Centro de mesa com pirulitos de roseta', options: { versao: 'Roseta' }, price: 10, minimumQuantity: 10, quantity: '1 unidade' },
      { label: 'Centro de mesa com pirulitos modelados', options: { versao: 'Modelado' }, price: 12, minimumQuantity: 10, quantity: '1 unidade' },
      { label: 'Centro de mesa com pirulitos premium', options: { versao: 'Premium' }, price: 14, minimumQuantity: 10, quantity: '1 unidade' }],
    notes: [] },

  /* ---------- Torres e Mini Suspiros ---------- */
  { id: 'torre-de-suspiros', category: 'torres-e-mini-suspiros', name: 'Torre de suspiros', description: 'Torre de suspiros nos tamanhos de 30 cm e 40 cm.',
    priceUnit: 'por torre', unit: ['torre', 'torres'], images: [], selectors: [{ key: 'altura', label: 'Tamanho' }],
    variants: [
      { label: 'Torre de suspiros 30 cm', options: { altura: '30 cm' }, price: 100, quantity: '30 cm', notes: ['Até 2 cores'] },
      { label: 'Torre de suspiros 40 cm', options: { altura: '40 cm' }, price: 150, quantity: '40 cm' }],
    customizable: true, notes: [] },
  { id: 'mini-suspiros', category: 'torres-e-mini-suspiros', name: 'Mini suspiros', description: 'Mini suspiros vendidos por peso, em pacotes de 250 g (cerca de 100 unidades).',
    price: 45, priceUnit: 'por pacote de 250 g', minimumQuantity: 2, minimumLabel: '500 g (2 pacotes de 250 g)', quantity: '250 g (~100 unidades)',
    unit: ['pacote de 250 g', 'pacotes de 250 g'], images: [], variants: [], notes: ['Pedido mínimo equivale a 2 pacotes'] },

  /* ---------- Brownies ---------- */
  { id: 'brownie', category: 'brownies', name: 'Brownie recheado', description: 'Brownie de 4 cm ou 5 cm, com ou sem laço, recheado de doce de leite ou brigadeiro.',
    priceUnit: 'por unidade', images: [], selectors: [{ key: 'tamanho', label: 'Tamanho' }, { key: 'laco', label: 'Laço' }],
    variants: [
      { label: 'Brownie 4 cm sem laço', options: { tamanho: '4 cm', laco: 'Sem laço' }, price: 5, minimumQuantity: 10, quantity: '1 unidade' },
      { label: 'Brownie 4 cm com laço', options: { tamanho: '4 cm', laco: 'Com laço' }, price: 5.3, minimumQuantity: 10, quantity: '1 unidade' },
      { label: 'Brownie 5 cm sem laço', options: { tamanho: '5 cm', laco: 'Sem laço' }, price: 6, quantity: '1 unidade' },
      { label: 'Brownie 5 cm com laço', options: { tamanho: '5 cm', laco: 'Com laço' }, price: 6.3, quantity: '1 unidade' }],
    flavors: ['Doce de leite', 'Brigadeiro'], flavorChoice: 'one', featured: true, notes: [] },

  /* ---------- Bem-casados e Bem-vividos ---------- */
  { id: 'bem-casado', category: 'bem-casados', name: 'Bem-casado / bem-vivido', description: 'Recheado de doce de leite, com cobertura de açúcar, com ou sem laço.',
    priceUnit: 'por unidade', images: [], selectors: [{ key: 'laco', label: 'Laço' }],
    variants: [
      { label: 'Bem-casado / bem-vivido sem laço', options: { laco: 'Sem laço' }, price: 5.5, minimumQuantity: 15, quantity: '1 unidade' },
      { label: 'Bem-casado / bem-vivido com laço', options: { laco: 'Com laço' }, price: 6, minimumQuantity: 15, quantity: '1 unidade' }],
    flavors: ['Doce de leite'], notes: ['Cobertura de açúcar'] }
];
