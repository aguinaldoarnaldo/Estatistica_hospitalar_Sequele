import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />
        
  
        <Route path="/login" element={""} />
        
      
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
