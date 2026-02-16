import React, { useState } from 'react';
import {
    FiUsers,
    FiClipboard,
    FiPlusCircle,
    FiArrowLeft,
    FiLogOut,
    FiUser,
    FiMenu,
    FiActivity,
    FiBox,
    FiSettings,
    FiList
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUnidades } from '../../context/UnidadeContext';
import styles from '../Sidebar/Sidebar.module.css';

const HMSSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const { unidades } = useUnidades();

    const handleLogout = () => {
        logout();
        navigate('/login', { state: { redirect: '/hms' } });
    };

    // Encontrar o nome do hospital para mostrar na sidebar
    const unidadeId = user?.unidadeId || 1;
    const unidade = unidades.find(u => u.id === unidadeId) || unidades[0];

    const MENU_ITEMS = [
        { title: 'Dashboard Geral', icon: <FiActivity />, path: '/hms' },
        { title: 'Novo Paciente', icon: <FiPlusCircle />, path: '/hms/pacientes/novo' },
        { title: 'Nova Consulta', icon: <FiClipboard />, path: '/hms/consultas/novo' },
        { title: 'Lista de Pacientes', icon: <FiUsers />, path: '/hms/pacientes' },
        { title: 'Histórico de Consultas', icon: <FiList />, path: '/hms/consultas' },
        { 
            section: 'FARMÁCIA & STOCK',
            items: [
                { title: 'Painel de Inventário', icon: <FiBox />, path: '/hms/stock' },
                { title: 'Gerenciar Produtos', icon: <FiSettings />, path: '/hms/stock/gerenciar' },
            ]
        },
    ];

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <span className={styles.title}>{unidade.nome}</span>
                    <span className={styles.subtitle}>Gestão Hospitalar</span>
                </div>
                <button className={styles.toggleBtn} onClick={() => setIsCollapsed(!isCollapsed)}>
                    <FiMenu />
                </button>
            </div>

            <ul className={styles.menuList}>
                {MENU_ITEMS.map((item, idx) => {
                    if (item.section) {
                        return (
                            <div key={idx} style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                                {!isCollapsed && <label style={{ 
                                    fontSize: '0.65rem', 
                                    fontWeight: '800', 
                                    color: '#94a3b8', 
                                    paddingLeft: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>{item.section}</label>}
                                {item.items.map(subItem => (
                                    <li key={subItem.title}>
                                        <div
                                            className={`${styles.menuItem} ${location.pathname === subItem.path ? styles.active : ''}`}
                                            onClick={() => navigate(subItem.path)}
                                        >
                                            <div className={styles.iconWrapper}>{subItem.icon}</div>
                                            {!isCollapsed && <span className={styles.label}>{subItem.title}</span>}
                                        </div>
                                    </li>
                                ))}
                            </div>
                        );
                    }
                    return (
                        <li key={item.title}>
                            <div
                                className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}
                                onClick={() => navigate(item.path)}
                            >
                                <div className={styles.iconWrapper}>{item.icon}</div>
                                {!isCollapsed && <span className={styles.label}>{item.title}</span>}
                            </div>
                        </li>
                    );
                })}
            </ul>

            <div className={styles.sidebarFooter}>
                <button className={styles.logoutBtn} onClick={() => navigate('/')} style={{ color: 'var(--color-blue-medium)', marginBottom: '10px' }}>
                    <FiArrowLeft />
                    {!isCollapsed && <span className={styles.label}>Voltar à Seleção</span>}
                </button>

                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <FiLogOut />
                    {!isCollapsed && <span className={styles.label}>Sair</span>}
                </button>
            </div>
        </aside>
    );
};

export default HMSSidebar;
