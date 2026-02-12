import React, { useState } from 'react';
import {
  FiHome,
  FiMapPin,
  FiBarChart2,
  FiActivity,
  FiUsers,
  FiList,
  FiSettings,
  FiChevronDown,
  FiLogOut,
  FiUser,
  FiMenu,
  FiCalendar,
  FiBox
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useComunas } from '../../context/ComunaContext';
import { useUnidades } from '../../context/UnidadeContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { comunas } = useComunas();
  const { unidades } = useUnidades();

  // Helper to check if a menu or any of its children is active
  const isItemActive = (item) => {
    if (item.path === location.pathname) return true;
    if (item.children) {
      return item.children.some(child => isItemActive(child));
    }
    return false;
  };

  const MENU_ITEMS = [
    {
      title: 'Home',
      icon: <FiHome />,
      path: '/home',
    },
    // Seção de Cabeçalho (Opcional, ou apenas listar as comunas diretas)
    ...comunas.map(c => {
      const unidadesDaComuna = unidades.filter(u => u.comuna === c.nome);
      return {
        title: `Comuna do ${c.nome}`,
        icon: <FiMapPin />,
        children: [
          { title: 'Visão Geral', path: `/sequele/comuna/${c.id}`, icon: <FiActivity /> },
          ...unidadesDaComuna.map(u => ({
            title: u.nome,
            icon: <FiActivity />,
            children: [
              { title: 'Dashboard', path: `/sequele/unidade/${u.id}`, icon: <FiActivity /> },
              { title: 'Stock Geral', path: `/sequele/unidade/${u.id}/stock`, icon: <FiBox /> },
              { title: 'Gerenciar Prod.', path: `/sequele/unidade/${u.id}/stock/gerenciar`, icon: <FiSettings /> }
            ]
          }))
        ]
      };
    }),
    {
      title: 'Cadastros',
      icon: <FiList />,
      children: [
        { title: 'Comunas', icon: <FiMapPin />, path: '/cadastros/comunas' },
        { title: 'Unidades Hospitalares', icon: <FiActivity />, path: '/cadastros/unidades' },
        { title: 'Anos, Meses e Trimestres', icon: <FiCalendar />, path: '/cadastros/periodos' },
        { title: 'Usuários e Acessos', icon: <FiUsers />, path: '/cadastros/usuarios-acessos' },
      ]
    },
    {
      title: 'Configurações',
      icon: <FiSettings />,
      path: '/settings',
    },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleMenu = (title) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // Recursive menu renderer
  const renderMenuItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.title];
    const isActive = isItemActive(item);

    // Choose style based on level
    let itemClass = styles.menuItem;
    if (level === 1) itemClass = styles.submenuItem;
    if (level === 2) itemClass = styles.subSubmenuItem;

    if (isActive && !hasChildren) {
      if (level === 0) itemClass = `${itemClass} ${styles.active}`;
      else itemClass = `${itemClass} ${styles.subActive}`;
    }

    return (
      <li key={item.title} className={isOpen ? styles.open : ''}>
        <div
          className={itemClass}
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.title);
            } else if (item.path) {
              navigate(item.path);
            }
          }}
          style={{ paddingLeft: `${1 + (level * 0.6)}rem` }} // Manual indent fallback
        >
          {item.icon && <div className={styles.iconWrapper} style={{ fontSize: level > 0 ? '1rem' : '1.25rem' }}>{item.icon}</div>}

          {!isCollapsed && <span className={styles.label}>{item.title}</span>}

          {!isCollapsed && hasChildren && (
            <FiChevronDown
              className={styles.arrowIcon}
              style={{ transform: isOpen ? 'rotate(180deg)' : 'none', marginLeft: 'auto' }}
            />
          )}
        </div>

        {!isCollapsed && hasChildren && isOpen && (
          <ul className={level === 0 ? styles.submenu : styles.subSubmenu}>
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.title}>Dir. Municipal do Sequele</span>
          <span className={styles.subtitle}>Icolo e Bengo</span>
        </div>
        <button className={styles.toggleBtn} onClick={() => setIsCollapsed(!isCollapsed)}>
          <FiMenu />
        </button>
      </div>

      <ul className={styles.menuList}>
        {MENU_ITEMS.map(item => renderMenuItem(item))}
      </ul>

      <div className={styles.sidebarFooter}>
        <div className={styles.profileSection}>
          <div className={styles.avatar}><FiUser /></div>
          {!isCollapsed && (
            <div className={styles.profileInfo}>
              <span className={styles.userName}>Dr. Arnaldo</span>
              <span className={styles.userRole}>Administrador</span>
            </div>
          )}
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FiLogOut />
          {!isCollapsed && <span className={styles.label}>Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
