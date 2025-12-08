import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Layout from '../../layout/Layout';
import Privacy from '../../pages/privacy/Privacy';
import Section from '../../pages/section/Section';
import Product from '../../pages/product/Product';
import Auth from '../../pages/auth/Auth';
import { AppContext } from '../../features/AppContext';
import { useState } from 'react';
import type { UserType } from '../../entities/user/model/UserType';

export default function App() {
    const [user,setUser] = useState<UserType|null>(null);

    return <AppContext.Provider value ={{user,setUser}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path='auth' element={<Auth />} />
                    <Route path='privacy' element={<Privacy />} />
                    <Route path = 'product/:slug' element ={<Product />}/>
                    <Route path = 'section/:slug' element ={<Section />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </AppContext.Provider>
}

