const Client = require('../model/Client');
const Order = require('../model/Order');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLEnumType
} = require("graphql");


//% Types
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { //* Relazione con ClientType
            type: ClientType,
            resolve: (parent, args) => Client.findById(parent.clientId)
        }
    })
});


//% Queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve: () => Client.find()
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => Client.findById(args.id)
        },
        orders: {
            type: new GraphQLList(OrderType),
            resolve: () => Order.find()
        },
        order: {
            type: OrderType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => Order.findById(args.id)
        },
    }
});


//% Mutations
const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const client = await Client.create({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client;
            }
        },
        updateClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const client = await Client.findByIdAndUpdate(args.id, args, { new: true });
                return client;
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                const client = await Client.findByIdAndDelete(args.id);
                return client;
            }
        },
        addOrder: {
            type: OrderType,
            args: {
                id: { type: GraphQLID },
                clientId: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'OrderStatus',
                        values: {
                            PENDING: { value: 'pending' },
                            COMPLETED: { value: 'completed' },
                            CANCELLED: { value: 'cancelled' }
                        }
                    }),
                    defaultValue: 'pending'
                },
                clientId: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                const order = await Order.create({
                    clientId: args.clientId,
                    name: args.name,
                    description: args.description,
                    status: args.status
                });
                return order;
            }
        },
        updateOrder: {
            type: OrderType,
            args: {
                id: { type: GraphQLID },
                clientId: { type: GraphQLID },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const order = await Order.findByIdAndUpdate(args.id, args, { new: true });
                return order;
            }
        },
        deleteOrder: {
            type: OrderType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                const order = await Order.findByIdAndDelete(args.id);
                return order;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});