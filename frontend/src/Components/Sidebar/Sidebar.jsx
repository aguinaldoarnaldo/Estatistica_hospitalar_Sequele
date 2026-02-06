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
    title: 'Comuna do Sequele',
    icon: <FiMapPin />,
    children: [
      { title: 'Vila Verde Cativa', icon: <FiActivity />, path: '/sequele/vila-verde-cativa' },
      { title: 'Centro de Saúde R Sequele', icon: <FiActivity />, path: '/sequele/centro-saude-r-sequele' },
      { title: 'Posto de Saúde do Mulundo', icon: <FiActivity />, path: '/sequele/posto-saude-mulundo' },
    ]
  },
  {
    title: 'Comuna de Kifangondo',
    icon: <FiMapPin />,
    children: [
      { title: 'Centro de Saúde 22 de Janeiro', icon: <FiActivity />, path: '/kifangondo/centro-saude-22-janeiro' },
      { title: 'Posto de Saúde da Kaop Velha Sul', icon: <FiActivity />, path: '/kifangondo/posto-saude-kaop-velha-sul' },
      { title: 'Centro de Saúde Alto Kifangondo', icon: <FiActivity />, path: '/kifangondo/centro-saude-alto-kifangondo' },
    ]
  },
  {
    title: 'Comuna da Funda',
    icon: <FiMapPin />,
    children: [
      { title: 'Centro Materno Infantil da Funda', icon: <FiActivity />, path: '/funda/centro-materno-infantil' },
      { title: 'Posto de Saúde da Kilunda', icon: <FiActivity />, path: '/funda/posto-saude-kilunda' },
    ]
  },
  {
    title: 'Zona Baia',
    icon: <FiMapPin />,
    children: [
      { title: 'Centro KM30', icon: <FiActivity />, path: '/zona-baia/centro-km30' },
      { title: 'Posto de Saúde Dimba', icon: <FiActivity />, path: '/zona-baia/posto-saude-dimba' },
    ]
  },
  {
    title: 'Outras Comunas',
    icon: <FiMapPin />,
    children: [
       { title: 'Comuna de Cacuaco', icon: <FiMapPin />, path: '/cacuaco/dados' },
       { title: 'Comuna de Kikolo', icon: <FiMapPin />, path: '/kikolo/dados' },
    ]
  },
  {
    title: 'Cadastros',
    icon: <FiList />,
    children: [
      { title: 'Comunas', icon: <FiMapPin />, path: '/cadastros/comunas' },
      { title: 'Unidades Sanitárias', icon: <FiActivity />, path: '/cadastros/unidades' },
      { title: 'Funcionários', icon: <FiUsers />, path: '/cadastros/funcionarios' },
      { title: 'Pacientes', icon: <FiUsers />, path: '/cadastros/pacientes' },
      { title: 'Usuários e Acessos', icon: <FiUser />, path: '/cadastros/usuarios-acessos' },
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
