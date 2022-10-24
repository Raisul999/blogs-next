import '../styles/globals.css'
import Layout from '../components/Layout'
import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../lib/apolloClient"
import { useContext, useEffect } from "react"
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
 
  // console.log(isUser)
  const router = useRouter()
  useEffect(() => {
    let isUser = JSON.parse(localStorage.getItem("user"))
    // checks if the user is authenticated
    isUser
    ? router.push("/Blogs")
    : router.push("/SignIn");
  }, []);
  

  // console.log(isUser)
  return (
    <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </ApolloProvider>

  )
}

export default MyApp
