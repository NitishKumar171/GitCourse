
import React, { useEffect, useState } from "react"
import { useAuth } from "./security/AuthContext"
import { retriveProductsDetailsById,createProductsDetails } from "./api/UserDetailsApi"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Formik,Form, Field, ErrorMessage } from "formik"

export default function CreateNewProducts(){

    const authcontext= useAuth()
    const [username,setUsername] =useState(null)
    const [image,setImage] =useState(null)
    const [amount,setAmount] =useState(0)
    const[description,setDescription]=useState(null)
    const[itemId,setItemId]=useState(1)

    const[itemName,setItemName]=useState('')
    const [dateOfBirth,setDateOfBirth]=useState(null)
    const [message,setMessage]= useState(null)
    const navigate= useNavigate()
    const token =authcontext.token
    let order=false;



   
 
    console.log('inside create new ')

   
    function onSubmit(values){
      
      setAmount(values.amount)
      setItemName(values.itemName)
      setDescription(values.description)
      setImage(values.image)
      console.log('name='+itemName+' amount='+amount)
      const products={
        itemName:itemName,
        description:description,
        amount:amount,
        image:image
      }
      console.log('itemName: '+products.itemName+' image = '+products.image)
    
      createProductsDetails(products,token)
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

      if(values.itemName.length<5){
        errors.itemName="Enter the Valid username"
      }
      if(values.image.length<5){
        errors.image="Enter the Valid imageUrl"
      }
      if(values.description.length<=5){
        errors.description="Enter the description with some more characters"
      }
      if(values.amount<=1){
        errors.username="select the correct Amount"
      }
      return errors;
    }
    return(
      
       <div className="container">    
                   {message && <div className="alert alert-warning">{message}</div>}
      
<Formik initialValues={{itemName,description,image,amount}} enableReinitialize={true} onSubmit={onSubmit} validate={validate} validateOnChange={false} validateOnBlur={false}>
  {

(props)=>(
<Form>
  <ErrorMessage
  name="itemName"
  component="div"
  className="alert alert-warning"  
  />
  <fieldset className="form-group">
        <section className="ftco-section" >
        <div className="login-wrap bg-light text-black">
        <div className="row justify-content-center"> 

      <div className="col-md-5 text-center mb-2 bg-white text-black">
        <p className="col-md-5 text-center mb-2 bg-white text-black">Create New Product Details</p> 
       <div>
        <label>Item Name</label> 
            <Field type="text" className="form-control rounded-left" name="itemName"/>
     </div>
     <div>
        <label>Item Description</label> 
            <Field type="text" className="form-control rounded-left" name="description"/>
     </div>
     <div>
        <label>Image Url</label> 
            <Field type="text" className="form-control rounded-left" name="image"/>
     </div>
     <div>
        <label>Amount</label> 
            <Field type="number" className="form-control rounded-left" name="amount"/>
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