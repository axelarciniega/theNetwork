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

    async getPostsByProfileId(creatorId){
        AppState.posts = []
        const res = await api.get(`api/projects?creatorId${creatorId}`)
        AppState.posts = res.data.posts.map(post => new Post(post))
    }

    async createPost(postData){
        const res = await api.post('api/posts', postData)
        logger.log(res.data)
        const newPost = new Post(res.data)
        return newPost
    }

    async removePost(postId){
        const res = await api.delete(`api/posts/${postId}`)
        logger.log('removing',res.data)
        
        let indexToRemove = AppState.posts.findIndex(post => post.id == post.id)
        if(indexToRemove >= 0){
            AppState.posts.splice(indexToRemove, 1)
        }
    }

}

export const postsService = new PostsService()