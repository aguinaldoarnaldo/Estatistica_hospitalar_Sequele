import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiClipboard, FiPlusCircle, FiList, FiActivity } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useUnidades } from '../../context/UnidadeContext';

const HMSDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { unidades } = useUnidades();

    // Localizar a unidade hospitalar associada ao utilizador logado
    const unidadeId = user?.unidadeId || 1;
    const unidade = unidades.find(u => u.id === unidadeId) || unidades[0];

    const actions = [
        { title: 'Registar Novo Paciente', icon: <FiPlusCircle />, color: '#3b82f6', path: '/hms/pacientes/novo' },
        { title: 'Lista de Pacientes', icon: <FiUsers />, color: '#10b981', path: '/hms/pacientes' },
        { title: 'Novo Registro de Consulta', icon: <FiClipboard />, color: '#8b5cf6', path: '/hms/consultas/novo' },
        { title: 'Histórico de Consultas', icon: <FiList />, color: '#f59e0b', path: '/hms/consultas' },
    ];

    return (
        <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <header style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                    <div style={{ padding: '8px', backgroundColor: '#3b82f610', color: '#3b82f6', borderRadius: '8px', fontSize: '1.2rem' }}>
                        <FiActivity />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#1e293b' }}>{unidade.nome}</h1>
                        <p style={{ color: '#64748b' }}>Módulo de Gestão Hospitalar - Hospital Logado</p>
                    </div>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Bem-vindo, {user?.name || 'Utilizador'}. Estás a gerir os dados da unidade: <strong>{unidade.nome} ({unidade.comuna})</strong></p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {actions.map((action, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(action.path)}
                        style={{
                            backgroundColor: '#ffffff',
                            padding: '30px',
                            borderRadius: '16px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '15px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <div style={{
                            backgroundColor: `${action.color}10`,
                            color: action.color,
                            padding: '16px',
                            borderRadius: '12px',
                            fontSize: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {action.icon}
                        </div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1e293b', textAlign: 'center' }}>{action.title}</h3>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '50px', padding: '24px', backgroundColor: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                <h4 style={{ color: '#1e40af', fontWeight: '700', marginBottom: '10px' }}>ℹ️ Nota do Protótipo</h4>
                <p style={{ color: '#1e3a8a', fontSize: '0.925rem', lineHeight: '1.5' }}>
                    Este módulo é focado na <strong>captura de dados</strong>. Todas as informações inseridas aqui (especialidade, idade, tipo de prestador)
                    serão futuramente salvas numa base de dados central para alimentar automaticamente os gráficos do sistema estatístico.
                </p>
            </div>
        </div>
    );
};

export default HMSDashboard;
