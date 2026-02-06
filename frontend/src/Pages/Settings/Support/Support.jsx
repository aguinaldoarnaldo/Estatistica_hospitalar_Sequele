import React from 'react';
import styles from './Support.module.css';

// Importando ícones do pacote Feather
import { 
    FiLifeBuoy, 
    FiMessageSquare, 
    FiMail, 
    FiHelpCircle, 
    FiChevronRight, 
    FiFileText, 
    FiShield 
} from 'react-icons/fi';

export default function Support() {
    return (
        <div className={styles.container}>
            
            {/* Cabeçalho */}
            <div className={styles.header}>
                <h2 className={styles.title}>
                    <FiLifeBuoy size={28} color="#4f46e5" />
                    Central de Ajuda
                </h2>
                <p className={styles.subtitle}>Como podemos ajudar você hoje?</p>
            </div>

            {/* Grid de Opções de Contato */}
            <div className={styles.contactGrid}>
                {/* Card 1: Chat */}
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <FiMessageSquare size={24} />
                    </div>
                    <div>
                        <div className={styles.cardTitle}>Chat Online</div>
                        <div className={styles.cardDesc}>Disponível 24h</div>
                    </div>
                </div>

                {/* Card 2: FAQ */}
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <FiHelpCircle size={24} />
                    </div>
                    <div>
                        <div className={styles.cardTitle}>Perguntas Frequentes</div>
                        <div className={styles.cardDesc}>Tire suas dúvidas</div>
                    </div>
                </div>

                {/* Card 3: Email */}
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <FiMail size={24} />
                    </div>
                    <div>
                        <div className={styles.cardTitle}>Enviar Email</div>
                        <div className={styles.cardDesc}>Resposta em 24h</div>
                    </div>
                </div>
            </div>

            {/* Lista de Documentos Legais */}
            <div>
                <h3 className={styles.sectionTitle}>Sobre e Legal</h3>

                <div className={styles.linkRow}>
                    <div className={styles.linkContent}>
                        <FiFileText size={18} color="#6b7280" />
                        <span>Termos de Uso</span>
                    </div>
                    <FiChevronRight size={18} color="#9ca3af" />
                </div>

                <div className={styles.linkRow}>
                    <div className={styles.linkContent}>
                        <FiShield size={18} color="#6b7280" />
                        <span>Política de Privacidade</span>
                    </div>
                    <FiChevronRight size={18} color="#9ca3af" />
                </div>
            </div>

            {/* Rodapé com Versão */}
            <div className={styles.footer}>
                <p>Versão do Aplicativo 1.0.4</p>
                <p>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
            </div>

        </div>
    );
}