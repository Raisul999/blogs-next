import moment from "moment"
import { useRouter } from 'next/router'

const Card = ({ blog }) => {
    const router = useRouter()
    const toUpdateBlog=()=>{
        router(`/editBlog/${blog.id}`)
    }

    return (
        <div>
            <div className='flex justify-center m-8'>
                <div className="p-6 max-w-sm w-full lg:max-w-3xl lg:flex-col border border-gray-200 shadow-md bg-gray-50">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-black">{blog.title}</h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.description}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Posted: {moment(blog.created_at).format('MMMM DD YYYY HH:mm')}</p>
                    {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Modified: {moment(new Date(Number(blog.updated_at))).format('MMMM DD YYYY HH:mm')}</p> */}
                   

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                      onClick={toUpdateBlog}
                    >
                        Update
                    </button>
                </div>




            </div>
        </div>
    )
}

export default Card
