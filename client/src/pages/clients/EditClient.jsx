import React from 'react';
import { FaUser, FaSpinner } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENT } from '../../queries/clientQueries';
import { UPDATE_CLIENT } from '../../mutations/clientMutations';

const EditClient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateClient] = useMutation(UPDATE_CLIENT);

    const [client, setClient] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const { loading, error, data } = useQuery(GET_CLIENT, {
        variables: { id },
        refetchQueries: [{ query: GET_CLIENT }]
    });

    useEffect(() => {
        if (data && data.client) {
            setClient({
                name: data.client.name,
                email: data.client.email,
                phone: data.client.phone
            });
        }
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (client.name && client.email && client.phone) {
            updateClient({ variables: { id, ...client } });
            navigate('/clients');
        }
    };

    if (loading) return <FaSpinner className="animate-spin" />;
    if (error) return <p>Error: {error.message}</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mb-2">Update a client</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={client.name}
                            onChange={handleChange}
                            className="px-2 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md outline focus:outline-2 focus:outline-amber-500 py-1 italic"
                            placeholder='Client full name...'
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={client.email}
                            onChange={handleChange}
                            className="px-2 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md outline focus:outline-2 focus:outline-amber-500 py-1 italic"
                            placeholder='Client email...'
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={client.phone}
                            onChange={handleChange}
                            className="px-2 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md outline focus:outline-2 focus:outline-amber-500 py-1 italic"
                            placeholder='Client phone number...'
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                        <FaUser className="mr-2" /> Update Client
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditClient
