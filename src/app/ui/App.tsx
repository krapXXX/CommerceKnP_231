import { AppContext } from '../../features/app_context/AppContext';
import { useEffect, useState } from 'react';
import type { UserType } from '../../entities/user/model/UserType';
import type ToastData from '../../features/app_context/ToastData';
import type CartType from '../../entities/cart/model/CartType';
import CartDao from '../../entities/cart/api/CartDao';
import type ModalData from '../../features/modal/ModalData';
import Modal from './modal/Modal';
import "./App.css"
import AppRouter from '../router/AppRouter';

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
     <AppRouter/>
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

