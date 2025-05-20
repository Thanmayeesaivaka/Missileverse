// src/pages/Propulsion.js
import React, { useState } from 'react';

const launchModes = [
  { label: 'Solid Propulsion', topic: 'solidpropulsion' },
  { label: 'Liquid Propulsion', topic: 'liquidpropulsion' },
  { label: 'Hybrid Propulsion', topic: 'hybridpropulsion' },
  { label: 'Ramjet Propulsion', topic: 'ramjetpropulsion' },
  { label: 'Scramjet Propulsion', topic: 'scramjetpropulsion' },
  { label: 'Cryogenic Propulsion', topic: 'cryogenicpropulsion' },
];

const Propulsion = () => {
  const [expandedKey, setExpandedKey] = useState(null);
  const [subData, setSubData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async (mode) => {
    const key = mode.topic;

    if (expandedKey === key) {
      setExpandedKey(null); // Collapse if already open
      return;
    }

    if (!subData[key]) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/topic/${key}`);
        if (!res.ok) throw new Error(`Failed to fetch data for ${mode.label}`);
        const data = await res.json();
        setSubData((prev) => ({ ...prev, [key]: data }));
      } catch (err) {
        setError(err.message);
        setSubData((prev) => ({ ...prev, [key]: null }));
      } finally {
        setLoading(false);
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
        color: '#eee',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ marginBottom: '25px', textAlign: 'center', color: '#fff' }}>
        According to Propulsion
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
        {launchModes.map((mode) => {
          const key = mode.topic;
          const isOpen = expandedKey === key;
          const data = subData[key];

          return (
            <div key={key} style={{ width: '100%' }}>
              <button
                onClick={() => handleClick(mode)}
                style={{
                  padding: '12px 20px',
                  backgroundColor : '#f61616',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '16px',
                  boxShadow: '0 2px 5px rgba(246, 22, 22, 0.7)',
                }}
              >
                {mode.label}
              </button>

              {isOpen && (
                <div
                  style={{
                    backgroundColor: '#111',
                    padding: '15px 20px',
                    borderRadius: '6px',
                    color: '#eee',
                    lineHeight: '1.5',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.8)',
                    marginTop: '8px',
                    userSelect: 'text',
                    textAlign: 'left',
                  }}
                >
                  {loading && <p>Loading...</p>}
                  {error && <p style={{ color: 'red' }}>{error}</p>}

                  {!loading && !error && data && (
                    <>
                      <h2 style={{ marginBottom: '15px', color: '#ddd' }}>{data.title}</h2>

                      {data.image && (
                        <img
                          src={data.image}
                          alt={data.title}
                          style={{
                            width: '100%',
                            maxWidth: '600px',
                            height: 'auto',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                          }}
                        />
                      )}

                      {Array.isArray(data.content) ? (
                        data.content.map((section, idx) => (
                          <div key={idx} style={{ marginBottom: '15px' }}>
                            {section.heading && (
                              <h3 style={{ color: '#ddd', marginBottom: '6px' }}>{section.heading}</h3>
                            )}
                            {section.text && <p style={{ whiteSpace: 'pre-line' }}>{section.text}</p>}

                            {section.list && Array.isArray(section.list) && (
                              <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                                {section.list.map((item, i) => (
                                  <li key={i} style={{ marginBottom: '8px' }}>
                                    <strong>{item.name}:</strong> {item.description}
                                    {item.example && (
                                      <div>
                                        <em>Example:</em> {item.example}
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {section.image && (
                              <img
                                src={section.image}
                                alt={section.heading}
                                style={{
                                  width: '100%',
                                  maxWidth: '400px',
                                  borderRadius: '12px',
                                  marginTop: '15px',
                                  display: 'block',
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                }}
                              />
                            )}

                            {section.video && (
                              <video
                                src={section.video}
                                controls
                                style={{
                                  width: '100%',
                                  maxWidth: '600px',
                                  marginTop: '15px',
                                  display: 'block',
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                  borderRadius: '12px',
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                }}
                              />
                            )}

                            {!section.text &&
                              !section.list &&
                              !section.image &&
                              !section.video && (
                                <p style={{ color: '#888' }}>No content available for this section.</p>
                              )}
                          </div>
                        ))
                      ) : (
                        <p>No detailed content available.</p>
                      )}
                    </>
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

export default Propulsion;
