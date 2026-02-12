import React, { useState } from 'react';
import { useStock } from '../../Context/StockContext';
import styles from './StockManagement.module.css'; // Reusing styles
import { FiArrowUp, FiArrowDown, FiFilter, FiAlertOctagon } from 'react-icons/fi';

export default function StockTransactions() {
    const { transactions, products, batches } = useStock();

    // Filters
    const [filterType, setFilterType] = useState('ALL');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [cutoffRequisition, setCutoffRequisition] = useState(false); // Filtro "Corte de Requisição"

    // Helper to get product name
    const getProductName = (id) => products.find(p => p.id === id)?.name || 'Desconhecido';
    const getBatchNumber = (id) => batches.find(b => b.id === id)?.batchNumber || 'N/A';

    const filteredTransactions = transactions.filter(t => {
        if (filterType !== 'ALL' && t.type !== filterType) return false;
        if (startDate && t.date < startDate) return false;
        if (endDate && t.date > endDate) return false;

        // Lógica do Corte de Requisição:
        // Se ativado, mostra apenas SAIDAS que aconteceram hoje (simulando o corte do dia)
        // ou poderia ser uma lógica customizada. Aqui vamos simular: Mostrar transações de hoje.
        if (cutoffRequisition) {
            const today = new Date().toISOString().split('T')[0];
            return t.date === today && t.type === 'SAIDA';
        }

        return true;
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Histórico de Movimentações</h2>
            </div>

            {/* Filters */}
            <div className={styles.formContainer} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label className={styles.label}>Tipo</label>
                    <select className={styles.select} value={filterType} onChange={e => setFilterType(e.target.value)}>
                        <option value="ALL">Todos</option>
                        <option value="ENTRADA">Entradas</option>
                        <option value="SAIDA">Saídas</option>
                    </select>
                </div>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label className={styles.label}>Data Início</label>
                    <input type="date" className={styles.input} value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label className={styles.label}>Data Fim</label>
                    <input type="date" className={styles.input} value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>

                {/* Botão de Corte de Requisição */}
                <div className={styles.formGroup}>
                    <button
                        className={styles.addButton}
                        style={{ backgroundColor: cutoffRequisition ? '#ef4444' : '#64748b' }}
                        onClick={() => setCutoffRequisition(!cutoffRequisition)}
                    >
                        <FiAlertOctagon /> {cutoffRequisition ? 'Remover Corte' : 'Ver Corte de Requisição'}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Tipo</th>
                            <th>Produto</th>
                            <th>Lote</th>
                            <th>Qtd</th>
                            <th>Motivo/Destino</th>
                            <th>Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map(t => (
                            <tr key={t.id}>
                                <td>{t.date}</td>
                                <td>
                                    <span style={{
                                        color: t.type === 'ENTRADA' ? '#10b981' : '#ef4444',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        {t.type === 'ENTRADA' ? <FiArrowUp /> : <FiArrowDown />}
                                        {t.type}
                                    </span>
                                </td>
                                <td>{getProductName(t.productId)}</td>
                                <td>{getBatchNumber(t.batchId)}</td>
                                <td>{t.quantity}</td>
                                <td>{t.reason}</td>
                                <td>{t.user}</td>
                            </tr>
                        ))}
                        {filteredTransactions.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>
                                    Nenhuma movimentação encontrada para os filtros selecionados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
