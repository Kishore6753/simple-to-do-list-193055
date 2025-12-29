import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import {
  apiBaseUrl,
  fetchTasks,
  createTask,
  patchTask,
  updateTask,
  deleteTask,
} from './services/api';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main To-Do App.
   * - Reads base URL from REACT_APP_API_BASE or REACT_APP_BACKEND_URL via services/api.
   * - Provides UI to add, edit, delete, and mark tasks complete.
   * - Persists changes via REST API (GET/POST/PATCH/PUT/DELETE) to /tasks endpoints.
   * - Handles loading and error states with inline alerts.
   * - Light theme with #3b82f6 and #06b6d4 accents; centered layout.
   */
  const baseUrl = useMemo(() => apiBaseUrl(), []);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(Boolean(baseUrl));
  const [error, setError] = useState('');

  // Load tasks initially
  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!baseUrl) {
        setError(
          'Backend URL not configured. Please set REACT_APP_API_BASE or REACT_APP_BACKEND_URL.'
        );
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const data = await fetchTasks();
        if (mounted) setTasks(data);
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load tasks.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [baseUrl]);

  // Actions
  const handleAdd = async (title) => {
    try {
      setError('');
      const created = await createTask({ title });
      setTasks((prev) => [created, ...prev]);
    } catch (e) {
      setError(e.message || 'Failed to add task.');
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      setError('');
      // Prefer PATCH for single field updates
      const updated = await patchTask(id, { completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError(e.message || 'Failed to update task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e.message || 'Failed to delete task.');
    }
  };

  const handleSave = async (id, title) => {
    try {
      setError('');
      const updated = await updateTask(id, { title });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError(e.message || 'Failed to save changes.');
    }
  };

  return (
    <div className="container">
      <Header />
      {!baseUrl ? (
        <div className="inline-alert" role="alert" style={{ marginBottom: 16 }}>
          Backend URL is not configured. Set REACT_APP_API_BASE or REACT_APP_BACKEND_URL and reload.
        </div>
      ) : null}
      <TaskInput onAdd={handleAdd} />
      {error ? (
        <div className="inline-alert" role="alert">
          {error}
        </div>
      ) : null}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="small" style={{ marginBottom: 8, color: '#0f172a' }}>
          API: {baseUrl || 'Not configured'}
        </div>
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      </div>
      <p className="footer-note">Light theme • Primary #3b82f6 • Accent #06b6d4</p>
    </div>
  );
}

export default App;
