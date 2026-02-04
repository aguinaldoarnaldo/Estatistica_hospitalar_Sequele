import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './index.css';

/**
 * Main App Component
 * Serves as the entry point for the application UI.
 * Integrates the routing system.
 */
function App() {
  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
}

export default App;
