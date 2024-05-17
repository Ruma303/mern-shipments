import React from 'react'
import { FaSpinner, FaEdit, FaPlus } from "react-icons/fa";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ORDERS } from '../../queries/orderQueries';
import { Link } from 'react-router-dom';

const OrderList = () => {
    const { loading, error, data } = useQuery(GET_ORDERS);

    const handleDeleteOrder = (orderId) => {
        deleteOrder({
            variables: { id: orderId },
            refetchQueries: [{ query: GET_ORDERS }],
        });
    };


    if (loading) return <FaSpinner className="animate-spin" />;
    if (error) return <p>Error :(</p>;

    return (
        <div className="flex flex-col items-center p-4 gap-2">
            <section className="flex flex-col p-4 gap-2 items-center">
                <h1 className="text-3xl font-semibold text-center mb-2">Orders</h1>
                <Link
                    to="/orders/create"
                    className="bg-emerald-500 text-white font-semibold hover:scale-105 flex items-center gap-1 px-2 py-1 rounded"
                >
                    <FaPlus /> Add Order
                </Link>
            </section>
            {!loading && !error && (
                <table className="min-w-full table-fixed border-collapse border border-slate-500 ">
                    <thead>
                        <tr className="bg-sky-300">
                            <th className="py-2 px-4 border border-slate-600">#</th>
                            <th className="py-2 px-4 border border-slate-600">Name</th>
                            <th className="py-2 px-4 border border-slate-600">Description</th>
                            <th className="py-2 px-4 border border-slate-600">Client</th>
                            <th className="py-2 px-4 border border-slate-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.orders.map(({ id, name, description, client }, index) => (
                            <tr key={id}>
                                <td className="py-2 px-4 border border-slate-600 font-semibold">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-4 border border-slate-600 ">{name}</td>
                                <td className="py-2 px-4 border border-slate-600 ">{description}</td>
                                <td className="py-2 px-4 border border-slate-600 ">{client.name}</td>
                                <td className="py-2 px-4 border border-slate-600">
                                    <Link to={`/orders/${id}/edit`} onClick={() => handleEditOrder(id)}>
                                        <FaEdit className="bg-yellow-400 p-2 w-8 h-8 rounded hover:scale-105" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrderList