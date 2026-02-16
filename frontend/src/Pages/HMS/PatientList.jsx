import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiSearch, FiUser, FiActivity, FiExternalLink, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useUnidades } from '../../context/UnidadeContext';
import { useClinical } from '../../context/ClinicalContext';

const PatientList = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { unidades } = useUnidades();
    const { getPatients } = useClinical();
    const [searchTerm, setSearchTerm] = useState('');

    const unidadeId = user?.unidadeId || 1;
    const unidade = unidades.find(u => u.id === unidadeId) || unidades[0] || { nome: 'Hospital', comuna: 'Sequele' };
    const patients = getPatients(unidadeId);

    // Temas por comuna
    const communeColors = {
        'Sequele': { bg: '#dbeafe', border: '1px solid #93c5fd', icon: '#2563eb', text: '#1e3a8a' },
        'Kifangondo': { bg: '#dcfce7', border: '1px solid #86efac', icon: '#16a34a', text: '#14532d' },
        'Funda': { bg: '#fee2e2', border: '1px solid #fca5a5', icon: '#dc2626', text: '#7f1d1d' },
        'Zona Baia': { bg: '#fef9c3', border: '1px solid #fde047', icon: '#d97706', text: '#78350f' }
    };

    const currentTheme = (unidade?.comuna && communeColors[unidade.comuna])
        ? communeColors[unidade.comuna]
        : communeColors['Sequele'];

    const filteredPatients = patients.filter(p =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.bi.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FiUser style={{ color: currentTheme.icon }} /> Lista de Pacientes
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: '500' }}>{unidade.nome} • Gestão de Processos Clínicos</p>
                </div>
                <button
                    onClick={() => navigate('/hms/pacientes/novo')}
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
                    <FiPlus /> Novo Paciente
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
                        placeholder="Pesquisar por nome ou BI..."
                        style={{
                            width: '100%',
                            padding: '14px 14px 14px 45px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.95rem',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredPatients.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                    <th style={{ textAlign: 'left', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Nome do Paciente</th>
                                    <th style={{ textAlign: 'left', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>BI / Processo</th>
                                    <th style={{ textAlign: 'left', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Gênero</th>
                                    <th style={{ textAlign: 'left', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Contacto</th>
                                    <th style={{ textAlign: 'right', padding: '16px', color: '#64748b', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>Acções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.map((patient, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} className="patient-row">
                                        <td style={{ padding: '16px', fontWeight: '700', color: '#1e293b' }}>{patient.nome}</td>
                                        <td style={{ padding: '16px', color: '#64748b', fontWeight: '600', fontSize: '0.9rem' }}>{patient.bi}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                backgroundColor: patient.genero === 'Feminino' ? '#fdf2f8' : '#eff6ff',
                                                color: patient.genero === 'Feminino' ? '#db2777' : '#2563eb',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '800'
                                            }}>
                                                {patient.genero}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', color: '#64748b', fontSize: '0.9rem' }}>{patient.telefone || '---'}</td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <button
                                                onClick={() => navigate('/hms/consultas/novo', { state: { patientId: patient.id } })}
                                                style={{ border: 'none', background: 'none', color: currentTheme.icon, cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}
                                            >
                                                Nova Consulta <FiChevronRight />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '3rem', color: '#e2e8f0', marginBottom: '16px' }}><FiUser /></div>
                        <h3 style={{ color: '#64748b', fontWeight: '700', marginBottom: '8px' }}>Nenhum paciente encontrado</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Os pacientes registados para esta unidade aparecerão aqui.</p>
                    </div>
                )}
            </div>

            <style>
                {`
                .patient-row:hover {
                    background-color: #f8fafc;
                }
                `}
            </style>
        </div>
    );
};

export default PatientList;
