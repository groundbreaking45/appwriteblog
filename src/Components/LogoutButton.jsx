import {logout} from "../ReduxStore/authSlice"
import authServiceInstance from "../appwrite/auth"
import { useDispatch } from "react-redux"

const LogoutButton = () => {

    const dispatch = useDispatch();

 
    const logoutHandler = () => {
        authServiceInstance.logoutUser()
        .then (() => dispatch(logout())
    );
        
    }

  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutButton;