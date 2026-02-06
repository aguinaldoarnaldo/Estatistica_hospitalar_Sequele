import React from 'react';
import styles from './Profile.module.css'; // Importando o CSS Module
import { FiUser } from 'react-icons/fi';


const defaultUserData = [
    'Gabriel Aurelio', // Nome
    'gabriel@gmail.com', // Email
    '943 543 433',       // Telefone
    'Administrador',     // Cargo
    'Angola'             // Localização
];

// Labels para dar sentido aos dados do array
const LABELS = ['Nome', 'Email', 'Telefone', 'Cargo', 'Local'];

export default function Profile({ data = defaultUserData }) {
    return (
        <div className={styles.card}>
            {/* Cabeçalho colorido com Avatar */}
            <div className={styles.header}>
                <div className={styles.avatarContainer}>
                    <FiUser className={styles.avatarImage}/>
                </div>
            </div>

            {/* Lista de Informações */}
            <div className={styles.body}>
                {data.map((item, index) => (
                    <div key={index} className={styles.infoRow}>
                        {/* Mostra o Label correspondente ou "Info" se acabar os labels */}
                        <span className={styles.label}>
                            {LABELS[index] || 'Info'}
                        </span>
                        
                        <span className={styles.value}>
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
