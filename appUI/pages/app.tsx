import { App } from 'antd'
import { createClient } from 'graphql-ws'
import Window from '@ui-components/window/window'
import { Kind, OperationTypeNode } from 'graphql'
import { AppProvider } from '@ui-stores/contexts/app'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { ThemeProvider } from '@ui-stores/providers/themeProvider'
import { Staff } from '@/appServer/src/models/@types/resolver_types'
import { ApolloProvider, ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { HashRouter } from 'react-router-dom'

const Main = () => {

   /**
    * get the domain & ws from the config
    */
   const { domain, ws } = CONFIG.server
   /**
    * get user token
    */
   const _token = JSON.parse(localStorage.getItem('_app_current_user')) as Staff ?? null
   /**
    *   Define a unique ApolloClient that could use both WebSocket and HttpLink
      * The split function takes three parameters:
      
      * A function that's called for each operation to execute
      * The Link to use for an operation if the function returns a "truthy" value
      * The Link to use for an operation if the function returns a "falsy" value
    */
   const _apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: split(({ query }) => {
         const _defination = getMainDefinition(query)
         return (
            _defination.kind === Kind.OPERATION_DEFINITION &&
            _defination.operation === OperationTypeNode.SUBSCRIPTION
         )
      }, new GraphQLWsLink(createClient({
         url: ws,
         connectionParams: {
            authToken: `Bearer ${_token?.token || ''}`
         }
      })), new HttpLink({
         uri: domain,
         headers: {
            'content-type': 'application/json',
            'authorization': _token ? `Bearer ${_token?.token || ''}` : `Authentication`
         }
      })) // end split
   }) // end new ApolloClient

   return (
      // Antd global component for general antd component configuration
      <App notification={{ placement: 'bottomRight', maxCount: 5 }} >
         {/* AppProvider for global configurations and states */}
         <AppProvider>
            <ApolloProvider client={_apolloClient}>
               <ThemeProvider>
                  <HashRouter>
                     <Window />
                  </HashRouter>
               </ThemeProvider>
            </ApolloProvider>
         </AppProvider>
      </App>
   )
}

export default Main