import axios from "axios";
import { BASE_URL } from "../constants";
import queryString from "query-string";

export type RequestMethod = 'get' | 'post' | 'put' | 'delete'


const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    paramsSerializer: (params) => queryString.stringify(params)
})

class Api {
    HandleRequest = async (path: string, method: RequestMethod, data?: any) => {
        try {
            const res = data ? await instance[method](path, {
                data: data
            }) : await instance[method](path)
            return res.data
        } catch (err: any) {
            console.log("err handle request from web", err);
            return { status: 400, message: "Error get todos" }
        }
    }
}

export const api = new Api()