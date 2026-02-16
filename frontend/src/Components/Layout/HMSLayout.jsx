import React from 'react';
import { Outlet } from 'react-router-dom';
import HMSSidebar from '../Sidebar/HMSSidebar';
import styles from '../Layout/MainLayout.module.css';

const HMSLayout = () => {
    return (
        <div className={styles.container}>
            <HMSSidebar />
            <div className={styles.content}>
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default HMSLayout;
