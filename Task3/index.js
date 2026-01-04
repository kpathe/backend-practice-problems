const express = require("express");
const app = express();
const PORT = 8000;

const todos = [
  { id: 1, name: "drink water", status: false },
  { id: 2, name: "write notes", status: true },
];

app.use(express.urlencoded({ extended: false }));

app.get("/api/todos", (req, res) => {
  return res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ msg: "Please provide id" });
  }
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return res.status(404).json({ msg: "Not found" });

  return res.status(200).json(todo);
});

app.post("/api/todos", (req, res) => {
  const todo = req.body;
  if (!todo || !todo.id || !todo.name || !todo.status) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  todos.push(todo);
  return res.status(201).json({ msg: "todo added" });
});

app.patch("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  
  if (!id) return res.status(400).json({ msg: "Please provide id" });
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) return res.status(404).json({ msg: "Todo not found" });

  const status = req.body.status;
  if (!status) return res.status(400).json({ msg: "Please provide status" });
  todo.status = status;

  return res.json({ msg: "Updated status" });
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ msg: "Please provide id" });
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > 0) {
    todos.splice(todoIndex, 1);
    return res.status(200).json({ msg: "Todo deleted!" });
  }
});

app.listen(PORT, () => {
  console.log("Server started");
});
