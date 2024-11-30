import React, { useState, useEffect } from "react";
import axios from "../axios";
import Task from "./Task";
import AddTask from "./AddTask";
import EditTask from "./EditTask";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Initialize as an empty array
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("/tasks");
        setTasks(result.data.tasks || []); // Ensure we always set an array
        console.log("Fetched tasks:", result.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchData();
  }, []);

  const addTask = async (task) => {
    try {
      const result = await axios.post("/tasks", task);
      setTasks([...tasks, result.data]);
      console.log("Added task:", result.data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (task) => {
    try {
      const result = await axios.put(`/tasks/${task.id}`, task);
      setTasks(tasks.map((t) => (t.id === task.id ? result.data : t)));
      setEditingTask(null);
      console.log("Updated task:", result.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/tasks/${id}`);
        setTasks(tasks.filter((task) => task.id !== id));
        console.log("Deleted task with id:", id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const toggleTaskStatus = async (task) => { 
    const updatedTask = { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' };
     try { const result = await axios.put(`/tasks/${task.id}`, updatedTask);
      setTasks(tasks.map(t => t.id === task.id ? result.data : t));
       console.log('Toggled status of task:', result.data);
     } 
     catch (error) { console.error('Error toggling task status:', error); 

     } 
    };

  const filterTasks = (status) => {
    setFilter(status);
    console.log("Filter set to:", status);
  };

  const filteredTasks = tasks.filter(
    (task) => filter === "All" || task.status === filter
  );

  return (
    <div>
      <AddTask onAdd={addTask} />
      {editingTask && <EditTask task={editingTask} onSave={updateTask} />}
      <div>
        <button onClick={() => filterTasks("All")}>All</button>
        <button onClick={() => filterTasks("Pending")}>Pending</button>
        <button onClick={() => filterTasks("Completed")}>Completed</button>
      </div>
      <div>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onToggleStatus={toggleTaskStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
