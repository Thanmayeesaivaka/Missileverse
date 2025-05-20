import React, { useState } from 'react';

const Warhead = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [topicsData, setTopicsData] = useState({});
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [errorIndex, setErrorIndex] = useState(null);

  const warheadTopics = [
    { label: 'Conventional Warhead', topic: 'conventional-warhead' },
    { label: 'Strategic Warhead', topic: 'strategic-warhead' },
    { label: 'Warhead Components', topic: 'warhead-components' },
    { label: 'Warhead Types', topic: 'warhead-types' }
  ];

  const fetchTopicData = async (topic, index) => {
    setLoadingIndex(index);
    setErrorIndex(null);

    try {
      const res = await fetch(`http://localhost:5000/api/topic/${topic}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();

      setTopicsData(prev => ({ ...prev, [topic]: data }));
      setOpenIndex(openIndex === index ? null : index);
    } catch (err) {
      setErrorIndex(index);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 800,
        margin: 'auto',
        backgroundColor: '#000',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: 20, color: 'white' }}>
        According to Warhead
      </h1>

      {warheadTopics.map(({ label, topic }, index) => (
        <div key={topic} style={{ marginBottom: 15 }}>
          <button
            onClick={() => {
              if (openIndex === index) {
                setOpenIndex(null);
              } else if (topicsData[topic]) {
                setOpenIndex(index);
                setErrorIndex(null);
              } else {
                fetchTopicData(topic, index);
              }
            }}
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: 16,
              textAlign: 'left',
              backgroundColor: '#f61616', // fixed red color
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

          {openIndex === index && topicsData[topic] && (
            <div
              style={{
                marginTop: 10,
                backgroundColor: '#111',
                color: '#fff',
                padding: 15,
                borderRadius: 6,
                whiteSpace: 'pre-line',
              }}
            >
              <h2>{topicsData[topic].title}</h2>
              {topicsData[topic].image && (
                <img
                  src={topicsData[topic].image}
                  alt={topicsData[topic].title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    borderRadius: 8,
                    marginBottom: 15,
                  }}
                />
              )}

              {Array.isArray(topicsData[topic].content) ? (
                topicsData[topic].content.map((section, idx) => (
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

export default Warhead;
