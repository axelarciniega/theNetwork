import { AppState } from "../AppState"
import { api } from "./AxiosService"



class AnnouncementsServices{

    async getRelease(){
        const res = await api.get('api/ads')
        logger.log(res.data)
        AppState
    }


}



export const annoucementsServices = new AnnouncementsServices()