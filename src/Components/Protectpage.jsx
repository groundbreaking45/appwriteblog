import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function Protectpage({ children, authentication=true }) {
const navigate = useNavigate();
const [loadingPage, setLoadingPage] = useState(true);
const authStatus = useSelector(state => state.auth.status);


useEffect (() => {

  if(authentication && authentication !== authStatus) 
  {
    navigate("/login");
  }
  else if (!authentication && authStatus !== authentication)
  {
    navigate("/")
  }

  setLoadingPage(false);



},[navigate,authentication,authStatus])


  return loadingPage ? <h1>Loading...</h1> : (
    <div>{children}</div>
  )
}

export default Protectpage