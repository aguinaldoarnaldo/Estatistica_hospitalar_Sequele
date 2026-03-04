import React, { useState } from 'react';
import { useStock } from '../../Context/StockContext';
import styles from './StockManagement.module.css';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiArrowUp, FiArrowDown } from 'react-icons/fi';

export default function StockManagement() {
    const { products, categories, batches, addProduct, updateProduct, deleteProduct, addTransaction, suppliers } = useStock();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isTransactionOpen, setIsTransactionOpen] = useState(false);
    const [transactionType, setTransactionType] = useState('ENTRADA'); // 'ENTRADA' or 'SAIDA'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    // Product Form State (Catalog)
    const [formData, setFormData] = useState({
        name: '',
        category: categories[0],
        unit: 'Unidades',
        minStock: '',
        location: ''
    });

    // Transaction Form State
    const [txData, setTxData] = useState({
        quantity: '',
        batchNumber: '',
        expiryDate: '',
        supplierId: '',
        reason: '',
        user: 'Admin' // Mock user
    });

    const resetForm = () => {
        setFormData({
            name: '',
            category: categories[0],
            unit: 'Unidades',
            minStock: '',
            location: ''
        });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const resetTxForm = () => {
        setTxData({ quantity: '', batchNumber: '', expiryDate: '', supplierId: '', reason: '', user: 'Admin' });
        setIsTransactionOpen(false);
        setSelectedProduct(null);
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            category: product.category,
            unit: product.unit,
            minStock: product.minStock,
            location: product.location
        });
        setEditingId(product.id);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este item?')) {
            deleteProduct(id);
        }
    };

    const handleTransaction = (product, type) => {
        setSelectedProduct(product);
        setTransactionType(type);
        setTxData(prev => ({ ...prev, quantity: '', reason: '', batchNumber: '', expiryDate: '', supplierId: suppliers[0]?.id || '' }));
        setIsTransactionOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateProduct(editingId, formData);
        } else {
            addProduct({ ...formData, unitId: 1 });
        }
        resetForm();
    };

    const handleTxSubmit = (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        let batchId = null;
        if (transactionType === 'SAIDA') {
            // Simple FIFO: find first batch with qty > 0
            const productBatches = batches.filter(b => b.productId === selectedProduct.id && b.quantity > 0);
            if (productBatches.length > 0) {
                batchId = productBatches[0].id; // Taking from first available batch
            } else {
                alert('Sem stock disponível para este produto.');
                return;
            }
        }

        addTransaction({
            type: transactionType,
            productId: selectedProduct.id,
            quantity: txData.quantity,
            batchNumber: txData.batchNumber, // Required for IN
            expiryDate: txData.expiryDate, // Required for IN
            supplierId: txData.supplierId, // Required for IN
            batchId: batchId, // Required for OUT
            reason: txData.reason,
            user: txData.user
        });

        resetTxForm();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Gerenciamento de Stock</h2>
                <button className={styles.addButton} onClick={() => { resetForm(); setIsFormOpen(true); }}>
                    <FiPlus /> Novo Item (Catálogo)
                </button>
            </div>

            {/* Product Form Modal */}
            {isFormOpen && (
                <div className={styles.formContainer}>
                    <h3 style={{ marginBottom: '16px' }}>{editingId ? 'Editar Item' : 'Adicionar Novo Item ao Catálogo'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nome do Produto</label>
                                <input className={styles.input} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Categoria</label>
                                <select className={styles.select} value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Unidade de Medida</label>
                                <input className={styles.input} value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Stock Mínimo</label>
                                <input type="number" className={styles.input} value={formData.minStock} onChange={e => setFormData({ ...formData, minStock: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Localização</label>
                                <input className={styles.input} value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                        </div>
                        <div className={styles.formActions}>
                            <button type="button" className={styles.cancelButton} onClick={resetForm}>Cancelar</button>
                            <button type="submit" className={styles.addButton}><FiCheck /> Salvar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Transaction Form Modal */}
            {isTransactionOpen && selectedProduct && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className={styles.formContainer} style={{ width: '500px', margin: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3>{transactionType === 'ENTRADA' ? 'Entrada de Stock' : 'Saída de Stock'} - {selectedProduct.name}</h3>
                            <FiX style={{ cursor: 'pointer' }} onClick={resetTxForm} />
                        </div>
                        <form onSubmit={handleTxSubmit}>
                            <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
                                <label className={styles.label}>Quantidade ({selectedProduct.unit})</label>
                                <input type="number" className={styles.input} value={txData.quantity} onChange={e => setTxData({ ...txData, quantity: e.target.value })} required min="1" />
                            </div>

                            {transactionType === 'ENTRADA' && (
                                <>
                                    <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
                                        <label className={styles.label}>Número do Lote</label>
                                        <input className={styles.input} value={txData.batchNumber} onChange={e => setTxData({ ...txData, batchNumber: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
                                        <label className={styles.label}>Validade</label>
                                        <input type="date" className={styles.input} value={txData.expiryDate} onChange={e => setTxData({ ...txData, expiryDate: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroup} style={{ marginBottom: '12px' }}>
                                        <label className={styles.label}>Fornecedor</label>
                                        <select className={styles.select} value={txData.supplierId} onChange={e => setTxData({ ...txData, supplierId: e.target.value })} required>
                                            <option value="">Selecione...</option>
                                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                                <label className={styles.label}>Motivo / Observação</label>
                                <input className={styles.input} value={txData.reason} onChange={e => setTxData({ ...txData, reason: e.target.value })} required placeholder={transactionType === 'ENTRADA' ? 'Ex: Compra NF 123' : 'Ex: Consumo UTI'} />
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" className={styles.cancelButton} onClick={resetTxForm}>Cancelar</button>
                                <button type="submit" className={styles.addButton} style={{ backgroundColor: transactionType === 'SAIDA' ? '#ef4444' : '#10b981' }}>
                                    <FiCheck /> Confirmar {transactionType === 'ENTRADA' ? 'Entrada' : 'Saída'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Total em Stock</th>
                            <th>Unidade</th>
                            <th>Localização</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td><span className={styles.badge}>{product.category}</span></td>
                                <td style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>{product.quantity}</td>
                                <td>{product.unit}</td>
                                <td>{product.location}</td>
                                <td>
                                    {Number(product.quantity) <= Number(product.minStock) ? (
                                        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Baixo</span>
                                    ) : (
                                        <span style={{ color: '#10b981' }}>Normal</span>
                                    )}
                                </td>
                                <td>
                                    <button className={styles.iconBtn} title="Editar" onClick={() => handleEdit(product)}><FiEdit2 /></button>
                                    <button className={styles.iconBtn} style={{ color: '#10b981' }} title="Entrada de Stock" onClick={() => handleTransaction(product, 'ENTRADA')}><FiArrowUp /></button>
                                    <button className={styles.iconBtn} style={{ color: '#ef4444' }} title="Saída de Stock" onClick={() => handleTransaction(product, 'SAIDA')}><FiArrowDown /></button>
                                    <button className={styles.iconBtn} style={{ color: '#ef4444' }} title="Excluir" onClick={() => handleDelete(product.id)}><FiTrash2 /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className={styles.pagination}>
                <button className={styles.pageButton} onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <span className={styles.pageInfo}>Página {currentPage} de {totalPages}</span>
                <button className={styles.pageButton} onClick={nextPage} disabled={currentPage === totalPages}>Próxima</button>
            </div>
        </div>
    );
}
