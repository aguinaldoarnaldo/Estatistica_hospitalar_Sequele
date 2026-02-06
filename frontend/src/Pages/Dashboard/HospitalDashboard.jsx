import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiActivity, FiUsers, FiClipboard, FiHeart, FiScissors, FiThermometer, FiArrowLeft, FiPrinter, FiChevronDown } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useUnidades } from '../../context/UnidadeContext';
import { getHospitalStats } from '../../utils/mockStats';

const HospitalDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { unidades } = useUnidades();

  const unidade = unidades.find(u => u.id === Number(id)) || {
    nome: 'Unidade Hospitalar',
    diretor: 'Não informado',
    tipo: 'Hospital'
  };

  // Get dynamic stats based on ID
  const stats = getHospitalStats(Number(id));
  const { cards, chartConsultas, tableData, historyData } = stats;

  // Mock Data for "Consultas por Especialidade" (Table)
  const specialityData = [
    { service: 'Medicina', medico_ce: 292, medico_cbu: 1882, total_med: 4032, enf_ce: 402, enf_cbu: 404, total_enf: 4032, total: 4032 },
    { service: 'Pediatria', medico_ce: 292, medico_cbu: 1882, total_med: 4032, enf_ce: 402, enf_cbu: 404, total_enf: 4032, total: 4032 },
    { service: 'Cirurgia', medico_ce: 292, medico_cbu: 1882, total_med: 4032, enf_ce: 402, enf_cbu: 404, total_enf: 4032, total: 4032 },
    { service: 'Obstetrícia', medico_ce: 292, medico_cbu: 1882, total_med: 4032, enf_ce: 402, enf_cbu: 404, total_enf: 4032, total: 4032 },
    { service: 'Ginecologia', medico_ce: 292, medico_cbu: 1882, total_med: 4032, enf_ce: 402, enf_cbu: 404, total_enf: 4032, total: 4032 },
    { service: 'Planeamento Familiar', medico_ce: 292, medico_cbu: 1882, total_med: 4032, enf_ce: 402, enf_cbu: 404, total_enf: 4032, total: 4032 },
  ];

  // Mock Data for "Consultas Externas" Chart (Grouped)
  const chartData = [
    { name: 'Serviço 1', menos15: 400, mais15: 2400 },
    { name: 'Serviço 2', menos15: 300, mais15: 1398 },
    { name: 'Serviço 3', menos15: 200, mais15: 9800 },
    { name: 'Serviço 4', menos15: 278, mais15: 3908 },
    { name: 'Serviço 5', menos15: 189, mais15: 4800 },
    { name: 'Serviço 6', menos15: 239, mais15: 3800 },
    { name: 'Serviço 7', menos15: 349, mais15: 4300 },
  ];

  const StatsCard = ({ title, icon, value, color }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '140px',
      position: 'relative',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ color: color, fontSize: '1.8rem' }}>{icon}</div>
        <span style={{ fontSize: '2rem', fontWeight: '800', color: '#334155' }}>{value}</span>
      </div>
      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b' }}>{title}</span>
    </div>
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#f1f5f9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button
          onClick={() => navigate(-1)}
          className="no-print"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600' }}
        >
          <FiArrowLeft /> Voltar para Comuna
        </button>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ backgroundColor: 'white', padding: '10px 20px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
            Janeiro (2024) <FiChevronDown />
          </div>
          <button
            onClick={() => window.print()}
            className="no-print"
            style={{ backgroundColor: 'white', padding: '10px 20px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', color: '#334155', cursor: 'pointer', fontWeight: '600' }}
          >
            Imprimir Relatório <FiPrinter />
          </button>
        </div>
      </div>

      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#1e293b', fontWeight: '700' }}>{unidade.nome}</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Dashboard de monitoramento mensal</p>
      </header>

      {/* Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <StatsCard title="Consultas Externas" icon={<FiClipboard />} value={cards.consultas} color="#e4a99b" />
        <StatsCard title="Consultas de Banco de Urgência" icon={<FiActivity />} value={cards.urgencias} color="#e4a99b" />
        <StatsCard title="Exames de Laboratório" icon={<FiThermometer />} value={cards.laboratorio} color="#e4a99b" />
        <StatsCard title="Cirurgias" icon={<FiScissors />} value={cards.cirurgias} color="#e4a99b" />
        <StatsCard title="Partos" icon={<FiUsers />} value={cards.partos} color="#e4a99b" />
        <StatsCard title="Consultas Pré-natais" icon={<FiHeart />} value={cards.prenatal} color="#e4a99b" />
      </div>

      {/* Charts & Table Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Left: Chart */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1rem', color: '#64748b', fontWeight: '700', marginBottom: '20px' }}>Consultas Externas</h3>
          <div style={{ height: '400px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={chartConsultas} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Legend iconType="circle" />
                <Bar dataKey="menos15" name="Menos 15 anos" fill="#fdbf6f" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="mais15" name="15 anos e mais" fill="#60a5fa" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Table */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1rem', color: '#64748b', fontWeight: '700', marginBottom: '20px' }}>Consultas por Especialidade e por Tipo de Prestador</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: '#334155' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>Serviços</th>
                <th colSpan="3" style={{ textAlign: 'center', padding: '10px', color: '#64748b' }}>Medicos</th>
                <th colSpan="3" style={{ textAlign: 'center', padding: '10px', color: '#64748b' }}>Enfermeiros</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Total geral</th>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '0.75rem' }}>
                <th></th>
                <th style={{ textAlign: 'right' }}>C.E</th>
                <th style={{ textAlign: 'right' }}>C.B.U</th>
                <th style={{ textAlign: 'right', color: '#e4a99b' }}>Subtotal</th>
                <th style={{ textAlign: 'right' }}>C.E</th>
                <th style={{ textAlign: 'right' }}>C.B.U</th>
                <th style={{ textAlign: 'right', color: '#e4a99b' }}>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '12px 10px', fontWeight: '500' }}>{row.service}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>{row.medico_ce}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>{row.medico_cbu}</td>
                  <td style={{ textAlign: 'right', padding: '10px', color: '#e4a99b', fontWeight: '600' }}>{row.total_med}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>{row.enf_ce}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>{row.enf_cbu}</td>
                  <td style={{ textAlign: 'right', padding: '10px', color: '#e4a99b', fontWeight: '600' }}>{row.total_enf}</td>
                  <td style={{ textAlign: 'right', padding: '10px', fontWeight: 'bold' }}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Placeholder for other service charts as requested "graficos de estatistica de cada serviço" */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: '1rem', color: '#64748b', fontWeight: '700', marginBottom: '20px' }}>Outros Serviços</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          {/* Example of another service chart */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Banco de Urgência - Evolução</h4>
            <div style={{ height: '250px' }}>
              <ResponsiveContainer>
                <BarChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#e4a99b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Example 2 */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Partos - Evolução</h4>
            <div style={{ height: '250px' }}>
              <ResponsiveContainer>
                <BarChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  {/* Using a slight math random on value to differentiate visual if reusing same mock array */}
                  <Bar dataKey="value" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HospitalDashboard;
