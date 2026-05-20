# Smart-Money React

Projeto frontend em React para um dashboard fintech simples, com rotas, autenticação e telas preparadas para integração com backend REST.

## Como executar

```bash
npm install
npm run dev
```

Depois acesse o endereço mostrado pelo Vite, normalmente:

```text
http://localhost:5173
```

## Estrutura

```text
src/
  components/       Componentes reutilizáveis
  contexts/         Contexto de autenticação
  data/             Dados locais temporários
  hooks/            Hooks reutilizáveis, como useCrudResource
  pages/            Páginas do sistema
  services/         Arquivos de consumo da API REST
  utils/            Funções auxiliares
```

## Rotas do frontend

- `/login`: login
- `/register`: cadastro de conta
- `/`: dashboard financeiro principal
- `/dashboard`: redireciona para `/`
- `/rendas`: CRUD de rendas
- `/despesas`: CRUD de despesas
- `/metas`: CRUD de metas financeiras
- `*`: página de erro

## Integração com backend

A URL base da API fica em `VITE_API_URL`.

Se essa variável não existir, o frontend usa:

```text
http://localhost:8080/api
```

Para configurar outra URL, crie um arquivo `.env` na raiz:

```text
VITE_API_URL=http://localhost:8080/api
```

Endpoints esperados:

- `POST /auth/login`
- `POST /auth/register`
- `GET /rendas`
- `POST /rendas`
- `PUT /rendas/:id`
- `DELETE /rendas/:id`
- `GET /despesas`
- `POST /despesas`
- `PUT /despesas/:id`
- `DELETE /despesas/:id`
- `GET /metas`
- `POST /metas`
- `PUT /metas/:id`
- `DELETE /metas/:id`

Enquanto o backend não estiver pronto, o projeto usa dados locais em `src/data/financeData.js`. A integração principal está em `src/services/apiClient.js` e `src/hooks/useCrudResource.js`, então a pessoa responsável pelo backend pode ajustar os endpoints sem refazer as telas.
