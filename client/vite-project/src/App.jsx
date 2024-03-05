import { useState } from 'react'
import Navbar from './components/navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './components/Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
       <Route path='/login' element={<Login></Login>}/>
       <Route path='/' element={<Navbar/>}/>
    </Routes>

    </>
  )
}

export default App
