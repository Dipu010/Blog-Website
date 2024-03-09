import React, { useContext } from 'react'
import Login from './Login'
import Dash from './Dash'
import Home from './Home';
import { AuthContext } from '../context/Authcontex'
export default function Navigation() {
   const ctx=useContext(AuthContext);
  return (
    <div>
       { ctx.LoggedIn && <Home/>}
        {  !ctx.LoggedIn &&<Login/>}
    </div>
  )
}
