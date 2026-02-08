import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComunas } from '../../context/ComunaContext';
import { useUnidades } from '../../context/UnidadeContext';
import { FiPlus, FiActivity, FiArrowRight } from 'react-icons/fi';

const ComunaDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { comunas } = useComunas();
    const { unidades } = useUnidades();

    const comuna = comunas.find(c => c.id === Number(id));
    const unidadesDaComuna = unidades.filter(u => u.comuna === comuna?.nome);

    console.log('--- Debug ComunaDetails ---');
    console.log('Param ID:', id);
    console.log('All Comunas:', comunas);
    console.log('Found Comuna:', comuna);
    console.log('All Unidades:', unidades);
    console.log('Filtered Unidades:', unidadesDaComuna);

    if (!comuna) {
        console.error('Comuna not found for ID:', id);
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ color: 'red' }}>Erro: Comuna não encontrada (ID: {id})</h2>
                <p>Comunas disponíveis: {comunas.map(c => c.id).join(', ')}</p>
            </div>
        );
    }

    if (!unidades) {
        return <div>Carregando unidades...</div>;
    }

    return (
        <div style={{ padding: '30px', backgroundColor: 'var(--color-gray-light)', minHeight: '100vh' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--color-blue-dark)', marginBottom: '10px' }}>{comuna.nome}</h1>
                <p style={{ color: 'var(--color-gray-dark)' }}>{comuna.descricao}</p>
                <div style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', backgroundColor: 'var(--color-blue-light)', color: 'var(--color-blue-medium)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    População Estimada: {comuna.populacao}
                </div>
            </header>

            <section>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--color-blue-dark)', marginBottom: '20px' }}>Unidades Sanitárias</h2>

                {unidadesDaComuna.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'var(--color-white)', borderRadius: '12px', border: '1px dashed var(--color-gray-medium)', color: 'var(--color-gray-dark)' }}>
                        Nenhuma unidade cadastrada nesta comuna.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {unidadesDaComuna.map(unidade => (
                            <div
                                key={unidade.id}
                                onClick={() => navigate(`/sequele/unidade/${unidade.id}`)}
                                style={{
                                    background: 'linear-gradient(135deg, #ffffff 0%, #e6f0fa 100%)',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '25px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                                    border: '1px solid var(--color-gray-light)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.05)';
                                    e.currentTarget.style.borderColor = 'var(--color-blue-medium)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.02)';
                                    e.currentTarget.style.borderColor = 'var(--color-gray-light)';
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div style={{ padding: '10px', backgroundColor: 'var(--color-blue-light)', borderRadius: '8px', color: 'var(--color-blue-medium)' }}>
                                        <FiActivity size={20} />
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-dark)', backgroundColor: 'var(--color-gray-light)', padding: '4px 8px', borderRadius: '4px' }}>
                                        {unidade.tipo}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-blue-dark)', marginBottom: '5px' }}>{unidade.nome}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-dark)', marginBottom: '20px' }}>Diretor: {unidade.diretor}</p>

                                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-blue-medium)', fontSize: '0.9rem', fontWeight: '500' }}>
                                    Ver Dashboard <FiArrowRight style={{ marginLeft: '5px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ComunaDetails;
