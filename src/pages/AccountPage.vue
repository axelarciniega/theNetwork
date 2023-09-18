<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="col-8">
    <form @submit.prevent="editProfile">
      <div class="col-6">
        <label for="">Name</label>
        <input v-model="editable.name" maxlength="30" type="text" class="form-control">
      </div>
    <div class="col-6">
        <label for="">Picture</label>
        <input v-model="editable.picture" maxLength="300" type="text" class="form-control">
      </div>
      <div class="col-6">
        <label for="">Bio</label>
        <input rows="10" v-model="editable.bio" maxLength="300" type="text" class="form-control">
      </div>
       <div class="col-6">
        <label for="">Cover Image</label>
        <input rows="10" v-model="editable.coverImg" maxLength="300" type="text" class="form-control">
      </div>
       <div class="col-6">
        <label for="">Class</label>
        <input rows="10" v-model="editable.class" maxLength="23" type="text" class="form-control">
      </div>
      <div class="col-6">
        <button>Save</button>
      </div>
    
    
    
    
    
    
    
    </form>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { accountService } from '../services/AccountService';
import { useRouter } from 'vue-router';





export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    

    watchEffect(() => {
      logger.log(editable.value)
      AppState.account
      editable.value = AppState.account
    })




    return {
      account: computed(() => AppState.account),

      editable,

      async editProfile(){
        try {
          logger.log(editable.value)
          await accountService.editProfile(editable.value)
          Pop.success('Edited Profile Successfully!')
          router.push({name:'Profile', params: {profileId: AppState.account.id}})
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
