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
const SIGNIN_USER = gql`
query($email:String!, $password:String!){ 
  
    users(where: {email: {_eq:$email}, password: {_eq:$password}}){
      id
      name
    }
  
  
}
`
export {GET_BLOGS, GET_BLOG, SIGNIN_USER}