<template>
    <div v-if="post" class="card elevation-5 selectable my-3">
        <section class="row">
            <div class="col-5">
                <h3> <img class="profile-pic" :src="post.creator.picture" alt="">{{ post.creator.name }}</h3>
                <Span>{{ post.createdAt.toLocaleTimeString() }}</Span>
            </div>
            <div class="text-center mt-3">
                <i>{{ post.body }}</i>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <img class="post-picture" :src="post.imgUrl" alt="">
            </div>
            
        </section>
    </div>
</template>

<script>
import { Post } from '../models/Post';

export default {
    props: {post: {type: Post, required: true }},
setup() {
  return {};
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