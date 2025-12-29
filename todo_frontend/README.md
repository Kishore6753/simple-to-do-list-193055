# To‑Do Frontend (React)

A modern, light-themed to-do list application UI. Users can add, edit, delete, and mark tasks complete. State persists via a backend REST API.

## Features

- Light theme with accents: primary `#3b82f6`, success `#06b6d4`
- Centered layout: task input at top, task list below
- Add, edit (inline), complete, delete tasks
- REST API integration with GET/POST/PUT/PATCH/DELETE to `/tasks`
- Inline alerts for loading/error states
- Responsive, accessible components without heavy UI frameworks

## Environment Variables

Set one of the following to configure the backend base URL:
- `REACT_APP_API_BASE`
- `REACT_APP_BACKEND_URL`

If neither is set, the app shows a clear UI error prompting configuration.

Example:
```
REACT_APP_API_BASE=https://your-backend.example.com
```

## Scripts

- `npm start` — runs the app in development mode at port 3000
- `npm test` — test runner
- `npm run build` — production build

## Code Structure

- `src/services/api.js` — API utilities reading env vars and calling the backend
- `src/components/` — UI components: Header, TaskInput, TaskList, TaskItem
- `src/styles.css` — theme and component styles
- `src/App.js` — main app composition and state management
