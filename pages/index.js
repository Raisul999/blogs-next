
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import Blogs from "./Blogs"

export default function Home() {
 

  return (
   
      <Blogs />
  
  )
}
