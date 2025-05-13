# Search API de Produtos

Este projeto é uma API RESTful desenvolvida com Node.js 18, Express e TypeScript, que permite gerenciar e buscar produtos com filtros avançados. A API oferece funcionalidades de CRUD completo, paginação, ordenação e busca por múltiplos campos.

---

## Tecnologias utilizadas

- Node.js 18
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Jest (para testes automatizados)
- dotenv (para variáveis de ambiente)

---

## Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/DigaoSantos/search-api-produtos.git
cd search-api-produtos
```

### 2. Instale as dependências

Certifique-se de estar utilizando **Node.js na versão 18**.

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco de dados PostgreSQL localmente ou em um serviço online.

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure a variável `DATABASE_URL` com os dados do seu banco PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco"
```

### 4. Rode as migrações com Prisma

```bash
npx prisma migrate dev --name init
```

### 5. Popule o banco com produtos de exemplo (opcional)

Há um script para adicionar produtos ao banco automaticamente. Execute:

```bash
npm run add
```

### 6. Inicie o servidor em modo desenvolvimento

```bash
npm run dev
```

A API estará disponível em: [http://localhost:3001](http://localhost:3001)

---

## Executar os testes automatizados

Para rodar todos os testes da API:

```bash
npm run test
```

Os testes cobrem:

- Listagem de produtos com filtros e paginação
- Criação, edição e exclusão de produtos
- Detalhamento de um produto

---




