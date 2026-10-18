# Delícias da Jac – Catálogo digital 2026

Site estático em **HTML, CSS e JavaScript puro**, sem backend e sem dependências, compatível com GitHub Pages. Os produtos e preços vêm da planilha do catálogo 2026.

## Arquivos

```
index.html    Estrutura da página
style.css     Identidade visual (cores centralizadas em variáveis CSS no :root)
produtos.js   Fonte única de dados: loja, categorias e produtos
script.js     Cards, filtros, busca, seletores de variação e WhatsApp
img/          Pasta para as fotos dos produtos
```

## Funcionalidades

- 8 categorias, cada uma com título, descrição e seus produtos. A barra de categorias rola na horizontal no celular; ao tocar numa categoria, só ela é exibida ("Todos" mostra tudo).
- Busca por nome do produto (ignora acentos) e ordenação por preço.
- Cards com foto, nome, preço em destaque, pedido mínimo, descrição curta, seletores de variação (o preço atualiza na hora), quantidade e observações.
- "Ver detalhes" abre as informações extras dentro do próprio card.
- "Solicitar pelo WhatsApp" abre `https://wa.me/5521985075217` com mensagem codificada: produto, variação, quantidade, recheio e observações.
- Seção "Informações sobre pedidos", botão de WhatsApp em destaque, rodapé com Instagram e WhatsApp e botão de voltar ao topo.

## Como editar os produtos

Tudo está em `produtos.js`; o visual não precisa ser alterado.

- **Produto simples:** `price`, `minimumQuantity`, `quantity`, `notes`.
- **Produto com variações:** `selectors` (um seletor por tipo de opção, ex.: Tamanho e Laço) e `variants` (cada uma com `label`, `options`, `price`, `minimumQuantity`). Quando uma variação não tem `minimumQuantity`, nenhum mínimo é exigido.
- **Recheios:** `flavors`. Com `flavorChoice: 'one'` o cliente escolhe o recheio; com um único recheio ele entra direto na mensagem; nos demais casos a lista é apenas exibida.

### Fotos

Ainda não há fotos no projeto. Cada card mostra uma imagem provisória, identificada como "Foto provisória". Para usar uma foto real, salve o arquivo em `img/` e preencha `images` no produto, por exemplo `images: ['img/brownie.jpg']`. O selo some automaticamente. Use fotos na proporção 4:3 para evitar cortes. Só a primeira foto da lista é usada.

## Como testar

1. Abra `index.html` no navegador ou rode `python3 -m http.server 8000` e acesse `http://localhost:8000`.
2. Toque em **Brownies**: só essa categoria aparece. Escolha **5 cm** e **Com laço**: o preço muda para R$ 6,30 e o mínimo passa a "não informado".
3. Em **4 cm**, tente quantidade 5: ela volta para 10 com aviso de pedido mínimo.
4. Escolha o recheio e clique em **Solicitar pelo WhatsApp**. A mensagem deve citar produto, quantidade e recheio.
5. Em **Macarons → Torre de macarons**, troque tamanho e suporte e confira preço e quantidade de macarons.
6. Em **Torres e Mini Suspiros → Mini suspiros**, confira o mínimo de 500 g (2 pacotes).
7. Busque "pirulito": só os pirulitos aparecem. Busque "xyz": aparece a mensagem de nada encontrado.
8. Reduza a janela (ou use o modo celular do navegador) e confira a barra de categorias com rolagem horizontal.

## Publicação no GitHub Pages

1. Crie um repositório e envie todos os arquivos para a raiz:
   ```bash
   git init && git add . && git commit -m "Catálogo Delícias da Jac"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. O site ficará em `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`. Os caminhos são relativos.

## Observações sobre os dados

- Todos os preços, mínimos, recheios e condições vêm da planilha. Nada foi estimado.
- Brownie de 5 cm: a planilha não informa mínimo para essa opção (só indica que o mínimo aparece junto ao brownie de 4 cm). Por isso, o site não exige mínimo para o 5 cm. Se o mínimo de 10 valer para os dois, basta incluir `minimumQuantity: 10` nas duas variações de 5 cm.
- A planilha usa "Suspiro 3D" e "Suspiro modelado", sem o termo "2D". O catálogo manteve esses nomes.
