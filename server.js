import express from 'express';
import todoRouter from './routes/todos.js';
import  todos from './data/Todos.js'

const app = express();
const port = 3000;

app.use(express.json());

app.get('/',(req,res)=>{
  res.send('middleware dojo active')
})

app.use