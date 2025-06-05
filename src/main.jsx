import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from "./ReduxStore/Store.js"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import Protectpage from './Components/Protectpage.jsx'
import LoginPage from "./pages/LoginPage.jsx"
import Signuppage from "./pages/Signuppage.jsx"
import Allposts from "./pages/Allposts.jsx"
import AddPost from './pages/AddPost.jsx'
import EditPost  from './pages/EditPost.jsx'
import Post from "./pages/Post.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route path='/' element={<HomePage />} />
       <Route path='/Login' element={<Protectpage authentication={false}> <LoginPage/> </Protectpage>} />
       <Route path='/signup' element={<Protectpage authentication={false}> <Signuppage/> </Protectpage>} />
       <Route path='/signup' element={<Protectpage authentication={true}> <Signuppage/> </Protectpage>} />
       <Route path='/all-posts' element={<Protectpage authentication={true}> <Allposts/> </Protectpage>} />
       <Route path='/add-post' element={<Protectpage authentication={true}> <AddPost/> </Protectpage>} />
       <Route path='/edit-post/:slug' element={<Protectpage authentication={true}> <EditPost/> </Protectpage>} />
       <Route path='/post/:slug' element={<Post/>} />


       

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
