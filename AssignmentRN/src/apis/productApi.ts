import { err } from "react-native-svg";
import { RequestMethod } from "./authApi"
import { instance as axiosClient } from "./axiosClient";

class ProductApi {
    HandleEvent = async (path: string, method: RequestMethod, data?: any) => {
        try {
            const res = await axiosClient[method || "get"](path, {
                data: data
            }).catch(err => err.response)
            return res.data
        } catch (err) {
            console.log(">>>Error handling product event");
        }
    }
}

export const productApi = new ProductApi()