import React from 'react';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import styles from './TopNavbar.module.css';

const TopNavbar = ({ title }) => {
    const { user } = useAuth();

    return (
        <header className={styles.topNavbar}>
            <div className={styles.navbarContent}>
                <div className={styles.leftSection}>
                    <h2 className={styles.pageTitle}>
                        {title}
                        <span className={styles.titleBadge}>HMS</span>
                    </h2>
                </div>
                
                <div className={styles.rightSection}>
                    <div className={styles.userInfo}>
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>{user?.name || 'Utilizador'}</span>
                            <span className={styles.userRole}>{user?.role || 'Médico'}</span>
                        </div>
                        <div className={styles.avatar}>
                            <FiUser />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
