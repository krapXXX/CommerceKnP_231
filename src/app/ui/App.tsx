import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Layout from '../../layout/Layout';
import Privacy from '../../pages/privacy/Privacy';
import Section from '../../pages/section/Section';
import Product from '../../pages/product/Product';
import Auth from '../../pages/auth/Auth';
import { AppContext } from '../../features/app_context/AppContext';
import { useEffect, useState } from 'react';
import type { UserType } from '../../entities/user/model/UserType';
import type ToastData from '../../features/app_context/ToastData';
import type CartType from '../../entities/cart/model/CartType';
import Cart from '../../pages/cart/Cart';

declare global {
    interface Number {
        toMoney: () => string;
    }
}

Number.prototype.toMoney = function (): string {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


export default function App() {
    const [user, setUser] = useState<UserType | null>(null);
    const [cart, setCart] = useState<CartType>({ items: [], price: 0 });

    const [toastData, setToastData] = useState<ToastData | null>(null);
    const [toastQueue, setToastQueue] = useState<Array<ToastData>>([]);

    const dequeueToast = () => {
        setToastQueue(q => q.slice(0, q.length - 1));
    };
    const showToast = (data: ToastData) => {
        setToastQueue([data, ...toastQueue]);
    };
    useEffect(() => {
        console.log(toastQueue);
        if (toastQueue.length == 0) {
            setToastData(null);
        }
        else {
            // якщо останнє повідомлення не те, що показується, то перемикаємо на нього
            let lastToastData = toastQueue[toastQueue.length - 1];
            if (toastData != lastToastData) {
                setToastData(lastToastData);
                setTimeout(dequeueToast, lastToastData.timeout ?? 2000);
            }
        }
    }, [toastQueue]);

    return <AppContext.Provider value={{ user, setUser,showToast,cart,setCart }}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path='auth' element={<Auth />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='privacy' element={<Privacy />} />
                    <Route path='product/:slug' element={<Product />} />
                    <Route path='section/:slug' element={<Section />} />
                </Route>
            </Routes>
        </BrowserRouter>
        <div className="toaster">
            {toastQueue.map((td,i) => <div key ={i+td.message} className="toast-text">
                {td.message}
            </div>)}
        </div>
    </AppContext.Provider>
}

