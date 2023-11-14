# Forntend V360 TodoList

Este é um projeto [Next.js](https://nextjs.org/) inicializado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Sobre o Projeto

Este projeto é um aplicativo de lista de tarefas (Todo App) que consome uma API Rails. Ele permite que os usuários criem, editem e excluam tarefas. Cada tarefa tem um título, descrição e data limite. O aplicativo é construído com Next.js e Tailwind CSS para um design moderno e responsivo.

O aplicativo possui as seguintes funcionalidades:

  - Criação de usuário: os usuários podem se registrar fornecendo um nome, e-mail e senha.
  - Validação de campos: todos os campos são obrigatórios e a senha deve ser confirmada durante o registro.
  - Login: os usuários podem fazer login fornecendo seu e-mail e senha.
  - Autenticação com JWT: após o login, os usuários recebem um token JWT que é usado para autenticar todas as solicitações subsequentes.
  - Proteção de rotas: algumas rotas são protegidas e só podem ser acessadas por usuários autenticados.

## Pré-requisitos

  - Node.js v18.17.0
  - API do backend rodando na porta 3000

## Iniciando

Primeiro, certifique-se de que o backend está rodando na porta 3000. Em seguida, execute o servidor de desenvolvimento na porta 3333:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```
Abra http://localhost:3333 com seu navegador para ver o resultado.
