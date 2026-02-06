import React, { useState } from 'react';
import styles from './Preferences.module.css';

export default function Preferences() {
    // Estados para controlar os inputs (simulação)
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(true);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Preferências</h2>
            <p className={styles.subtitle}>Gerencie as configurações do seu aplicativo.</p>

            {/* Seção 1: Aparência */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Aparência</h3>
                
                <div className={styles.row}>
                    <div className={styles.labelGroup}>
                        <span className={styles.labelText}>🌙 Modo Escuro</span>
                        <span className={styles.labelDesc}>Altera o tema para cores escuras.</span>
                    </div>
                    {/* Botão Switch */}
                    <label className={styles.switch}>
                        <input 
                            type="checkbox" 
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            {/* Seção 2: Notificações */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Notificações</h3>

                <div className={styles.row}>
                    <div className={styles.labelGroup}>
                        <span className={styles.labelText}>🔔 Notificações Push</span>
                    </div>
                    <label className={styles.switch}>
                        <input 
                            type="checkbox" 
                            checked={pushNotif}
                            onChange={() => setPushNotif(!pushNotif)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                <div className={styles.row}>
                    <div className={styles.labelGroup}>
                        <span className={styles.labelText}>📧 Emails de Marketing</span>
                        <span className={styles.labelDesc}>Receba novidades e promoções.</span>
                    </div>
                    <label className={styles.switch}>
                        <input 
                            type="checkbox" 
                            checked={emailNotif}
                            onChange={() => setEmailNotif(!emailNotif)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>
            </div>

            {/* Seção 3: Regional */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Regional</h3>
                
                <div className={styles.row}>
                    <div className={styles.labelGroup}>
                        <span className={styles.labelText}>🌍 Idioma</span>
                    </div>
                    <select className={styles.select}>
                        <option value="pt-AO">Português (AO)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es">Español</option>
                    </select>
                </div>
            </div>

        </div>
    );
}