import React, { useState, useEffect } from 'react';
import questionsData from "./questions.json";
import './gamepage.css';
import Header from '../../../component/header';

export default function DrinkGame() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(30);
  const [helpUsed, setHelpUsed] = useState(false);
  const [answers, setAnswers] = useState([]);

  
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    
    const randomizedQuestions = shuffleArray([...questionsData]);
    setShuffledQuestions(randomizedQuestions);
  }, []);

  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      
      const shuffledAnswers = [...shuffledQuestions[currentQuestion].incorrect_answers, shuffledQuestions[currentQuestion].correct_answer]
        .sort(() => Math.random() - 0.5);
      setAnswers(shuffledAnswers);
    }
  }, [currentQuestion, shuffledQuestions]);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameOver(true);
    }
  }, [timer, gameOver]);

  const handleAnswer = (answer) => {
    if (answer === shuffledQuestions[currentQuestion].correct_answer) {
      setScore(score + 1);
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(30); 
      } else {
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const useHelp = () => {
    setHelpUsed(true);
    const correctAnswer = shuffledQuestions[currentQuestion].correct_answer;
    const remainingAnswers = [
      correctAnswer,
      ...answers.filter((answer) => answer !== correctAnswer).slice(0, 1),
    ];
    setAnswers(remainingAnswers.sort(() => Math.random() - 0.5));
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setTimer(30);
    setGameOver(false);
    setHelpUsed(false);

    
    const randomizedQuestions = shuffleArray([...questionsData]);
    setShuffledQuestions(randomizedQuestions);
  };

  if (shuffledQuestions.length === 0) {
    return <div style={{textAlign:'center'}}>Loading Question...</div>;
  }

  return (
    <div className="game-container">
      <Header />
      <h1 style={{marginTop: '80px'}}>من سيربح المشروب</h1>
      {gameOver ? (
        <div className="result">
          {score === shuffledQuestions.length ? (
            <h2>🎉 مبروك لقد ربحت المشروب</h2>
          ) : (
            <h2>😞 انتهت اللعبة</h2>
          )}
          <p>إجابات صحيحة: {score} من {shuffledQuestions.length}</p>
          <button className='btn' onClick={resetGame}>إعادة اللعب</button>
        </div>
      ) : (
        <div>
          <div className="question-section">
            <h2>{shuffledQuestions[currentQuestion].question}</h2>
            <div className="timer">الوقت المتبقي: {timer} ثانية</div>
          </div>
          <div className="answers-section">
            {answers.map((answer, index) => (
              <button style={{background: 'rgba( 255, 255, 255, 0.1)' }} key={index} onClick={() => handleAnswer(answer)} className="answer-button">
                {answer}
              </button>
            ))}
          </div>
          <br></br>
          {!helpUsed && (
            <button onClick={useHelp} className="btn"> 50:50</button>
          )}
        </div>
      )}
    </div>
  );
}
