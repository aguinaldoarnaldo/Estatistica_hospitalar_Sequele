import React, { useState } from 'react';
import styles from './Account_Security.module.css';

// Importando os ícones do pacote Feather Icons
import { FiShield, FiKey, FiSmartphone, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

export default function Account_Security() {
    // Estado simples para simular o toggle
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {/* Ícone principal colorido */}
                    <FiShield size={28} color="#4f46e5" />
                    Conta e Segurança
                </h2>
                <p className={styles.subtitle}>Gerencie o acesso e a proteção dos seus dados.</p>
            </div>

            {/* Seção 1: Credenciais */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <FiKey size={18} />
                    Login e Senha
                </h3>
                
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email de Recuperação</label>
                    <div className={styles.inputRow}>
                        <input 
                            type="email" 
                            defaultValue="usuario@email.com" 
                            className={styles.input} 
                            disabled 
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.infoText}>
                        <h4>Alterar Senha</h4>
                        <p>A última alteração foi há 3 meses.</p>
                    </div>
                    <button className={`${styles.button} ${styles.btnPrimary}`}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FiRefreshCw size={14} /> Atualizar
                        </span>
                    </button>
                </div>
            </div>

            {/* Seção 2: Autenticação em 2 Etapas */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                    <FiSmartphone size={18} />
                    Autenticação de Dois Fatores
                </h3>
                
                <div className={styles.row}>
                    <div className={styles.infoText}>
                        <h4>Ativar 2FA</h4>
                        <p>Adicione uma camada extra de segurança usando SMS ou App.</p>
                    </div>
                    
                    {/* Botão Toggle Switch */}
                    <label className={styles.switch}>
                        <input 
                            type="checkbox" 
                            checked={twoFactor}
                            onChange={() => setTwoFactor(!twoFactor)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            {/* Seção 3: Zona de Perigo */}
            <div className={styles.dangerZone}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <FiAlertTriangle size={20} color="#b91c1c" />
                    <h4 className={styles.dangerTitle} style={{ margin: 0 }}>Zona de Perigo</h4>
                </div>
                
                <p className={styles.dangerDesc}>
                    Ao excluir sua conta, todos os dados serão perdidos permanentemente. Esta ação não pode ser desfeita.
                </p>
                <button className={`${styles.button} ${styles.btnDanger}`}>
                    Excluir minha conta
                </button>
            </div>

        </div>
    );
}