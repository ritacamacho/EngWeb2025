# [TPC2] Escola de Música

## 🗓️ Data de Realização

**23/02/2025**

## ⭐ Objetivo

Construir um serviço em `node.js`, que consuma a API de dados servida pelo `json-server` da **escola de música** (implementada na segunda aula teórica) e sirva um *website* com as seguintes caraterísticas:

- **Página Principal**: listar alunos, cursos e instrumentos

- **Página de Alunos**: tabela com a informação dos alunos (clicando numa linha deve saltar-se para a página de aluno)

- **Página de Cursos**: tabela com a informação dos cursos (clicando numa linha deve saltar-se para a página do curso onde deverá aparecer a lista de alunos a frequentá-lo)

- **Página de Instrumentos**: tabela com a informação dos instrumentos (clicando numa linha deve saltar-se para a página do instrumento onde deverá aparecer a lista de alunos que o tocam)

## 🤓 Solução

Para melhor organização dos dados, começamos por reformatar o `json` original através do *script* `cleaner.py`, para posteriormente o novo gerado ser utilizado pelo `json-server`. A estrutura de dados obtida separa informações sobre alunos, cursos e instrumentos, facilitando a consulta dos dados.

O servidor `node.js` foi implementado recorrendo ao módulo `http` e à biblioteca `axios` para comunicação com o `json-server`. As páginas `HTML` geradas dinamicamente apresentam os objetivos referidos.

## ⚙️ Execução

Abrir o `json-server` com o *dataset* estruturado na porta `3000`:

```
$ npx json-server new_music_dataset.json
```

Iniciar o servidor através de:

```
$ npm run start
```

É necessário ter as dependências previamente instaladas:

```
$ npm install
```