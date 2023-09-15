import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"





class PostsService{

    async getPosts(){
        const res = await api.get('api/posts')
        logger.log(res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))

    }


}

export const postsService = new PostsService()