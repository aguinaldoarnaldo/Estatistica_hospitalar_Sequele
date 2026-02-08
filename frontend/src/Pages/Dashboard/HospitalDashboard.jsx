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
    tipo: 'Hospital',
    comuna: 'Sequele' // Default fallback
  };

  // Define colors based on commune (matching the map)
  const communeColors = {
    'Sequele': {
      bg: 'linear-gradient(135deg, #ffffff 0%, #e6f0fa 100%)', // Blue
      border: '1px solid #bfdbfe',
      icon: 'var(--color-blue-medium)',
      text: 'var(--color-blue-dark)'
    },
    'Kifangondo': {
      bg: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', // Green
      border: '1px solid #bbf7d0',
      icon: 'var(--color-green-medium)',
      text: 'var(--color-green-dark)'
    },
    'Funda': {
      bg: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)', // Red
      border: '1px solid #fecaca',
      icon: 'var(--color-red-medium)',
      text: 'var(--color-red-dark)'
    },
    'Zona Baia': {
      bg: 'linear-gradient(135deg, #ffffff 0%, #fefce8 100%)', // Gold/Yellow
      border: '1px solid #fde68a',
      icon: '#d97706', // Darker gold/amber
      text: '#78350f'
    }
  };

  const currentTheme = communeColors[unidade.comuna] || communeColors['Sequele'];
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

  const StatsCard = ({ title, icon, value }) => (
    <div style={{
      background: currentTheme.bg,
      border: currentTheme.border,
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '140px',
      position: 'relative',
      borderLeft: `4px solid ${currentTheme.icon}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ color: currentTheme.icon, fontSize: '1.8rem' }}>{icon}</div>
        <span style={{ fontSize: '2rem', fontWeight: '800', color: currentTheme.text }}>{value}</span>
      </div>
      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-gray-dark)' }}>{title}</span>
    </div>
  );

  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--color-gray-light)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Navigation Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <button
          onClick={() => navigate(-1)}
          className="no-print"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: 'var(--color-gray-dark)', cursor: 'pointer', fontWeight: '600' }}
        >
          <FiArrowLeft /> Voltar para Comuna
        </button>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ backgroundColor: 'var(--color-white)', padding: '10px 20px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--color-blue-dark)', cursor: 'pointer' }}>
            Janeiro (2024) <FiChevronDown />
          </div>
          <button
            onClick={() => window.print()}
            className="no-print"
            style={{ backgroundColor: 'var(--color-white)', padding: '10px 20px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', color: 'var(--color-blue-dark)', cursor: 'pointer', fontWeight: '600' }}
          >
            Imprimir Relatório <FiPrinter />
          </button>
        </div>
      </div>

      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-blue-dark)', fontWeight: '700' }}>{unidade.nome}</h1>
        <p style={{ color: 'var(--color-gray-dark)', fontSize: '0.9rem' }}>Dashboard de monitoramento mensal</p>
      </header>

      {/* Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <StatsCard title="Consultas Externas" icon={<FiClipboard />} value={cards.consultas} />
        <StatsCard title="Consultas de Banco de Urgência" icon={<FiActivity />} value={cards.urgencias} />
        <StatsCard title="Exames de Laboratório" icon={<FiThermometer />} value={cards.laboratorio} />
        <StatsCard title="Cirurgias" icon={<FiScissors />} value={cards.cirurgias} />
        <StatsCard title="Partos" icon={<FiUsers />} value={cards.partos} />
        <StatsCard title="Consultas Pré-natais" icon={<FiHeart />} value={cards.prenatal} />
      </div>

      {/* Charts & Table Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Left: Chart */}
        <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--color-gray-dark)', fontWeight: '700', marginBottom: '20px' }}>Consultas Externas</h3>
          <div style={{ height: '400px', width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={chartConsultas} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'var(--color-gray-light)' }} />
                <Legend iconType="circle" />
                <Bar dataKey="menos15" name="Menos 15 anos" fill="var(--color-blue-light)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="mais15" name="15 anos e mais" fill="var(--color-blue-medium)" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Table */}
        <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--color-gray-dark)', fontWeight: '700', marginBottom: '20px' }}>Consultas por Especialidade e por Tipo de Prestador</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', color: 'var(--color-blue-dark)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-gray-light)' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>Serviços</th>
                <th colSpan="3" style={{ textAlign: 'center', padding: '10px', color: 'var(--color-gray-dark)' }}>Medicos</th>
                <th colSpan="3" style={{ textAlign: 'center', padding: '10px', color: 'var(--color-gray-dark)' }}>Enfermeiros</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Total geral</th>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-medium)', color: 'var(--color-gray-dark)', fontSize: '0.75rem' }}>
                <th></th>
                <th style={{ textAlign: 'right' }}>C.E</th>
                <th style={{ textAlign: 'right' }}>C.B.U</th>
                <th style={{ textAlign: 'right', color: 'var(--color-blue-medium)' }}>Subtotal</th>
                <th style={{ textAlign: 'right' }}>C.E</th>
                <th style={{ textAlign: 'right' }}>C.B.U</th>
                <th style={{ textAlign: 'right', color: 'var(--color-blue-medium)' }}>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: '500' }}>{row.service}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>{row.medico_ce}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>{row.medico_cbu}</td>
                  <td style={{ textAlign: 'right', padding: '10px', color: 'var(--color-blue-medium)', fontWeight: '600' }}>{row.total_med}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>{row.enf_ce}</td>
                  <td style={{ textAlign: 'right', padding: '10px' }}>{row.enf_cbu}</td>
                  <td style={{ textAlign: 'right', padding: '10px', color: 'var(--color-blue-medium)', fontWeight: '600' }}>{row.total_enf}</td>
                  <td style={{ textAlign: 'right', padding: '10px', fontWeight: 'bold' }}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Placeholder for other service charts as requested "graficos de estatistica de cada serviço" */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--color-gray-dark)', fontWeight: '700', marginBottom: '20px' }}>Outros Serviços</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          {/* Example of another service chart */}
          <div style={{ backgroundColor: 'var(--color-white)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Banco de Urgência - Evolução</h4>
            <div style={{ height: '250px' }}>
              <ResponsiveContainer>
                <BarChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="var(--color-green-medium)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Example 2 */}
          <div style={{ backgroundColor: 'var(--color-white)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Partos - Evolução</h4>
            <div style={{ height: '250px' }}>
              <ResponsiveContainer>
                <BarChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  {/* Using a slight math random on value to differentiate visual if reusing same mock array */}
                  <Bar dataKey="value" fill="var(--color-blue-medium)" radius={[4, 4, 0, 0]} />
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
