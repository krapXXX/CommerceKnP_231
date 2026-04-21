import Config from "./Config";

export default class BaseDao {
    static request = (url: string, init?: RequestInit, token?:string) => {
        return new Promise<Response>((resolve, reject) => {
          // реалізуємо свій формат api://... який буде адресуватись до бекенду
          if(url.startsWith("api://")) {
            url = url.replace("api://", Config.backendUrl + "/api/");
            // перевіряємо стан авторизації та додаємо до запиту токен, якщо 
            // він не встановлений ззовні
            if(token) {
              if(!init) {
                init = {};
              }
              if(!init.headers) {
                init.headers = {};
              }
              const headers = new Headers(init.headers);
              if(!headers.has('authorization')) {
                headers.append('authorization', 'Bearer ' + token);
                init.headers = headers;
              }
            }
          }
          fetch(url, init).then(resolve).catch(reject);
        });
      };
}