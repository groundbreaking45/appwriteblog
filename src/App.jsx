import { useEffect, useState } from "react"
import authServiceInstance from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { logout,login } from "./ReduxStore/authSlice";
import { Footer, Header } from "./Components"
import { Outlet } from "react-router-dom";


function App() {

  const [loading, setLoading] = useState(true);
  const dispatch =  useDispatch()

  useEffect(() => {
    authServiceInstance.getCurrentUser().then((userData) => !userData ? dispatch(logout()) : dispatch(login({ userData })))
      .finally(() => setLoading(false))

  }, [])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>


        <Header />
        <main>

          <Outlet/>

        </main>

        <Footer />

      </div>
    </div>
  ) : null;
}

export default App
