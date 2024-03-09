import { useState } from 'react'
import Navbar from './components/navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import BlogDescription from './blogComponents.jsx/BlogDescription'
import BlogUploadImage from './blogComponents.jsx/BlogUploadImage'
import BlogPost from './blogComponents.jsx/BlogPost'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
       <Route path='/login' element={<Login></Login>}/>
       <Route path='/register' element={<Register></Register>}/>
       <Route path='/' element={<Navbar/>}/>
       <Route path="/blog" element={<BlogDescription/>}/>
       <Route path="/image" element={<BlogUploadImage/>}/>
       <Route path='/post' element={<BlogPost/>}/>
    </Routes>

    </>
  )
}

export default App
