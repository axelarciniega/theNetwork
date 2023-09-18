<template>
    <form @submit.prevent="searchPosts" class="row">
        <div class="col-12 input-group">
            <input  type="text" class="form-control" placeholder="search posts" v-model="searchTerm">
            <button>🔍</button>
        </div>
    </form>
    <div v-if="activeSearch" class="mt-4">
    Searching results for:
    <span>{{ activeSearch }}</span>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { postsService } from '../services/PostsService';

export default {
setup() {
    const searchTerm = ref('')
  return {
    searchTerm,
    activeSearch: computed(() => AppState.searchTerm),

    async searchPosts(){
        try {
            logger.log(searchTerm.value)
            await postsService.searchPosts(searchTerm.value)
            
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