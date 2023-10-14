import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './security/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginComponent(){
    const [username,setUsername] =useState('Type username')
    const [password,setPassword]=useState('')
    const [showSuccessMessage,setShowSuccessMessage]=useState(false)
    const [showFailureMessage,setShowFailureMessage]=useState(false)
    const navigate=useNavigate() 
    const authContext= useAuth()
    const imgUrl="https://leandrolimited.com/on/demandware.static/Sites-us-leandrolimited-Site/-/default/dw15ae61ee/images/sign_in_icon.png"


function handleUsernameChange(event){
 console.log(event.target.value);
 setUsername(event.target.value)

}

function handlePasswordChange(event){
    setPassword(event.target.value)
}

async function handleSubmit(){
if(await authContext.login(username,password)){
    navigate(`/welcome/${username}`)
}else{
    setShowFailureMessage(true)
}
}



    return(
       
        <div className="container">          
<div>{showFailureMessage && <div className="alert alert-warning">Enter Valid User Id or Password</div>} </div>
            <section className="ftco-section" >
            <div className="login-wrap bg-light text-black">
            <div className="row justify-content-center"> 
 
          <div className="col-md-3 text-center mb-2 bg-white text-black">
            <p className="col-md-3 text-center mb-2 bg-white text-black">Sign In</p> 
            <img className="col-md-2 text-center mb-2 bg-info" src={imgUrl} />            
           <div className="form-group">
                <input type="text" className="form-control rounded-left" name="username" value={username} onChange={handleUsernameChange}/>
         </div>
                <div  className="form-group">
                    <input type="password"  className="form-control d-flex" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div  className="form-group">
                    <button type="button" className="form-control round-left bg-success text-white"  name="login" onClick={handleSubmit}>Sign In</button>
                </div>
            </div>
            </div> 
            </div>
            </section>
            </div>
    )

}