import React, { useContext } from 'react'
import Login from './Login'
import Dash from './Dash'
import { AuthContext } from '../context/Authcontex'
export default function Navigation() {
   const ctx=useContext(AuthContext);
  return (
    <div>
       { ctx.LoggedIn && <Dash/>}
        {  !ctx.LoggedIn &&<Login/>}
    </div>
  )
}
