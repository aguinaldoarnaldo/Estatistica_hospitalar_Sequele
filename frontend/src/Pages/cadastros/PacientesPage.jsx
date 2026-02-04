import React from 'react';
import PageContainer from '../../Components/UI/PageContainer';

const PacientesPage = () => {
  return (
    <PageContainer 
      title="Pacientes" 
      subtitle="Base de dados de pacientes atendidos."
      actions={
        <button style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer'
        }}>
          + Novo Paciente
        </button>
      }
    >
      <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
        <p>A base de dados de pacientes será exibida aqui.</p>
      </div>
    </PageContainer>
  );
};

export default PacientesPage;
