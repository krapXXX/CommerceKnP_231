import type IRestResponse from "../../rest/model/IRestResponse";
import BaseDao from "../../config/BaseDao";
import type ProductPageType from "../model/ProductPageType";

export default class ProductDao {

    static getProduct(slugOrId:string): Promise<IRestResponse> {
        return new Promise((resolve, reject) => {
            BaseDao.request("http://localhost:8080/java231web/product/" + slugOrId)
            .then(r => r.json())
            .then(j => {
                if(j.meta.dataType == 'object') {
                    resolve(j);
                }
                else {
                    reject(j);
                }
            })
        });
    }
    static getProductAsp(slugOrId:string): Promise<ProductPageType> {
        return new Promise((resolve, reject) => {
            BaseDao.request("api://product/" + slugOrId)
            .then(r => r.json())
            .then(j => {
                if(j.meta.dataType == 'object') {
                    resolve(j.data);
                }
                else {
                    reject(j);
                }
            })
        });
    }

}