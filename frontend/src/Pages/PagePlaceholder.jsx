import React from 'react';

const PagePlaceholder = ({ title }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', color: '#1a365d', marginBottom: '1rem' }}>{title}</h1>
      <p style={{ color: '#64748b' }}>Esta é a página de {title}. O conteúdo será implementado em breve.</p>
    </div>
  );
};

export default PagePlaceholder;
