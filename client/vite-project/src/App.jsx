import { useContext, useMemo, useState } from 'react'
import Navbar from './components/navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import BlogDescription from './blogComponents.jsx/BlogDescription'
import BlogUploadImage from './blogComponents.jsx/BlogUploadImage'
import BlogPost from './blogComponents.jsx/BlogPost'

import Dash from './components/Dash'
import Nav from './components/nav'

import Home from './components/Home'
import Render from './blogRenderComponents/Render'

import { AuthContext } from './context/Authcontex'
import { ProfileSection } from './components/ProfileSection'
function App() {
  const [count, setCount] = useState(0)
  const {data}=useContext(AuthContext);
  // const mode=useSelector((state)=>state.mode);
  // const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);
   return (
    <>
    {/* <CssBaseline/> */}
   <Routes>
       <Route path='/login' element={<Login></Login>}/>
       <Route path='/register' element={<Register></Register>}/>
       <Route path='/' element={<Navbar/>}/>
       <Route path="/blog" element={<BlogDescription/>}/>
       <Route path="/image" element={<BlogUploadImage/>}/>
       <Route path='/post' element={<BlogPost/>}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/blogrender' element={<Render/>}/>
    </Routes>

    </>
  )
}

export default App
