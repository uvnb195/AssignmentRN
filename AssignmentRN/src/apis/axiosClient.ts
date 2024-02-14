import axios from "axios";
import { BASE_URL } from "../constants";
import queryString from "query-string";


export const instance = axios.create({
    baseURL: BASE_URL,
    paramsSerializer: (params) => queryString.stringify(params)
})