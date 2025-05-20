// src/pages/Details.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import '../css/Details.css'; // Optional: for styling if you want

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the passed topicData from navigation state
  const topicData = location.state?.topicData;

  // If no data, show a message and a back button
  if (!topicData) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>No topic data found.</h2>
        <button onClick={() => navigate('/')}>Go back to Home</button>
      </div>
    );
  }

  return (
    <div className="details-container" style={{ padding: '20px' }}>
      <h1>{topicData.title}</h1>

      {topicData.buttons && topicData.buttons.length > 0 && (
        <>
          <h2>Buttons</h2>
          <ul>
            {topicData.buttons.map((btn, idx) => (
              <li key={idx}>{btn}</li>
            ))}
          </ul>
        </>
      )}

      {topicData.content && topicData.content.length > 0 && (
        <>
          <h2>Content</h2>
          {topicData.content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </>
      )}
    </div>
  );
};

export default Details;
