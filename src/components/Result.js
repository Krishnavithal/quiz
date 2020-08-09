import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
const Result = () =>{
    const [message,setMessage] = useState("");
    const [scoreMessage,setScoreMessage] = useState(""); 
    const history = useHistory();
    useEffect(()=>{
        const user = localStorage.getItem("username");
        const score = localStorage.getItem("score");
        if(score==5){
            setMessage("Well Done!");
            setScoreMessage("Congragulations "+user+". You have scored perfect "+score+"/5");
        }
        else if(score==4){
            setMessage("Not bad. Only one wrong! Try again!");
            setScoreMessage("Congragulations "+user+". You have scored "+score+"/5.");
        }
        else{
            setMessage("You should probably try again");
            setScoreMessage("You have scored "+score+"/5. ");
        }
        localStorage.removeItem("score");
    },[])
    return (
        <>
            <div className="wrapper">
                <div className="quiz" style={{textAlign:"center",fontSize:"1.5rem"}}>
                    <div className="quiz_body" style={{height:"500px"}}>
                        <div className="content">
                            <h2>{scoreMessage}</h2>
                            <br></br>
                            <h4>{message}</h4>
                            <br></br>
                            <button className="btn-next" onClick={()=>history.push('/quiz')}>Play Again</button>
                            <button className="btn-next" onClick={()=>history.push('/')}>Start Over</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Result;