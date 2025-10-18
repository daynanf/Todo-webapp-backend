import express from 'express';
import todos  from '../data/Todos.js';

const router =express.Router();

const validateTodo = (req,res,next) => {
  const {task} = req.body;
  if ( req.method === "POST" || req.method === "PUT" ){
    if (!task || typeof task !== "string" || task.length < 3){
      return res.status(400).json({ error: 'Task must be a string with 3+ characters' });
    }
  }
  next();
};

router.get('/todos', (req, res) => {
  let filtered = todos;
  if (req.query.done !== undefined) {
    const done = req.query.done === 'true';
    filtered = todos.filter(t => t.done === done);
  }
  res.json(filtered);
});

router.get('/todos/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return next(new Error('ID must be numeric'));
  }
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

router.post('/todos', validateTodo, (req, res) => {
  const { task, done = false } = req.body;
  const newTodo = { id: nextId++, task, done, createdAt: req.timestamp };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT and DELETE routes (add validateTodo for PUT)
router.put('/todos/:id', validateTodo, (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  const { task, done } = req.body;
  if (task) todo.task = task;
  if (done !== undefined) todo.done = done;
  res.json(todo);
});

router.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.sendStatus(204);
});

export default router;
