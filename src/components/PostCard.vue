<template>
<div v-if="post" class="card elevation-5 selectable my-3">
    <router-link :to="{name: 'Profile', params: {profileId: post?.creatorId}}">

            <section class="row">
            <div class="col-5">
                <h3> <img class="profile-pic" :src="post.creator.picture" alt="">{{ post.creator.name }}</h3>
                <Span>{{ post.createdAt }}</Span>
            </div>
            <div class="text-center mt-3">
                <i>{{ post.body }}</i>
            </div>
            <div v-if="post.imgUrl" class="col-12 d-flex justify-content-center">
                <img class="post-picture" :src="post.imgUrl" alt="">
            </div>
            
            </section>
        </router-link>
            <section  class="row my-4">
            <div class="col-5" v-if="post.creatorId == account.id">

                <button @click.prevent="removePost">Remove Post <i class="mdi mdi-trash"></i></button>
            </div>
            <div class="col-2 d-flex justify-content-end ">
                <span class="selectable" v-if="account.id" @click="likePost(post.id)">👍</span>
                <span v-if="!account.id">Likes:</span>
                {{ post.likeIds.length }}
            </div>
        </section>
        </div>

      

        

</template>

<script>
import { computed } from 'vue';
import { Post } from '../models/Post';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';






export default {
    props: {post: {type: Post, required: true }},
setup(props) {
    
  return {
    account: computed(() => AppState.account),
     profile: computed(() => AppState.activeProfile),



    async likePost(id){
        try {
            await postsService.likePost(id)
        } catch (error) {
            Pop.error(error)
        }
    },

      async removePost(){
        try {
        if(await Pop.confirm('Are you sure you want to remove?')){
            
            await postsService.removePost(props.post.id)
            
            
            Pop.success('Post removed👍')
        }
        } catch (error) {
            Pop.error(error)
        }
    }
  };
},
};
</script>


<style>

.post-picture{
    height: 41vh;
    width: 55vh;
}

.profile-pic{
    height: 30px;
    width: 30px;
    border-radius: 50%;
}

</style>