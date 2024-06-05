import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";

const QuizPage = ({ subject, handleRestart }) => {
  
  const[data, setData] = useState([]);
//
  const[progress, setProgress] = useState(0);

  const[currenQuestion, setCurrentQuestion] = useState(0);
//
  const[score,setScore] = useState(0);

  const[answer, setAnswer] = useState('');

  const[error, setError] = useState(false);
  
  const[chosen, setChosen] = useState('');

  const[wrong, setWrong] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
			`https://my-json-server.typicode.com/RohanBhandari45/react_quiz/${subject}`
		);
      setData(response.data);
    };

    fetchData();
  }, []);

  if (!data.length){
    return <div className="loading-page">Loading ....</div>
  }
  


  const ChangeQuestion = () =>{

    if(!chosen){
      setError(true);
    }
    if(chosen){
      const ans = data[currenQuestion]?.correctOption;
      setAnswer(ans);
      if(chosen == ans){
        setScore(score+1);
        setWrong(null);
      }else{
        setWrong(chosen);
      }
        setChosen(null);
        setTimeout(() => {
          setCurrentQuestion((previous) => previous +1);
          setProgress((currenQuestion + 1)*10);
        },1000)
          setError(false);
    }
  }



  const handleClick = () => {
    handleRestart();
  }
  if(currenQuestion == 10) {
    return <div className="welcome-text-area score">
      <p>YOU SCORED : {score} OUT OF 10</p>
      <button className="restart" onClick={handleClick}>Play Again</button>
      </div>
  }

  const question = data?.at(currenQuestion);

  return (
    <>
      <div className="welcome-text-area">
        <h3 className="topic">Question {currenQuestion + 1} of 10</h3>
        <p className="text quest">{question.question ?? ""}</p>
        <div className='progress-bar-container'>
          <div className="progress-bar">
            <div className='progress' style={{width:`${progress}%`}}></div>
          </div>
       </div>
      </div>
      <div className="subject" >
        {question?.options?.map((option, index) => (
          <div 
            className={`each-Subject 
              ${chosen === option ? "option-chosen": ""} 
              ${answer === option ? "correct-option": ""} 
              ${wrong === option ? "wrong-option": ""}`
            }
             onClick={() => setChosen(option)}
             key={index} 
          >
            ({String.fromCharCode(65 + index)}) {option}
            </div>
            
        ))}
        <button className='each-subject button' onClick={ChangeQuestion}>Submit</button>
        {error && <div className="error">Please choose an option</div>}

      </div>
    </>
  );
};

export default QuizPage;
