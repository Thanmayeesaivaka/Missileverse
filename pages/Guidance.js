import React, { useState } from 'react';

const Guidance = () => {
  const [topicDataMap, setTopicDataMap] = useState({});
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [errorIndex, setErrorIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const launchModes = [
    { label: 'Wire Guidance System', topic: 'wire-guidance' },
    { label: 'Command Guidance System', topic: 'command-guidance' },
    { label: 'Terrain Guidance System', topic: 'terrain-comparison-guidance' },
    { label: 'Inertial Guidance System', topic: 'inertial-guidance' },
    { label: 'Beam Rider Guidance System', topic: 'beam-rider-guidance' },
    { label: 'Laser Guidance System', topic: 'laser-guidance' },
    { label: 'RF and GPS Guidance System', topic: 'RF-GPS' },
    { label: 'Terrestrial Guidance System', topic: 'terrestrial-guidance' }
  ];

  const fetchTopicData = async (topic, index) => {
    if (topicDataMap[topic]) {
      setOpenIndex(openIndex === index ? null : index);
      setErrorIndex(null);
      return;
    }

    setLoadingIndex(index);
    setErrorIndex(null);

    try {
      const res = await fetch(`http://localhost:5000/api/topic/${topic}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();

      setTopicDataMap(prev => ({ ...prev, [topic]: data }));
      setOpenIndex(openIndex === index ? null : index);
    } catch (err) {
      setErrorIndex(index);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div style={{
      padding: 20,
      maxWidth: 800,
      margin: 'auto',
      backgroundColor: '#000',
      color: 'white',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20, color: 'white' }}>
        According to Guidance System
      </h1>

      {launchModes.map(({ label, topic }, index) => (
        <div key={topic} style={{ marginBottom: 15 }}>
          <button
            onClick={() => fetchTopicData(topic, index)}
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: 16,
              textAlign: 'left',
              backgroundColor: '#f61616',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>

          {loadingIndex === index && (
            <p style={{ color: '#aaa', marginTop: 8 }}>Loading...</p>
          )}

          {errorIndex === index && (
            <p style={{ color: 'red', marginTop: 8 }}>
              Failed to load data for {label}
            </p>
          )}

          {openIndex === index && topicDataMap[topic] && (
            <div style={{
              marginTop: 10,
              backgroundColor: '#000',
              color: 'white',
              padding: 15,
              borderRadius: 6,
              whiteSpace: 'pre-line'
            }}>
              <h2>{topicDataMap[topic].title}</h2>

              {topicDataMap[topic].image && (
                <img
                  src={topicDataMap[topic].image}
                  alt={topicDataMap[topic].title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    borderRadius: 8,
                    marginBottom: 15,
                  }}
                />
              )}

              {Array.isArray(topicDataMap[topic].content) ? (
                topicDataMap[topic].content.map((section, idx) => (
                  <div key={idx} style={{ marginBottom: 12 }}>
                    <h3 style={{ marginBottom: 6 }}>{section.heading}</h3>
                    <p>{section.text}</p>
                  </div>
                ))
              ) : (
                <p>No detailed content available.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Guidance;
