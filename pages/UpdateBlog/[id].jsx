import { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { UPDATE_BLOG } from '../../mutations/mutations';
import { useRouter } from 'next/router';
import { GET_BLOG } from '../../queries/queries';
import { useSession } from "next-auth/react";
const UpdateBlog = () => {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (session.status === 'unauthenticated') {
            router.push("/SignIn")
            return
        }
        if (session.status === 'authenticated') {
            setUserId(Number(session.data.id))
        }
    }, [session.status])

    let id = Number(router.query.id);
    console.log(id)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // console.log('id', id)

    const [blog] = useLazyQuery(GET_BLOG, {
        variables: { id }
    })
    const [updateBlog, { error }] = useMutation(UPDATE_BLOG, {
        variables: { id, title, description }
    })
    console.log(title, description)
    useEffect(() => {
        const result = blog()
        result.then(res => {
            setTitle(res.data.blogsList_by_pk.title);
            setDescription(res.data.blogsList_by_pk.description);
        })
    }, [])
    const handleUpdateBlog = () => {
        console.log('submit')
        if (title === '') {
            alert('Please enter a title')
            return;
        } else if (description === '') {
            alert('Please enter a description')
            return;
        }
        const result = updateBlog();
        result.then(res => router.push('/'))
            .catch(err => alert(err.message));
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
                            onChange={(e) => setDescription(e.target.value)}
                        >

                        </textarea>

                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                            type="button"
                            onClick={handleUpdateBlog}
                        >
                            Submit
                        </button>

                    </div>
                </form>

            </div>

        </div>
    )
}

export default UpdateBlog
