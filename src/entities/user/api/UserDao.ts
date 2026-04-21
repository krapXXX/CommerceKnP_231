import Base64 from "../../../shared/base64/Base64";
import Config from "../../config/Config";
import type { UserType } from "../model/UserType";

export default class UserDao {

    static authenticate(login:string, password:string) : Promise<UserType|null> {
        return new Promise((resolve, reject) => {
            fetch(`${Config.backendUrl}/User/SignIn/jwt`, {
                method: "GET",
                headers: {
                    "Authorization": "Basic " + Base64.encode(`${login}:${password}`)
                }
            })
            .then(r => r.json())
            .then(j => {
                console.log(j);
                if(j.status == 200) {
                    // декодуємо токен j.data
                    const payload = JSON.parse(
                        Base64.decodeUrl(
                            j.data.split('.')[1]));

                    console.log(payload);
                 resolve({
    name: payload.name,
    email: payload.email,
    address: "Одеса, Садова 3",
    login: payload.sub,
    dob: payload.dob,
    imageUrl: payload.ava || "/img/user.jpg",
    token: j.data,
    exp: payload.exp,
});
                }
                else {
                    resolve(null);
                    // alert("Вхід скасовано");
                }
            })
            .catch(reject);
        });
    }

    static authenticateMock(login:string, password:string) : Promise<UserType|null> {
        return new Promise((resolve, _) => {
            setTimeout(
                () => {
                    if(login == "user" && password == "123") {
                       resolve({
    name: "Досвічений користувач",
    email: "user@i.ua",
    address: "Одеса, Садова 3",
    login: "user",
    dob: "08 грудня 2025",
    imageUrl: "/img/user.jpg",
    token: "---",
    exp: Date.now() * 10000 + 10 * 60 * 1000 * 10000,
})
                    }
                    else resolve(null);
                },
                700,
            )
        });
    }
}