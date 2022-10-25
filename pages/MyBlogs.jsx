import Card from "../components/Card"
import { useQuery } from "@apollo/client";
import { USER_BLOGS } from "../queries/queries"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const MyBlogs = () => {
    // const isServer = () => typeof window === 'undefined';
    // console.log(isServer())
    const [user_id, setUserId] = useState(null)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("user"))) {
            let user = JSON.parse(localStorage.getItem("user"))
            setUserId(user.id ? user.id : 0)
        }
       
    }, [])

    const isMyBlog = true
    // console.log(user_id)

    const router = useRouter()

    const { data, error, loading } = useQuery(USER_BLOGS, {
        variables: { user_id }
    })

    if (loading) {
        return <h3 className="text-center text-3xl">...Loading</h3>
    }
    if (error) {
        return <h3 className="text-center text-3xl">Something Went Wrong</h3>
    }

    const toAddBlog = () => {
        // console.log('navigate')
        router.push('/AddBlog')
    }


    console.log(data.blogsList)
    return (
        <>
            <>
                <div className="mb-40">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded float-right m-4"
                        onClick={toAddBlog}
                    >
                        Add Blog
                    </button>
                </div>

                {data.blogsList.length > 0 ? <div>
                    {
                        data.blogsList.map((blog) => (
                            <Card key={blog.id} blog={blog} isMyBlog={isMyBlog} />
                        ))
                    }

                </div> : <div className="text-center"><h3 className="text-center text-3xl">No Blogs</h3></div>}
            </>
        </>
    )
}

export default MyBlogs
