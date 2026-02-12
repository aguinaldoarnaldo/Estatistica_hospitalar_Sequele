import React, { createContext, useState, useContext } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
    // Dados simulados de exemplo
    const [products, setProducts] = useState([
        { id: 1, name: 'Paracetamol 500mg', category: 'Medicamentos', quantity: 500, unit: 'Caixas', minStock: 50, location: 'Farmácia Central', unitId: 1 },
        { id: 2, name: 'Luvas Cirúrgicas', category: 'Consumíveis', quantity: 1200, unit: 'Pares', minStock: 200, location: 'Almoxarifado', unitId: 1 },
        { id: 3, name: 'Seringas 5ml', category: 'Consumíveis', quantity: 300, unit: 'Unidades', minStock: 100, location: 'Almoxarifado', unitId: 1 },
        { id: 4, name: 'Amoxicilina 500mg', category: 'Medicamentos', quantity: 40, unit: 'Caixas', minStock: 60, location: 'Farmácia Central', unitId: 1 }, // Baixo estoque
        { id: 5, name: 'Raio-X Portátil', category: 'Equipamentos', quantity: 2, unit: 'Unidades', minStock: 1, location: 'Radiologia', unitId: 1 },
    ]);

    const [categories] = useState(['Medicamentos', 'Consumíveis', 'Equipamentos', 'Outros']);

    const addProduct = (product) => {
        setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts((prev) => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    };

    const deleteProduct = (id) => {
        setProducts((prev) => prev.filter(p => p.id !== id));
    };

    const getProductsByUnit = (unitId) => {
        // Por enquanto, para simplificar o mock, retornamos tudo ou filtramos se o ID bater (assumindo 1 para demo)
        // Na real seria filter(p => p.unitId === Number(unitId))
        return products;
    };

    return (
        <StockContext.Provider value={{ products, categories, addProduct, updateProduct, deleteProduct, getProductsByUnit }}>
            {children}
        </StockContext.Provider>
    );
};

export const useStock = () => {
    const context = useContext(StockContext);
    if (!context) {
        throw new Error('useStock deve ser usado dentro de um StockProvider');
    }
    return context;
};
