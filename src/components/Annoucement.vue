<template>
    <div v-if="annoucement" class="col-12">
        <img class="img-fluid" :src="a.banner" alt="">
    </div>
    
</template>

<script>


export default {
    props: {annoucement: {type: Object, required: true}},
setup() {
  return {};
},
};
</script>


<style>
</style>