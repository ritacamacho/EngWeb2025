# [TPC1] A Oficina

## 🗓️ Data de Realização

**16/02/2025**

## ⭐ Objetivo

- Construir um serviço em `node.js`, que consuma a API de dados servida pelo `json-server` da oficina de reparações e responda com as páginas *web* do *site*.

## 🤓 Solução

Para melhor organização dos dados, começamos por reformatar o `json` original através do *script* `cleaner.py`, para posteriormente o novo gerado ser utilizado pelo `json-server`. A estrutura de dados obtida separa informações sobre clientes, viaturas, etc., facilitando a consulta e manutenção.

O servidor `node.js` foi implementado recorrendo ao módulo `http` e à biblioteca `axios` para comunicação com o `json-server`. As páginas `HTML` geradas dinamicamente apresentam a lista de clientes e os seus dados específicos (veículos, etc.).

## ⚙️ Execução

Abrir o `json-server` com o *dataset* estruturado na porta `3000`:

```
$ npx json-server new_dataset.json
```

Iniciar o servidor através de:

```
$ npm run start
```

É necessário ter as dependências previamente instaladas:

```
$ npm install
```