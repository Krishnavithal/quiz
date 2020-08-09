import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
const Quiz = () => {
    const [questionNo,setQuestionNo] = useState(0);
    const [questions,setQuestions] = useState(null);
    const [score,setScore] = useState(0);
    const history = useHistory();
    const [spinner,setSpinner] = useState(false);
    useEffect(()=>{
        setSpinner(true);
        fetch('https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple',{
            method:"get"
        })
        .then(res=>res.json())
        .then(result=>{
            result = result.results;
            result.map(resultSingle=>{
                resultSingle.question = decodeEntities(resultSingle.question)
                resultSingle.options = [];
                resultSingle.correct_answer = decodeEntities(resultSingle.correct_answer);
                resultSingle.options.push(resultSingle.correct_answer);
                resultSingle.incorrect_answers.map(options=>{options=decodeEntities(options);resultSingle.options.push(options)});
                shuffle(resultSingle.options);
            })
            setQuestions(result);
            setSpinner(false);
        })
        .catch(err=>console.log(err));
    },[])

    const decodeEntities = (inputString) =>{
        let result = inputString;
        result = result.replace(/&quot;/g,"\"")
        result = result.replace(/&#039;/g,'\'')
        result = result.replace(/&rsquo;/g,'\’')
        result = result.replace(/&lsquo;/g,'\‘')
        result = result.replace(/&amp;/g,'\&')
        return result
    }

    const removeAllActive = () =>{        
        const options = [...document.getElementsByClassName('option')];
        options.map(option=>option.classList.remove('active'));
    }

    const makeActive = (e) =>{
        removeAllActive();
        e.target.classList.add('active');
    }

    const next = (skip) =>{
        if(skip){
            removeAllActive();
            setQuestionNo(questionNo+1);            
        }
        else{
            const chosenAnswerElement = document.getElementsByClassName('active')[0];
            if(chosenAnswerElement){
                const chosenAnswer = chosenAnswerElement.innerHTML;
                if(chosenAnswer === questions[questionNo].correct_answer){
                    setScore(score+1);
                }
                removeAllActive();
                setQuestionNo(questionNo+1);
            }
        }
    }

    const shuffle = (array) =>{
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
    }
    return (
        <div className="wrapper">
            <div className="quiz">
                <div className="quiz_header">
                    <div className="quiz_user">
                        <h4>Welcome {localStorage.getItem("username")}! <span className="name"></span></h4>
                    </div>
                    <div className="score">
                        <span>Score : {score} /5</span>
                    </div>
                </div>
                <div className="quiz_body">
                    {spinner?<div className="loader"></div>:null}
                    {questions?
                        <>
                            <div id="questions">
                                <h2>Q{questionNo+1}. {questions[questionNo].question}</h2>
                                <ul className="option_group">
                                    {
                                        questions[questionNo].options.map((option,index)=>{
                                            return (<li className="option" onClick={(e)=>makeActive(e)} key={index}>{option}</li>)
                                        })
                                    }
                                </ul>
                            </div>
                            {
                                questionNo==4? 
                                <button className="btn-next" onClick={()=>{localStorage.setItem("score",score);history.push('/result')}}>Submit</button>
                                :
                                <>
                                    <button className="btn-next" onClick={()=>next()}>Next Question</button>
                                    <button className="btn-next" onClick={()=>next(true)}>Skip Question</button>
                                </>
                            }
                        </>
                    :null}
                </div>
            </div>
        </div>
    )
}
export default Quiz;