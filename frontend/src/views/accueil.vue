<template>
  <AllPost  />
  <h1> </h1>
</template>
<script>
import AllPost from "../components/getAllPost.vue"
export default {
  name: "Accueil",
  components: {
    AllPost,
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: { },

}

</script>