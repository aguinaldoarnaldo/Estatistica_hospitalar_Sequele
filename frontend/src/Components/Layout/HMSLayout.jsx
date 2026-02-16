import React from 'react';
import { Outlet } from 'react-router-dom';
import HMSSidebar from '../Sidebar/HMSSidebar';
import TopNavbar from './TopNavbar';
import { useAuth } from '../../context/AuthContext';
import { useUnidades } from '../../context/UnidadeContext';
import styles from '../Layout/MainLayout.module.css';

const HMSLayout = () => {
    const { user } = useAuth();
    const { unidades } = useUnidades();

    const unidadeId = user?.unidadeId || 1;
    const unidade = unidades.find(u => u.id === unidadeId) || unidades[0] || { nome: 'Hospital', comuna: 'Sequele' };

    return (
        <div className={styles.container}>
            <HMSSidebar />
            <div className={styles.content}>
                <TopNavbar title={unidade.nome} />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default HMSLayout;
