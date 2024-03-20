import React ,{ createContext, useState } from "react";

export const MyBlogContext=createContext(null);
export const MyBlogProvider=(props)=>{
   const [click,setClick]=useState(null);
    return <MyBlogContext.Provider value={{click,setClick}}>
        {props.children}
    </MyBlogContext.Provider>
}