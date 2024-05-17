import { gql } from '@apollo/client'; 

const GET_ORDERS = gql`
    query GetOrders {
        orders {
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

const GET_ORDER = gql`
    query GetOrder($id: ID!) {
        order(id: $id) {
            id
            clientId
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

export { GET_ORDERS, GET_ORDER };