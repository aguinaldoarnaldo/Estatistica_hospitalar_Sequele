import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.title}>Página Não Encontrada</h2>
                <p className={styles.description}>
                    A página que está a tentar aceder não existe ou foi movida.
                    Verifique o URL ou volte para a página inicial.
                </p>
                <button onClick={() => navigate('/')} className={styles.button}>
                    Voltar ao Início
                </button>
            </div>
        </div>
    );
};

export default NotFound;
