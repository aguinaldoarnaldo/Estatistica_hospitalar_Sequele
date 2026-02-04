import React from 'react';

const PageContainer = ({ title, subtitle, children, actions }) => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'end', 
        marginBottom: '2rem' 
      }}>
        <div>
          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            color: '#1e293b', 
            letterSpacing: '-0.025em' 
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ color: '#64748b', marginTop: '0.25rem' }}>{subtitle}</p>
          )}
        </div>
        {actions && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {actions}
          </div>
        )}
      </div>
      
      <div style={{ 
        background: 'white', 
        borderRadius: '0.75rem', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #f1f5f9',
        padding: '1.5rem',
        minHeight: '60vh'
      }}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
