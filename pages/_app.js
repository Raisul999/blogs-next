import '../styles/globals.css'
import Layout from '../components/Layout'
import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../lib/apolloClient"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

 // console.log(isUser)
  
  // console.log(session)

  // useEffect(() => {
  //   let isUser = JSON.parse(localStorage.getItem("user"))
  //   // checks if the user is authenticated
  //   isUser
  //     ? ""
  //     : router.push("/SignIn");
  // }, []);


  // console.log(isUser)
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>


  )
}

export default MyApp
