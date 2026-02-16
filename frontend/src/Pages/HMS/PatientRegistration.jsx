import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiUser, FiActivity } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useUnidades } from '../../context/UnidadeContext';

const PatientRegistration = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { unidades } = useUnidades();

    const unidadeId = user?.unidadeId || 1;
    const unidade = unidades.find(u => u.id === unidadeId) || unidades[0];
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        bi: '',
        genero: 'Masculino',
        endereco: '',
        telefone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Paciente registrado com sucesso! (Protótipo)');
        navigate('/hms');
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginTop: '6px',
        fontSize: '0.95rem'
    };

    const labelStyle = {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: '#475569'
    };

    return (
        <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <button
                onClick={() => navigate('/hms')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600', marginBottom: '20px' }}
            >
                <FiArrowLeft /> Voltar ao Início
            </button>

            <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <header style={{ marginBottom: '30px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <FiUser style={{ color: '#3b82f6' }} /> Registro de Paciente
                            </h1>
                            <p style={{ color: '#64748b', marginTop: '4px' }}>Introduza as informações pessoais para abrir o processo clínico</p>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f8fafc', padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <FiActivity style={{ color: '#3b82f6' }} />
                            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b' }}>{unidade.nome}</span>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        <div>
                            <label style={labelStyle}>Nome Completo</label>
                            <input
                                type="text"
                                required
                                style={inputStyle}
                                placeholder="Ex: Manuel dos Santos"
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Número do BI / Cédula</label>
                            <input
                                type="text"
                                required
                                style={inputStyle}
                                placeholder="Ex: 001234567LA012"
                                onChange={(e) => setFormData({ ...formData, bi: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        <div>
                            <label style={labelStyle}>Data de Nascimento</label>
                            <input
                                type="date"
                                required
                                style={inputStyle}
                                onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Gênero</label>
                            <select
                                style={inputStyle}
                                onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                            >
                                <option>Masculino</option>
                                <option>Feminino</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Telefone</label>
                            <input
                                type="tel"
                                style={inputStyle}
                                placeholder="9XX XXX XXX"
                                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={labelStyle}>Endereço Residencial</label>
                        <textarea
                            style={{ ...inputStyle, height: '80px', resize: 'none' }}
                            placeholder="Ex: Rua 5, Bloco B, Sequele"
                            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/hms')}
                            style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#ffffff', color: '#475569', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{ padding: '12px 32px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#ffffff', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <FiSave /> Salvar Registro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientRegistration;
