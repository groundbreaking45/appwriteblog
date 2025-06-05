import {Container,Logo,LogoutButton } from "./index"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"





const Header = () => {

  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate();

  const NavItems = [

    {
      name: "Home",
      Url: "/",
      active: true,

    },
    {
      name: "Login",
      Url: "/Login",
      active: !authStatus,
    },
    {
      name: "Sign up",
      Url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      Url: "/all-posts",
      active: authStatus,

    },
    {
      name: "Add Post",
      Url: "/add-post",
      active: authStatus,

    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>

        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo />

            </Link>
          </div>


          <ul className='flex ml-auto'>
            {NavItems.map((item) => item.active ? (
              <li key={item.name}>
                <button onClick={() =>  navigate(item.Url)} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>

              </li>


            ) : null)
            }
            {authStatus &&
              <li>
                <LogoutButton />
              </li>
            }

          </ul>





        </nav>

      </Container>
    </header>
  )
}

export default Header