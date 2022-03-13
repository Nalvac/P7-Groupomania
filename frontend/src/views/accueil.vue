<template>
  <Header />
  <AllPost  />
</template>
<script>
import Header from "../components/Header.vue";
import AllPost from "../components/getAllPost.vue"
export default {
  name: "Accueil",
  components: {
    Header,
    AllPost,
  },
  data() {
    return {
      posts: []
    }
  },
  methods: { },

}

</script>