import React from 'react';

const HomePage = () => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' }}>Bem-vindo</h1>
      <p style={{ color: '#64748b' }}>Selecione uma opção no menu lateral para começar.</p>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#334155', marginBottom: '1rem' }}>Resumo</h2>
        <p style={{ color: '#64748b' }}>Painel de estatísticas será exibido aqui.</p>
      </div>
    </div>
  );
};

export default HomePage;
