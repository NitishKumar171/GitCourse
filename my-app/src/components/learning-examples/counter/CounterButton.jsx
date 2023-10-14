import { Component } from "react";
import { useState } from "react";

export default function CounterButton({by,incrementMethod,decrementMethod}){
    const [count,setCount]= useState(0);
    /* function incrementCounterFunction(){
             setCount(count+by)
             incrementMethod(by)
         
     }
     function decrementCounterFunction(){
         setCount(count-by)
         decrementMethod(by)

     }
 */
     return(
         <div className="Counter">
                 
         <div>
         <button className="counterButton" 
         onClick={()=>incrementMethod(by)}
         >+{by}</button>
         <button className="counterButton" 
         onClick={()=>decrementMethod(by)}
         >-{by}</button>
         </div>
        </div>
     )
 }
 