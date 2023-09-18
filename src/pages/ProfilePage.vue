<template>



    <div v-if="profile" class="container">
        <section class="row cover-image">
            <div class="col-12 d-flex justify-content-center ">
                    <img class="profile-pic rounded-pill" :src="profile.picture" alt="">
                </div>
                <div class=" text-light col-12 d-flex justify-content-center">
                    <h1>{{ profile.name }}</h1>
                </div>
                <p class="text-light d-flex justify-content-center">{{ profile.bio }}</p>
                <div class="container text-light background-cover justify-content-center">
                    <div class="col-4">
                        <h3 >About {{ profile.name }}</h3>
                    </div>
                    <div class="col-4">
                        <h6>{{ profile.email }}</h6>
                    </div>
                    <div class="col-4">
                        {{ profile.github }}
                    </div>
                    <div class="col-4">
                        <p v-if="profile.graduated == true">🎓</p>
                        <p v-else>Not graduated</p>
                    </div>
                    <div class="col-4">
                        {{ profile.class }}
                    </div>
                    <div class="col-4">
                        {{ profile.linkedin }}
                    </div>
                </div>
        </section>

        <section v-if="account.id == profile.id" class="row my-4">
           <PostForm/>
        </section>

    

        <section class="row">
            <div class="col-12 text-center">{{ profile.name }}'s posts'</div>
            <div v-for="post in posts" :key="post.id" >
            <PostCard :post="post"/>
            </div>
        </section>

       

    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { profilesService } from '../services/ProfilesService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';
import { postsService } from '../services/PostsService';





export default {
setup() {
    onMounted(() => {
        getPostsByProfileId()
        getProfileById()
    });
    const route = useRoute()
    async function getPostsByProfileId(){
        try {
            await postsService.getPostsByProfileId(route.params.profileId)
        } catch (error) {
            Pop.error(error)
        }
    }
    async function getProfileById(){
        try {
            await profilesService.getProfileById(route.params.profileId)
        } catch (error) {
            Pop.error(error)
        }
    }
  return {
    posts: computed(() => AppState.posts),
    profile: computed(() => AppState.activeProfile),
    coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
    account: computed(() => AppState.account),


   

  };
},
};
</script>



<style>

.cover-image{
    background-image: v-bind(coverImg);
    min-height: 30vh;
    max-height: 90vh;
    background-position: center;
    background-size: cover;

}

.profile-pic{
    height: 100px;
    width: 100px;
    border-radius: 50%;
}

.background-cover{
    background-color: rgba(0, 0, 0, 0.455);
    backdrop-filter: blur(5px);
}



</style>