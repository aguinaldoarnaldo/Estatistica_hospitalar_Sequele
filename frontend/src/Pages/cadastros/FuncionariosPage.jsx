import React from 'react';
import PageContainer from '../../Components/UI/PageContainer';

const FuncionariosPage = () => {
  return (
    <PageContainer 
      title="Funcionários" 
      subtitle="Gerencie o cadastro de funcionários do município."
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
          + Novo Funcionário
        </button>
      }
    >
      <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
        <p>A lista de funcionários será exibida aqui.</p>
        <p style={{ fontSize: '0.875rem' }}>Tabela em desenvolvimento...</p>
      </div>
    </PageContainer>
  );
};

export default FuncionariosPage;
