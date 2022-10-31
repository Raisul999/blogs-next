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
        console.log(email, password)
        const endpoint = process.env.HASURA_PROJECT_ENDPOINT;
        const headers = {
          "content-type": "application/json",
          // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET
        };
        const graphqlQuery = {

          "query": `query($email:String!){ 
  
            users(where: {email: {_eq:$email}}){
              id
              name
              email
              password
            }
          }`,
          "variables": { email }
        };

        try {
          const userCred = await axios({
            url: endpoint,
            method: 'post',
            headers: headers,
            data: graphqlQuery
          });
          console.log('UserCred:', userCred.data.data.users[0])
          // console.log('UserCred:',userCred.data.errors)
          // console.log('password:', userCred.data.data.users[0].password)
          let isUser = bcrypt.compareSync(password, userCred.data.data.users[0].password);
          // console.log('isUser:', isUser)

          let user

          // console.log(isUser)
          // localStorage.setItem('user', JSON.stringify(userCred.data.data.users[0]) )
           if(isUser){
            user = {
              id: userCred.data.data.users[0].id,
              name: userCred.data.data.users[0].name,
              email: userCred.data.data.users[0].email,
              // role: userCred.data.data.users[0].role
            }
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
      //  pass user information to session from jwt token
      if (user) {
        token.id = user.id.toString();
        token.role = 'user';
        token.user = user;
      }
      console.log("user:", user)
      console.log("token:", token) // token same as user
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      // encode a jwt token which communicates and keeps connection with hasura database
      const jwtClaims = {
        ...token,
        //  iat: Date.now() / 1000,
        //  exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": [token.role],
          "x-hasura-default-role": token.role,
          "x-hasura-role": token.role,
          "x-hasura-user-id": token.id,
        },
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
