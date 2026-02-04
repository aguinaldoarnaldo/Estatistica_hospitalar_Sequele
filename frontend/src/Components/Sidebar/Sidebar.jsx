import React, { useState } from 'react';
import { 
  FiHome, 
  FiMapPin, 
  FiBarChart2, 
  FiActivity,
  FiBox,
  FiUsers,
  FiList, 
  FiSettings, 
  FiChevronDown, 
  FiLogOut,
  FiUser,
  FiMenu
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const MENU_ITEMS = [
  {
    title: 'Home',
    icon: <FiHome />,
    path: '/home',
  },
  {
    title: 'Comuna de Cacuaco',
    icon: <FiMapPin />,
    children: [
      { title: 'Dados da Comuna', icon: <FiBarChart2 />, path: '/cacuaco/dados' },
      { title: 'Hospital Municipal de Cacuaco', icon: <FiActivity />, path: '/cacuaco/hospital-municipal' },
      { title: 'Hospital de Referência de Cacuaco', icon: <FiActivity />, path: '/cacuaco/hospital-referencia' },
      { title: 'Centro de Saúde 22 de Janeiro', icon: <FiActivity />, path: '/cacuaco/centro-22-janeiro' },
    ]
  },
  {
    title: 'Comuna de Kikolo',
    icon: <FiMapPin />,
    children: [
      { title: 'Dados da Comuna', icon: <FiBarChart2 />, path: '/kikolo/dados' },
      { title: 'Unidades Sanitárias', icon: <FiActivity />, path: '/kikolo/unidades' },
    ]
  },
  {
    title: 'Comuna da Funda',
    icon: <FiMapPin />,
    children: [
      { title: 'Dados da Comuna', icon: <FiBarChart2 />, path: '/funda/dados' },
      { title: 'Unidades Sanitárias', icon: <FiActivity />, path: '/funda/unidades' },
    ]
  },
  {
    title: 'Cadastros',
    icon: <FiList />,
    children: [
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
  const [activePath, setActivePath] = useState('/home');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

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
