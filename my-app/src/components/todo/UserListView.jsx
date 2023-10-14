import React, { useEffect, useState } from "react"
import WelcomeComponent from "./WelcomeComponent"
import LoginComponent from "./LoginComponent";
import { useContext } from "react"
import { retriveAllUsers,deleteUserById } from "./api/UserDetailsApi";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserListView(){

    const authcontext= useAuth()
    const username=authcontext.username
    const password=authcontext.password
    const token=authcontext.token
   const navigate=useNavigate()
   const[userLists,setUserLists]=useState([])
   const[message,setmessage]=useState(null)

    useEffect(
     ()=>refreshUser(),[]   
    )
  function refreshUser(){
    console.log('inside refreshUser')
    retriveAllUsers(token)
        .then( (response)=>successfullResponse(response))
        .catch((error)=>errorResponse(error))
        .finally(()=>console.log('cleanup'))
  }
  function updateUserInfo(id){
    console.log('checked'+id)
     navigate(`/update/${id}`)
    
  
   }


   
  function deleteUser(id){
    deleteUserById(id,token)
         .then( ()=>{
            setmessage(`the delete of the id=${id} is successful`)
            refreshUser()
         })
         .catch((error)=>errorResponse(error))
         .finally(()=>console.log('cleanup'))
   }
        function successfullResponse(response){
            console.log(response)
            setUserLists(response.data) 
            console.log(userLists)
    
        }
        function errorResponse(error){
            console.log(error)
        }
   console.log("inside userListView")
    return(
        <div>
            {message && <div className="alert alert-success">{message}</div>}
  <div>
<table className='table'>
                    <thead>
                        <tr>
                            <td className="text-center">Id</td>
                            <td className="text-center">UserName</td>
                            <td className="text-center">Date of Birth</td>
                            <td className="text-center">Items</td>
                            <td className="text-center">Amount</td>
                            <td>Delete</td>
                            <td>Update</td>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                             userLists.map(
                                userList=>(<tr>
                                    <td className="text-center">{userList.id}</td>
                                    <td className="text-left">{userList.user_name}</td>
                                    <td className="text-center">{userList.dateOfBirth}</td>
                                    <td  className="text-center"><img className="col-md-1 text-right mb-5" src={userList.imageUrl} alt={userList.user_name}/></td>
                                    <td className="text-center">{userList.amount}</td>
                                    <td><div className="btn btn-warning" onClick={()=>deleteUser(userList.id)}>Delete</div></td>
                                    <td><div className="btn btn-info" onClick={()=>updateUserInfo(userList.id)}>Update</div></td>

    
                                </tr>
                                    
                            )
                             )
                        }
                       

                    </tbody>

                </table>
</div>
</div>
    )
}