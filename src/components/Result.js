// src/components/Result.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Result.css';

const Result = ({ questions, userAnswers, score, totalQuestions, resetQuiz }) => {
  const navigate = useNavigate();

  if (!questions || questions.length === 0) {
    return <div>Loading results...</div>;
  }

  // Count correct, incorrect, and not attempted
  const correctCount = userAnswers.filter(ans => ans.isCorrect).length;
  const incorrectCount = userAnswers.filter(ans => !ans.isCorrect).length;
  const notAttemptedCount = totalQuestions - userAnswers.length;

  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      <div className="summary">
        <h3>Summary</h3>
        <p>✅ Correct: {correctCount}</p>
        <p>❌ Incorrect: {incorrectCount}</p>
        <p>⚠️ Not Attempted: {notAttemptedCount}</p>
        <h4>Total Score: {score} / {totalQuestions}</h4>
      </div>

      <h3>Review Answers</h3>
      <ul className="review-list">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index] || {}; // Handle unanswered questions
          const correctAnswer = question.options.find(opt => opt.is_correct).description;
          
          return (
            <li key={index} className="review-item">
              <h4>{index + 1}. {question.description}</h4>
              <p>Your Answer: {userAnswer.userAnswer || "❌ Not Attempted"}</p>
              <p>✅ Correct Answer: {correctAnswer}</p>
              <p className={userAnswer.isCorrect ? "correct" : "incorrect"}>
                {userAnswer.isCorrect ? "✔️ Correct" : "❌ Incorrect"}
              </p>
            </li>
          );
        })}
      </ul>

      <button className="btn btn-primary" onClick={() => { resetQuiz(); navigate('/'); }}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;
