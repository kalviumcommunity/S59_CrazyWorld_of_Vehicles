import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

function SignIn() {
    const { register, handleSubmit } = useForm()
    const [resp, setResp] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const authUser = async (data) => {
        try {
            const response = await fetch("http://localhost:8081/api/login", {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ mail: data.mail })
            });

            const responseText = await response.json();
            if (response.ok) {
                console.log("Login Successful");
                const accessToken = responseText.accessToken
                console.log(accessToken)
                setResp(responseText);
                if (accessToken) {
                    setLoggedIn(true);
                    document.cookie = `user=${responseText.name}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/;`;
                    document.cookie = `accessToken=${responseText.accessToken}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/;`;

                }
                else{
                    console.log("Authentication failed")
                }
            } else {
                console.log("Login Failed");
            }
        } catch (err) {
            console.log(err);
        }
    };


    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/logout", {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
            });

            const responseText = await response.json();

            if (response.ok) {
                console.log("Logout Successful");
                setResp(responseText);
                setLoggedIn(false);
                document.cookie = `user=; expires=Thu, 10 Jan 1950 00:00:00 GMT; path=/;`;
                document.cookie = `accessToken=; expires=Fri, 01 Jan 1970 23:59:59 GMT; path=/;`;
            } else {
                console.log("Logout failed");
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        console.log(resp)
    }, [resp])

    const doSubmit = async (data) => {
        try {
            await handleSubmit(authUser)(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <form
                className="shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded"
                onSubmit={handleSubmit(doSubmit)}
            >
                <img src="../../join-us.gif" alt="" className="w-32 m-auto" />
                <h3 className="text-center text-2xl font-bold text-blue-500">LOGIN!</h3>
                <div className="flex flex-col mt-5 justify-center items-center">
                    <input
                        type="email"
                        className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
                        placeholder="Enter Email"
                        {...register("mail", { required: "Please enter the mail", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                    />

                    <input
                        type="password"
                        className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
                        placeholder="Enter password"
                        {...register("pass", {
                            required: "Please enter the password",
                            minLength: {
                                value: 10,
                                message: "The password should be at least 10 characters long",
                            }
                        })}

                    />
                </div>
                {!loggedIn && 
                <div className="mt-[30px] mr-[52px] flex justify-end">
                    <Link to="/SignUp">                   
                     <button className="bg-slate-300 rounded px-3 py-1.5 text-slate-600 mr-3 ">+ Creat Account</button>
                    </Link>
                    <button type="submit" className="bg-blue-500 rounded px-3 py-1.5 text-white hover:bg-blue-700">
                        Log In
                    </button>
                </div>}
            </form>
            {loggedIn && <div className="flex justify-center">{
                <Link to="/">
                <button
                    onClick={logout}
                    className="bg-blue-500 rounded px-3 py-1.5 text-white hover:bg-blue-700">
                    Log Out
                </button>
                </Link>}</div>}

        </>
    )
}

export default SignIn