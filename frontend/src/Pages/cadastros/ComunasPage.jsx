import React, { useState } from 'react';
import { FiPlus, FiMapPin, FiUsers, FiFileText, FiTrash2, FiEdit3 } from 'react-icons/fi';
import { useComunas } from '../../context/ComunaContext';
import Input from '../../Components/UI/Input';
import styles from './ComunasPage.module.css';

const ComunasPage = () => {
  const { comunas, addComuna, deleteComuna } = useComunas();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    populacao: '',
    descricao: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome) return;
    
    addComuna(formData);
    setFormData({ nome: '', populacao: '', descricao: '' });
    setShowModal(false);
  };

  const handleDelete = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir a comuna "${nome}"?`)) {
      deleteComuna(id);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestão de Comunas</h1>
          <p style={{ color: '#64748b' }}>Cadastre e gerencie as comunas do município.</p>
        </div>
        <button className={styles.newButton} onClick={() => setShowModal(true)}>
          <FiPlus /> Nova Comuna
        </button>
      </header>

      {/* Modal de Cadastro */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '1.5rem', color: '#1e3a8a' }}>Registar Nova Comuna</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <Input
                  label="Nome da Comuna"
                  placeholder="Ex: Sequele"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
                <Input
                  label="População Estimada"
                  placeholder="Ex: 120.000"
                  value={formData.populacao}
                  onChange={(e) => setFormData({ ...formData, populacao: e.target.value })}
                />
              </div>
              
              <div className={styles.textareaGroup}>
                <label>Descrição / Observações</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Breve descrição sobre a comuna..."
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                />
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelButton} onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className={styles.saveButton}>
                  Salvar Comuna
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
              <th><FiMapPin style={{ marginRight: '8px' }} /> Nome</th>
              <th><FiUsers style={{ marginRight: '8px' }} /> População</th>
              <th><FiFileText style={{ marginRight: '8px' }} /> Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {comunas.length > 0 ? (
              comunas.map((comuna) => (
                <tr key={comuna.id}>
                  <td style={{ fontWeight: '600', color: '#1e293b' }}>{comuna.nome}</td>
                  <td>{comuna.populacao}</td>
                  <td>{comuna.descricao}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.editBtn}>
                        <FiEdit3 /> Editar
                      </button>
                      <button 
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(comuna.id, comuna.nome)}
                      >
                        <FiTrash2 /> Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.emptyState}>Nenhuma comuna registada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComunasPage;
