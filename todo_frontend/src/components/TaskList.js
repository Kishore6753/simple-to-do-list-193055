import React from 'react';
import TaskItem from './TaskItem';

// PUBLIC_INTERFACE
export default function TaskList({ tasks, loading, onToggle, onDelete, onSave }) {
  /**
   * TaskList renders the list of tasks with appropriate empty/loading states.
   * Props:
   *  - tasks: array of { id, title, completed }
   *  - loading: boolean
   *  - onToggle(id, completed)
   *  - onDelete(id)
   *  - onSave(id, title)
   */
  if (loading) {
    return <div className="loader" role="status">Loading tasks…</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div className="small">No tasks yet. Add your first task!</div>;
  }

  return (
    <div className="task-list" role="list" aria-label="task-list">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onSave={onSave}
        />
      ))}
    </div>
  );
}
