import { createContext } from "react"
import type { UserType } from "../entities/user/model/UserType";

type AppContextType = {
    user: UserType|null,
    setUser: (input: UserType|null) => void,
}

const init:AppContextType = {
    user:null,
    setUser: (_) => {
        throw "Not Implemented"
}
}

const AppContext = createContext<AppContextType>(init);

export{AppContext}
