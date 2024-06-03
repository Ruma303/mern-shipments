import React from 'react'
import { FaSpinner, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useQuery, useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../../queries/clientQueries';
import { DELETE_CLIENT } from '../../mutations/clientMutations';
import { Link } from 'react-router-dom';

const ClientList = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    const [deleteClient] = useMutation(DELETE_CLIENT);
    //refetchQueries: [{ query: GET_CLIENTS }] // Consente di recuperare i dati aggiornati

    const handleDeleteClient = (id) => {
        console.log('Deleting ' + id);
        deleteClient({
            variables: { id },
            update(cache) {
                const { clients } = cache.readQuery({ query: GET_CLIENTS });
                cache.writeQuery({
                    query: GET_CLIENTS,
                    data: {
                        clients: clients.filter((client) => client.id !== id)
                    }
                });
            }
        });
    }

    if (loading) return <FaSpinner className="animate-spin" />;
    if (error) return <p>Error :(</p>

    return (
        <div className='flex flex-col items-center p-4 gap-2'>
            <section className="flex flex-col p-4 gap-2 items-center">
                <h1 className='text-3xl font-semibold text-center mb-2'>Clients</h1>
                <Link to='/clients/create' className='bg-emerald-500 text-white font-semibold hover:scale-105 flex items-center gap-1 px-2 py-1 rounded'>
                <FaPlus /> Add Client</Link>
            </section>
            {!loading && !error && (
                <table className='min-w-full table-fixed border-collapse border border-slate-500 '>
                    <thead>
                        <tr className='bg-sky-300'>
                            <th className='py-2 px-4 border border-slate-600'>#</th>
                            <th className='py-2 px-4 border border-slate-600'>Name</th>
                            <th className='py-2 px-4 border border-slate-600'>Email</th>
                            <th className='py-2 px-4 border border-slate-600'>Phone</th>
                            <th className='py-2 px-4 border border-slate-600'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map(({ id, name, email, phone }, index) => (
                            <tr key={id}>
                                <td className='py-2 px-4 border border-slate-600 font-semibold'>{index + 1}</td>
                                <td className='py-2 px-4 border border-slate-600'>{name}</td>
                                <td className='py-2 px-4 border border-slate-600'>{email}</td>
                                <td className='py-2 px-4 border border-slate-600'>{phone}</td>
                                <td className='py-2 px-4 border border-slate-600 flex gap-4 items-center'>
                                    <Link to={`/clients/${id}/edit`}>
                                        <FaEdit className='bg-yellow-400 p-2 w-8 h-8 rounded hover:scale-105' />
                                    </Link>
                                    <button className='bg-red-500 p-2 w-8 h-8 rounded hover:scale-105'>
                                        <FaTrashAlt onClick={() => handleDeleteClient(id)} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ClientList