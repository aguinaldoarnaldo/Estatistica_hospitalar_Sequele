import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NotFound from '../Pages/NotFound/NotFound';
import ErrorPage from '../Pages/Error/ErrorPage';
import LoginPage from '../Pages/Login/LoginPage';
import MainLayout from '../Components/Layout/MainLayout';
import HomePage from '../Pages/Home/HomePage';
import ComunasPage from '../Pages/cadastros/ComunasPage';
import UnidadesPage from '../Pages/cadastros/UnidadesPage';
import UsuariosAcessosPage from '../Pages/cadastros/UsuariosAcessosPage';
import PagePlaceholder from '../Pages/PagePlaceholder';
import ComunaPage from '../Pages/Comuna/ComunaPage';
import ComunaDetails from '../Pages/Comuna/ComunaDetails';
import FuncionariosPage from '../Pages/cadastros/FuncionariosPage';
import PacientesPage from '../Pages/cadastros/PacientesPage';
import GeneralDashboard from '../Pages/Dashboard/GeneralDashboard';
import HospitalDashboard from '../Pages/Dashboard/HospitalDashboard';
import Settings from '../Pages/Settings/Settings';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<ErrorPage />} />

        {/* Protected Dashboard Routes */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<GeneralDashboard />} />

          {/* Sequele */}
          <Route path="/sequele/dados" element={<PagePlaceholder title="Estatísticas do Município do Sequele" />} />
          <Route path="/sequele/unidades" element={<PagePlaceholder title="Unidades Sanitárias do Sequele" />} />
          {/* Rota dinâmica para cada comuna */}
          <Route path="/sequele/comuna/:id" element={<ComunaDetails />} />

          {/* Dashboard Individual do Hospital */}
          <Route path="/sequele/unidade/:id" element={<HospitalDashboard />} />

          {/* Cadastros */}
          <Route path="/cadastros/comunas" element={<ComunasPage />} />
          <Route path="/cadastros/unidades" element={<UnidadesPage />} />
          <Route path="/cadastros/periodos" element={<PagePlaceholder title="Gestão de Períodos (Anos, Meses, Trimestres)" />} />
          <Route path="/cadastros/usuarios-acessos" element={<UsuariosAcessosPage />} />
          <Route path="/cadastros/funcionarios" element={<FuncionariosPage />} />
          <Route path="/cadastros/pacientes" element={<PacientesPage />} />

          {/* Dashboard Geral Extra */}
          <Route path="/dashboard-geral" element={<GeneralDashboard />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Fallback para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
