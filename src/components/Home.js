import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
const Home = () => {
    const history= useHistory();
    const [name,setName] = useState("");
    const start = () =>{
        if(name!=""){
            localStorage.setItem("username",name);
            history.push('/quiz');
        }
    }
    return (
        <>
            <div className="wrapper">
                <div className="quiz" style={{textAlign:"center",fontSize:"1.5rem"}}>
                    <div className="quiz_body" style={{height:"500px",marginTop:"0px"}}>
                        <div className="content">
                            <h1 className="ready">Ready to play Quiz?</h1>
                            <input type="text" name="name" placeholder="Enter your Name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                            <button className="btn-next" onClick={()=>start()}>Start Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;