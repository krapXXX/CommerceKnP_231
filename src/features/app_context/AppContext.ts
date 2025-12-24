import { createContext } from "react"
import type { UserType } from "../../entities/user/model/UserType";
import type ToastData from "./ToastData";
import type CartType from "../../entities/cart/model/CartType";
import type ModalData from "../modal/ModalData";

interface AppContextType {
    user: UserType | null,
    setUser: (input: UserType | null) => void,
    showToast: (data: ToastData) => void,
    showModal: (data:ModalData) => void,
    setBusy: (isBusy:boolean) => void,
isBusy:boolean,
    cart: CartType,
    setCart: (input: CartType) => void,
}


const init:AppContextType = {
    user:null,
    isBusy:false,
    setUser: (_) => {
        throw "Not Implemented 'SetUser'"
},
 showToast: (_) => {
        throw "Not Implemented 'showToat'"
},
showModal: (_) => {
        throw "Not Implemented 'showModal'";
    },
cart: { items: [], price: 0 },
setCart: (_) => {
    throw "Not Implemented 'setCart'";
},
setBusy:(_)=>
{
    throw "Not Implemented 'setBusy'";

}

}

const AppContext = createContext<AppContextType>(init);

export{AppContext}
