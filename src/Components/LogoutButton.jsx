import { logout } from "../ReduxStore/authSlice"
import authServiceInstance from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { Button } from "./index"

const LogoutButton = () => {

  const dispatch = useDispatch();


  const logoutHandler = () => {
    authServiceInstance.logoutUser()
      .then(() => dispatch(logout())
      );

  }

  return (
    <Button
      onClick={logoutHandler}
      bgColor="bg-white"
      textColor="text-black"
      className="hover:bg-gray-200 rounded-full"
    >
      Logout
    </Button>

  )
}

export default LogoutButton;