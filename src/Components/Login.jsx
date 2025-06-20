import { useState } from "react";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authServiceInstance from "../appwrite/auth";
import { login } from "../ReduxStore/authSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();



    const Login = async (data) => {
        setError('')
        try {
            const session = await authServiceInstance.loginUser(data);
            if (session) {
                const userdata = await authServiceInstance.getCurrentUser();
                if (userdata) {
                    await dispatch(login(userdata));
                    navigate('/')
                }
            }

        } catch (error) {
            setError(error.message)
        }


    }




    return (
        <div
            className='flex items-center justify-center'
        >
            <div className={`mx-auto w-[90vw] md:w-2/3 max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center ">{error}</p>}


                <form className="mt-8" onSubmit={handleSubmit(Login)}>
                    <div className='space-y-5'>
                        <Input
                            type="email"
                            label="Email : "
                            placeholder="Enter your email "
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

                        <Button type="submit" className="w-full" >Sign in</Button>






                    </div>
                </form>



            </div>
        </div>
    )
}

export default Login
