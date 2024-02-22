import { RequestMethod } from "./authApi"
import { instance as axiosClient } from "./axiosClient"

class StorageApi {
    handleData = async (path: string, method?: RequestMethod, data?: any) => {
        try {
            const res = await axiosClient[method || 'get'](path, {
                data: data
            })

            return res
        } catch (error) {
            console.log('>>>Error', error);
        }
    }
}

export const storageApi = new StorageApi()