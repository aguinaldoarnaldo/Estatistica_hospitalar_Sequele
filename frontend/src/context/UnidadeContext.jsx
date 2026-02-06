import React, { createContext, useState, useContext } from 'react';

const UnidadeContext = createContext();

export const UnidadeProvider = ({ children }) => {
  const [unidades, setUnidades] = useState([
    { id: 1, nome: 'Hospital Municipal do Sequele', tipo: 'Hospital', comuna: 'Sequele', capacity: '150', diretor: 'Dr. Arnaldo' },
    { id: 2, nome: 'Centro de Saúde do Bengo', tipo: 'Centro de Saúde', comuna: 'Bengo', capacity: '40', diretor: 'Dra. Maria' }
  ]);

  const addUnidade = (novaUnidade) => {
    setUnidades((prev) => [...prev, { ...novaUnidade, id: Date.now() }]);
  };

  const deleteUnidade = (id) => {
    setUnidades((prev) => prev.filter(u => u.id !== id));
  };

  return (
    <UnidadeContext.Provider value={{ unidades, addUnidade, deleteUnidade }}>
      {children}
    </UnidadeContext.Provider>
  );
};

export const useUnidades = () => {
  const context = useContext(UnidadeContext);
  if (!context) {
    throw new Error('useUnidades deve ser usado dentro de um UnidadeProvider');
  }
  return context;
};
