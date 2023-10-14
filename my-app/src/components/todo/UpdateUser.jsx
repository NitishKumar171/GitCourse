
import React, { useEffect, useState } from "react"
import { useAuth } from "./security/AuthContext"
import { retriveUserDetailsById,createUserDetails,updateUserDetails } from "./api/UserDetailsApi"
import { useParams } from "react-router-dom"
import { Formik,Form, Field } from "formik"
import { Validator } from "react"
export default function UpdateUser(){

    const authcontext= useAuth()
    const [username,setUsername] =useState(null)    
    const [date,setDate]=useState(null)
    const token= authcontext.token
    const [message,setmessage]= useState(null)
    const[imageUrl,setImageUrl]=useState(null)
    const [amount,setAmount] =useState(0)    

    const {id}=useParams()
    


    useEffect(
        ()=>retriveUserInformation(),[id]
    )
    
function retriveUserInformation(){
    console.log('Id='+id)
    retriveUserDetailsById(id,token)
    .then( (response)=>successfulApiResponse(response))
    .catch((error)=>console.log(error))
    .finally(()=>console.log('cleanup'))
}
function successfulApiResponse(response){

    console.log(response)
    setUsername(response.data.user_name)
    setDate(response.data.dateOfBirth)
    setImageUrl(response.data.imageUrl)
    setAmount(response.data.amount)
      }
      
   
    function onSubmit(values){
      console.log('on submit'+values)
      console.log('on submit'+values.username+ "dateOfBirth="+date)
      setUsername(values.username)
      setDate(values.date)
      setImageUrl(values.imageUrl)
      setAmount(values.amount)
      const user={
        id:id,
        dateOfBirth:date,
        user_name:username,
        imageUrl:imageUrl,
        amount:amount
      }
    updateUserDetails(id,user,token)
    .then((response)=>{console.log(response)
    setmessage(`the user ${response.data.user_name} id ${response.data.id}  successfully updated` )}
    )
    .catch((error)=>console.log(error))
    .finally(()=>console.log('cleanup'))



    }
    return(
       <div className="container">     
        {message && <div className="alert alert-warning">{message}</div>}
     
<Formik initialValues={{username, date}} enableReinitialize={true} onSubmit={onSubmit}  validateOnChange={false} validateOnBlur={false}>
  {

(props)=>(
<Form>
  <fieldset className="form-group">
        <section className="ftco-section" >
        <div className="login-wrap bg-light text-black">
        <div className="row justify-content-center"> 

      <div className="col-md-5 text-center mb-2 bg-white text-black">
        <p className="col-md-5 text-center mb-2 bg-white text-black">Update User Details</p> 
       <div>
            <Field type="text" className="form-control rounded-left" name="username"/>
     </div>
     <div>
            <Field type="text" className="form-control rounded-left" name="imageUrl"/>
     </div>
     <div>
            <Field type="number" className="form-control rounded-left" name="amount"/>
     </div>
     <div>
     <Field type="date" className="form-control rounded-left" name="date" InputLabelProps={{
        shrink: true,
      }} />
    </div>
            <div  className="form-group">
                <button type="submit" className="form-control round-left bg-success text-white" >Save</button>
            </div>
        </div>
        </div> 
        </div>
        </section>
        </fieldset>
        </Form>
        )
    }
        </Formik>  
        </div>
    )
    
}