# Oficina Doméstica – Catálogo de produtos (demo)

Catálogo fictício em **HTML, CSS e JavaScript puro**, sem backend, sem build e sem dependências. Serve para testar fluxos comerciais básicos e é compatível com GitHub Pages.

## Funcionalidades

- 12 produtos em 4 categorias (Casa, Escritório, Tecnologia, Cozinha), com imagem, preço e descrição.
- Busca por nome, descrição ou categoria.
- Filtro por categoria.
- Ordenação por menor preço, maior preço, nome (A–Z) ou destaques.
- Janela de detalhes com descrição completa e especificações.
- Carrinho simulado: adicionar, aumentar/diminuir quantidade, remover, esvaziar e total em R$. O carrinho fica salvo no `localStorage` do navegador.
- Layout responsivo, foco visível no teclado e respeito a `prefers-reduced-motion`.

As imagens são ilustrações SVG geradas pelo próprio `script.js`, então o site funciona offline e não depende de links externos.

## Estrutura

```
index.html   Estrutura da página
style.css    Estilos e responsividade
script.js    Dados dos produtos, filtros, detalhes e carrinho
README.md    Este arquivo
```

## Como testar localmente

1. Baixe os quatro arquivos para a mesma pasta.
2. Abra `index.html` no navegador (duplo clique). Se preferir um servidor local: `python3 -m http.server 8000` e acesse `http://localhost:8000`.

### Roteiro de teste

| Ação | Resultado esperado |
|---|---|
| Digitar "cafeteira" na busca | Aparece apenas a Cafeteira Prensa Francesa |
| Digitar "xyz" | Mensagem de nenhum resultado e botão "Limpar filtros" |
| Escolher categoria "Tecnologia" | 3 produtos |
| Ordenar por "Menor preço" | Caderno Pautado (R$ 34,90) vem primeiro e Cadeira Ergonômica (R$ 899,00) por último |
| Clicar em "Detalhes" | Abre janela com especificações; `Esc` fecha |
| Adicionar 2× o Caderno e 1× o Fone | Contador do carrinho = 3; total = R$ 399,70 |
| Recarregar a página | Itens do carrinho continuam |
| Finalizar compra | Carrinho esvaziado e aviso de pedido simulado |

## Publicação no GitHub Pages

1. Crie um repositório no GitHub (ex.: `catalogo-demo`).
2. Envie os quatro arquivos para a raiz do repositório:
   ```bash
   git init
   git add .
   git commit -m "Catálogo de produtos"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/catalogo-demo.git
   git push -u origin main
   ```
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`, e salve.
5. Aguarde alguns minutos. O site ficará em `https://SEU-USUARIO.github.io/catalogo-demo/`.

Todos os caminhos são relativos, então o site funciona em subpastas sem ajustes.

## Personalização

- **Produtos:** edite o array `PRODUCTS` no início de `script.js` (campos `name`, `category`, `price`, `icon`, `color`, `desc`, `specs`). Novas categorias aparecem sozinhas no filtro.
- **Cores e fontes:** altere as variáveis em `:root` no `style.css`.

## Aviso

Todos os produtos, preços e marcas são fictícios. Nenhum pagamento é processado.
