import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, description, dueDate, status });
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
      <select value={status} onChange={e => setStatus(e.target.value)} required>
        <option value="Select">Select</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
