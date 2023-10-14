import React, { useEffect, useState } from "react";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
import { findProductsAddedToCart ,deleteCartById} from "./api/UserDetailsApi";
import { cleanup } from "@testing-library/react";


export default function ViewUserCart(){

    const authcontext=useAuth()
    const username=authcontext.username
    const password=authcontext.password
    const token=authcontext.token
    const [cartLists,setCartLists]=useState([])
    const[cartMessage,setCartMessage]=useState(null)

    const [message,setMessage]=useState(null)
    const [com,setCom]=useState(null)
    const[sum,setSum]=useState(0)

   const navigate=useNavigate()
  
   useEffect(
    ()=>refreshCart(),[]   
   )
  function refreshCart(){
    console.log('inside refreshCart')
    console.log(username)
    findProductsAddedToCart(token,username)
    .then((response)=>successfulResponse(response))
    .catch((error)=>failureResponse(error))
    .finally(()=>console.log(cleanup))
   }

   function successfulResponse(response){
    console.log(response.data)    
    setCartLists(response.data)
     calculateTotalSum(cartLists)
    setMessage(`order placed for ${username}successfully`)

   }

   function failureResponse(error){
    console.log(error)
   }

   function deleteCart(id){

    deleteCartById(id,token)
    .then((response)=>{
      setCom(`Delete cart ${id} successfully done`)
      refreshCart()
    })
    .catch((error)=>console.log(error))
    .finally(()=>console.log(cleanup))


   }

    function  calculateTotalSum(cartLists){
  let total=cartLists.reduce((total,value)=>total+=value.amount,0)
  console.log('total:',total)
  setSum(total)
  setCartMessage(`The Cart is added with Total amount: ${total}`)

   }
   return(
    <div>
    {com && <div className="alert alert-success">{com}</div>}    
<div>
<table className='table table'>
<tbody>
                        {
                             cartLists.map(
                                cartList=>(<tr>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col col-1-6">
                                 <div className="header" >  
                                  <td className="text-left">Item: {cartList.itemName}</td>                                 
                                 </div>
                                 
                                    <div className="header" >  
                                    <td className="text-center">Specification: {cartList.description}</td>
                                    </div>
                                    <div className="header" >  
                                    <td className="text-center">Price: {cartList.amount}</td>
                                    </div>
                                    </div>
                                    <div className="col col-7-12">  
                                    <td  className="text-center"><img className="overflow-auto" src={cartList.image} alt={cartList.itemName} width="305" height="132"  /></td>
                                   </div>
                                   <div className="col-sm"> 
                                    <td><div className="btn btn-warning" onClick={()=>deleteCart(cartList.cartid)}>Delete</div></td>
                                    </div>
                                    </div>
                                    </div>  
                                    
    
                                </tr>
                                    
                            )
                             )
                        }

                    </tbody>

        </table>
        <div className="text-center">{cartMessage}</div>

</div>
</div>

)
   
}