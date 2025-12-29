import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function TaskInput({ onAdd }) {
  /**
   * TaskInput provides a text input to add a new task with basic validation.
   * Props:
   *  - onAdd: function(title: string) => Promise<void> | void
   */
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Please enter a task title.');
      return;
    }
    setError('');
    await onAdd(trimmed);
    setTitle('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="card" aria-label="task-input">
      <label htmlFor="taskTitle" className="small">New Task</label>
      <div className="input-row">
        <input
          id="taskTitle"
          className="input"
          placeholder="e.g., Buy groceries"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={onKeyDown}
          aria-invalid={!!error}
          aria-describedby={error ? 'task-input-error' : undefined}
        />
        <button className="btn btn-primary" onClick={handleAdd} aria-label="Add Task">
          Add
        </button>
      </div>
      {error ? (
        <div id="task-input-error" className="inline-alert" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
