import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Allow passing a custom message via state, or use default
    const errorMessage = location.state?.message || "Algo correu mal. Por favor, tente novamente mais tarde.";

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.iconContainer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.errorIcon}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h2 className={styles.title}>Ocorreu um Erro</h2>
                <p className={styles.description}>
                    {errorMessage}
                </p>

                <div className={styles.actions}>
                    <button onClick={() => window.location.reload()} className={styles.buttonSecondary}>
                        Recarregar
                    </button>
                    <button onClick={() => navigate('/')} className={styles.buttonPrimary}>
                        Voltar ao Início
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
