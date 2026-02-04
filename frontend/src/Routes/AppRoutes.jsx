import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import NotFound from '../Pages/NotFound/NotFound';
import ErrorPage from '../Pages/Error/ErrorPage';

import LoginPage from '../Pages/Login/LoginPage';
import GeneralDashboard from '../Pages/Dashboard/GeneralDashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />


        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard-geral" element={<GeneralDashboard />} />

        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
