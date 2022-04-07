<template>
  <Header /> 
  <Post  
    
    v-for="(post, index) in posts"
    :key="post"
    :author="post.author"
    :post="post.post"
    :posterId="post.posterId"
    :imgUrl="post.imgUrl"
    :id="post.id"
    :postProfil="post.postProfil"
    :comments="comments[index]"
    :cunt="cunt[index]"
    :updatedAt="
        new Date(post.updatedAt).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      "
      :createdAt="
        new Date(post.createdAt).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })
      "
    
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
      posts: [],
      comments: [],
      cunt: [],
      index: Number
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
        for(let i=0 ; i<this.posts.length ; i++ ) {
            axios
            .get(`http://localhost:3000/api/comment/${this.posts[i].id}`, {
            headers: {
                "Content-Type": "application/json",                
                Authorization: `Bearer ` + localStorage.getItem("token"),
            },
            })
            .then((comments) => {
              this.comments.push((comments.data.comments));

              this.cunt.push((comments.data.comments.length));
              console.log(this.comments)
            });
        }
      });
  },
}

</script>

<style scoped lang="scss">

</style>