import React, { useState } from 'react';

const BrahmosDropdown = () => {
  const [activeTopic, setActiveTopic] = useState(null);
  const [topicContent, setTopicContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const topics = [
    { name: "History", topic: "history" },
    { name: "Specifications", topic: "specifications" },
    { name: "Features", topic: "brahmos-features-overview" },
    { name: "Future Implementations", topic: "future" }
  ];

  const fetchTopicContent = (topic) => {
    if (activeTopic === topic) {
      setActiveTopic(null);
      setTopicContent(null);
      return;
    }

    setLoading(true);
    setError(null);
    setActiveTopic(topic);
    fetch(`http://localhost:5000/api/topic/${topic}`)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        setTopicContent(data.content);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px', textAlign: 'center' }}>
      {/* YouTube Video Embed */}
      <div style={{ marginBottom: '30px', maxWidth: '800px', margin: 'auto' }}>
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/rtNbsA6_23I"
          title="BrahMos Missile Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: '10px' }}
        ></iframe>
      </div>

      <h1 style={{ color: 'red', marginBottom: '40px' }}>BrahMos Supersonic Cruise Missile</h1>
      <div>
        {topics.map(({ name, topic }) => (
          <div key={topic} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => fetchTopicContent(topic)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                borderRadius: '5px',
                width: '180px', // Keep all buttons the same width
              }}
            >
              {name}
            </button>
            {activeTopic === topic && (
              <div
                style={{
                  marginTop: '10px',
                  textAlign: 'left',
                  maxWidth: '600px',
                  margin: '10px auto',
                  color: 'white',           // All text white
                  border: '1px solid red',
                  borderRadius: '5px',
                  padding: '15px',
                  backgroundColor: '#000',  // Black background
                }}
              >
                {loading && <p style={{ color: 'white' }}>Loading...</p>}
                {error && <p style={{ color: 'orange' }}>Error: {error}</p>}
                {topicContent && topicContent.length > 0 ? (
                  topicContent.map(({ heading, text }, idx) => (
                    <div key={idx} style={{ marginBottom: '15px' }}>
                      <h3 style={{ color: 'white' }}>{heading}</h3>
                      <p style={{ whiteSpace: 'pre-wrap', color: 'white' }}>{text}</p>
                    </div>
                  ))
                ) : !loading && <p style={{ color: 'white' }}>No content available for this section.</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrahmosDropdown;
