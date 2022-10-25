import Card from "../components/Card"
import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../queries/queries"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Blogs = () => {
  const isServer = () => typeof window === 'undefined'
  const router = useRouter()


  console.log(isServer())
  const { data, error, loading } = useQuery(GET_BLOGS)

  if (loading) {
    return <h3 className="text-center text-3xl">...Loading</h3>
  }
  if (error) {
    return <h3 className="text-center text-3xl">Something Went Wrong</h3>
  }



  // console.log(data.blogsList)
  return (
    <>
      

      {data.blogsList.length > 0 ? <div>
        {
          data.blogsList.map((blog) => (
            <Card key={blog.id} blog={blog} />
          ))
        }

      </div> : <div classNameName="text-center"><h3 className="text-center text-3xl">No Blogs</h3></div>}
    </>
  )
}

export default Blogs
