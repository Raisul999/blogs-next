import { gql } from "@apollo/client";

const ADD_BLOG = gql`
 mutation addBlog($title:String!, $description:String!){
    insert_blogsList_one(object: {title:$title, description:$description}) {
        title
        description
      }
 }


`

const UPDATE_BLOG = gql`
 mutation updateBlog($id:Int!,$title:String!, $description:String!){
     update_blogsList_by_pk(_set: {title:$title, description:$description}, pk_columns: {id: $id}) {
          id
          title
          description
        }
      

}

`

const REGISTER_USER = gql`
mutation register($name:String!, $email:String!, $password:String!){
  insert_users_one(object: {name: $name, email: $email, password: $password}){
    id 
    name
    email
  }
}
`

export { ADD_BLOG, UPDATE_BLOG, REGISTER_USER }