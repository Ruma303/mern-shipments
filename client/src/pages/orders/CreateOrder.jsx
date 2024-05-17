import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../../mutations/clientMutations';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const [addClient] = useMutation(ADD_CLIENT);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && phone) {
            addClient({ variables: { name, email, phone } });
            setName('');
            setEmail('');
            setPhone('');
            navigate('/clients');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mb-2">Create a new order</h1>
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="px-2 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md outline focus:outline-2 focus:outline-emerald-500 py-1 italic"
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-2 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md outline focus:outline-2 focus:outline-emerald-500 py-1 italic"
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="px-2 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md outline focus:outline-2 focus:outline-emerald-500 py-1 italic"
                            placeholder='Client phone number...'
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        <FaUser className="mr-2" /> Add Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateOrder
