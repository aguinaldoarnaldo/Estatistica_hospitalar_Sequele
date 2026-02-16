import React, { createContext, useContext, useState, useEffect } from 'react';

const ClinicalContext = createContext();

export const ClinicalProvider = ({ children }) => {
    // Structure: { [unidadeId]: { consultas: 0, urgencias: 0, laboratorio: 0, cirurgias: 0, partos: 0, prenatal: 0 } }
    const [clinicalData, setClinicalData] = useState(() => {
        const saved = localStorage.getItem('hms_clinical_data');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('hms_clinical_data', JSON.stringify(clinicalData));
    }, [clinicalData]);

    const addRecord = (unidadeId, type) => {
        setClinicalData(prev => {
            const current = prev[unidadeId] || {
                consultas: 0,
                urgencias: 0,
                laboratorio: 0,
                cirurgias: 0,
                partos: 0,
                prenatal: 0
            };

            return {
                ...prev,
                [unidadeId]: {
                    ...current,
                    [type]: current[type] + 1
                }
            };
        });
    };

    const getRecords = (unidadeId) => {
        return clinicalData[unidadeId] || {
            consultas: 0,
            urgencias: 0,
            laboratorio: 0,
            cirurgias: 0,
            partos: 0,
            prenatal: 0
        };
    };

    return (
        <ClinicalContext.Provider value={{ addRecord, getRecords }}>
            {children}
        </ClinicalContext.Provider>
    );
};

export const useClinical = () => {
    const context = useContext(ClinicalContext);
    if (!context) {
        throw new Error('useClinical deve ser usado dentro de um ClinicalProvider');
    }
    return context;
};
