import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [data, setData] = useState(null);
  const topicName = 'brahmos-history';  // Your topic identifier

  useEffect(() => {
    axios.get(`http://localhost:5000/api/topic/${topicName}`)
      .then(response => setData(response.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{data.title}</h1>
      {data.content && data.content.length > 0 ? (
        data.content.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '20px' }}>
            <h2>{section.heading}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{section.text}</p>
          </div>
        ))
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};

export default History;
