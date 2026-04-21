import { useEffect, useState } from 'react';
import { AppContext } from '../../features/app_context/AppContext';
import type { UserType } from '../../entities/user/model/UserType';
import type ToastData from '../../features/app_context/ToastData';
import type CartType from '../../entities/cart/model/CartType';
import CartDao from '../../entities/cart/api/CartDao';
import './App.css';
import type ModalData from '../../features/modal/ModalData';
import AppRouter from '../router/AppRouter';
import Config from '../../entities/config/Config';
import Modal from './modal/Modal';

declare global {
  interface Number {
        toMoney: () => string;
  }
}

Number.prototype.toMoney = function() : string {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function App() {
  const [user, setUser] = useState<UserType|null>(null);

  const [cart, setCart] = useState<CartType>(CartDao.restoreSaved());
  useEffect(() => {
    CartDao.save(cart);
  }, [cart]);
  
  const [toastData, setToastData] = useState<ToastData|null>(null);
  const [toastQueue, setToastQueue] = useState<Array<ToastData>>([]);

  const dequeueToast = () => {
      setToastQueue(q => q.slice(0, q.length - 1));
  };

  const showToast = (data: ToastData) => {
      setToastQueue([data, ...toastQueue]);
  };

  useEffect(() => {
      // console.log(toastQueue);
      if(toastQueue.length == 0) {
          setToastData(null);
      }
      else {
          // якщо останнє повідомлення не те, що показується, то перемикаємо на нього
          let lastToastData = toastQueue[toastQueue.length - 1];
          if(toastData != lastToastData) {
              setToastData(lastToastData);
              setTimeout(dequeueToast, lastToastData.timeout ?? 2000);
          }
      }
  }, [toastQueue]);

  useEffect(() => {  // useEffect з порожнім масивом "спостереження"
    // виконується одноразово коли елемент вбудовується у DOM
    console.log("App started");
    // на старті перевіряємо наявність у постійному сховищі збережених даних
   const savedUser = window.localStorage.getItem("user-231");
if(savedUser) {
  try {
    const parsedUser = JSON.parse(savedUser);

    if (parsedUser.exp && parsedUser.exp > Date.now() * 10000) {
      setUser(parsedUser);
    }
    else {
      window.localStorage.removeItem("user-231");
    }
  }
  catch(err) {
    console.error("User restore error: ", err);
  }
}

    // повернена дія буде виконана при руйнуванні елемента (вилучення з DOM)
    return () => {
      console.log("App finished");
    };
  }, []);



  
  const [modalData, setModalData] = useState<ModalData|null>(null);
  const showModal = (data:ModalData) => {
    setModalData(data);
  }
  const [isBusy, setBusy] = useState<boolean>(false);

  const request = (url: string, init?: RequestInit) => {
    return new Promise<Response>((resolve, reject) => {
      // реалізуємо свій формат api://... який буде адресуватись до бекенду
      if(url.startsWith("api://")) {
        url = url.replace("api://", Config.backendUrl+"/api/");
        // перевіряємо стан авторизації та додаємо до запиту токен, якщо 
        // він не встановлений ззовні
        if(user) {
          if(!init) {
            init = {};
          }
          if(!init.headers) {
            init.headers = {};
          }
          const headers = new Headers(init.headers);
          if(!headers.has('authorization')) {
            headers.append('authorization', 'Bearer ' + user.token);
            init.headers = headers;
          }
        }
      }
      fetch(url, init).then(resolve).catch(reject);
    });
  };

  return <AppContext.Provider value={{request, isBusy, setBusy, showModal, user, setUser, showToast, cart, setCart}}>
    <AppRouter />

    <div className="toaster">
        {/* <div className="toast-text" style={{display: toastData ? "block" : "none"}}>
            {toastData?.message}
        </div> */}
            {toastQueue.map((td, i) => <div key={i + td.message} className="toast-text">
                {td.message}
            </div>)}
    </div>

    <Modal modalData={modalData} setModalData={setModalData} />
    {isBusy && 
    <div className='preloader'>
      <div className='preloader-content'>
        
      </div>
    </div>}

  </AppContext.Provider>;
}

