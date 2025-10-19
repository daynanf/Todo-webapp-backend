import express from 'express';
import todos  from '../data/Todos.js';
import Todo from '../models/todos.js'
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

router.get('/todos', async (req, res) => {
  let filtered = await Todo.find();
  // if (req.query.done !== undefined) {
  //   const done = req.query.done === 'true';
  //   filtered = filtered.filter(t => t.done === done);
  // }
  res.json(filtered);
});

router.get('/todos/:id',async (req, res, next) => {
  const id = req.params.id;
  let todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

router.post('/todos', validateTodo, async (req, res) => {
  const { task, done = false } = req.body;
  const newTodo = await Todo.create({  task, done });
  
  res.status(201).send(`New Todo Created${newTodo}`);
});

// PUT and DELETE routes (add validateTodo for PUT)
router.put('/todos/:id', validateTodo, async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findByIdAndUpdate(req.params.id,req.body)
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

router.delete('/todos/:id', (req, res) => {
  const todo = Todo.findByIdAndDelete(req.params.id)
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.status(204).send("Deleted sucessfully");
});

export default router;
