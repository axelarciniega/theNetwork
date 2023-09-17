import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class AnnouncementsServices{

    async getRelease(){
        const res = await api.get('api/ads')
        logger.log(res.data)
        AppState.announcement = res.data
        logger.log(AppState.sponsers)
    }


}



export const annoucementsServices = new AnnouncementsServices()