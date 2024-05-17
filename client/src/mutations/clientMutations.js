import { gql } from '@apollo/client'

const ADD_CLIENT = gql`
    mutation AddClient($name: String!, $email: String!, $phone: String!) {
        addClient(name: $name, email: $email, phone: $phone) {
            name
            email
            phone
        }
    }
`

const UPDATE_CLIENT = gql`
    mutation UpdateClient($id: ID!, $name: String!, $email: String!, $phone: String!) {
        updateClient(id: $id, name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`

const DELETE_CLIENT = gql`
    mutation DeleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
        }
    }
`



export {
    ADD_CLIENT,
    UPDATE_CLIENT,
    DELETE_CLIENT
};