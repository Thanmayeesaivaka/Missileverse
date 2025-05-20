import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tom = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: 'By Launch Mode', path: '/tom/launchmode' },
    { label: 'By Range', path: '/tom/range' },
    { label: 'By Propulsion', path: '/tom/propulsion' },
    { label: 'By Warhead', path: '/tom/warhead' },
    { label: 'By Guidance System', path: '/tom/guidance' },
  ];

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '0 20px',
        textAlign: 'center',
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <h1 style={{ color: '#fff' }}>Types of Missiles</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        {buttons.map((btn) => (
          <button
            key={btn.path}
            onClick={() => navigate(btn.path)}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '6px',
              border: '1px solid #444',
              backgroundColor: '#f61616',
              color: '#fff',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d91414'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f61616'}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tom;
