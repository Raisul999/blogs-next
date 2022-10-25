import Link from "next/link"
import { useRouter } from "next/router"

const Header = () => {
    const router = useRouter()
    const user = JSON.parse(localStorage.getItem("user"))
    const handleLogout = () => {
        localStorage.removeItem("user")
        router.push("/SignIn")
    }
    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-slate-900 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">

                    <span className="font-semibold text-xl tracking-tight">Travel Blogs</span>
                </div>
                <>
                    {user?<>
                        <div className="text-white">
                            <Link href="/Blogs">Blogs</Link>&nbsp;&nbsp;&nbsp;
                            <Link href="/MyBlogs"> My Blogs</Link>
                        </div>
                        <div className="text-white">
                            {user ? user.name : ""}&nbsp;&nbsp;
                            <button
                                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </>:""}

                </>



            </nav>
        </>
    )
}

export default Header