import { useContext } from "react"
import {AuthContext} from "./security/AuthContext"
import { Link } from "react-router-dom"
import { useState } from "react"



export default function HeaderComponent(){
    const authContext=useContext(AuthContext)
    
    const username=authContext.username
    let profilePic="/"+username+".JPEG"
    console.log(profilePic)
    const isAuthenticated= authContext.isAuthenticated
    console.log(authContext.number)
    function logout(){
        authContext.logout()
    }


    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                              

            <nav className="navbar navbar-expand-lg">
            {isAuthenticated && <div className="card img-fluid" style={{height:"120px", width:"105px",color:"white",background:"silver"}}>

                <img src={profilePic} alt={username}  />
                </div>}   
                      <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {isAuthenticated && <Link className="nav-link" to="/welcome/AnkitaSen">Home</Link>}</li>
                            <li className="nav-item">
                            {isAuthenticated &&  <Link className="nav-link" to="/todos">Todo</Link>}</li>
                            <li className="nav-item">
                            {isAuthenticated &&  <Link className="nav-link" to="/user">UserList</Link>}</li>
                            <li className="nav-item">
                            {isAuthenticated &&  <Link className="nav-link" to="/create">Create New User</Link>}</li>
                            <li className="nav-item">
                            {isAuthenticated &&  <Link className="nav-link" to="/createP">Create New Products</Link>}</li>
                            <li className="nav-item">
                            {isAuthenticated &&  <Link className="nav-link" to="/shopping">Online Groceries Shopping</Link>}</li>
                            <li className="nav-item">
                            {isAuthenticated &&  <Link className="nav-link" to="/cart">Orders</Link>}</li>
                            
                        </ul>
                        
                        <div className="row">
                <img className="col-md-3 text-center mb-3 " src={'/imageIcon.jpg'} alt="anku-foodie"/>
            </div>
                    </div>
                    <ul className="navbar-nav">
                            <li className="nav-item fs-5"><a className="nav-link" href="/login">Login</a></li>
                            <li className="nav-item fs-5">
                            {isAuthenticated &&  <a  className="nav-link" href="/logout">Logout</a>}</li>
                        </ul>
                      
                </nav>
                
            </div>
        </div>
    </header>
  
        
    )
}