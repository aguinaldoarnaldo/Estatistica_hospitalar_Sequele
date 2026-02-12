import React from 'react';
import { useStock } from '../../Context/StockContext';
import styles from './StockDashboard.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiBox, FiAlertTriangle, FiActivity, FiDollarSign } from 'react-icons/fi';

export default function StockDashboard() {
    const { products } = useStock();

    // Cálculos de Resumo
    const totalItems = products.reduce((acc, curr) => acc + Number(curr.quantity), 0);
    const lowStockItems = products.filter(p => Number(p.quantity) <= Number(p.minStock));
    const totalProducts = products.length;

    // Dados para Gráficos
    const categoryData = products.reduce((acc, curr) => {
        const cat = curr.category;
        if (!acc[cat]) acc[cat] = 0;
        acc[cat] += Number(curr.quantity);
        return acc;
    }, {});

    const chartData = Object.keys(categoryData).map(key => ({
        name: key,
        quantidade: categoryData[key]
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Painel de Stock</h2>
                <p className={styles.subtitle}>Visão geral do inventário da unidade hospitalar.</p>
            </div>

            {/* Cards de Resumo */}
            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <FiBox style={{ marginRight: 8 }} /> Total de Itens
                    </div>
                    <div className={styles.cardValue}>{totalItems}</div>
                    <div className={styles.cardFooter}>
                        Em {totalProducts} produtos diferentes
                    </div>
                </div>

                <div className={`${styles.card} ${lowStockItems.length > 0 ? styles.alertCard : ''}`}>
                    <div className={styles.cardTitle}>
                        <FiAlertTriangle style={{ marginRight: 8 }} /> Stock Baixo
                    </div>
                    <div className={`${styles.cardValue} ${lowStockItems.length > 0 ? styles.alertValue : ''}`}>
                        {lowStockItems.length}
                    </div>
                    <div className={styles.cardFooter} style={{ color: lowStockItems.length > 0 ? '#ef4444' : '#10b981' }}>
                        {lowStockItems.length > 0 ? 'Requer atenção imediata' : 'Níveis normais'}
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardTitle}>
                        <FiActivity style={{ marginRight: 8 }} /> Movimentações (Mês)
                    </div>
                    <div className={styles.cardValue}>124</div>
                    <div className={styles.cardFooter}>
                        +12% que no mês passado
                    </div>
                </div>
            </div>

            {/* Gráficos */}
            <div className={styles.grid}>
                <div className={styles.chartContainer}>
                    <h3 className={styles.sectionTitle}>Distribuição por Categoria</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quantidade" fill="#4f46e5" name="Quantidade" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.chartContainer}>
                    <h3 className={styles.sectionTitle}>Status do Stock</h3>
                    {/* Placeholder para outro gráfico ou lista de alertas */}
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
                        {lowStockItems.length > 0 ? (
                            lowStockItems.map(item => (
                                <div key={item.id} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                                    <span style={{ color: '#ef4444', fontWeight: 'bold' }}>
                                        {item.quantity} {item.unit} (Mín: {item.minStock})
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#64748b', textAlign: 'center', marginTop: '20px' }}>Todos os níveis de stock estão adequados.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
