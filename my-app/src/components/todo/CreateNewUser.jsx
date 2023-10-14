
import React, { useEffect, useState } from "react"
import { useAuth } from "./security/AuthContext"
import { retriveUserDetailsById,createUserDetails } from "./api/UserDetailsApi"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Formik,Form, Field, ErrorMessage } from "formik"

export default function CreateNewUser(){

    const authcontext= useAuth()
    const [username,setUsername] =useState('')
    const [imageUrl,setImageUrl] =useState('')
    const [dateOfBirth,setDateOfBirth]=useState(null)
    const [message,setMessage]= useState(null)
    const navigate= useNavigate()
    const token =authcontext.token



   
 
    console.log('inside create new ')

   
    function onSubmit(values){
      
      setDateOfBirth(values.dateOfBirth)
      setUsername(values.username)
      setImageUrl(values.imageUrl)
      console.log('name='+username+' dateOfBirth='+dateOfBirth)
      const user={
        dateOfBirth:dateOfBirth,
        user_name:username,
        imageUrl:imageUrl
      }
      console.log('DOB: '+user.dateOfBirth+' username = '+user.username)
    
      createUserDetails(user,token)
      .then((response)=>{
        setMessage(`The request submitted successfully check ${response.config.baseURL+response.config.url}`)
        //navigate(`/user`)
      })
      .catch((error)=>console.log(error))
      .finally(()=>console.log('cleanup'))
  

    }

    function validate(values){
      let errors={

      }

      if(values.username.length<5){
        errors.username="Enter the Valid username"
      }
      if(values.imageUrl.length<5){
        errors.username="Enter the Valid imageUrl"
      }
      if(values.dateOfBirth.length<5){
        errors.username="select the correct Date of birth"
      }
      return errors;
    }
    return(
      
       <div className="container">    
                   {message && <div className="alert alert-warning">{message}</div>}
      
<Formik initialValues={{username, dateOfBirth}} enableReinitialize={true} onSubmit={onSubmit} validate={validate} validateOnChange={false} validateOnBlur={false}>
  {

(props)=>(
<Form>
  <ErrorMessage
  name="username"
  component="div"
  className="alert alert-warning"  
  />
  <fieldset className="form-group">
        <section className="ftco-section" >
        <div className="login-wrap bg-light text-black">
        <div className="row justify-content-center"> 

      <div className="col-md-5 text-center mb-2 bg-white text-black">
        <p className="col-md-5 text-center mb-2 bg-white text-black">Create New User Details</p> 
       <div>
        <label>User Name</label> 
            <Field type="text" className="form-control rounded-left" name="username"/>
     </div>
     <div>
        <label>Image Url</label> 
            <Field type="text" className="form-control rounded-left" name="imageUrl"/>
     </div>
     <div>
     <label>Date of Birth</label> 
     <Field type="date" className="form-control rounded-left" name="dateOfBirth" InputLabelProps={{
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