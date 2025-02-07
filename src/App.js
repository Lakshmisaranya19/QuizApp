// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [userName, setUserName] = useState('');

  const resetQuiz = () => {
    setScore(0);
    setUserAnswers([]);
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Start setQuestions={setQuestions} setUserName={setUserName} />} />
          <Route
            path="/quiz"
            element={
              <Quiz
                questions={questions}
                setScore={setScore}
                setUserAnswers={setUserAnswers}
              />
            }
          />
          <Route
            path="/result"
            element={
              <Result
                questions={questions} // ✅ Pass questions
                score={score}
                userAnswers={userAnswers}
                resetQuiz={resetQuiz}
                totalQuestions={questions.length}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;




