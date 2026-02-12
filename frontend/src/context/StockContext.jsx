import React, { createContext, useState, useContext, useEffect } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
    // Catálogo de Produtos (Dados estáticos/cadastrais)
    const [rawProducts, setRawProducts] = useState([
        { id: 1, name: 'Paracetamol 500mg', category: 'Medicamentos', unit: 'Caixas', minStock: 50, location: 'Farmácia Central', unitId: 1 },
        { id: 2, name: 'Luvas Cirúrgicas', category: 'Consumíveis', unit: 'Pares', minStock: 200, location: 'Almoxarifado', unitId: 1 },
        { id: 3, name: 'Seringas 5ml', category: 'Consumíveis', unit: 'Unidades', minStock: 100, location: 'Almoxarifado', unitId: 1 },
        { id: 4, name: 'Amoxicilina 500mg', category: 'Medicamentos', unit: 'Caixas', minStock: 60, location: 'Farmácia Central', unitId: 1 },
        { id: 5, name: 'Raio-X Portátil', category: 'Equipamentos', unit: 'Unidades', minStock: 1, location: 'Radiologia', unitId: 1 },
    ]);

    // Lotes (Batches) - Onde a quantidade real reside
    const [batches, setBatches] = useState([
        { id: 101, productId: 1, batchNumber: 'LOTE-001', expiryDate: '2026-12-31', quantity: 300, supplierId: 1 },
        { id: 102, productId: 1, batchNumber: 'LOTE-002', expiryDate: '2025-06-30', quantity: 200, supplierId: 1 },
        { id: 103, productId: 2, batchNumber: 'LUV-2024', expiryDate: '2027-01-01', quantity: 1200, supplierId: 2 },
        { id: 104, productId: 3, batchNumber: 'SRG-55', expiryDate: '2025-12-12', quantity: 300, supplierId: 2 },
        { id: 105, productId: 4, batchNumber: 'AMX-99', expiryDate: '2024-10-10', quantity: 40, supplierId: 1 }, // Perto de vencer/Vencido
        { id: 106, productId: 5, batchNumber: 'RX-DEVICE', expiryDate: '2030-01-01', quantity: 2, supplierId: 3 },
    ]);

    // Histórico de Movimentações
    const [transactions, setTransactions] = useState([
        { id: 1, type: 'ENTRADA', productId: 1, batchId: 101, quantity: 300, date: '2025-01-10', reason: 'Compra Inicial', user: 'Admin' },
        { id: 2, type: 'SAIDA', productId: 1, batchId: 101, quantity: 50, date: '2025-01-15', reason: 'Requisição Pediatria', user: 'Enf. Maria' },
    ]);

    // Fornecedores
    const [suppliers, setSuppliers] = useState([
        { id: 1, name: 'Angola Pharma', nif: '123456789', contact: '+244 923 000 000', email: 'contato@angolapharma.ao' },
        { id: 2, name: 'MedGlobal S.A.', nif: '987654321', contact: '+244 912 000 000', email: 'vendas@medglobal.com' },
        { id: 3, name: 'Equipamentos Med', nif: '456123789', contact: '+244 930 000 000', email: 'support@equipmed.ao' },
    ]);

    const [categories] = useState(['Medicamentos', 'Consumíveis', 'Equipamentos', 'Outros']);

    // Derivar produtos com quantidade calculada baseada nos lotes
    const products = React.useMemo(() => {
        return rawProducts.map(p => {
            const totalQuantity = batches
                .filter(b => b.productId === p.id)
                .reduce((acc, curr) => acc + Number(curr.quantity), 0);
            return { ...p, quantity: totalQuantity };
        });
    }, [rawProducts, batches]);

    const addProduct = (product) => {
        setRawProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    };

    const updateProduct = (id, updatedProduct) => {
        setRawProducts((prev) => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    };

    const deleteProduct = (id) => {
        setRawProducts((prev) => prev.filter(p => p.id !== id));
        setBatches(prev => prev.filter(b => b.productId !== id)); // Remove lotes órfãos
    };

    const addSupplier = (supplier) => {
        setSuppliers(prev => [...prev, { ...supplier, id: Date.now() }]);
    };

    const updateSupplier = (id, updated) => {
        setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    };

    const deleteSupplier = (id) => {
        setSuppliers(prev => prev.filter(s => s.id !== id));
    };

    // Movimentação de Stock (O coração do sistema)
    const addTransaction = (transaction) => {
        // transaction: { type: 'ENTRADA' | 'SAIDA', productId, batchNumber, expiryDate, quantity, supplierId, reason, user, ... }

        // Create new transaction record
        const newTx = { ...transaction, id: Date.now(), date: new Date().toISOString().split('T')[0] };
        setTransactions(prev => [newTx, ...prev]);

        if (transaction.type === 'ENTRADA') {
            const batchQty = Number(transaction.quantity);
            // Verificar se lote já existe para este produto (mesmo numero e validade)
            const existingBatchIndex = batches.findIndex(b =>
                b.productId === Number(transaction.productId) &&
                b.batchNumber === transaction.batchNumber
            );

            if (existingBatchIndex >= 0) {
                // Atualiza lote existente
                const updatedBatches = [...batches];
                updatedBatches[existingBatchIndex].quantity += batchQty;
                setBatches(updatedBatches);
            } else {
                // Cria novo lote
                const newBatch = {
                    id: Date.now() + 1, // Ensure unique ID
                    productId: Number(transaction.productId),
                    batchNumber: transaction.batchNumber,
                    expiryDate: transaction.expiryDate,
                    quantity: batchQty,
                    supplierId: transaction.supplierId
                };
                setBatches(prev => [...prev, newBatch]);
            }
        } else if (transaction.type === 'SAIDA') {
            // Reduzir do lote
            const qtyToRemove = Number(transaction.quantity);
            if (transaction.batchId) {
                setBatches(prev => prev.map(b => {
                    if (b.id === Number(transaction.batchId)) {
                        return { ...b, quantity: Math.max(0, b.quantity - qtyToRemove) };
                    }
                    return b;
                }));
            }
        }
    };

    const getProductsByUnit = (unitId) => products; // Placeholder logic

    return (
        <StockContext.Provider value={{
            products, batches, transactions, suppliers, categories,
            addProduct, updateProduct, deleteProduct,
            addSupplier, updateSupplier, deleteSupplier,
            addTransaction, getProductsByUnit
        }}>
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
