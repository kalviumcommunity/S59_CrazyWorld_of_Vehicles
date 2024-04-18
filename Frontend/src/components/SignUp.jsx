import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"

function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [respText, setResp] = useState(null)  

  const onSubmit = (data) => {
    console.log(data)
    registerUser(data)
  }

  useEffect(() => {
    console.log(respText)
  }
    , [respText])

  const registerUser = async (data) => {
    try {
      const response = await fetch("http://localhost:8081/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname: data.fname, lname: data.lname, mail: data.mail, password: data.password })

      })
      const responseText = await response.json()
      setResp(responseText)
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <form
        className="shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-center text-2xl font-bold text-blue-500">Join the Community</h3>
        <p className="text-center text-slate-500 font-semibold">Become a part of our crazy vehicle community!</p>
        <div className="flex flex-col mt-5 justify-center items-center">
          <input
            type="text"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Enter Your First Name"
            {...register("fname", {
              required: "Please enter the name",
              minLength: { value: 3, message: "Name should be of minimum 3 characters." },
              maxLength: { value: 30, message: "Name should be not more than 30 characters long" }
            })}
          />

          <input
            type="text"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Enter Your Last Name"
            {...register("lname", {
              required: "Please enter the last name",
              minLength: { value: 3, message: "Name should be of minimum 3 characters." },
              maxLength: { value: 30, message: "Name should be not more than 30 characters long" }
            })}
          />

          <input
            type="email"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Enter Email"
            {...register("mail", { required: "Please enter the mail", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
          />

          <input
            type="password"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Set up a password"
            {...register("password", {
              required: "Please enter the password",
              minLength: {
                value: 10,
                message: "The password should be at least 10 characters long",
              }
            })}

          />
          <input
            type="password"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Confirm password"
            {...register("pass", {
              required: "Please re-enter the password",
              validate: (value) => value === watch("pass") || "Passwords do not match"
            })}
          />
        </div>
        <div className="mt-[30px] mr-[12px] flex justify-end">
          <Link to="/SignIn">
          <button className="bg-slate-100 rounded px-3 py-1.5 text-slate-600 mr-3 ">I already have an account</button>
          </Link>
          {/* <Link to="/"> */}
          <button type="submit" className="bg-blue-500 rounded px-3 py-1.5 text-white hover:bg-blue-700">
            Create Account
          </button>
          {/* </Link> */}
        </div>
      </form>

    </>
  )
}

export default SignUp