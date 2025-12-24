import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Layout from '../../features/layout/Layout';
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
import CartDao from '../../entities/cart/api/CartDao';
import type ModalData from '../../features/modal/ModalData';
import Modal from './modal/Modal';
import "./App.css"

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
    const [cart, setCart] = useState<CartType>(CartDao.restoreSaved());
    useEffect(() => {
        CartDao.save(cart);
    }, [cart]);

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
            let lastToastData = toastQueue[toastQueue.length - 1];
            if (toastData != lastToastData) {
                setToastData(lastToastData);
                setTimeout(dequeueToast, lastToastData.timeout ?? 2000);
            }
        }
    }, [toastQueue]);

    useEffect(() => {
        // useEffect з порожнім масивом "спостереження"
        // виконується одноразово коли елемент вбудовується у DOM
        console.log("App started");

        const savedUser = window.localStorage.getItem("user-231");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            }
            catch (err) {
                console.error("User restore error: ", err);
            }

        }

        // повернена дія буде виконана при руйнуванні елемента (вилучення з DOM)
        return () => {
            console.log("App finished");
        };
    }, []);

    const [modalData, setModalData] = useState<ModalData | null>(null);
    const showModal = (data: ModalData) => {
        setModalData(data);
    }

    const[isBusy, setBusy] = useState<boolean>(false);

    return <AppContext.Provider value={{isBusy, setBusy, showModal, user, setUser, showToast, cart, setCart }}>
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
            {toastQueue.map((td, i) => <div key={i + td.message} className="toast-text">
                {td.message}
            </div>)}
        </div>
        <Modal modalData={modalData} setModalData={setModalData} />
    {isBusy &&
    <div className = "preloader">
        <div className = "preloader-content">

        </div>
    </div>}
    
    </AppContext.Provider>
}

