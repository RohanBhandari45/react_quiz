import React from 'react';
import { useState } from 'react';
import HomePage from './HomePage';
import QuizPage from './QuizPage';


const Quiz = () => {
  const [subject, setSubject] = useState('');
  
  const handleClick = (subject) => {
    setSubject(subject);
  }

  const handleRestart = () => {
    setSubject('');
  }
  
  if (subject!='')  return <QuizPage subject={subject} handleRestart={handleRestart}/>
    
  return (
    <>
      <HomePage onClick={handleClick}/>
      
    </>
  )
  
}

export default Quiz;