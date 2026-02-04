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
  FiLock 
} from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const MENU_ITEMS = [
  {
    title: 'Home',
    icon: <FiHome />,
    path: '/home',
  },
  {
    title: 'Comunas do Sequele',
    icon: <FiMapPin />,
    children: [
      { title: 'Dados do Município', icon: <FiBarChart2 />, path: '/sequele/dados' },
      { title: 'Unidades Hospitalares', icon: <FiActivity />, path: '/sequele/unidades' },
    ]
  },
  {
    title: 'Cadastros',
    icon: <FiList />,
    children: [
      { title: 'Comunas', icon: <FiMapPin />, path: '/cadastros/comunas' },
      { title: 'Unidades Hospitalares', icon: <FiActivity />, path: '/cadastros/unidades' },
      { title: 'Anos, Meses e Trimestres', icon: <FiCalendar />, path: '/cadastros/periodos' },
      { title: 'Usuários e Acessos', icon: <FiUsers />, path: '/cadastros/usuarios-acessos' },
      { title: 'Funcionários', icon: <FiUsers />, path: '/cadastros/funcionarios' },
      { title: 'Pacientes', icon: <FiUsers />, path: '/cadastros/pacientes' },
    ]
  },
  {
    title: 'Configurações',
    icon: <FiSettings />,
    path: '/settings',
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleMenu = (title) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMenu = (title) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenMenus({ [title]: true });
    } else {
      setOpenMenus(prev => ({
        ...prev,
        [title]: !prev[title]
      }));
    }
  };

  const handleNavigation = (path) => {
    setActivePath(path);
    navigate(path);
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.title}>Dir. Municipal do Sequele</span>
          <span className={styles.subtitle}>Icolo e Bengo</span>
        </div>
        <button className={styles.toggleBtn} onClick={() => setIsCollapsed(!isCollapsed)}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.title}>Direção Municipal de Cacuaco</span>
          <span className={styles.subtitle}>Administração</span>
        </div>
        <button className={styles.toggleBtn} onClick={toggleSidebar} title="Toggle Sidebar">
          <FiMenu />
        </button>
      </div>

      <ul className={styles.menuList}>
        {MENU_ITEMS.map((item, index) => (
          <li key={index} className={item.children && openMenus[item.title] ? styles.open : ''}>
            <div 
              className={`${styles.menuItem} ${location.pathname === item.path || (item.children && item.children.some(c => location.pathname === c.path)) ? styles.active : ''}`}
              onClick={() => item.children ? toggleMenu(item.title) : navigate(item.path)}
            >
              <div className={styles.iconWrapper}>{item.icon}</div>
              {!isCollapsed && <span className={styles.label}>{item.title}</span>}
              {!isCollapsed && item.children && (
                <FiChevronDown 
                  className={styles.arrowIcon} 
                  style={{ transform: openMenus[item.title] ? 'rotate(180deg)' : 'none' }} 
                />
              )}
            </div>

            {!isCollapsed && item.children && openMenus[item.title] && (
              <ul className={styles.submenu}>
                {item.children.map((child, idx) => (
                  <li 
                    key={idx} 
                    className={`${styles.submenuItem} ${location.pathname === child.path ? styles.subActive : ''}`}
                    onClick={() => navigate(child.path)}
                  >
                    {child.title}
      {/* Menu */}
      <ul className={styles.menuList}>
        {MENU_ITEMS.map((item, index) => (
          <li key={index} className={styles.menuItemContainer}>
            <div 
              className={`${styles.menuItem} ${activePath === item.path ? styles.active : ''}`}
              onClick={() => item.children ? toggleMenu(item.title) : handleNavigation(item.path)}
              aria-expanded={!!openMenus[item.title]}
            >
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <span className={styles.label}>{item.title}</span>
              
              {item.children && (
                <span className={styles.arrowIcon}>
                  <FiChevronDown />
                </span>
              )}
            </div>

            {/* Submenu */}
            {item.children && (
              <ul className={`${styles.submenu} ${openMenus[item.title] ? styles.open : ''}`}>
                {item.children.map((child, childIndex) => (
                  <li 
                    key={childIndex} 
                    className={`${styles.submenuItem} ${activePath === child.path ? styles.subActive : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigation(child.path);
                    }}
                  >
                    <div className={styles.submenuIcon}>{child.icon}</div>
                    <span>{child.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
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
      {/* Footer / Profile */}
      <div className={styles.sidebarFooter}>
        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            <FiUser />
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.userName}>Dr. Arnaldo</span>
            <span className={styles.userRole}>Administrador</span>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout} title="Sair do Sistema">
          <FiLogOut />
          <span className={styles.label}>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
