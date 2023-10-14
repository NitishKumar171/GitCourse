import { createContext, useContext, useState } from "react";
import { executeBasicAuthenticationTest } from "../api/UserDetailsApi";
import { apiClient } from "../api/ApiClient";
export const AuthContext= createContext()
export const useAuth= ()=>useContext(AuthContext)


export default function AuthProvider({children}){

    const [isAuthenticated, setIsAuthenticated]=useState(false) 
    const [username,setUsername]=useState(null)
    const[ token,setToken]=useState(null)

async function login(username,password){
  const  baToken= 'Basic ' +window.btoa(username+":"+password)
   try{
  const response=await executeBasicAuthenticationTest(baToken)
   if(response.status===200){
    setIsAuthenticated(true)
    setUsername(username)
    setToken(baToken)
    apiClient.interceptors.request.use(
        (config)=>{
            console.log('Intercepting and adding token')
            config.headers.Authorization=baToken
            return config
        }
    )
    setToken(baToken)
    return true
   }else{
    setIsAuthenticated(false)
    setToken(null)
    setUsername(null)
        return false
   }
}catch(error){
    logout()
    return false
}
    
}
/*
function login(username,password){
    if(username==="AnkitaSen" && password==="dummy"){
        setIsAuthenticated(true);
        setUsername(username)
        return true
            }
            else{
                setIsAuthenticated(false)
                setUsername(null)
            return false
            }
     
 }
*/
function logout(){
    setIsAuthenticated(false)
    setToken(null)
    setUsername(null)
}
   
    return(
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,username,login,logout,token}}>
            {children}
        </AuthContext.Provider>

    )
}
