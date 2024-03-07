import { useState } from 'react'
import Navbar from './components/navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import BlogDescription from './blogComponents.jsx/BlogDescription'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
       <Route path='/login' element={<Login></Login>}/>
       <Route path='/' element={<Navbar/>}/>
       <Route path="/blog" element={<BlogDescription/>}/>
    </Routes>

    </>
  )
}

export default App
