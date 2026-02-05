import React from 'react';
import GlobalStatsCards from '../../Components/Dashboard/GlobalStatsCards';
import SectorMap from '../../Components/Dashboard/SectorMap';
import ServicesChart from '../../Components/Dashboard/ServicesChart';

const GeneralDashboard = () => {
    // Mock Data Source - Centralized here
    const sectorData = [
        { name: 'Sequele', consultas: 4000, urgencias: 2400, partos: 400, laboratorio: 1500, cirurgias: 120, prenatal: 350, medicamentos: 1100, criticos: 40 },
        { name: 'Kifangondo', consultas: 3000, urgencias: 1398, partos: 200, laboratorio: 1100, cirurgias: 80, prenatal: 280, medicamentos: 800, criticos: 35 },
        { name: 'Funda', consultas: 2000, urgencias: 9800, partos: 150, laboratorio: 900, cirurgias: 40, prenatal: 150, medicamentos: 950, criticos: 20 },
        { name: 'Zona Baia', consultas: 2780, urgencias: 3908, partos: 300, laboratorio: 1200, cirurgias: 60, prenatal: 210, medicamentos: 270, criticos: 29 },
    ];

    // Calculate Totals dynamically
    const totalConsultasRealizadas = sectorData.reduce((acc, curr) => acc + curr.consultas, 0);
    const totalUrgencias = sectorData.reduce((acc, curr) => acc + curr.urgencias, 0);
    const totalPartos = sectorData.reduce((acc, curr) => acc + curr.partos, 0);

    // Find Sector with Most Cases (Consultas + Urgencias)
    const sectorWithMostCases = sectorData.reduce((prev, current) => {
        const prevTotal = prev.consultas + prev.urgencias;
        const currentTotal = current.consultas + current.urgencias;
        return (prevTotal > currentTotal) ? prev : current;
    });

    // Derived Metrics for Cards
    const metrics = {
        totalPacientes: totalConsultasRealizadas + totalUrgencias + totalPartos, // Proxy for total patients
        totalConsultas: totalConsultasRealizadas,
        totalMedicamentos: sectorData.reduce((acc, curr) => acc + curr.medicamentos, 0),
        totalCriticos: sectorData.reduce((acc, curr) => acc + curr.criticos, 0),
        mostBusySector: {
            name: sectorWithMostCases.name,
            value: sectorWithMostCases.consultas + sectorWithMostCases.urgencias
        }
    };

    return (
        <div style={{
            backgroundColor: '#E6F0FA',
            minHeight: '100vh',
            padding: '40px',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <header style={{ marginBottom: '40px' }}>
                    <h1 style={{ color: '#0D3B66', fontSize: '2rem', fontWeight: 'bold' }}>Dashboard Geral Hospitalar</h1>
                    <p style={{ color: '#7F8C8D', fontSize: '1rem' }}>Visão integrada dos sectores de Sequele, Kifangondo, Funda e Zona Baia</p>
                </header>

                {/* Top Cards Section */}
                <GlobalStatsCards metrics={metrics} />

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>

                    {/* Charts Section */}
                    <div style={{ marginBottom: '10px' }}>
                        <ServicesChart data={sectorData} />
                    </div>

                    {/* Map Section */}
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        padding: '25px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ color: '#0D3B66', marginBottom: '20px' }}>Localização das Unidades Sanitárias</h3>
                        <SectorMap />
                        <div style={{ marginTop: '15px', display: 'flex', gap: '20px', fontSize: '0.9rem', color: '#7F8C8D', flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🔵 Sequele</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🟢 Kifangondo</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🔴 Funda</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>🟡 Zona Baia</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GeneralDashboard;
