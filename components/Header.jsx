import Link from "next/link"
import { useRouter } from "next/router"
import {useSession, signOut } from "next-auth/react"

const Header = () => {
    const session = useSession()
   
   
    
    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-slate-900 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">

                    <span className="font-semibold text-xl tracking-tight">Travel Blogs</span>
                </div>
                <>
                    {session.status==="authenticated"?<>
                        <div className="text-white">
                            <Link href="/Blogs">Blogs</Link>&nbsp;&nbsp;&nbsp;
                            <Link href="/MyBlogs"> My Blogs</Link>
                        </div>
                        <div className="text-white">
                            {session.status==="authenticated" ? session.data.user.name : ""}&nbsp;&nbsp;
                            <button
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                onClick={()=>signOut({ callbackUrl: 'http://localhost:3000/SignIn' })}
                            >
                                Logout
                            </button>
                        </div>
                    </>:<div className="text-white">
                            <Link href="/Blogs">Blogs</Link>
                           
                        </div>}

                </>



            </nav>
        </>
    )
}

export default Header