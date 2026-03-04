import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Initialize from localStorage to persist mock session
    useEffect(() => {
        const savedUser = localStorage.getItem('hms_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData) => {
        // SIMULATION: Rotate user identity to show multi-tenancy
        // Get current rotation index
        let rotationIndex = parseInt(localStorage.getItem('hms_rotation_index') || '0');

        const mockIdentities = [
            { name: 'Dr. Arnaldo', role: 'Médico Chefe', unidadeId: 1 }, // Vila Verde
            { name: 'Enf. Joana', role: 'Enfermeira', unidadeId: 4 },    // Kifangondo
            { name: 'Dra. Sofia', role: 'Diretora Clínica', unidadeId: 7 }, // Funda
            { name: 'Dr. Antonio', role: 'Médico', unidadeId: 9 },       // Zona Baia
        ];

        // Select next identity
        const nextIdentity = mockIdentities[rotationIndex % mockIdentities.length];

        // Update rotation for next time
        localStorage.setItem('hms_rotation_index', (rotationIndex + 1).toString());

        // Merge simulated identity with login data
        const finalUser = { ...userData, ...nextIdentity };

        setUser(finalUser);
        localStorage.setItem('hms_user', JSON.stringify(finalUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hms_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
