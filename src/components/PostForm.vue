<template>
    <div class="col-3">

                <div class="selectable" data-bs-toggle="collapse" data-bs-target="#collapse1" >Post</div>
            </div>

            <div class="collapse collapse-horizontal" id="collapse1">

            <form @submit.prevent="createPost">
                <div class="col-4">
                    <textarea required maxlength="300" v-model="postData.body" class="form-control" type="text" placeholder="Say Something" style="height: 100px"></textarea>
                </div>
                <div class="col-3">
                    <input v-model="postData.imgUrl" type="url" class="form-control" placeholder="Image Url">
                </div>
                <button>Create Post</button>
                </form>
          </div>
</template>

<script>
import { ref } from 'vue';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService';




export default {
setup() {
    const postData = ref({})
  return {
    postData,
    async createPost(){
        try {
            logger.log('Creating Post',postData.value)
            await postsService.createPost(postData.value)
            postData.value = {}
            Pop.success('Success on creating post!')
        } catch (error) {
            Pop.error(error)
        }
    }
  };
},
};
</script>


<style>
</style>