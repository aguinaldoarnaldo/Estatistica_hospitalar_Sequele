import React from 'react';
import PageContainer from '../../Components/UI/PageContainer';
import { useLocation } from 'react-router-dom';

const ComunaPage = ({ titleOverride }) => {
  const location = useLocation();
  
  // Simple logic to derive title from path if not provided
  // In a real app, this would be more robust
  const getTitle = () => {
    if (titleOverride) return titleOverride;
    
    const pathParts = location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    
    // Convert generic-slug to Generic Title
    return lastPart
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <PageContainer 
      title={getTitle()} 
      subtitle={`Gestão e visualização de dados para: ${location.pathname}`}
    >
      <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
        <h3 style={{ color: '#334155', marginBottom: '1rem' }}>Visão Geral</h3>
        <p style={{ color: '#64748b' }}>
            Esta funcionalidade está atualmente em desenvolvimento. 
            Em breve você poderá visualizar estatísticas detalhadas e gerenciar recursos aqui.
        </p>
      </div>
    </PageContainer>
  );
};

export default ComunaPage;
