import { err } from "react-native-svg"
import { instance as authInstance } from "./axiosClient"

export type RequestMethod = 'get' | 'post' | 'put' | 'delete'

class AuthApi {
    HandleAuthentication = async (path: string, method?: RequestMethod, data?: any) => {
        try {
            const res = await authInstance[method || 'get'](path, {
                data: data,
            })
            return res
        } catch (error) {
            console.log('>>>Error', error);
            return
        }
    }
}

export const authApi = new AuthApi()