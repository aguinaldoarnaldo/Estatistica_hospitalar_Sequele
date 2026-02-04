import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importando páginas com caminhos absolutos relativos a src para evitar erro de casing
import LoginPage from '../pages/Login/LoginPage';
import HomePage from '../pages/Home/HomePage';
import NotFound from '../pages/NotFound/NotFound';
import MainLayout from '../Components/Layout/MainLayout';
import ComunaPage from '../pages/Comuna/ComunaPage';
import FuncionariosPage from '../pages/cadastros/FuncionariosPage';
import PacientesPage from '../pages/cadastros/PacientesPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rota Raiz vai direto para o Login */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Rota de Login explícita */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas Protegidas com Layout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
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
