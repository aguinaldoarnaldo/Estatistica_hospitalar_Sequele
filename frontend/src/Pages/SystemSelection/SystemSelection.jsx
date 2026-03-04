import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBarChart2, FiPlusCircle, FiArrowRight } from 'react-icons/fi';
import styles from './SystemSelection.module.css';

const SystemSelection = () => {
    const navigate = useNavigate();

    const handleSelect = (targetPath) => {
        navigate('/login', { state: { redirect: targetPath } });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Portal Integrado</h1>
                <p className={styles.subtitle}>Selecione o ambiente de trabalho para continuar</p>
            </div>

            <div className={styles.cardsContainer}>
                {/* Statistics Module */}
                <div
                    className={`${styles.card} ${styles.cardBlue}`}
                    onClick={() => handleSelect('/home')}
                >
                    <div className={styles.iconContainer}>
                        <FiBarChart2 />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h2 className={styles.cardTitle}>Gestão Estatística</h2>
                        <p className={styles.cardDescription}>
                            Monitoramento municipal, dashboards de indicadores de saúde e relatórios executivos.
                        </p>
                    </div>
                    <div className={styles.cardFooter}>
                        Acessar Painel <FiArrowRight />
                    </div>
                </div>

                {/* Hospital Module */}
                <div
                    className={`${styles.card} ${styles.cardPurple}`}
                    onClick={() => handleSelect('/hms')}
                >
                    <div className={styles.iconContainer}>
                        <FiPlusCircle />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h2 className={styles.cardTitle}>Gestão Hospitalar</h2>
                        <p className={styles.cardDescription}>
                            Prontuário eletrônico, triagem de pacientes e registro clínico por unidade.
                        </p>
                    </div>
                    <div className={styles.cardFooter}>
                        Acessar Sistema <FiArrowRight />
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                © 2024 Plataforma de Saúde de Sequele. Desenvolvido para Conexio Viva.
            </div>
        </div>
    );
};

export default SystemSelection;
