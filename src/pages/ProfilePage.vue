<template>
    This is the profile page
</template>

<script>
import { computed, onMounted } from 'vue';
import { profilesService } from '../services/ProfilesService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';





export default {
setup() {
    onMounted(() => {
        getProfileById()
    });
    const route = useRoute()
    async function getProfileById(){
        try {
            await profilesService.getProfileById(route.params.profileId)
        } catch (error) {
            Pop.error(error)
        }
    }
  return {
    profile: computed(() => AppState.activeProfile)
  };
},
};
</script>


<style>
</style>