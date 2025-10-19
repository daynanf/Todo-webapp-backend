import express from 'express';
import router from './routes/todos.js';
import { connectDB } from './config/db.js';

const app = express();
const port = 3000;

await connectDB();
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('middleware dojo active')
})
app.use('/api', router);
app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(500).json({
    error: err.message
  })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});