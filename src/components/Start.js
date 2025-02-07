import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Start.css';

const Start = ({ setQuestions, setUserName }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const fetchQuestions = async () => {
    if (!name.trim()) {
      alert('Please enter your name!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('/api/Uw5CrX'); // Replace with real API
      setQuestions(response.data.questions);
      setUserName(name);
      navigate('/quiz');
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`start-container ${theme}`}>
      <h1 className="start-title">🎉 Welcome to the Quiz!</h1>
      <p className="quiz-description">Test your knowledge with fun questions!</p>

      <input
        type="text"
        className="form-control name-input"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn btn-primary start-button" onClick={fetchQuestions} disabled={loading}>
        {loading ? 'Loading...' : 'Start Quiz'}
      </button>

      <button className="btn btn-secondary theme-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default Start;
