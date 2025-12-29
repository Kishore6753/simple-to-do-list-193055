import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import App from './App';

/**
 * Entry point for the React app.
 * The app reads API base URL from process.env (REACT_APP_API_BASE or REACT_APP_BACKEND_URL).
 * It is intended to run on port 3000 under the preview system without starting processes here.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
