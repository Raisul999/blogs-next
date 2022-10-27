import '../styles/globals.css'
import Layout from '../components/Layout'
import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../lib/apolloClient"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // console.log(isUser)
  const router = useRouter()
  useEffect(() => {
    let isUser = JSON.parse(localStorage.getItem("user"))
    // checks if the user is authenticated
    isUser
      ? ""
      : router.push("/SignIn");
  }, []);


  // console.log(isUser)
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>


  )
}

export default MyApp
