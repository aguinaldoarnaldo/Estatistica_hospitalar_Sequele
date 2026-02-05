import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

<<<<<<< HEAD
import NotFound from '../pages/NotFound/NotFound';
import ErrorPage from '../pages/Error/ErrorPage';
import LoginPage from '../pages/Login/LoginPage';
import MainLayout from '../Components/Layout/MainLayout';
import HomePage from '../pages/Home/HomePage';
import ComunasPage from '../pages/cadastros/ComunasPage';
import UnidadesPage from '../pages/cadastros/UnidadesPage';
import PagePlaceholder from '../pages/PagePlaceholder';
// Importando páginas com caminhos absolutos relativos a src para evitar erro de casing
import LoginPage from '../pages/Login/LoginPage';
import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/NotFound/NotFound';
=======
import LoginPage from '../Pages/Login/LoginPage';
import HomePage from '../Pages/Home/HomePage';
import NotFound from '../Pages/NotFound/NotFound';
>>>>>>> origin/feature/login-system
import MainLayout from '../Components/Layout/MainLayout';
import ComunaPage from '../Pages/Comuna/ComunaPage';
import FuncionariosPage from '../Pages/cadastros/FuncionariosPage';
import PacientesPage from '../Pages/cadastros/PacientesPage';
import GeneralDashboard from '../Pages/Dashboard/GeneralDashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<ErrorPage />} />

        {/* Protected Dashboard Routes - Municipio do Sequele (Icolo e Bengo) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          
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

          {/* Settings */}
          <Route path="/settings" element={<PagePlaceholder title="Configurações do Sistema" />} />
        </Route>

        {/* Fallback */}
        {/* Rota Raiz vai direto para o Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rota de Login explícita */}
        <Route path="/login" element={<LoginPage />} />
        {/* Rotas Protegidas com Layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard-geral" element={<GeneralDashboard />} />
          <Route path="/home" element={<GeneralDashboard />} />
          <Route path="/cacuaco/dados" element={<ComunaPage titleOverride="Dados da Comuna de Cacuaco" />} />
          <Route path="/cacuaco/hospital-municipal" element={<ComunaPage titleOverride="Hospital Municipal de Cacuaco" />} />
          <Route path="/cacuaco/hospital-referencia" element={<ComunaPage titleOverride="Hospital de Referência" />} />
          <Route path="/cacuaco/centro-22-janeiro" element={<ComunaPage titleOverride="Centro de Saúde 22 de Janeiro" />} />
          <Route path="/kikolo/dados" element={<ComunaPage titleOverride="Dados da Comuna de Kikolo" />} />
          <Route path="/kikolo/unidades" element={<ComunaPage titleOverride="Unidades Sanitárias - Kikolo" />} />
          <Route path="/funda/dados" element={<ComunaPage titleOverride="Dados da Comuna da Funda" />} />
          <Route path="/funda/unidades" element={<ComunaPage titleOverride="Unidades Sanitárias - Funda" />} />
          <Route path="/cadastros/funcionarios" element={<FuncionariosPage />} />
          <Route path="/cadastros/pacientes" element={<PacientesPage />} />
          <Route path="/settings" element={<ComunaPage titleOverride="Configurações do Sistema" />} />
        </Route>

        {/* Fallback para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
