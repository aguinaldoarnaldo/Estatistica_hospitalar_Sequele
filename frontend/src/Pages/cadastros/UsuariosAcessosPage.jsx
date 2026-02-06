import React, { useState } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiShield, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import styles from './UsuariosAcessosPage.module.css';

const UsuariosAcessosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users] = useState([
    { id: 1, name: 'Dr. Arnaldo', email: 'arnaldo@min-saude.ao', role: 'Administrador', status: 'active', lastLogin: '05/02/2026 10:30' },
    { id: 2, name: 'Maria Silva', email: 'maria.silva@sequele.med', role: 'Gestor Municipal', status: 'active', lastLogin: '04/02/2026 14:20' },
    { id: 3, name: 'João Paulo', email: 'joao.paulo@estatistica.ao', role: 'Técnico de Dados', status: 'inactive', lastLogin: '20/01/2026 09:15' },
    { id: 4, name: 'Ana Costa', email: 'ana.costa@hospital.ao', role: 'Visualizador', status: 'active', lastLogin: '05/02/2026 08:00' },
  ]);

  // Função para renderizar o badge de status
  const getStatusBadge = (status) => {
    const isAvailable = status === 'active';
    return (
      <span className={`${styles.badge} ${isAvailable ? styles.statusActive : styles.statusInactive}`}>
        {isAvailable ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
        {isAvailable ? 'Ativo' : 'Inativo'}
      </span>
    );
  };

  // Função para renderizar o badge de cargo
  const getRoleBadge = (role) => {
    let roleClass = styles.roleDefault;
    if (role === 'Administrador') roleClass = styles.roleAdmin;
    else if (role === 'Gestor Municipal') roleClass = styles.roleManager;

    return (
      <span className={`${styles.badge} ${roleClass}`}>
        {role}
      </span>
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1>
            <FiShield className={styles.iconTitle} />
            Usuários e Acessos
          </h1>
          <p className={styles.subtitle}>Gerencie quem tem acesso ao sistema e seus níveis de permissão.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
        >
          <FiPlus size={20} />
          Novo Usuário
        </button>
      </div>

      {/* Filters & Search */}
      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterControls}>
          <select className={styles.select}>
            <option value="all">Todos os Cargos</option>
            <option value="admin">Administrador</option>
            <option value="manager">Gestor</option>
            <option value="viewer">Visualizador</option>
          </select>
          <select className={styles.select}>
            <option value="all">Todos os Status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Cargo / Perfil</th>
              <th>Status</th>
              <th>Último Acesso</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={styles.row}>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                      {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div className={styles.userDetails}>
                      <p className={styles.userName}>{user.name}</p>
                      <p className={styles.userEmail}>{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>{getRoleBadge(user.role)}</td>
                <td>{getStatusBadge(user.status)}</td>
                <td>{user.lastLogin}</td>
                <td style={{ textAlign: 'right' }}>
                  <div className={styles.actions}>
                    <button className={`${styles.actionBtn} ${styles.editBtn}`} title="Editar">
                      <FiEdit2 size={16} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Excluir">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination (Simple) */}
        <div className={styles.pagination}>
          <span>Mostrando {users.length} de {users.length} registros</span>
          <div className={styles.pageControls}>
            <button className={styles.pageBtn} disabled>Anterior</button>
            <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
            <button className={styles.pageBtn} disabled>Próxima</button>
          </div>
        </div>
      </div>

      {/* Modal Placeholder */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Novo Usuário</h3>
              <button onClick={() => setIsModalOpen(false)} className={styles.closeBtn}>
                <FiXCircle size={24} />
              </button>
            </div>
            
            <form>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nome Completo</label>
                <input type="text" className={styles.input} placeholder="Ex: Arnaldo José" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Corporativo</label>
                <input type="email" className={styles.input} placeholder="email@dominio.com" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nível de Acesso</label>
                <select className={styles.selectInput}>
                  <option>Administrador</option>
                  <option>Gestor Municipal</option>
                  <option>Técnico de Dados</option>
                  <option>Visualizador</option>
                </select>
              </div>
              
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>Cancelar</button>
                <button type="button" className={styles.saveBtn}>Salvar Usuário</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsuariosAcessosPage;
