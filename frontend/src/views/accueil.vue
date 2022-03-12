<template>
  <Header />
  <Post/>
</template>
<script>

import Header from "../components/Header.vue";
import Post from "../components/post.vue";
export default {
  name: "Accueil",
  components: {
    Header,
    Post,
  }
}

</script>