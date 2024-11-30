import React from 'react';

const Task = ({ task, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className= {`task ${task.status.toLowerCase}`}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Due Date: {task.dueDate}</p>
        <p>Status: {task.status}</p>
      </div>
      <div>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
        <button onClick={() => onToggleStatus(task)}>
            {task.status === 'pending' ? 'Mark as Completed' : 'Mark as Pending'} 
        </button>
      </div>
    </div>
  );
}

export default Task;
