# Save Projects and Tasks

Aplicação feita com node.js e express utilizada para armazenar projetos e suas respectivas tarefas em um arquivo JSON.


## Rotas utilizadas

- `POST /projects`: A rota recebe um `id` e um `title` dentro do corpo e cadastra um novo projeto dentro de um array no seguinte formato: `{ id: "1", title: 'Novo projeto', tasks: [] }`;

- `GET /projects`: Rota que lista todos projetos e suas tarefas;

- `PUT /projects/:id`: A rota para alterar apenas o título do projeto com o `id` presente nos parâmetros da mesma;

- `DELETE /projects/:id`: A rota deleta o projeto com o `id` presente nos parâmetros da rota;

- `POST /projects/:id/tasks`: A rota recebe um campo `title` e armazena uma nova tarefa no array de tarefas de um projeto específico escolhido através do `id` presente nos parâmetros da mesma;

### Exemplo

Ao chamar a rota `POST /projects` repassando `{ id: 1, title: 'Novo projeto' }` e a rota `POST /projects/1/tasks` com `{ title: 'Nova tarefa' }`, meu array de projetos deve ficar da seguinte forma:

```js
[
  {
    id: "1",
    title: 'Novo projeto',
    tasks: ['Nova tarefa']
  }
]
```

## Middlewares utilizados

- Middleware usado em todas rotas que recebem o ID do projeto nos parâmetros da URL para verificar se o projeto com aquele ID existe. Se não existir retorna um erro, caso contrário permite a requisição continuar normalmente;

- Também há um middleware global chamado em todas requisições que imprime (`console.log`) uma contagem de quantas requisições foram feitas na aplicação;

## Observações

- Aplicação feita com base no conteúdo estudado no GoStack 8.0 da RocketSeat;
- Link para o desafio do curso: <https://github.com/Rocketseat/bootcamp-gostack-desafio-01>
