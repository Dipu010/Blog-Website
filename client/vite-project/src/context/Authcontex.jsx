import React ,{ createContext, useState } from "react";

export const AuthContext=createContext(null);
export const AuthProvider=(props)=>{
    const [LoggedIn,setLoggedIn]=useState(false)
    const [data,setData]=useState('');
    return <AuthContext.Provider value={{LoggedIn,setLoggedIn,data,setData}}>
        {props.children}
    </AuthContext.Provider>
}
 