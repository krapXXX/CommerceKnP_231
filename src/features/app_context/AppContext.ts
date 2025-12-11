import { createContext } from "react"
import type { UserType } from "../../entities/user/model/UserType";
import type ToastData from "./ToastData";

type AppContextType = {
    user: UserType|null,
    setUser: (input: UserType|null) => void,
    showToast:(data:ToastData)=>void
}

const init:AppContextType = {
    user:null,
    setUser: (_) => {
        throw "Not Implemented 'SetUser'"
},
 showToast: (_) => {
        throw "Not Implemented 'showToat'"
}
}

const AppContext = createContext<AppContextType>(init);

export{AppContext}
