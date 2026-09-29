import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react'
import './index.css'
import App from './App.jsx'
import { apolloClient } from './apolloClient.js'

// Day 6 -- wrapping the whole app in ApolloProvider is what lets any
// page or component below talk to the server.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
