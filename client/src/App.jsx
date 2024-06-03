import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ClientList from './pages/clients/ClientList';
import CreateClient from './pages/clients/CreateClient';
import EditClient from './pages/clients/EditClient';
import OrderList from './pages/orders/OrderList';
import CreateOrder from './pages/orders/CreateOrder';
import EditOrder from './pages/orders/EditOrder';

function App() {
    return (
        <div className='mx-auto flex flex-col gap-2'>
            <Router>
                <Header />
                <main className='mx-auto flex flex-col gap-2 mt-2 mb-4'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='clients' element={<ClientList />} />
                        <Route path='clients/create' element={<CreateClient />} />
                        <Route path='clients/:id/edit' element={<EditClient />} />
                        <Route path='orders' element={<OrderList />}/>
                        <Route path='orders/create' element={<CreateOrder />} />
                        <Route path='orders/:id/edit' element={<EditOrder />} />
                    </Routes>
                </main>
            </Router>
        </div>
    )
}

export default App
