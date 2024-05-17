import { gql } from '@apollo/client';

const ADD_ORDER = gql`
    mutation AddOrder($clientId: ID!, $name: String!, $description: String!, $status: String!) {
        addOrder(clientId: $clientId, name: $name, description: $description, status: $status) {
            id
            clientId
            name
            description
            status
            client {
                id
                name
            }
        }
    }
`;

const UPDATE_ORDER = gql`
    mutation UpdateOrder($id: ID!, $clientId: ID, $name: String, $description: String, $status: String) {
        updateOrder(id: $id, clientId: $clientId, name: $name, description: $description, status: $status) {
            id
            clientId
            name
            description
            status
            client {
                id
                name
            }
        }
    }
`;

const DELETE_ORDER = gql`
    mutation DeleteOrder($id: ID!) {
        deleteOrder(id: $id) {
            id
        }
    }
`;

export {
    ADD_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER
};