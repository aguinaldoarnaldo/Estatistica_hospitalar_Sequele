import React, { useState } from 'react';
import { useStock } from '../../Context/StockContext';
import styles from './StockManagement.module.css'; // Reusing styles
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiTruck } from 'react-icons/fi';

export default function StockSuppliers() {
    const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useStock();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        nif: '',
        contact: '',
        email: ''
    });

    const resetForm = () => {
        setFormData({ name: '', nif: '', contact: '', email: '' });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const handleEdit = (supplier) => {
        setFormData(supplier);
        setEditingId(supplier.id);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza?')) deleteSupplier(id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) updateSupplier(editingId, formData);
        else addSupplier(formData);
        resetForm();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Gestão de Fornecedores</h2>
                <button className={styles.addButton} onClick={() => { resetForm(); setIsFormOpen(true); }}>
                    <FiPlus /> Novo Fornecedor
                </button>
            </div>

            {isFormOpen && (
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nome da Empresa</label>
                                <input className={styles.input} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>NIF</label>
                                <input className={styles.input} value={formData.nif} onChange={e => setFormData({ ...formData, nif: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Contacto</label>
                                <input className={styles.input} value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email</label>
                                <input className={styles.input} type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                        </div>
                        <div className={styles.formActions}>
                            <button type="button" className={styles.cancelButton} onClick={resetForm}>Cancelar</button>
                            <button type="submit" className={styles.addButton}><FiCheck /> Salvar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>NIF</th>
                            <th>Contacto</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(s => (
                            <tr key={s.id}>
                                <td><FiTruck style={{ marginRight: 8 }} /> {s.name}</td>
                                <td>{s.nif}</td>
                                <td>{s.contact}</td>
                                <td>{s.email}</td>
                                <td>
                                    <button className={`${styles.actionButton} ${styles.editBtn}`} onClick={() => handleEdit(s)}>
                                        <FiEdit2 />
                                    </button>
                                    <button className={`${styles.actionButton} ${styles.deleteBtn}`} onClick={() => handleDelete(s.id)}>
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
