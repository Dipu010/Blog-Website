import { useContext, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BlogDescription from './blogComponents.jsx/BlogDescription'
import BlogUploadImage from './blogComponents.jsx/BlogUploadImage'
import BlogPost from './blogComponents.jsx/BlogPost'



import { AuthContext } from './context/Authcontex'
import { ProfileSection } from './components/profile/ProfileSection'
import BlogUpdate from './blogUpdateComponents/blogUpdateDescription'
import { Layout } from "../src/Layout/Layout"
import { HomeLayout } from "../src/Layout/HomeLayout"
import { HomePage } from './Layout/HomePage'
import { CreateBlogLayout } from './Layout/CreateBlogLayout'
import { Reroute } from './components/utils/Reroute'
import UserPost from './components/profile/UserPost'
import NotFound from './components/Error/NotFound'
import Forbidden from './components/Error/Forbidden'
function App() {
  const [count, setCount] = useState(0)
  const { data } = useContext(AuthContext);
  // const mode=useSelector((state)=>state.mode);
  // const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <>

      <Routes>
        <Route path='/login' element={<Login></Login>} />
        <Route path='/register' element={<Register></Register>} />



        <Route path='/' element={<Layout />}>
          <Route path='' element={<Reroute />} />
          <Route path='login' element={<Login />} />
          <Route path='home' element={<HomeLayout />} />
          <Route path='forbidden' element={<Forbidden />} />
          <Route path='notfound' element={<NotFound />} />
          <Route path=':id/' element={<HomePage />}>
            <Route path='' element={<ProfileSection />} />

            <Route path='userpost' element={<UserPost />} />
            <Route path='home' element={<HomeLayout />} />
            <Route path='profile' element={<ProfileSection />} />

            <Route path='createBlog/' element={<CreateBlogLayout />}>
              <Route path='' element={<BlogDescription />} />
              <Route path="image" element={<BlogUploadImage />} />
              <Route path='post' element={<BlogPost />} />

            </Route>

          </Route>

        </Route>
      </Routes>

    </>
  )
}

export default App
