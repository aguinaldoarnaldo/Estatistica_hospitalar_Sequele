import React, { createContext, useContext, useState, useEffect } from 'react';

const ClinicalContext = createContext();

export const ClinicalProvider = ({ children }) => {
    // Clinical production data (totals for cards): { [unidadeId]: { consultas: 0, ... } }
    const [clinicalData, setClinicalData] = useState(() => {
        const saved = localStorage.getItem('hms_clinical_data');
        return saved ? JSON.parse(saved) : {};
    });

    // Patient list: { [unidadeId]: [ { nome, bi, ... }, ... ] }
    const [patients, setPatients] = useState(() => {
        const saved = localStorage.getItem('hms_patients');
        if (saved) return JSON.parse(saved);
        return {
            1: [
                { id: 101, nome: "Manuel dos Santos", bi: "001234567LA012", genero: "Masculino", telefone: "923 445 001", registeredAt: new Date().toISOString() },
                { id: 102, nome: "Ana Maria Jorge", bi: "007882233BA045", genero: "Feminino", telefone: "931 002 993", registeredAt: new Date().toISOString() },
                { id: 103, nome: "Teresa Bento", bi: "005566778LA099", genero: "Feminino", telefone: "923 111 222", registeredAt: new Date().toISOString() },
                { id: 104, nome: "João Paulo", bi: "006677889LA088", genero: "Masculino", telefone: "934 333 444", registeredAt: new Date().toISOString() }
            ],
            4: [
                { id: 401, nome: "Carlos Mendes", bi: "009112233CC098", genero: "Masculino", telefone: "944 556 778", registeredAt: new Date().toISOString() },
                { id: 402, nome: "Maria Kitumba", bi: "009988776CC011", genero: "Feminino", telefone: "945 777 888", registeredAt: new Date().toISOString() }
            ]
        };
    });

    // Consultation History: { [unidadeId]: [ { patientName, service, date, ... }, ... ] }
    const [consultations, setConsultations] = useState(() => {
        const saved = localStorage.getItem('hms_consultation_history');
        if (saved) return JSON.parse(saved);

        // Simulação: Consultas iniciais
        return {
            1: [
                { id: 1001, pacienteNome: "Manuel dos Santos", servico: "consultas", especialidade: "Medicina", data: new Date().toISOString(), medico: "Dr. Arnaldo", status: "Concluída" },
                { id: 1002, pacienteNome: "Ana Maria Jorge", servico: "urgencias", especialidade: "Pediatria", data: new Date().toISOString(), medico: "Dra. Sofia", status: "Concluída" },
                { id: 1003, pacienteNome: "Teresa Bento", servico: "partos", especialidade: "Maternidade", data: new Date(Date.now() - 86400000 * 2).toISOString(), medico: "Dra. Elena", status: "Concluída" },
                { id: 1004, pacienteNome: "João Paulo", servico: "cirurgias", especialidade: "Ortopedia", data: new Date(Date.now() - 86400000).toISOString(), medico: "Dr. Pedro", status: "Concluída" }
            ],
            4: [
                { id: 4001, pacienteNome: "Carlos Mendes", servico: "consultas", especialidade: "Medicina", data: new Date().toISOString(), medico: "Dr. André", status: "Concluída" }
            ]
        };
    });

    useEffect(() => {
        localStorage.setItem('hms_clinical_data', JSON.stringify(clinicalData));
    }, [clinicalData]);

    useEffect(() => {
        localStorage.setItem('hms_patients', JSON.stringify(patients));
    }, [patients]);

    useEffect(() => {
        localStorage.setItem('hms_consultation_history', JSON.stringify(consultations));
    }, [consultations]);

    const addRecord = (unidadeId, type) => {
        setClinicalData(prev => {
            const current = (prev && prev[unidadeId]) ? prev[unidadeId] : {
                consultas: 0, urgencias: 0, laboratorio: 0, cirurgias: 0, partos: 0, prenatal: 0
            };
            return {
                ...prev,
                [unidadeId]: { ...current, [type]: (current[type] || 0) + 1 }
            };
        });
    };

    const getRecords = (unidadeId) => {
        return (clinicalData && clinicalData[unidadeId]) ? clinicalData[unidadeId] : {
            consultas: 0, urgencias: 0, laboratorio: 0, cirurgias: 0, partos: 0, prenatal: 0
        };
    };

    const addPatient = (unidadeId, patientData) => {
        setPatients(prev => ({
            ...prev,
            [unidadeId]: [...(prev[unidadeId] || []), { ...patientData, id: Date.now(), registeredAt: new Date().toISOString() }]
        }));
    };

    const getPatients = (unidadeId) => {
        return patients[unidadeId] || [];
    };

    const addConsultation = (unidadeId, consData) => {
        // Increment the totals first
        addRecord(unidadeId, consData.tipoVisita);

        // Add to detailed history
        setConsultations(prev => ({
            ...prev,
            [unidadeId]: [{ ...consData, id: Date.now(), data: new Date().toISOString() }, ...(prev[unidadeId] || [])]
        }));
    };

    const getConsultations = (unidadeId) => {
        return consultations[unidadeId] || [];
    };

    const getRecordsForRange = (unidadeId, startDate, endDate) => {
        const hospitalConsultations = consultations[unidadeId] || [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Set end date to end of day
        end.setHours(23, 59, 59, 999);

        // Filter by date range
        const filtered = hospitalConsultations.filter(c => {
            const consDate = new Date(c.data);
            return consDate >= start && consDate <= end;
        });

        // Aggregate by tipoVisita
        return filtered.reduce((acc, curr) => {
            const type = curr.tipoVisita || 'consultas';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {
            consultas: 0, urgencias: 0, laboratorio: 0, cirurgias: 0, partos: 0, prenatal: 0
        });
    };

    // Keep for compatibility or legacy views
    const getRecordsForPeriod = (unidadeId, month, year) => {
        const startDate = new Date(year, month, 1).toISOString().split('T')[0];
        const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
        return getRecordsForRange(unidadeId, startDate, endDate);
    };

    return (
        <ClinicalContext.Provider value={{
            addRecord, getRecords,
            getRecordsForPeriod,
            getRecordsForRange, // Added
            addPatient, getPatients,
            addConsultation, getConsultations
        }}>
            {children}
        </ClinicalContext.Provider>
    );
};

export const useClinical = () => {
    const context = useContext(ClinicalContext);
    if (!context) throw new Error('useClinical deve ser usado dentro de um ClinicalProvider');
    return context;
};
