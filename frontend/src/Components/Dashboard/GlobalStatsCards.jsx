import React from 'react';
import { FaUserInjured, FaStethoscope, FaProcedures, FaPills } from 'react-icons/fa';

// Color Palette
const colors = {
    cardBg: '#FFFFFF',
    textDark: '#0D3B66',
    textLight: '#7F8C8D',
    alertLight: '#FDECEA',
    alertDark: '#C0392B',
    successLight: '#DFF6E0',
    successDark: '#2E7D32',
    primaryLight: '#E6F0FA',
    primaryMedium: '#4A90E2'
};

const StatCard = ({ title, value, icon, type = 'primary', subtext }) => {
    let bg, color, iconColor;

    switch (type) {
        case 'alert':
            bg = colors.alertLight;
            color = colors.alertDark;
            iconColor = colors.alertDark;
            break;
        case 'success':
            bg = colors.successLight;
            color = colors.successDark;
            iconColor = colors.successDark;
            break;
        default:
            bg = colors.cardBg; // White background for main cards as per request
            color = colors.textDark;
            iconColor = colors.primaryMedium;
            break;
    }

    return (
        <div style={{
            backgroundColor: bg,
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: `1px solid ${type === 'primary' ? '#E0E0E0' : 'transparent'}`
        }}>
            <div>
                <h4 style={{ color: colors.textLight, fontSize: '0.9rem', marginBottom: '5px' }}>{title}</h4>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: color }}>{value}</div>
                {subtext && <div style={{ fontSize: '0.8rem', color: colors.textLight, marginTop: '5px' }}>{subtext}</div>}
            </div>
            <div style={{
                backgroundColor: type === 'primary' ? colors.primaryLight : 'rgba(255,255,255,0.5)',
                borderRadius: '50%',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: iconColor,
                fontSize: '1.5rem'
            }}>
                {icon}
            </div>
        </div>
    );
};

const GlobalStatsCards = ({ metrics }) => {
    // Default to 0 if no metrics provided
    const { totalPacientes, totalMedicamentos, totalCriticos, mostBusySector } = metrics || {
        totalPacientes: 0,
        totalMedicamentos: 0,
        totalCriticos: 0,
        mostBusySector: { name: 'N/A', value: 0 }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <StatCard
                title="Total de Pacientes"
                value={totalPacientes ? totalPacientes.toLocaleString() : "0"}
                icon={<FaUserInjured />}
                subtext="Soma de todos os sectores"
            />
            {/* New Card: Most Affected Sector */}
            <StatCard
                title="Sector Mais Afetado"
                value={mostBusySector ? mostBusySector.name : "N/A"}
                icon={<FaStethoscope />}
                type="success" // Keeping green as it highlights a 'Winner' or top stat, unrelated to being 'good' or 'bad' here, just prominent
                subtext={`${mostBusySector ? mostBusySector.value.toLocaleString() : 0} casos registados`}
            />
            <StatCard
                title="Uso de Medicamentos"
                value={totalMedicamentos ? totalMedicamentos.toLocaleString() : "0"}
                icon={<FaPills />}
                subtext="Unidades dispensadas"
            />
            <StatCard
                title="Casos Críticos"
                value={totalCriticos.toLocaleString()}
                icon={<FaProcedures />}
                type="alert"
                subtext="Requerem atenção imediata"
            />
        </div>
    );
};

export default GlobalStatsCards;
