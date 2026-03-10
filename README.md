# CodeLeap Network

Uma rede social simples construída com **Next.js**, **TypeScript** e **CSS puro**, sem backend ou banco de dados — tudo persiste via `localStorage`.

---

## Funcionalidades

- **Criar, editar e deletar posts**
- **Likes** — curtir/descurtir posts, contagem em tempo real
- **Comentários** — seção colapsável por post
- **Mentions** — detecta `@username` no texto e destaca visualmente
- **Anexar imagens** — upload de imagem (base64, limite 4MB) em posts
- **Ordenação e filtros** — mais recente, mais antigo, mais curtido / todos os posts ou só os seus
- **Login/logout persistente** — sessão salva no `localStorage`
- **Responsivo** — layout adaptado para mobile

---

## Tecnologias

- [Next.js 14+](https://nextjs.org/) com App Router
- TypeScript
- CSS puro (sem Tailwind ou bibliotecas de UI)
- Fonte: [Roboto](https://fonts.google.com/specimen/Roboto) via Google Fonts

---

## Como rodar

**Pré-requisitos:** Node.js 18+ e npm/yarn/pnpm instalado.

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/codeleap-network.git
cd codeleap-network

# 2. Instale as dependências
npm install

# 3. Rode em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

```bash
# Build para produção
npm run build
npm start
```

---

## Como usar

1. Acesse a aplicação e digite um nome de usuário para entrar
2. Crie posts com título, conteúdo e imagem opcional
3. Use `@username` no texto para mencionar alguém
4. Curta posts com o botão de coração
5. Clique em "comments" para expandir e comentar
6. Use a barra de filtros para ordenar ou ver só seus posts
7. Clique em **Logout** no header para sair

---

## Armazenamento

Todos os dados ficam no `localStorage` do navegador sob as chaves:

| Chave | Conteúdo |
|---|---|
| `codeleap_username` | Nome do usuário logado |
| `codeleap_posts` | Array de posts (JSON) |
| `codeleap_comments` | Array de comentários (JSON) |

> **Atenção:** os dados são locais ao navegador. Limpar o `localStorage` ou trocar de dispositivo apaga tudo.

---

## Limitações conhecidas

- Imagens são salvas como base64 — posts com imagens grandes podem aproximar o limite de ~5MB do `localStorage`
- Dados não são compartilhados entre dispositivos ou usuários diferentes
- Mentions são apenas visuais — não há sistema de notificação real
