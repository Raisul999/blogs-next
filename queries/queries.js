import { gql } from '@apollo/client';

const GET_BLOGS = gql`
query MyQuery {
   blogsList{
     id
     title
     description
     created_at
   }
 }

`
const GET_BLOG = gql`
 query($id:Int!){
   blogsList_by_pk(id:$id){
      id 
     title
     description
     created_at
   }
 }

`
export {GET_BLOGS, GET_BLOG}