// src/pages/Range.js
import React, { useState } from 'react';

const ranges = [
  "Short Range",
  "Medium Range",
  "Intermediate-Range Ballistic Missile",
  "Intercontinental Ballistic Missile"
];

const Range = () => {
  const [expandedKey, setExpandedKey] = useState(null);
  const [subData, setSubData] = useState({});
  const [error, setError] = useState(null);

  const handleClick = async (range) => {
    const key = range.toLowerCase().replace(/[\s\-]/g, '');

    if (expandedKey === key) {
      setExpandedKey(null);
      return;
    }

    if (!subData[key]) {
      try {
        const res = await fetch(`http://localhost:5000/api/topic/${key}`);
        if (!res.ok) throw new Error(`Failed to fetch data for ${range}`);
        const data = await res.json();
        setSubData(prev => ({ ...prev, [key]: data.content || 'No content found.' }));
        setError(null);
      } catch (err) {
        setError(err.message);
        setSubData(prev => ({ ...prev, [key]: null }));
      }
    }

    setExpandedKey(key);
  };

  return (
    <div
      style={{
        backgroundColor: '#000',
        minHeight: '100vh',
        padding: '30px',
        color: '#fff', // Set default text color to white
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: 'center'
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>
        Range-based Missile Classification
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        {ranges.map((range, idx) => {
          const key = range.toLowerCase().replace(/[\s\-]/g, '');
          const content = subData[key];
          const isOpen = expandedKey === key;

          return (
            <div key={idx} style={{ width: '100%' }}>
              <button
                onClick={() => handleClick(range)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  backgroundColor: '#f61616',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 2px 5px rgba(229, 12, 19, 0.8)',
                }}
              >
                {range}
              </button>

              {isOpen && (
                <div
                  style={{
                    backgroundColor: '#111',
                    padding: '15px 20px',
                    borderRadius: '6px',
                    color: '#fff', // Ensure text inside content box is white
                    lineHeight: '1.5',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
                    textAlign: 'left',
                    marginTop: '6px',
                    userSelect: 'text',
                  }}
                >
                  {error && <p style={{ color: 'red' }}>{error}</p>}

                  {Array.isArray(content) ? (
                    content.map((section, i) => (
                      <div key={i} style={{ marginBottom: '15px' }}>
                        {section.heading && (
                          <h3 style={{ color: '#fff' }}>{section.heading}</h3>
                        )}

                        {section.text && typeof section.text === 'string' && (
                          <p style={{ color: '#fff', whiteSpace: 'pre-line' }}>{section.text}</p>
                        )}

                        {Array.isArray(section.text) && (
                          <ul style={{ paddingLeft: '20px', color: '#fff' }}>
                            {section.text.map((item, j) => (
                              <li key={j} style={{ marginBottom: '10px' }}>
                                {typeof item === 'string' ? (
                                  item
                                ) : (
                                  <>
                                    {item.type && <strong>{item.type}</strong>}
                                    {item.description && <div>{item.description}</div>}
                                    {item.example && (
                                      <div>
                                        <em>Example:</em> {item.example}
                                      </div>
                                    )}
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.image && (
                          <img
                            src={`http://localhost:5000/uploads/${section.image}`}
                            alt="Section visual"
                            style={{
                              width: '100%',
                              maxHeight: '400px',
                              objectFit: 'contain',
                              marginTop: '10px',
                              borderRadius: '10px',
                              border: '1px solid #444',
                            }}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#fff' }}>{content}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Range;
