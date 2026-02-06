import React from 'react';

const HomePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', color: '#1a365d', marginBottom: '0.5rem' }}>Estatística Hospitalar</h1>
      <h2 style={{ fontSize: '1.25rem', color: '#3b82f6', marginBottom: '2rem', fontWeight: '500' }}>Município do Sequele - Icolo e Bengo</h2>
      
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Bem-vindo ao sistema central de monitoramento de recursos e estatísticas de unidades sanitárias do município.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
          <h3 style={{ color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Unidades Ativas</h3>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b' }}>14</p>
          <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: '600' }}>↑ 2 novas este mês</span>
        </div>
        
        <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
          <h3 style={{ color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Total de Atendimentos</h3>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b' }}>3,842</p>
          <span style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: '600' }}>Relatório do trimestre</span>
        </div>

        <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
          <h3 style={{ color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Médicos em Serviço</h3>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b' }}>45</p>
          <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Em todas as unidades</span>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#334155', marginBottom: '1rem' }}>Resumo Geral</h2>
        <p style={{ color: '#64748b' }}>Selecione uma opção no menu lateral para visualizar detalhes específicos de cada comuna ou unidade.</p>
      </div>
    </div>
  );
};

export default HomePage;
