// src/pages/Subsystem.js
import React, { useEffect, useState } from 'react';

const Subsystem = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/topic/subsystem')
      .then((res) => res.json())
      .then((result) => {
        console.log('Fetched subsystem data:', result);
        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to load data');
      });
  }, []);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setSelectedContent(null);

    fetch(`http://localhost:5000/api/topic/subsystem/${buttonName.toLowerCase()}`)
      .then((res) => res.json())
      .then((detail) => {
        console.log(`Fetched detail for ${buttonName}:`, detail);
        setSelectedContent(detail);
      })
      .catch((err) => {
        console.error(`Error fetching ${buttonName} detail:`, err);
        setSelectedContent({ description: 'Failed to load details' });
      });
  };

  if (error) return <div style={{ color: 'white' }}>Error: {error}</div>;
  if (!data) return <div style={{ color: 'white' }}>Loading...</div>;

  const renderContent = (content) => {
    if (!content) return null;

    if (typeof content === 'string') {
      return content;
    }

    if (typeof content === 'object') {
      if ('description' in content) {
        return renderContent(content.description);
      }
      return Object.entries(content)
        .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
        .join('\n');
    }

    return String(content);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f61616', minHeight: '100vh', color: 'white' }}>
      <h1>{data.title}</h1>
      <p style={{ maxWidth: '800px', margin: 'auto', marginBottom: '20px', whiteSpace: 'pre-line', color: 'white' }}>
        {renderContent(data.description)}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        {data.buttons && data.buttons.length > 0 ? (
          data.buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleButtonClick(btn.name)}
              style={{
                padding: '10px 18px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#f61616',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              {btn.name}
            </button>
          ))
        ) : (
          <p style={{ color: 'white' }}>No subsystems available.</p>
        )}
      </div>

      {selectedButton && (
        <div style={{ marginTop: '30px', textAlign: 'left', maxWidth: '800px', margin: '30px auto' }}>
          <h3 style={{ color: 'white' }}>You selected: {selectedButton}</h3>
          <pre
            style={{
              backgroundColor: '#f61616',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {selectedContent ? renderContent(selectedContent) : 'Loading details...'}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Subsystem;
