import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const colors = {
    primary: '#4A90E2',
    secondary: '#0D3B66',
    success: '#4CAF50',
    warning: '#F39C12',
    danger: '#E74C3C',
    grey: '#BDC3C7'
};

const diseaseData = [
    { name: 'Malária', value: 400 },
    { name: 'Febre Tifóide', value: 300 },
    { name: 'Doenças Respiratórias', value: 300 },
    { name: 'Diarréia Aguda', value: 200 },
];

const PIE_COLORS = [colors.primary, colors.success, colors.warning, colors.danger];

const ServicesChart = ({ data }) => {
    // 1. Calculate Aggregated Totals
    const aggregatedData = [
        { name: 'Consultas Externas', value: data.reduce((acc, curr) => acc + (curr.consultas || 0), 0), color: colors.primary },
        { name: 'Banco de Urgência', value: data.reduce((acc, curr) => acc + (curr.urgencias || 0), 0), color: colors.danger },
        { name: 'Laboratório', value: data.reduce((acc, curr) => acc + (curr.laboratorio || 0), 0), color: colors.warning },
        { name: 'Cirurgias', value: data.reduce((acc, curr) => acc + (curr.cirurgias || 0), 0), color: colors.secondary },
        { name: 'Partos', value: data.reduce((acc, curr) => acc + (curr.partos || 0), 0), color: colors.success },
        { name: 'Pré-Natal', value: data.reduce((acc, curr) => acc + (curr.prenatal || 0), 0), color: '#8E44AD' } // Purple for Prenatal
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
            {/* Bar Chart: Total Services (Aggregated) */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: colors.secondary, marginBottom: '20px' }}>Total de Serviços Realizados</h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={aggregatedData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 40 }} // Increased bottom margin
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: colors.grey, fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                                angle={-20} // Rotated for better readability
                                textAnchor="end"
                                height={60} // Added height to prevent clipping
                            />
                            <YAxis tick={{ fill: colors.grey }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                            />
                            {/* Single Bar component since data is flattened, but we can color each bar individually */}
                            <Bar dataKey="value" name="Total Realizado" radius={[4, 4, 0, 0]}>
                                {aggregatedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Chart: Top Diseases */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ color: colors.secondary, marginBottom: '20px' }}>Doenças Mais Frequentes</h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={diseaseData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {diseaseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
export default ServicesChart;
