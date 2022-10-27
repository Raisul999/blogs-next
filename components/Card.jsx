import moment from "moment"
import { useRouter } from 'next/router'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from "react";
import { DELETE_BLOG } from "../mutations/mutations";
import { useMutation } from "@apollo/client";
import { USER_BLOGS } from "../queries/queries";
const Card = ({ blog, isMyBlog }) => {
    const router = useRouter()
    let id = blog.id
    const toUpdateBlog = () => {
        router.push(`/UpdateBlog/${blog.id}`)
    }

    const appendID = (id) => {
        console.log(id)
        let blogID = id
        router.push(
            {
                pathname: '/MyBlogs',
                query: {
                    blogID
                },
            }
            
          );
    }

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [deleteBlog] = useMutation(DELETE_BLOG,{
        variables:{id},
        
    })

    const handleDeleteBlog=()=>{
        deleteBlog()
        window.location.reload()
    }


    return (
        <div>
            {isMyBlog ? <div className='flex justify-center m-8'>
                <div className="p-6 max-w-sm w-full lg:max-w-3xl lg:flex-col border border-gray-200 shadow-md bg-gray-50">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-black">{blog.title}</h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.description}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Posted: {moment(blog.created_at).format('MMMM DD YYYY HH:mm')}</p>
                    {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Modified: {moment(new Date(Number(blog.updated_at))).format('MMMM DD YYYY HH:mm')}</p> */}


                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 border border-blue-700 rounded"
                        onClick={toUpdateBlog}
                    >
                        Update
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 border border-blue-700 rounded"
                        onClick={()=>{onOpenModal(); appendID(blog.id)}}
                    >
                        Delete
                    </button>
                    <Modal open={open} onClose={onCloseModal} center>
                        <div class="p-6 text-center">
                            <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                            <button class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                onClick={() => { onCloseModal(); handleDeleteBlog() }}
                            >
                                Yes
                            </button>
                            <button class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                onClick={onCloseModal}
                            >
                                No
                            </button>
                        </div>
                    </Modal>










                </div>




            </div> : <div className='flex justify-center m-8'>
                <div className="p-6 max-w-sm w-full lg:max-w-3xl lg:flex-col border border-gray-200 shadow-md bg-gray-50">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-black">{blog.title}</h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.description}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Posted: {moment(blog.created_at).format('MMMM DD YYYY HH:mm')}</p>
                    {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Modified: {moment(new Date(Number(blog.updated_at))).format('MMMM DD YYYY HH:mm')}</p> */}


                </div>




            </div>}
        </div>
    )
}

export default Card
