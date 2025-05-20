// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Slideshow = () => {
  const slides = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      <img
        src={slides[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
        className="slideshow-image"
      />
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Basics of Missiles',
      description: 'Learn about cruise, ballistic, and tactical missiles.',
      image: '/images/image8.jpg',
      topic: 'basics'
    },
    {
      title: 'Types of Missiles',
      description: 'Explore classifications like cruise and ballistic missiles.',
      image: '/images/image5.jpg',
      topic: 'types'
    },
    {
      title: 'Subsystems of Missiles',
      description: 'Explore inertial, GPS, laser, and radar guidance.',
      image: '/images/image6.jpg',
      topic: 'subsystem'
    },
    {
      title: 'Brahmos',
      description: 'Understand propulsion, warheads, and launch mechanisms.',
      image: '/images/image7.jpg',
      topic: 'brahmos'
    }
  ];

  const handleCardClick = async (topic) => {
    console.log("Clicked:", topic); // debug

    if (topic === 'types') {
      navigate('/tom');
      return;
    }

    if (topic === 'brahmos') {
      navigate('/brahmos');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/topic/${topic}`);
      const data = await response.json();

      if (response.ok) {
        navigate(`/details/${topic}`, { state: { topicData: data } });
      } else {
        alert(`Error loading topic: ${data.error}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Network error while fetching topic');
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Missileverse</h1>
      <p className="home-description">
        Explore detailed insights into missile types, subsystems, and technologies.
      </p>

      <Slideshow />

      <h2 className="section-title">Explore Topics</h2>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            className="info-card"
            key={index}
            onClick={() => handleCardClick(card.topic)}
            style={{ cursor: 'pointer' }}
          >
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
