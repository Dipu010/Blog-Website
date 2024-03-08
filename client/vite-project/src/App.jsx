import { Profiler, useState } from 'react'
import Navbar from './components/navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import BlogDescription from './blogComponents.jsx/BlogDescription'
import BlogUploadImage from './blogComponents.jsx/BlogUploadImage'
import Dashboard from './components/Dashboard'
import Dash from './components/Dash'
import Navigation from './components/Navigation'
import MyProfile from './components/MyProfile'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
       <Route path='/register' element={<Register></Register>}/>
       <Route path='/dash' element={<Dash></Dash>}/>
       <Route path='/' element={<Navbar/>}/>
       <Route path='/profile' element={<MyProfile></MyProfile>}/>
       <Route path='/navigation' element={<Navigation/>}/>
       <Route path="/blog" element={<BlogDescription/>}/>
       <Route path="/image" element={<BlogUploadImage/>}/>
    </Routes>

    </>
  )
}

export default App
