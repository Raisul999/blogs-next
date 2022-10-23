import { useState } from 'react';
import {useRouter} from 'next/router';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../mutations/mutations';
const SignUp = () => {
    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
   
    const [register] = useMutation(REGISTER_USER,{
        variables:{name, email, password}
    })
     
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (password !== confirmPass) {
            alert('Password mismatch');
            return
        }
        try{
            await Promise.all([register()])
           // console.log(result[0])
               router.push('/SignIn')
   
       }catch(error){
           alert("Email already registered")
       }
       
    }



    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />

                        <button
                            className="bg-blue-500 hover:bg-blue-700 float-right font-bold py-2 px-4 border border-blue-700 text-white rounded"
                            onClick={handleSubmit}>
                            Submit
                        </button>

                        {/* <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div> */}
                    </div>

                    {/* <div className="text-grey-dark mt-6">
                        Already have an account?
                        <Link className="no-underline border-b border-blue text-blue" to="/SignIn">
                            Log in
                        </Link>.
                    </div> */}
                </div>
            </div>

        </>
    )
}

export default SignUp
