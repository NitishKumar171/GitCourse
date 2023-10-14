import { apiClient } from "./ApiClient" 

export const retriveUserDetailsBeans=()=>apiClient.get(`/jpa/users/4`)
export const retriveUsersPostById=(id)=>apiClient.get(`jpa/users/${id}/posts`)
export const deleteUserById=(id,token)=>apiClient.delete(`/jpa/users/${id}`)
export const retrivUsersByUserName=(username,token)=>apiClient.get(`jpa/users/name/${username}`)
export const retriveAllUsers=(token)=>apiClient.get(`/jpa/users`)
export const retriveUserDetailsById=(id,token)=>apiClient.get(`/jpa/users/${id}`)
export const createUserDetails=(user,token)=>apiClient.post(`/jpa/users`,user)
export const updateUserDetails=(id,user,token)=>apiClient.put(`/jpa/users/${id}`,user)

export const retriveAllProducts=(token)=>apiClient.get(`/jpa/products`)
export const deleteProductsById=(id,token)=>apiClient.delete(`/jpa/products/${id}`)
export const retriveProductsDetailsById=(id,token)=>apiClient.get(`/jpa/products/${id}`)
export const createProductsDetails=(products,token)=>apiClient.post(`/jpa/create/products`,products)

export const addProductsToCart=(carts,token)=>apiClient.post(`jpa/add/cart`,carts)
export const findProductsAddedToCart=(token,username)=>apiClient.get(`jpa/${username}/cart`)
export const deleteCartById=(id,token)=>apiClient.delete(`/jpa/cart/${id}`)


export const executeBasicAuthenticationService=(token)=>apiClient.get(`/jpa/users`)
export const executeBasicAuthenticationTest=(token)=>apiClient.get(`/basicauth`,{
    headers:{
        Authorization:token
    }
})