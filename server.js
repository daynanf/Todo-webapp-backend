import express from 'express';
import router from './routes/todos.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT.trim());

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



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});