const express = require('express');

const app = express();

app.use(express.json());

//Set the requisition counter
let numberOfRequests = 0;

//Set a variable that stores the projects
const projects = [];

/**
 * MIDDLEWARE
 */

//function to check if the projects exists
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  return next();
}

//Requisition counter
app.use((req, res, next) => {
  numberOfRequests++;

  console.log(`Numero de requisições: ${numberOfRequests}`);

  return next();
});

/**
 * CRUD's
 */

//Register a new project
app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const checkId = projects.find(p => p.id == id);

  const project = {
    id,
    title,
    tasks: []
  };

  if (!checkId) {
    projects.push(project);
    return res.json(project);
  }

  return res.status(400).json({ error: 'Project ID already registered' });
});

//List all registered projects
app.get('/projects', (req, res) => {
  return res.json(projects);
});

//Change title of a project
app.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

//Delete a project
app.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  projects.splice(project, 1);

  return res.json(projects);
});

//Add a new task in a project
app.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

//command to listen requests
app.listen(3000);
