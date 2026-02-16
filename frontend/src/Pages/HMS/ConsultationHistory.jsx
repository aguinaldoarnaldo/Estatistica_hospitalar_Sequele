import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiSearch, FiCalendar, FiActivity, FiUser, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useUnidades } from '../../context/UnidadeContext';
import { useClinical } from '../../context/ClinicalContext';

const ConsultationHistory = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { unidades } = useUnidades();
    const { getConsultations } = useClinical();
    const [searchTerm, setSearchTerm] = useState('');

    const unidadeId = user?.unidadeId || 1;
    const unidade = unidades.find(u => u.id === unidadeId) || unidades[0];
    const history = getConsultations(unidadeId);

    // Temas por comuna (matching consistency)
    const communeColors = {
        'Sequele': { bg: '#fdf4ff', border: '1px solid #f5d0fe', icon: '#8b5cf6', text: '#581c87' },
        'Kifangondo': { bg: '#dcfce7', border: '1px solid #86efac', icon: '#16a34a', text: '#14532d' },
        'Funda': { bg: '#fee2e2', border: '1px solid #fca5a5', icon: '#dc2626', text: '#7f1d1d' },
        'Zona Baia': { bg: '#fef9c3', border: '1px solid #fde047', icon: '#d97706', text: '#78350f' }
    };

    const currentTheme = (unidade?.comuna && communeColors[unidade.comuna])
        ? communeColors[unidade.comuna]
        : communeColors['Sequele'];

    const filteredHistory = history.filter(c =>
        c.pacienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FiCalendar style={{ color: currentTheme.icon }} /> Histórico de Consultas
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: '500' }}>{unidade.nome} • Registos Médicos e Estatísticos</p>
                </div>
                <button
                    onClick={() => navigate('/hms/consultas/novo')}
                    style={{
                        backgroundColor: currentTheme.icon,
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '10px',
                        border: 'none',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <FiPlus /> Nova Consulta
                </button>
            </header>

            <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ marginBottom: '24px', position: 'relative' }}>
                    <FiSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Pesquisar por paciente ou especialidade..."
                        style={{
                            width: '100%',
                            padding: '14px 14px 14px 45px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.95rem',
                            outline: 'none'
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredHistory.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                    <th style={{ textAlign: 'left', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Paciente</th>
                                    <th style={{ textAlign: 'left', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Serviço / Especialidade</th>
                                    <th style={{ textAlign: 'left', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Data e Hora</th>
                                    <th style={{ textAlign: 'left', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Estado</th>
                                    <th style={{ textAlign: 'right', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Médico</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistory.map((cons, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }} className="history-row">
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                    <FiUser size={16} />
                                                </div>
                                                <span style={{ fontWeight: '700', color: '#1e293b' }}>{cons.pacienteNome}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                backgroundColor: '#f8fafc',
                                                color: '#475569',
                                                padding: '4px 12px',
                                                borderRadius: '6px',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                border: '1px solid #e2e8f0'
                                            }}>
                                                {cons.especialidade}
                                                <span style={{ marginLeft: '6px', opacity: 0.6, fontSize: '0.75rem' }}>({cons.tipoVisita})</span>
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>
                                            {formatDate(cons.data)}
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                color: '#16a34a',
                                                fontSize: '0.85rem',
                                                fontWeight: '700',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <FiCheckCircle /> {cons.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right', color: '#475569', fontWeight: '600', fontSize: '0.9rem' }}>
                                            {cons.medico}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '3rem', color: '#e2e8f0', marginBottom: '16px' }}><FiActivity /></div>
                        <h3 style={{ color: '#64748b', fontWeight: '700', marginBottom: '8px' }}>Nenhum registo encontrado</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>As consultas registradas aparecerão aqui para memória clínica.</p>
                    </div>
                )}
            </div>

            <style>
                {`
                .history-row:hover {
                    background-color: #f8fafc;
                }
                `}
            </style>
        </div>
    );
};

export default ConsultationHistory;
