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
import StockDashboard from '../Pages/Stock/StockDashboard';
import StockManagement from '../Pages/Stock/StockManagement';
import HMSDashboard from '../Pages/HMS/HMSDashboard';
import PatientRegistration from '../Pages/HMS/PatientRegistration';
import PatientList from '../Pages/HMS/PatientList'; // Added PatientList import
import ConsultationEntry from '../Pages/HMS/ConsultationEntry';
import ConsultationHistory from '../Pages/HMS/ConsultationHistory'; // Added ConsultationHistory import
import HMSLayout from '../Components/Layout/HMSLayout';
import SystemSelection from '../Pages/SystemSelection/SystemSelection';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Entry Point - System Selection */}
        <Route path="/" element={<SystemSelection />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<ErrorPage />} />

        {/* Protected Dashboard Routes (Statistics) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<GeneralDashboard />} />
          <Route path="/sequele/dados" element={<PagePlaceholder title="Estatísticas do Município do Sequele" />} />
          <Route path="/sequele/unidades" element={<PagePlaceholder title="Unidades Sanitárias do Sequele" />} />
          <Route path="/sequele/comuna/:id" element={<ComunaDetails />} />
          <Route path="/sequele/unidade/:id" element={<HospitalDashboard />} />
          <Route path="/sequele/unidade/:id/stock" element={<StockDashboard />} />
          <Route path="/sequele/unidade/:id/stock/gerenciar" element={<StockManagement />} />
          <Route path="/cadastros/comunas" element={<ComunasPage />} />
          <Route path="/cadastros/unidades" element={<UnidadesPage />} />
          <Route path="/cadastros/periodos" element={<PagePlaceholder title="Gestão de Períodos (Anos, Meses, Trimestres)" />} />
          <Route path="/cadastros/usuarios-acessos" element={<UsuariosAcessosPage />} />
          <Route path="/cadastros/funcionarios" element={<FuncionariosPage />} />
          <Route path="/cadastros/pacientes" element={<PagePlaceholder title="Lista de Pacientes (Sistema Estatístico)" />} />
          <Route path="/dashboard-geral" element={<GeneralDashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Protected HMS Routes (Hospital Management) */}
        <Route element={<HMSLayout />}>
          <Route path="/hms" element={<HMSDashboard />} />
          <Route path="/hms/pacientes/novo" element={<PatientRegistration />} />
          <Route path="/hms/pacientes" element={<PatientList />} />
          <Route path="/hms/consultas/novo" element={<ConsultationEntry />} />
          <Route path="/hms/consultas" element={<ConsultationHistory />} />
        </Route>

        {/* Fallback para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
