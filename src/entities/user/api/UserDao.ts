import Base64 from "../../../shared/base64/Base64";
import type IRestResponse from "../../../shared/rest/model/IRestResponse";
import Config from "../../config/Config";
import type ISignupData from "../model/ISignupData";
import type { UserType } from "../model/UserType";

export default class UserDao {

    static restoreLocal() {
        
    }

    static signUp(signupData:ISignupData) : Promise<IRestResponse>  {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8080/java231web/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },                                     // узгоджуємо з моделлю бекендa
                body: JSON.stringify({                 //    UserSignupFormModel {
                    name: signupData.name,             //       private String name;
                    email: signupData.email,           //       private String email;  
                    login: signupData.login,           //       private String login;  
                    password: signupData.password      //       private String password;       
                }),
            })
            .then(r => r.json())
            .then(j => {
                resolve(j);
            })
            .catch(reject);
        });
    }    
    
    
static authenticate(
    login: string,
    password: string
): Promise<UserType | null> {

    return new Promise((resolve, reject) => {

        fetch(`http://localhost:8080/java231web/user`, {
            method: "GET",
            headers: {
                "Authorization":
                    "Basic " +
                    Base64.encode(`${login}:${password}`)
            }
        })
        .then(async r => {

            if (!r.ok) {
                resolve(null);
                return;
            }

            const token = await r.text();

            resolve({
                name: login,
                email: "",
                login: login,
                imageUrl: "/img/user.jpg",
                address: "",
                dob: "",
                token: token,
                exp: 0
            });
        })
        .catch(reject);
    });
}
static signUpAndAuthenticate(
    signupData: ISignupData
): Promise<UserType | null> {

    return UserDao.signUp(signupData)
        .then(result => {

            if (result.status.isOk) {
                return UserDao.authenticate(
                    signupData.login,
                    signupData.password
                );
            }

            return null;
        });
}

    static authenticateAsp(login:string, password:string) : Promise<UserType|null> {
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
                        })
                    }
                    else resolve(null);
                },
                700,
            )
        });
    }
}