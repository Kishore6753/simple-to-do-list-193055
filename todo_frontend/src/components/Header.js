import React from 'react';

// PUBLIC_INTERFACE
export default function Header() {
  /**
   * Header component rendering the app title and description.
   */
  return (
    <div className="header" role="banner">
      <h1 className="header-title">To‑Do List</h1>
      <p className="header-subtitle">
        Add, edit, delete, and mark tasks complete. Changes persist via API.
      </p>
    </div>
  );
}
