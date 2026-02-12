import React, { useState } from 'react';
import { useStock } from '../../Context/StockContext';
import styles from './StockManagement.module.css';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';

export default function StockManagement() {
    const { products, categories, addProduct, updateProduct, deleteProduct } = useStock();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: categories[0],
        quantity: '',
        unit: 'Unidades',
        minStock: '',
        location: ''
    });

    const resetForm = () => {
        setFormData({
            name: '',
            category: categories[0],
            quantity: '',
            unit: 'Unidades',
            minStock: '',
            location: ''
        });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditingId(product.id);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este item?')) {
            deleteProduct(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateProduct(editingId, formData);
        } else {
            addProduct({ ...formData, unitId: 1 }); // Mock unitId
        }
        resetForm();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Gerenciamento de Stock</h2>
                <button className={styles.addButton} onClick={() => { resetForm(); setIsFormOpen(true); }}>
                    <FiPlus /> Novo Item
                </button>
            </div>

            {isFormOpen && (
                <div className={styles.formContainer}>
                    <h3 style={{ marginBottom: '16px' }}>{editingId ? 'Editar Item' : 'Adicionar Novo Item'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nome do Produto</label>
                                <input
                                    className={styles.input}
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Categoria</label>
                                <select
                                    className={styles.select}
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Quantidade</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={formData.quantity}
                                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Unidade de Medida</label>
                                <input
                                    className={styles.input}
                                    value={formData.unit}
                                    onChange={e => setFormData({ ...formData, unit: e.target.value })}
                                    placeholder="ex: Caixas, Frascos"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Stock Mínimo</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={formData.minStock}
                                    onChange={e => setFormData({ ...formData, minStock: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Localização</label>
                                <input
                                    className={styles.input}
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="ex: Prateleira A1"
                                />
                            </div>
                        </div>
                        <div className={styles.formActions}>
                            <button type="button" className={styles.cancelButton} onClick={resetForm}>
                                Cancelar
                            </button>
                            <button type="submit" className={styles.addButton}>
                                <FiCheck /> Salvar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Quantidade</th>
                            <th>Unidade</th>
                            <th>Localização</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        backgroundColor: '#e0e7ff',
                                        color: '#4338ca'
                                    }}>
                                        {product.category}
                                    </span>
                                </td>
                                <td>{product.quantity}</td>
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
                                    <button className={`${styles.actionButton} ${styles.editBtn}`} onClick={() => handleEdit(product)}>
                                        <FiEdit2 />
                                    </button>
                                    <button className={`${styles.actionButton} ${styles.deleteBtn}`} onClick={() => handleDelete(product.id)}>
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', color: '#64748b' }}>Nenhum item encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
