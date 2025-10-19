import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true, minlength: 3 },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Todo', todoSchema);