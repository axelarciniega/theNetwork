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

    async getPostsByProfileId(profileId){
        AppState.posts = []
        const res = await api.get(`api/posts?creatorId=${profileId}`)
        AppState.posts = res.data.posts.map(post => new Post(post))
    }

    async createPost(postData){
        const res = await api.post('api/posts', postData)
        logger.log(res.data)
        const newPost = new Post(res.data)
        AppState.posts.push(newPost)
        return newPost
    }

    async changePage(url){
        logger.log(url)
        const res = await api.get(url)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.pageNumber = res.data.page
        AppState.totalPages = res.data.totalPages

    }

    async removePost(postId){
        
        const res = await api.delete(`api/posts/${postId}`)
        logger.log('removing',res.data)
        
        let indexToRemove = AppState.posts.findIndex(post => post.id == postId)
        if(indexToRemove >= 0){
            AppState.posts.splice(indexToRemove, 1)
        }
    }

    async likePost(id){
        const res = await api.post(`api/posts/${id}/like`)
        logger.log(res.data)
        let likes = AppState.posts.findIndex(like => like.id == id)
        AppState.posts.splice(likes, 1, res.data)
    }


    async searchPosts(searchTerm){
        const res = await api.get(`api/posts?query=${searchTerm}`)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(post => new Post(post))
        AppState.pageNumber = res.data.page
        AppState.totalPages = res.data.totalPages
        AppState.searchTerm = searchTerm
    }

}

export const postsService = new PostsService()