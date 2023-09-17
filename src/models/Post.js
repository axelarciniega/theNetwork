

export class Post{
    constructor(data){
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl || ''
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.posts = data.posts
        this.creator = data.creator
        this.createdAt = new Date(data.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    }
}