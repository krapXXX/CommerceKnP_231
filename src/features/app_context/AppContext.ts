import { createContext } from "react"
import type { UserType } from "../../entities/user/model/UserType";
import type ToastData from "./ToastData";
import type CartType from "../../entities/cart/model/CartType";

interface AppContextType {
    user: UserType | null,
    setUser: (input: UserType | null) => void,
    showToast: (data: ToastData) => void,
    cart: CartType,
    setCart: (input: CartType) => void,
}


const init:AppContextType = {
    user:null,
    setUser: (_) => {
        throw "Not Implemented 'SetUser'"
},
 showToast: (_) => {
        throw "Not Implemented 'showToat'"
},
cart: { items: [], price: 0 },
setCart: (_) => {
    throw "Not Implemented 'setCart'";
},

}

const AppContext = createContext<AppContextType>(init);

export{AppContext}
