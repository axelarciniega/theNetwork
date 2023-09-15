<template>
<div v-if="post" class="card elevation-5 selectable my-3">
    <router-link :to="{name: 'Profile', params: {profileId: post?.creatorId}}">

            <section class="row">
            <div class="col-5">
                <h3> <img class="profile-pic" :src="post.creator.picture" alt="">{{ post.creator.name }}</h3>
                <Span>{{ post.createdAt.toLocaleTimeString() }}</Span>
            </div>
            <div class="text-center mt-3">
                <i>{{ post.body }}</i>
            </div>
            <div v-if="post.imgUrl" class="col-12 d-flex justify-content-center">
                <img class="post-picture" :src="post.imgUrl" alt="">
            </div>
            
            </section>
        </router-link>
        
        </div>

          <!-- <section v-if="account.id == profile.id" class="row my-4">
            <div class="col-5">

                <button @click.prevent="removePost">Remove Post <i class="mdi mdi-trash"></i></button>
            </div>
        </section> -->

        

</template>

<script>
import { computed } from 'vue';
import { Post } from '../models/Post';
import { AppState } from '../AppState';




export default {
    props: {post: {type: Post, required: true }},
setup() {
  return {
    account: computed(() => AppState.account)
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