// Helper to generate random but consistent data based on ID
export const getHospitalStats = (id) => {
    // Seed-like behavior (simple multiplier) to keep data consistent for same ID
    const base = (id * 123) % 1000;

    // Helper for random number in range based on id
    const num = (min, max, factor = 1) => {
        return Math.floor(min + ((base * factor) % (max - min)));
    };

    return {
        cards: {
            consultas: num(800, 5000, 1),
            urgencias: num(500, 3000, 2),
            laboratorio: num(1000, 8000, 3),
            cirurgias: num(50, 600, 4),
            partos: num(100, 2500, 5),
            prenatal: num(200, 1500, 6),
        },
        // Chart: Consultas Externas (Grouped)
        chartConsultas: [
            { name: 'Medicina', menos15: num(100, 500, 7), mais15: num(500, 2000, 8) },
            { name: 'Pediatria', menos15: num(800, 2000, 9), mais15: num(50, 200, 10) },
            { name: 'Cirurgia', menos15: num(50, 200, 11), mais15: num(200, 800, 12) },
            { name: 'Ginecologia', menos15: num(80, 300, 13), mais15: num(400, 1500, 14) },
            { name: 'Ortopedia', menos15: num(40, 150, 15), mais15: num(150, 600, 16) },
            { name: 'Oftalmologia', menos15: num(30, 120, 17), mais15: num(100, 500, 18) },
        ],
        // Table: Especialidades
        tableData: [
            { service: 'Medicina', medico_ce: num(100, 300, 1), medico_cbu: num(500, 1000, 2), enf_ce: num(200, 400, 3), enf_cbu: num(200, 400, 4) },
            { service: 'Pediatria', medico_ce: num(100, 300, 5), medico_cbu: num(500, 1000, 6), enf_ce: num(200, 400, 7), enf_cbu: num(200, 400, 8) },
            { service: 'Cirurgia', medico_ce: num(50, 150, 9), medico_cbu: num(200, 500, 10), enf_ce: num(100, 200, 11), enf_cbu: num(100, 200, 12) },
            { service: 'Obstetrícia', medico_ce: num(80, 200, 13), medico_cbu: num(300, 800, 14), enf_ce: num(150, 300, 15), enf_cbu: num(150, 300, 16) },
            { service: 'Ginecologia', medico_ce: num(90, 220, 17), medico_cbu: num(400, 900, 18), enf_ce: num(180, 350, 19), enf_cbu: num(180, 350, 20) },
        ].map(row => {
            // Calculate totals
            const total_med = row.medico_ce + row.medico_cbu;
            const total_enf = row.enf_ce + row.enf_cbu;
            return { ...row, total_med, total_enf, total: total_med + total_enf };
        }),
        // Other Charts (just generic random data keyed by month)
        historyData: [
            { name: 'Jan', value: num(100, 500, 20) },
            { name: 'Fev', value: num(100, 500, 21) },
            { name: 'Mar', value: num(100, 500, 22) },
            { name: 'Abr', value: num(100, 500, 23) },
            { name: 'Mai', value: num(100, 500, 24) },
            { name: 'Jun', value: num(100, 500, 25) },
        ]
    };
};
