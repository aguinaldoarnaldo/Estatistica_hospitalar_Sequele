import React, { useState } from 'react';
import { FiPlus, FiActivity, FiMapPin, FiUser, FiHash, FiTrash2, FiEdit3 } from 'react-icons/fi';
import { useUnidades } from '../../context/UnidadeContext';
import { useComunas } from '../../context/ComunaContext';
import Input from '../../Components/UI/Input';
import styles from './ComunasPage.module.css'; // Reusing the same styles

const UnidadesPage = () => {
  const { unidades, addUnidade, deleteUnidade } = useUnidades();
  const { comunas } = useComunas(); // Para preencher o dropdown de comunas
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    comuna: '',
    capacity: '',
    diretor: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.tipo) return;
    
    addUnidade(formData);
    setFormData({ nome: '', tipo: '', comuna: '', capacity: '', diretor: '' });
    setShowModal(false);
  };

  const handleDelete = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir a unidade "${nome}"?`)) {
      deleteUnidade(id);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestão de Unidades Hospitalares</h1>
          <p style={{ color: '#64748b' }}>Cadastre e gerencie hospitais, centros de saúde e postos médicos.</p>
        </div>
        <button className={styles.newButton} onClick={() => setShowModal(true)}>
          <FiPlus /> Nova Unidade
        </button>
      </header>

      {/* Modal de Cadastro */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1.5rem', color: '#1e3a8a' }}>Registar Nova Unidade Hospitalar</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <Input
                  label="Nome da Unidade"
                  placeholder="Ex: Hospital Municipal do Sequele"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Tipo de Unidade</label>
                  <select
                    style={{
                      padding: '0.75rem 1rem',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Centro de Saúde">Centro de Saúde</option>
                    <option value="Posto Médico">Posto Médico</option>
                    <option value="Clínica">Clínica</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGrid}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Comuna</label>
                  <select
                    style={{
                      padding: '0.75rem 1rem',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                    value={formData.comuna}
                    onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                  >
                    <option value="">Selecione...</option>
                    {comunas.map(c => (
                      <option key={c.id} value={c.nome}>{c.nome}</option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Capacidade (Leitos)"
                  placeholder="Ex: 150"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>

              <Input
                label="Diretor/Responsável"
                placeholder="Ex: Dr. Arnaldo"
                value={formData.diretor}
                onChange={(e) => setFormData({ ...formData, diretor: e.target.value })}
              />

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelButton} onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.saveButton}>
                  Salvar Unidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabela de Listagem */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th><FiActivity style={{ marginRight: '8px' }} /> Nome</th>
              <th>Tipo</th>
              <th><FiMapPin style={{ marginRight: '8px' }} /> Comuna</th>
              <th><FiHash style={{ marginRight: '8px' }} /> Capacidade</th>
              <th><FiUser style={{ marginRight: '8px' }} /> Diretor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {unidades.length > 0 ? (
              unidades.map((unidade) => (
                <tr key={unidade.id}>
                  <td style={{ fontWeight: '600', color: '#1e293b' }}>{unidade.nome}</td>
                  <td>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.8125rem',
                      fontWeight: '600',
                      background: unidade.tipo === 'Hospital' ? '#dbeafe' : '#f0fdf4',
                      color: unidade.tipo === 'Hospital' ? '#1e40af' : '#15803d'
                    }}>
                      {unidade.tipo}
                    </span>
                  </td>
                  <td>{unidade.comuna || '-'}</td>
                  <td>{unidade.capacity} leitos</td>
                  <td>{unidade.diretor}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.editBtn}>
                        <FiEdit3 /> Editar
                      </button>
                      <button 
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(unidade.id, unidade.nome)}
                      >
                        <FiTrash2 /> Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.emptyState}>Nenhuma unidade hospitalar registada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnidadesPage;
