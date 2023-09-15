<template>
    🐄{{ post.body }}
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
</style>