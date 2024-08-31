import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erro ao buscar tarefas:", error));
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask, completed: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTask("");
      })
      .catch((error) => console.error("Erro ao adicionar tarefa:", error));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Erro ao deletar tarefa:", error));
  };

  const toggleComplete = (id, completed) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...taskToUpdate, completed: !completed }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? updatedTask : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) =>
        console.error("Erro ao marcar tarefa como concluída:", error)
      );
  };

  const editTask = (task) => {
    setIsEditing(true);
    setNewTask(task.title);
    setCurrentTaskId(task.id);
  };

  const updateTask = () => {
    if (newTask.trim() === "") return;

    fetch(`http://localhost:5000/tasks/${currentTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask, completed: false }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        const updatedTasks = tasks.map((task) =>
          task.id === currentTaskId ? updatedTask : task
        );
        setTasks(updatedTasks);
        setNewTask("");
        setIsEditing(false);
        setCurrentTaskId(null);
      })
      .catch((error) => console.error("Erro ao atualizar tarefa:", error));
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
        borderRadius: "8px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>Gerenciador de Tarefas</h1>
      <TextField
        label="Digite uma nova tarefa"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={{ backgroundColor: "white" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={isEditing ? updateTask : addTask}
        style={{ marginTop: "10px" }}
      >
        {isEditing ? "Atualizar Tarefa" : "Adicionar Tarefa"}
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleComplete(task.id, task.completed)}
            />
            <ListItemText
              primary={task.title}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: "black",
              }}
            />
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => editTask(task)}
            >
              <EditIcon style={{ color: "blue" }} />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteTask(task.id)}
            >
              <DeleteIcon style={{ color: "red" }} />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
