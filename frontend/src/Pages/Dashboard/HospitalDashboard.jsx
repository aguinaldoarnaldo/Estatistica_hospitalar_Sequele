import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiActivity, FiUsers, FiClipboard, FiHeart, FiScissors, FiThermometer, FiArrowLeft } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useUnidades } from '../../context/UnidadeContext';

const HospitalDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { unidades } = useUnidades();
  
  // Find unit or use fallback
  const unidade = unidades.find(u => u.id === Number(id)) || { 
    nome: 'Unidade Hospitalar', 
    diretor: 'Não informado',
    tipo: 'Hospital'
  };

  // Mock Data for Charts
  const dataConsultas = [
    { name: 'Jan', value: 400 }, { name: 'Fev', value: 300 }, { name: 'Mar', value: 550 },
    { name: 'Abr', value: 480 }, { name: 'Mai', value: 600 }, { name: 'Jun', value: 700 },
  ];

  const dataUrgencias = [
    { name: 'Jan', value: 120 }, { name: 'Fev', value: 150 }, { name: 'Mar', value: 180 },
    { name: 'Abr', value: 140 }, { name: 'Mai', value: 200 }, { name: 'Jun', value: 250 },
  ];

  const dataLaboratorio = [
    { name: 'Jan', value: 800 }, { name: 'Fev', value: 900 }, { name: 'Mar', value: 850 },
    { name: 'Abr', value: 1100 }, { name: 'Mai', value: 1200 }, { name: 'Jun', value: 1300 },
  ];

  const dataCirurgias = [
    { name: 'Jan', value: 15 }, { name: 'Fev', value: 20 }, { name: 'Mar', value: 18 },
    { name: 'Abr', value: 25 }, { name: 'Mai', value: 30 }, { name: 'Jun', value: 28 },
  ];

  const dataPartos = [
    { name: 'Jan', value: 45 }, { name: 'Fev', value: 50 }, { name: 'Mar', value: 48 },
    { name: 'Abr', value: 55 }, { name: 'Mai', value: 60 }, { name: 'Jun', value: 65 },
  ];

  const dataPrenatal = [
    { name: 'Jan', value: 100 }, { name: 'Fev', value: 110 }, { name: 'Mar', value: 115 },
    { name: 'Abr', value: 120 }, { name: 'Mai', value: 130 }, { name: 'Jun', value: 140 },
  ];

  const ServiceCard = ({ title, icon, value, color, data, dataKey = "value", chartType = "line" }) => (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '5px' }}>{title}</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b' }}>{value}</p>
        </div>
        <div style={{ 
          backgroundColor: `${color}20`, 
          padding: '12px', 
          borderRadius: '50%', 
          color: color,
          fontSize: '1.5rem' 
        }}>
          {icon}
        </div>
      </div>
      
      <div style={{ height: '150px', width: '100%' }}>
        <ResponsiveContainer>
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" hide />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                cursor={{ stroke: `${color}50`, strokeWidth: 2 }}
              />
              <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} dot={{ r: 4, fill: color }} activeDot={{ r: 6 }} />
            </LineChart>
          ) : (
            <BarChart data={data}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
               <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                cursor={{ fill: `${color}10` }}
               />
               <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '20px',
          border: 'none',
          background: 'none',
          color: '#64748b',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        <FiArrowLeft /> Voltar para Comuna
      </button>

      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '5px' }}>{unidade.nome}</h1>
        <div style={{ display: 'flex', gap: '20px', color: '#64748b' }}>
          <span>Diretor: <strong>{unidade.diretor}</strong></span>
          <span>•</span>
          <span>Tipo: <strong>{unidade.tipo}</strong></span>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
        <ServiceCard 
          title="Consultas Externas" 
          icon={<FiClipboard />} 
          value="3,030" 
          color="#3b82f6" 
          data={dataConsultas} 
        />
        <ServiceCard 
          title="Banco de Urgência" 
          icon={<FiActivity />} 
          value="1,490" 
          color="#ef4444" 
          data={dataUrgencias}
          chartType="bar"
        />
        <ServiceCard 
          title="Exames de Laboratório" 
          icon={<FiThermometer />} 
          value="7,250" 
          color="#8b5cf6" 
          data={dataLaboratorio}
        />
        <ServiceCard 
          title="Cirurgias" 
          icon={<FiScissors />} 
          value="148" 
          color="#f59e0b" 
          data={dataCirurgias}
          chartType="bar"
        />
        <ServiceCard 
          title="Partos" 
          icon={<FiUsers />} 
          value="365" 
          color="#ec4899" 
          data={dataPartos}
        />
        <ServiceCard 
          title="Consultas Pré-Natal" 
          icon={<FiHeart />} 
          value="820" 
          color="#10b981" 
          data={dataPrenatal}
          chartType="bar"
        />
      </div>
    </div>
  );
};

export default HospitalDashboard;
