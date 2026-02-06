import React, { createContext, useState, useContext } from 'react';

const UnidadeContext = createContext();

export const UnidadeProvider = ({ children }) => {
  const [unidades, setUnidades] = useState([
    // Sequele
    { id: 1, nome: 'Vila Verde Cativa', tipo: 'Hospital', comuna: 'Sequele', capacity: '120', diretor: 'Dr. João' },
    { id: 2, nome: 'Centro de Saúde R Sequele', tipo: 'Centro de Saúde', comuna: 'Sequele', capacity: '60', diretor: 'Dra. Maria' },
    { id: 3, nome: 'Posto de Saúde do Mulundo', tipo: 'Posto de Saúde', comuna: 'Sequele', capacity: '30', diretor: 'Enf. Pedro' },
    // Kifangondo
    { id: 4, nome: 'Centro de Saúde 22 de Janeiro', tipo: 'Centro de Saúde', comuna: 'Kifangondo', capacity: '80', diretor: 'Dr. Fonseca' },
    { id: 5, nome: 'Posto de Saúde da Kaop Velha Sul', tipo: 'Posto de Saúde', comuna: 'Kifangondo', capacity: '25', diretor: 'Enf. Ana' },
    { id: 6, nome: 'Centro de Saúde Alto Kifangondo', tipo: 'Centro de Saúde', comuna: 'Kifangondo', capacity: '55', diretor: 'Dr. Carlos' },
    // Funda
    { id: 7, nome: 'Centro Materno Infantil da Funda', tipo: 'Materno Infantil', comuna: 'Funda', capacity: '40', diretor: 'Dra. Sofia' },
    { id: 8, nome: 'Posto de Saúde da Kilunda', tipo: 'Posto de Saúde', comuna: 'Funda', capacity: '20', diretor: 'Enf. Rui' },
    // Zona Baia
    { id: 9, nome: 'Centro KM30', tipo: 'Centro', comuna: 'Zona Baia', capacity: '50', diretor: 'Dr. Antonio' },
    { id: 10, nome: 'Posto de Saúde Dimba', tipo: 'Posto de Saúde', comuna: 'Zona Baia', capacity: '25', diretor: 'Enf. Carla' }
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
