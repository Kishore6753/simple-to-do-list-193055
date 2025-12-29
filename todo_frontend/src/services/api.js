const getBaseUrl = () => {
  const base =
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    '';

  // Normalize by trimming trailing slashes
  return base.replace(/\/+$/, '');
};

// PUBLIC_INTERFACE
export function apiBaseUrl() {
  /**
   * Returns the detected API base URL from environment variables.
   * Tries REACT_APP_API_BASE, then REACT_APP_BACKEND_URL.
   * If none are configured, returns an empty string.
   */
  return getBaseUrl();
}

// PUBLIC_INTERFACE
export async function fetchTasks() {
  /**
   * Fetch all tasks from the backend.
   * Returns: Array of task objects.
   * Throws: Error on network or non-OK response.
   */
  const base = getBaseUrl();
  if (!base) {
    throw new Error(
      'Backend URL not configured. Set REACT_APP_API_BASE or REACT_APP_BACKEND_URL.'
    );
  }
  const res = await fetch(`${base}/tasks`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load tasks: ${res.status} ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function createTask(payload) {
  /**
   * Create a new task.
   * payload: { title: string }
   * Returns: Created task object.
   */
  const base = getBaseUrl();
  if (!base) {
    throw new Error(
      'Backend URL not configured. Set REACT_APP_API_BASE or REACT_APP_BACKEND_URL.'
    );
  }
  const res = await fetch(`${base}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create task: ${res.status} ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function updateTask(id, payload) {
  /**
   * Update an existing task via PUT.
   * payload: { title: string, completed?: boolean }
   * Returns: Updated task object.
   */
  const base = getBaseUrl();
  if (!base) {
    throw new Error(
      'Backend URL not configured. Set REACT_APP_API_BASE or REACT_APP_BACKEND_URL.'
    );
  }
  const res = await fetch(`${base}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update task: ${res.status} ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function patchTask(id, payload) {
  /**
   * Patch an existing task via PATCH.
   * payload: partial fields, e.g., { completed: true }
   * Returns: Updated task object.
   */
  const base = getBaseUrl();
  if (!base) {
    throw new Error(
      'Backend URL not configured. Set REACT_APP_API_BASE or REACT_APP_BACKEND_URL.'
    );
  }
  const res = await fetch(`${base}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to patch task: ${res.status} ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function deleteTask(id) {
  /**
   * Delete a task by id.
   * Returns: { success: true } or empty.
   */
  const base = getBaseUrl();
  if (!base) {
    throw new Error(
      'Backend URL not configured. Set REACT_APP_API_BASE or REACT_APP_BACKEND_URL.'
    );
  }
  const res = await fetch(`${base}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete task: ${res.status} ${text}`);
  }
  try {
    return await res.json();
  } catch {
    return { success: true };
  }
}
