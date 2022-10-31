import bcrypt from 'bcrypt';
import axios from 'axios';

export default async function (req, res) {
    const { name, email, password } = req.body
    console.log(email, password)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // const match = bcrypt.compareSync(password, hash);
    //  console.log(process.env.NEXT_PUBLIC_HASURA_SECRET)
    // console.log('hashed:',hash)
    // console.log('match', match)
    const endpoint = process.env.HASURA_PROJECT_ENDPOINT;
    const headers = {
        "content-type": "application/json",
        // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET
    };
    const graphqlQuery = {
        
        "query": `mutation register($name:String!, $email:String!, $hash:String!){
        insert_users_one(object: {name: $name, email: $email, password: $hash}){
          id 
          name
          email
        }
      }`,
        "variables": { name, email, hash }
    };
    const response = await axios({
        url: endpoint,
        method: 'post',
        headers: headers,
        data: graphqlQuery
    });
    console.log(response.data);
    
} 