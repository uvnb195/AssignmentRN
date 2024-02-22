import axios from "axios";
import { BASE_URL } from "../constants";
import queryString from "query-string";


export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    paramsSerializer: (params) => queryString.stringify(params)
})