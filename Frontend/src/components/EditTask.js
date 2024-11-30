import React, { useState, useEffect } from 'react';

const EditTask = ({ task, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setStatus(task.status);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: task.id, title, description, dueDate, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
      <select value={status} onChange={e => setStatus(e.target.value)} required>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default EditTask;
