// src/pages/LaunchModePage.js
import React, { useEffect, useState } from 'react';

const LaunchModePage = () => {
  const [mainData, setMainData] = useState(null);
  const [loadingMain, setLoadingMain] = useState(true);
  const [error, setError] = useState(null);
  const [expandedKey, setExpandedKey] = useState(null);
  const [subData, setSubData] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/topic/launchmode')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load main data');
        return res.json();
      })
      .then(data => {
        setMainData(data);
        setLoadingMain(false);
      })
      .catch(err => {
        setError(err.message);
        setLoadingMain(false);
      });
  }, []);

  const handleButtonClick = async (name) => {
    const key = name.toLowerCase().replace(/\s+/g, '');

    if (expandedKey === key) {
      setExpandedKey(null);
      return;
    }

    if (!subData[key]) {
      try {
        const res = await fetch(`http://localhost:5000/api/topic/${key}`);
        if (!res.ok) throw new Error('Failed to fetch detail');
        const data = await res.json();
        setSubData(prev => ({ ...prev, [key]: data.content || 'No content found' }));
      } catch (err) {
        setSubData(prev => ({ ...prev, [key]: `Error: ${err.message}` }));
      }
    }

    setExpandedKey(key);
  };

  if (loadingMain)
    return <p style={{ color: '#f61616', textAlign: 'center', padding: '30px' }}>Loading...</p>;
  if (error)
    return <p style={{ color: 'red', textAlign: 'center', padding: '30px' }}>Error: {error}</p>;

  return (
    <div
      style={{
        padding: '30px',
        textAlign: 'center',
        backgroundColor: '#000',
        minHeight: '100vh',
        color: '#eee',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: '15px', color: '#fff' }}>{mainData.title}</h1>
      <p
        style={{
          maxWidth: '800px',
          margin: '0 auto 30px',
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#ccc',
        }}
      >
        {mainData.description}
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        {mainData.buttons.map((btn, idx) => {
          const key = btn.name.toLowerCase().replace(/\s+/g, '');
          const content = subData[key];
          const isOpen = expandedKey === key;

          return (
            <div key={idx} style={{ width: '100%', maxWidth: '800px' }}>
              <button
                onClick={() => handleButtonClick(btn.name)}
                style={{
                  margin: '8px 0',
                  padding: '12px 20px',
                  width: '100%',
                  fontSize: '16px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#f61616', // stays red
                  color: '#fff',
                  textAlign: 'left',
                  boxShadow: '0 2px 5px rgba(229, 12, 19, 0.94)',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {btn.name}
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
                    textAlign: 'left',
                    userSelect: 'text',
                    marginTop: '10px',
                  }}
                >
                  {typeof content === 'string' ? (
                    <p>{content}</p>
                  ) : Array.isArray(content) ? (
                    content.map((section, i) => (
                      <div key={i} style={{ marginBottom: '15px' }}>
                        {section.heading && <h4 style={{ color: '#ddd' }}>{section.heading}</h4>}

                        {typeof section.text === 'string' && (
                          <p style={{ whiteSpace: 'pre-line' }}>{section.text}</p>
                        )}

                        {Array.isArray(section.text) && (
                          <ul style={{ paddingLeft: '20px' }}>
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
                            alt="Related visual"
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
                    <p>Loading content...</p>
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

export default LaunchModePage;
