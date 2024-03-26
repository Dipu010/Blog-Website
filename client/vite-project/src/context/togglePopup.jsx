import React ,{ createContext, useContext, useState } from "react";

export const ToggleContext=createContext(null);

export const ToggleProvider=(props)=>{
   const [click,setClick]=useState(0);
    return <ToggleContext.Provider value={{click,setClick}}>
        {props.children}
    </ToggleContext.Provider>
}
