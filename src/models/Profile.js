

export class Profile{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.bio = data.bio
        this.class = data.class
        this.coverImg = data.coverImg
        this.email = data.email 
        this.github = data.github
        this.picture = data.picture 
        this.resume = data.resume 
        this.linkedin = data.linkedin
    }
}