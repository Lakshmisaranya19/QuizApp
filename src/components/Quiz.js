// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Quiz.css';

const Quiz = ({ questions, setScore, setUserAnswers }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // ✅ Moved useEffect BEFORE any returns
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  // ✅ Ensure questions exist before rendering
  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          question: currentQuestion.description,
          userAnswer: selectedOption.description,
          correctAnswer: currentQuestion.options.find((option) => option.is_correct).description,
          isCorrect: selectedOption.is_correct,
        },
      ]);

      if (selectedOption.is_correct) {
        setScore((prevScore) => prevScore + 1);
      }
    }
    
    setSelectedOption(null);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setTimeLeft(30);
    } else {
      navigate('/result');
    }
  };

  return (
    <div className={`quiz-container ${theme}`}>
      <h2 className="quiz-question">{`${currentQuestionIndex + 1}. ${currentQuestion.description}`}</h2>
      <div className="timer">Time Left: {timeLeft}s</div>
      <ul className="quiz-options">
        {currentQuestion.options.map((option, index) => (
          <li
            key={option.id}
            className={`quiz-option btn btn-light ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {`${String.fromCharCode(65 + index)}. ${option.description}`}
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary next-button"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
      </button>
      <button className="btn btn-secondary theme-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default Quiz;
