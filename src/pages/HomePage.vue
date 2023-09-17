<template>
  <div class="container">

    <section class="row">
      <div v-for="a in annoucement" :key="a.linkURL">
        <img class="ad-pic" :src="a.banner" alt="">
      </div>
      <!-- <Annoucement :annouement="a"/> -->
      
    </section>
  </div>

  <div class="container">
    <searchBar/>
  </div>






  <div class="container">

    <section class="row my-4">
      <PostForm/>
    </section>
  </div>

  <div class="container">
    <section class="row">
      <div v-for="post in posts" :key="post.id">
        <PostCard :post="post"/>
      </div>
    </section>
  </div>

  <div class="container">
    <section v-if="!searchTerm" class="row justify-content-between">
      <button @click="changePage(pageNumber -1)" :disabled="pageNumber <= 1" class="col-3">Newer Posts ⬅️</button>
      <button @click="changePage(pageNumber+1)"  class="col-3">Older posts ➡️</button>
    </section>
    <section v-else class="row">
      <button @click="changePageWithSearch(pageNumber -1)" :disabled="pageNumber <= 1" class="col-3">Newer Posts👈</button>
      <button @click="changePageWithSearch(pageNumber +1)" :disabled="pageNumber >= totalPages" class="col-3" >Older Posts👉</button>
    </section>
  </div>

</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState';
import { annoucementsServices } from '../services/AnnouncementsServices';


export default {
  setup() {
    onMounted(() => {
      getPosts()
      getRelease()
    })

    async function getRelease(){
      try {
        await annoucementsServices.getRelease()
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getPosts(){
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {

      async changePage(number){
        try {
          await postsService.changePage(`api/posts?page=${number}`)
        } catch (error) {
          Pop.error(error)
        }
      },

      async changePageWithSearch(number){
        try {
          const searchTerm = AppState.searchTerm
          await postsService.changePage(`api/posts?query=${searchTerm}&page=${number}`)
        } catch (error) {
          Pop.error(error)
        }
      },


      posts: computed(() => AppState.posts),
      pageNumber: computed(() => AppState.pageNumber),
      totalPages: computed(() => AppState.totalPages),
      annoucement: computed(() => AppState.announcement)

    }
  }
}
</script>

<style scoped lang="scss">

.ad-pic{
  width: 150vh;
  height: 25vh;
}
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
