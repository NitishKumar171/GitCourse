
import { useState } from 'react'
import { useParams,Link} from 'react-router-dom'
import axios from 'axios'
import Output from './Output'
import { retriveUserDetailsBeans,retrivUsersByUserName,retriveAllUsers, deleteUserById } from './api/UserDetailsApi'
import UserListView from './UserListView'
import { useAuth } from './security/AuthContext'

export default function WelcomeComponent(){
    const params=useParams()
    console.log(params.username)
    const authContext=  useAuth()
    const token= authContext.token

   const [messages,setMessages]= useState(null)
   const [userLists,setUserList]=useState([])

    return(
        <div>
<div className="WelcomeComponent">Welcome {params.username}
{messages && <div className="alert alert-warning">{messages}</div>}
<div className="btn btn-success m-5" onClick={CallHelloWorldApi}>Display User List</div>
<div>
<table className='table'>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>UserName</td>
                            <td>Date of Birth</td>
                            <td>Action</td>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                             userLists.map(
                                userList=>(<tr>
                                    <td>{userList.id}</td>
                                    <td>{userList.user_name}</td>
                                    <td>{userList.dateOfBirth.toString()}</td>
                                    <td><div  className="btn btn-warning m-5" onClick={()=>deleteUserApi(userList.id)}>DeleteUser</div></td>
    
                                </tr>
                                    
                            )
                             )
                        }
                       

                    </tbody>

                </table>
</div>
</div>
</div>
    )

    function deleteUserApi(id){
        console.log("Rest Api called")
        deleteUserById(id,token).then(
            ()=>{
                setMessages(`Delete of id= ${id} is successfull`)
                CallHelloWorldApi()
            }
        ).catch((error)=>errorResponse(error))
        .finally(()=>console.log('cleanup'))
        
    }

   

    function CallHelloWorldApi(){
        console.log("Rest Api called")
        retriveAllUsers(token)
        .then( (response)=>successfullResponse(response))
        .catch((error)=>errorResponse(error))
        .finally(()=>console.log('cleanup'))
    }
    

    function successfullResponse(response){
        console.log(response)
        setUserList(response.data) 
        console.log(userLists)

    }
    function errorResponse(error){
        console.log(error)
    }
}