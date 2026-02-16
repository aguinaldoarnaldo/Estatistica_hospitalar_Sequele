import React, { useState } from 'react';
import {
    FiUsers,
    FiClipboard,
    FiPlusCircle,
    FiArrowLeft,
    FiLogOut,
    FiUser,
    FiMenu,
    FiActivity
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
        navigate('/login');
    };

    // Encontrar o nome do hospital para mostrar na sidebar
    const unidadeId = user?.unidadeId || 1;
    const unidade = unidades.find(u => u.id === unidadeId) || unidades[0];

    const MENU_ITEMS = [
        { title: 'Dashboard Geral', icon: <FiActivity />, path: '/hms' },
        { title: 'Novo Paciente', icon: <FiPlusCircle />, path: '/hms/pacientes/novo' },
        { title: 'Nova Consulta', icon: <FiClipboard />, path: '/hms/consultas/novo' },
        { title: 'Lista de Pacientes', icon: <FiUsers />, path: '/hms/pacientes' },
        { title: 'Histórico de Consultas', icon: <FiClipboard />, path: '/hms/consultas' },
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
                {MENU_ITEMS.map((item) => (
                    <li key={item.title}>
                        <div
                            className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <div className={styles.iconWrapper}>{item.icon}</div>
                            {!isCollapsed && <span className={styles.label}>{item.title}</span>}
                        </div>
                    </li>
                ))}
            </ul>

            <div className={styles.sidebarFooter}>
                <div className={styles.profileSection}>
                    <div className={styles.avatar}><FiUser /></div>
                    {!isCollapsed && (
                        <div className={styles.profileInfo}>
                            <span className={styles.userName}>{user?.name || 'Utilizador'}</span>
                            <span className={styles.userRole}>{user?.role || 'Médico'}</span>
                        </div>
                    )}
                </div>

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
