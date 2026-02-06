import React, { createContext, useState, useContext, useEffect } from 'react';

const ComunaContext = createContext();

export const ComunaProvider = ({ children }) => {
  // Initial demo data
  const [comunas, setComunas] = useState([
    { id: 1, nome: 'Sequele', populacao: '120.000', descricao: 'Zona residencial principal' },
    { id: 2, nome: 'Bengo', populacao: '45.000', descricao: 'Zona de expansão' }
  ]);

  const addComuna = (novaComuna) => {
    setComunas((prev) => [...prev, { ...novaComuna, id: Date.now() }]);
  };

  const deleteComuna = (id) => {
    setComunas((prev) => prev.filter(c => c.id !== id));
  };

  return (
    <ComunaContext.Provider value={{ comunas, addComuna, deleteComuna }}>
      {children}
    </ComunaContext.Provider>
  );
};

export const useComunas = () => {
  const context = useContext(ComunaContext);
  if (!context) {
    throw new Error('useComunas deve ser usado dentro de um ComunaProvider');
  }
  return context;
};
