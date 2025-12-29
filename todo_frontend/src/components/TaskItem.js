import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function TaskItem({ task, onToggle, onDelete, onSave }) {
  /**
   * TaskItem renders a single task with checkbox, title, and action buttons.
   * Props:
   *  - task: { id, title, completed }
   *  - onToggle: function(id, completed) => Promise<void> | void
   *  - onDelete: function(id) => Promise<void> | void
   *  - onSave: function(id, title) => Promise<void> | void
   */
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [saving, setSaving] = useState(false);

  const handleToggle = async () => {
    await onToggle(task.id, !task.completed);
  };

  const handleDelete = async () => {
    await onDelete(task.id);
  };

  const handleSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === task.title) {
      setIsEditing(false);
      setDraft(task.title);
      return;
    }
    setSaving(true);
    try {
      await onSave(task.id, trimmed);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setDraft(task.title);
    }
  };

  return (
    <div className="task-item" role="listitem" aria-label={`Task ${task.title}`}>
      <input
        type="checkbox"
        className="checkbox"
        checked={!!task.completed}
        onChange={handleToggle}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      />
      <div>
        {isEditing ? (
          <input
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Edit task title"
          />
        ) : (
          <p className={`task-title ${task.completed ? 'completed' : ''}`}>{task.title}</p>
        )}
        <p className="small" style={{ marginTop: 4 }}>
          {task.completed ? 'Completed' : 'Pending'}
        </p>
      </div>
      <div className="actions-row">
        {isEditing ? (
          <>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving}
              aria-label="Save"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setDraft(task.title);
              }}
              aria-label="Cancel edit"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(true)}
              aria-label="Edit task"
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              aria-label="Delete task"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
