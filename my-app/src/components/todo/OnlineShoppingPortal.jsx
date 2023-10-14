import React, { useEffect, useState } from "react"
import WelcomeComponent from "./WelcomeComponent"
import LoginComponent from "./LoginComponent";
import { useContext } from "react"
import { retriveAllProducts,deleteProductsById,retriveProductsDetailsById,addProductsToCart } from "./api/UserDetailsApi";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { useAuth } from "./security/AuthContext";
import { redirect, useNavigate } from "react-router-dom";

export default function OnlineShoppingPortal(){

    const authcontext= useAuth()
    const [cartName,setCartName]=useState(null)
    const[cartLists,setCartLists]=useState(null)
    const username=authcontext.username
    const password=authcontext.password
    const token=authcontext.token
   const navigate=useNavigate()
   const[productLists,setProductsLists]=useState([])
   const[message,setmessage]=useState(null)
   const[isAdded,setIsAdded]=useState(false)
   const[totalAmount,setTotalAmount]=useState(null)
   const[description,setDescription]=useState(null)

    useEffect(
     ()=>refreshProducts(),[]   
    )
  function refreshProducts(){
    console.log('inside refreshProducts')
    retriveAllProducts(token)
        .then( (response)=>successfullResponse(response))
        .catch((error)=>errorResponse(error))
        .finally(()=>console.log('cleanup'))
  }
  function updateProductsInfo(id){
    console.log('checked'+id)
     navigate(`/update/${id}`)
    
  
   }

   function addCartProducts(id){
    retriveProductsDetailsById(id,token)
    .then((response)=>{
      setIsAdded(true)
      console.log(response.data) 
      setDescription(response.data.description)
      setCartName(response.data.itemName)

      const carts={
        itemId:response.data.itemId,
        username:username,
        itemName:response.data.itemName,
        image:response.data.image,
        description:description,
        amount:response.data.amount
      } 
console.log(token)
      addProductsToCart(carts,token)
      .then((response)=>{
        setmessage(`the cart ${cartName} successfully added`)
        console.log(response)
        navigate(`/cart`)
      })
      .catch((error)=>errorResponse(error))
      .finally(()=>console.log('cleanup'))
      console.log(carts)
    })
    .catch((error)=>errorResponse(error))
    .finally(()=>console.log('cleanup'))
   }

 
  function deleteProducts(id){
    deleteProductsById(id,token)
         .then( ()=>{
            setmessage(`the delete of the id=${id} is successful`)
            refreshProducts()
         })
         .catch((error)=>errorResponse(error))
         .finally(()=>console.log('cleanup'))
   }
        function successfullResponse(response){
            console.log(response)
            setProductsLists(response.data) 
            console.log(productLists)
    
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
                   
                    <tbody>
                        {
                             productLists.map(
                                productList=>(<tr>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col col-1-6">
                                 <div className="header" >  
                                  <td className="text-left">Item: {productList.itemName}</td>                                 
                                 </div>
                                 <div className="header" >  
                                    <td className="text-center">Price: {productList.amount}</td>
                                    </div>
                                    <div className="header" >  
                                    <td className="text-center">Specification: {productList.description}</td>
                                    </div>
                                    </div>
                                    <div className="col col-7-12">  
                                    <td  className="text-center"><img className="overflow-auto" src={productList.image} alt={productList.itemName} width="305" height="132"  /></td>
                                   </div>
                                   <div className="col-sm"> 
                                    <td><div className="btn btn-warning" onClick={()=>deleteProducts(productList.itemId)}>Delete</div></td>
                                    <td><div className="btn btn-info" onClick={()=>addCartProducts(productList.itemId)}>Add Cart</div></td>
                                    </div>
                                    </div>
                                    </div>  
                                    
    
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