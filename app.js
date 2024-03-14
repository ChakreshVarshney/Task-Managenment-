const express = require('express');
const q = require('./queries');
const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });


app.post("/users/register",q.saveUserDetails);
app.post("/users/login",q.authenticate);
app.get("/tasks",q.getTasks);
app.get('/task/:id', q.getTaskById)
app.post('/task', q.createTask)
app.put('/task/:id', q.updateTask)
app.delete('/task/:id', q.deleteTask)
