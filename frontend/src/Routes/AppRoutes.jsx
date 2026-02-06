import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NotFound from '../pages/NotFound/NotFound';
import ErrorPage from '../pages/Error/ErrorPage';
import LoginPage from '../pages/Login/LoginPage';
import MainLayout from '../Components/Layout/MainLayout';
import HomePage from '../pages/Home/HomePage';
import ComunasPage from '../pages/cadastros/ComunasPage';
import UnidadesPage from '../pages/cadastros/UnidadesPage';
import PagePlaceholder from '../pages/PagePlaceholder';
import ComunaPage from '../pages/Comuna/ComunaPage';
import FuncionariosPage from '../pages/cadastros/FuncionariosPage';
import PacientesPage from '../pages/cadastros/PacientesPage';
import GeneralDashboard from '../pages/Dashboard/GeneralDashboard';

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
          <Route path="/sequele/comuna/:id" element={<PagePlaceholder title="Detalhes da Comuna" />} />

          {/* Cadastros */}
          <Route path="/cadastros/comunas" element={<ComunasPage />} />
          <Route path="/cadastros/unidades" element={<UnidadesPage />} />
          <Route path="/cadastros/periodos" element={<PagePlaceholder title="Gestão de Períodos (Anos, Meses, Trimestres)" />} />
          <Route path="/cadastros/usuarios-acessos" element={<PagePlaceholder title="Segurança: Usuários e Acessos" />} />
          <Route path="/cadastros/funcionarios" element={<FuncionariosPage />} />
          <Route path="/cadastros/pacientes" element={<PacientesPage />} />

          {/* Dashboard Geral Extra */}
          <Route path="/dashboard-geral" element={<GeneralDashboard />} />

          {/* Settings */}
          <Route path="/settings" element={<PagePlaceholder title="Configurações do Sistema" />} />
        </Route>

        {/* Fallback para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
