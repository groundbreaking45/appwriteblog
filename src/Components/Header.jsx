import { Container, Logo, LogoutButton } from "./index"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button } from "./index"





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


          <ul className='flex flex-wrap ml-auto items-center gap-2'>
            {NavItems.map((item) => item.active ? (
              <li key={item.name}>
                <Button
                  onClick={() => navigate(item.Url)}
                  bgColor="bg-white"
                  textColor="text-black"
                  className="hover:bg-gray-200 rounded-full"
                >
                  {item.name}
                </Button>

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