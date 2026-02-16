import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiList, FiPlus, FiActivity } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useUnidades } from '../../context/UnidadeContext';

const ConsultationEntry = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { unidades } = useUnidades();

    const unidadeId = user?.unidadeId || 1;
    const unidade = unidades.find(u => u.id === unidadeId) || unidades[0];
    const [formData, setFormData] = useState({
        pacienteId: '',
        servico: 'Medicina',
        tipoVisita: 'C.E (Consulta Externa)',
        tipoPrestador: 'Médico',
        descricao: '',
        procedimentos: {
            laboratorio: false,
            cirurgia: false,
            parto: false,
            prenatal: false
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Consulta registrada com sucesso! Dados prontos para estatística.');
        navigate('/hms');
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginTop: '6px',
        fontSize: '0.95rem',
        backgroundColor: '#ffffff'
    };

    const labelStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#475569'
    };

    const servicos = [
        'Medicina', 'Pediatria', 'Cirurgia', 'Obstetrícia', 'Ginecologia',
        'Planeamento Familiar', 'Oftalmologia', 'Ortopedia', 'Outros'
    ];

    return (
        <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <button
                onClick={() => navigate('/hms')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600', marginBottom: '20px' }}
            >
                <FiArrowLeft /> Voltar ao Início
            </button>

            <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#ffffff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <header style={{ marginBottom: '30px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <FiPlus style={{ color: '#8b5cf6' }} /> Novo Registro de Consulta
                            </h1>
                            <p style={{ color: '#64748b', marginTop: '4px' }}>Estes dados alimentarão automaticamente os gráficos de estatística municipal</p>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fdf4ff', padding: '10px 15px', borderRadius: '10px', border: '1px solid #f5d0fe' }}>
                            <FiActivity style={{ color: '#8b5cf6' }} />
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b' }}>{unidade.nome}</span>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSubmit}>
                    {/* Patient Selection (Simulated) */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={labelStyle}>Selecionar Paciente</label>
                        <select required style={inputStyle} onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}>
                            <option value="">-- Selecione o Paciente --</option>
                            <option value="1">Manuel dos Santos (32 anos)</option>
                            <option value="2">Ana Ferreira (12 anos)</option>
                            <option value="3">Carlos Mendes (45 anos)</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                        <div>
                            <label style={labelStyle}>Serviço / Especialidade</label>
                            <select style={inputStyle} value={formData.servico} onChange={(e) => setFormData({ ...formData, servico: e.target.value })}>
                                {servicos.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Tipo de Visita</label>
                            <select style={inputStyle} value={formData.tipoVisita} onChange={(e) => setFormData({ ...formData, tipoVisita: e.target.value })}>
                                <option value="C.E (Consulta Externa)">C.E (Consulta Externa)</option>
                                <option value="C.B.U (Urgência)">C.B.U (Urgência)</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Tipo de Prestador</label>
                            <select style={inputStyle} value={formData.tipoPrestador} onChange={(e) => setFormData({ ...formData, tipoPrestador: e.target.value })}>
                                <option value="Médico">Médico</option>
                                <option value="Enfermeiro">Enfermeiro</option>
                            </select>
                        </div>
                    </div>

                    {/* Stats-related Checkboxes */}
                    <div style={{ marginBottom: '24px', backgroundColor: '#fdf4ff', padding: '20px', borderRadius: '12px', border: '1px solid #f5d0fe' }}>
                        <label style={{ ...labelStyle, color: '#86198f', display: 'block', marginBottom: '12px' }}>Procedimentos de Estatística (Opcional)</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                            {['laboratorio', 'cirurgia', 'parto', 'prenatal'].map(proc => (
                                <label key={proc} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textTransform: 'capitalize' }}>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            procedimentos: { ...formData.procedimentos, [proc]: e.target.checked }
                                        })}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: '#701a75' }}>{proc.replace('prenatal', 'Pré-Natal')}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={labelStyle}>Observações Clínicas</label>
                        <textarea
                            style={{ ...inputStyle, height: '100px', resize: 'none' }}
                            placeholder="Descreva o motivo da consulta e resultados..."
                            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/hms')}
                            style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#ffffff', color: '#475569', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Descartar
                        </button>
                        <button
                            type="submit"
                            style={{ padding: '12px 32px', borderRadius: '8px', border: 'none', background: '#8b5cf6', color: '#ffffff', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <FiSave /> Finalizar e Enviar para Estatística
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConsultationEntry;
