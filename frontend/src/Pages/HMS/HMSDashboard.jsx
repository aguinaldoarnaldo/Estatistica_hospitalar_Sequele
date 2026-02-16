import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiClipboard, FiPlusCircle, FiList, FiActivity, FiTarget, FiHeart, FiBox, FiScissors, FiThermometer, FiArrowLeft, FiChevronDown, FiPrinter } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useUnidades } from '../../context/UnidadeContext';
import { getHospitalStats } from '../../utils/mockStats';

const HMSDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { unidades } = useUnidades();

    // Localizar a unidade hospitalar associada ao utilizador logado
    const unidadeId = user?.unidadeId || 1;
    const unidade = unidades.find(u => u.id === unidadeId) || unidades[0];

    // Temas por comuna (mesma lógica do dashboard estatístico para manter consistência)
    const communeColors = {
        'Sequele': {
            bg: '#dbeafe',
            border: '1px solid #93c5fd',
            icon: '#2563eb',
            text: '#1e3a8a'
        },
        'Kifangondo': {
            bg: '#dcfce7',
            border: '1px solid #86efac',
            icon: '#16a34a',
            text: '#14532d'
        },
        'Funda': {
            bg: '#fee2e2',
            border: '1px solid #fca5a5',
            icon: '#dc2626',
            text: '#7f1d1d'
        },
        'Zona Baia': {
            bg: '#fef9c3',
            border: '1px solid #fde047',
            icon: '#d97706',
            text: '#78350f'
        }
    };

    const currentTheme = (unidade?.comuna && communeColors[unidade.comuna])
        ? communeColors[unidade.comuna]
        : communeColors['Sequele'];

    const stats = getHospitalStats(unidadeId);
    const { cards, chartConsultas } = stats;

    const StatsCard = ({ title, icon, value }) => (
        <div style={{
            background: currentTheme.bg,
            border: currentTheme.border,
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '150px',
            position: 'relative',
            borderLeft: `5px solid ${currentTheme.icon}`,
            transition: 'transform 0.2s ease',
            cursor: 'default'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ color: currentTheme.icon, fontSize: '2rem' }}>{icon}</div>
                <span style={{ fontSize: '2.25rem', fontWeight: '900', color: currentTheme.text }}>{value}</span>
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#475569' }}>{title}</span>
        </div>
    );

    const actions = [
        { title: 'Registar Novo Paciente', icon: <FiPlusCircle />, color: '#3b82f6', path: '/hms/pacientes/novo' },
        { title: 'Nova Consulta', icon: <FiClipboard />, color: '#8b5cf6', path: '/hms/consultas/novo' },
    ];

    return (
        <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                        <div style={{ padding: '10px', backgroundColor: `${currentTheme.icon}15`, color: currentTheme.icon, borderRadius: '10px', fontSize: '1.4rem' }}>
                            <FiActivity />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em' }}>{unidade.nome}</h1>
                            <p style={{ color: '#64748b', fontWeight: '500' }}>Gestão Hospitalar Local</p>
                        </div>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Utilizador: <strong>{user?.name}</strong> • Função: <strong>{user?.role}</strong> • Localidade: <strong>{unidade.comuna}</strong></p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }} className="no-print">
                    <div style={{ backgroundColor: '#fff', padding: '10px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#1e293b', fontWeight: '600' }}>
                        Maio (2024) <FiChevronDown />
                    </div>
                </div>
            </header>

            {/* Metrics Cards - Matching Statistics Design EXACTLY */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <StatsCard title="Consultas Externas" icon={<FiClipboard />} value={cards.consultas} />
                <StatsCard title="Banco de Urgência" icon={<FiActivity />} value={cards.urgencias} />
                <StatsCard title="Laboratório" icon={<FiThermometer />} value={cards.laboratorio} />
                <StatsCard title="Cirurgias" icon={<FiScissors />} value={cards.cirurgias} />
                <StatsCard title="Partos" icon={<FiUsers />} value={cards.partos} />
                <StatsCard title="Pré-natais" icon={<FiHeart />} value={cards.prenatal} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Chart Section */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1e293b' }}>Produção de Consultas Externas</h3>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600', backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: '20px' }}>Por Faixa Etária</div>
                    </div>
                    <div style={{ height: '350px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartConsultas} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: '600' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: '600' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="menos15" name="< 15 Anos" fill="#60a5fa" radius={[4, 4, 0, 0]} barSize={24} />
                                <Bar dataKey="mais15" name="> 15 Anos" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: Quick Actions & Simulation Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>Operações Clínicas</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {actions.map((action, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate(action.path)}
                                    style={{
                                        backgroundColor: '#f8fafc',
                                        padding: '16px 20px',
                                        borderRadius: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        border: '1px solid transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#fff';
                                        e.currentTarget.style.borderColor = action.color;
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f8fafc';
                                        e.currentTarget.style.borderColor = 'transparent';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <div style={{
                                        backgroundColor: `${action.color}15`,
                                        color: action.color,
                                        width: '45px', height: '45px',
                                        borderRadius: '10px',
                                        fontSize: '1.25rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {action.icon}
                                    </div>
                                    <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }}>{action.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ padding: '24px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
                        <h4 style={{ color: '#1e40af', fontWeight: '800', fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            💡 Simulação Multi-Hospital
                        </h4>
                        <p style={{ color: '#1e3a8a', fontSize: '0.85rem', lineHeight: '1.6', fontWeight: '500' }}>
                            O design e as cores acima adaptam-se automaticamente à localidade da unidade <strong>{unidade.nome}</strong>. Cada hospital tem a sua própria visão de produção.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HMSDashboard;
