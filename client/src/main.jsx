import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                },
                orders: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }
            }
        }
    }
});

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache
    //cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
)
