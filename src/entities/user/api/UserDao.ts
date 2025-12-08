import type { UserType } from "../model/UserType";

export default class UserDao{
    static authenticate (login:string, password:string): Promise<UserType|null>{
        return new Promise((resolve, _) => {
            setTimeout(
                () => {
                    if(login == "user" && password == "123"){
                        resolve({
                            name: "Admin",
                            email: "user@i.ua",
                            address: "Odesa",
                            login: "user",
                            dob:"08/12/2025",
                            imageUrl:"/img/user.png"
                        })
                    }
                    else resolve(null);
                },
                700,
            )
        });
    }

}