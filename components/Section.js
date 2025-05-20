import React from 'react';
import '../css/Section.css';

function Section({ title }) {
  return (
    <div className="section px-4 py-3">
      <h3>{title}</h3>
      <div className="scroll-container">
        {[...Array(6)].map((_, idx) => (
          <div className="card-item" key={idx}>
            <div className="thumbnail bg-secondary text-center text-white">
              <p>Content {idx + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section;
