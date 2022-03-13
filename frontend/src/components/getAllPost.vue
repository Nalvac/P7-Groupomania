<template>
  <Header /> 
  <Post    
    v-for="post in posts"
    :key="post"
    :author="post.author"
    :post="post.post"
    :posterId="post.posterId"
    :imgUrl="post.imgUrl"
  />
</template>
<script>

import axios from "axios"
import Header from "../components/Header.vue";
import Post from "../components/post.vue";
export default {
  name: "AllPost",
  components: {
    Header,
    Post,
  },
  data() {
    return {
      posts: []
    }
  },
  methods: { },
  created() {
    axios
      .get("http://localhost:3000/api/post", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("token"),
        },
      })
      .then((post) => {
        this.posts = post.data.data; 
      });
  },
}

</script>