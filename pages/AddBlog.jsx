import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ADD_BLOG } from '../mutations/mutations';
import { GET_BLOGS } from "../queries/queries";
import { useRouter } from 'next/router';
const AddBlog = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    const user_id = user.id
    // console.log(id)
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addBlog] = useMutation(ADD_BLOG,{
        variables: {title, description,user_id},
        refetchQueries: [
            { query: GET_BLOGS }
          ]
    })
    // console.log(title, description)
    const handleAddBlog = () => {
        // console.log('submit')
      if(title===''){
        alert('Please enter a title')
        return;
      }else if(description===''){
        alert('Please enter a description')
        return;
      }
       const result = addBlog();
       result.then((res)=>router.push('/MyBlogs'))
       .catch((err)=>alert(err.message))
    }
    return (
        <div className="grid place-items-center h-screen">
            <div className="w-3/5 h-3/5">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input className="border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 leading-tight focus:border-black focus:shadow-outline"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea rows="10" className="border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 mb-3 leading-tight focus:border-black focus:shadow-outline"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        >

                        </textarea>

                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                         type="button"
                         onClick={handleAddBlog}
                        >
                            Submit
                        </button>

                    </div>
                </form>

            </div>

        </div>
    )
}

export default AddBlog
