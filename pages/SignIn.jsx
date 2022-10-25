import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { SIGNIN_USER } from "../queries/queries";
import { useLazyQuery } from "@apollo/client";
const SignIn = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login, { data, error, loading }] = useLazyQuery(SIGNIN_USER, {
        variables: { email, password }
    })
    // console.log(data)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '') {
            alert('Please enter your email')
            return
        } else if (password === '') {
            alert('Please enter your password')
            return
        }
        try {
            await login()
            // console.log(data)
            if (data.users.length>0) {
                localStorage.setItem("user", JSON.stringify(data.users[0]))
                router.push('/Blogs')
            } else {
                alert("Credentials mismatch")
            }


        } catch (error) {
            // alert("Credentials mismatch")
        }
    }

    //  if(loading){
    //     return <h3 className="text-center text-3xl">...Loading</h3>
    //  }
    //  if(error){
    //     return <h3 className="text-center text-3xl">Something Went Wrong</h3>
    //  }
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">SignIn</h1>

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            className="bg-blue-500 hover:bg-blue-700 float-right font-bold py-2 px-4 border border-blue-700 text-white rounded"
                            onClick={handleSubmit}>
                            Submit
                        </button>


                    </div>

                    <div className="text-grey-dark mt-6">
                        Don't have an account?
                        <Link className="no-underline border-b border-blue text-blue" href="/SignUp">
                            Sign Up
                        </Link>
                    </div>

                </div>

            </div>

        </>
    )
}

export default SignIn
