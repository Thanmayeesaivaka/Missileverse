// src/pages/DetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { topic } = useParams();
  const [mainData, setMainData] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [subData, setSubData] = useState({});

  // Helper function to safely render string or object text
  const renderText = (text) => {
    if (!text) return null;
    if (typeof text === 'string') return text;
    if (typeof text === 'object') {
      if (text.description) return renderText(text.description);
      return JSON.stringify(text, null, 2);
    }
    return String(text);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/topic/${topic}`)
      .then((res) => res.json())
      .then((result) => setMainData(result))
      .catch((err) => console.error('Main data fetch failed:', err));
  }, [topic]);

  const handleButtonClick = async (buttonName) => {
    const key = buttonName.toLowerCase().replace(/\s+/g, '');

    if (expanded === key) {
      setExpanded(null);
      return;
    }

    if (!subData[key]) {
      try {
        const response = await fetch(`http://localhost:5000/api/topic/${key}`);
        const result = await response.json();
        setSubData((prev) => ({ ...prev, [key]: result }));
      } catch (error) {
        console.error('Subtopic fetch failed:', error);
      }
    }

    setExpanded(key);
  };

  if (!mainData)
    return (
      <div
        style={{
          color: '#ffffff',
          textAlign: 'center',
          padding: '30px',
          backgroundColor: '#000',
          minHeight: '100vh',
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{
        padding: '30px',
        textAlign: 'center',
        backgroundColor: '#000',
        minHeight: '100vh',
        color: '#ffffff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: '15px', color: '#ffffff' }}>{mainData.title}</h1>

      {/* Image */}
      {mainData.image && (
        <img
          src={mainData.image}
          alt={mainData.title}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '30px',
            boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
          }}
        />
      )}

      {/* Render content array as paragraphs */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto 30px',
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#ffffff',
          whiteSpace: 'pre-line',
          textAlign: 'left',
        }}
      >
        {mainData.content?.map((section, idx) => (
          <p key={idx} style={{ color: '#ffffff' }}>{renderText(section.text)}</p>
        ))}
      </div>

      {/* Buttons section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        {mainData.buttons?.map((btn, idx) => {
          const key = btn.name.toLowerCase().replace(/\s+/g, '');
          const content = subData[key];
          const isOpen = expanded === key;

          return (
            <div key={idx} style={{ width: '100%', maxWidth: '800px' }}>
              <button
                onClick={() => handleButtonClick(btn.name)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  backgroundColor: '#f61616',
                  color: '#ffffff',
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 2px 5px rgba(255, 30, 38, 0.94)',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#f61616')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#f61616')}
              >
                {btn.name}
              </button>

              {isOpen && (
                <div
                  style={{
                    backgroundColor: '#111',
                    padding: '15px 20px',
                    textAlign: 'left',
                    borderRadius: '6px',
                    marginTop: '6px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8)',
                    color: '#ffffff',
                    lineHeight: '1.5',
                    userSelect: 'text',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {content ? (
                    <>
                      {content.title && <h3 style={{ marginTop: 0, color: '#ffffff' }}>{content.title}</h3>}
                      {content.description && <p style={{ color: '#ffffff' }}>{renderText(content.description)}</p>}
                      {content.content?.map((section, i) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                          {section.heading && <h4 style={{ color: '#ffffff' }}>{section.heading}</h4>}
                          {section.text && <p style={{ color: '#ffffff' }}>{renderText(section.text)}</p>}
                        </div>
                      ))}
                    </>
                  ) : (
                    <p style={{ color: '#ffffff' }}>Loading content...</p>
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

export default DetailPage;
