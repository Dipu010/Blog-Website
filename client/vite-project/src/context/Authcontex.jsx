import React ,{ createContext, useState } from "react";

export const AuthContext=createContext(null);
export const AuthProvider=(props)=>{
    const [LoggedIn,setLoggedIn]=useState(false)
    const [data,setData]=useState({});
    
    const storeDataInLS=(serverResponse)=>{
      return localStorage.setItem("ResPonse",JSON.stringify(serverResponse));
    }
    const getDataInLS=()=>{
        return localStorage.getItem("ResPonse");
      }
    return <AuthContext.Provider value={{LoggedIn,setLoggedIn,data,setData,storeDataInLS,getDataInLS}}>
        {props.children}
    </AuthContext.Provider>
}
 