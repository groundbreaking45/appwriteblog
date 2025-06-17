import { useState } from "react"
import { Input, Logo, Button } from "./index"
import { useDispatch } from "react-redux"
import authServiceInstance from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import { login as authLogin } from "../ReduxStore/authSlice"
import { useForm } from "react-hook-form"

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const Signup = async (data) => {
        setError("");
        
        try {
            const session = await authServiceInstance.createUserAccount(data);
            if (session) {
                const userData = await authServiceInstance.getCurrentUser();
                 
                if (userData) {
                    await dispatch(authLogin(userData));
                    navigate("/");
                }
            }

        } catch (error) {
            setError(error.message)
        }

    }


    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-[90vw] md:w-2/3 max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}


                <form onSubmit={handleSubmit(Signup)}>
                    <div className='space-y-5'>

                        <Input label="Full Name : "
                            placeholder="Enter your name here.. "
                            {...register("name", {
                                required: true,
                            })}

                        />


                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />



                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />


                        <Button className="w-full" type="submit">Create Account</Button>




                    </div>
                </form>


            </div>
        </div>
    )
}

export default Signup