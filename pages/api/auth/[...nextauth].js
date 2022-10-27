// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from "jsonwebtoken"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import axios from 'axios';


const secret = process.env.NEXTAUTH_SECRET
export default NextAuth({
  secret: secret,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials
        // console.log(email, password)
        const endpoint = process.env.HASURA_PROJECT_ENDPOINT;
        const headers = {
          "content-type": "application/json",
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET
        };
        const graphqlQuery = {

          "query": `query($email:String!, $password:String!){ 
  
            users(where: {email: {_eq:$email}, password: {_eq:$password}}){
              id
              name
              email
            }
          }`,
          "variables": { email, password }
        };
        
        try {
          const userCred = await axios({
            url: endpoint,
            method: 'post',
            headers: headers,
            data: graphqlQuery
          });
          const user = {
            id: userCred.data.data.users[0].id,
            name: userCred.data.data.users[0].name,
            email: userCred.data.data.users[0].email
          }
          return user

        } catch (e) {
          // Redirecting to the login page with error message in the URL
          throw new Error(e.message);
        }
      },
    }),
  ],
   callbacks: {
     async jwt({ token, user }) {
       // pass user information to session from jwt token
      //  if (user) {
      //    token.id = user.id.toString();
      //    token.role = user.role;
      //    token.account_id = user.account_id.toString();
      //    token.user = user;
      //  }
      console.log("user:",user)
       console.log("token:",token) // token same as user
       return Promise.resolve(token);
     },
     async session({ session, token }) {
       // encode a jwt token which communicates and keeps connection with hasura database
       const jwtClaims = {
         ...token,
         iat: Date.now() / 1000,
         exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        //  "https://hasura.io/jwt/claims": {
        //    "x-hasura-allowed-roles": [token.role],
        //    "x-hasura-default-role": token.role,
        //    "x-hasura-role": token.role,
        //    "x-hasura-user-id": token.id,
        //    "X-Hasura-Account-Id": token.account_id,
        //  },
       };
       const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
       // session data that can be accessed
       session.id = token.id;
       session.token = encodedToken;
      //  session.role = token.role;
      //  session.user = token.user;
      //  session.expires = nextMin;
       return Promise.resolve(session);
     },
   },
  pages: {
    signIn: "/SignIn",
    newUser: "/SignUp"
    //  error: "/auth/login?inv alidCred=true",
    //  signOut: "",
  },
});
