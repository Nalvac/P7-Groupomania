<template>
    <Header />
    <form class="form-content" @submit.prevent="addPost()">            
        <div >
            <textarea  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Quoi de neuf ?" v-model="message" required />
        <div class="form-group">
          <label for="formFile" class="form-label mt-4">Image :</label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="handleFileUpload($event)"
          />
        </div>         
            <div id="emailHelp" class="form-text text-muted"> <img  ></div>
        </div>
        <div class="d-flex flex-row justify-content-around">
            <button type="submit" class="btn btn-primary">Publier</button>
            <button type="cancel" class="btn btn-danger">Annuler</button>
        </div>
    </form>
</template>
<script>

import Header from '../components/Header.vue';
import axios from "axios"
export default {
    name: 'newPost',
    data() {
    return {
      message: "",
      file: "",
      author: localStorage.getItem("pseudo"),
      posterId: localStorage.getItem("id"),
      error: false,      
      imgProfil: localStorage.getItem("imgProfil"),
    };
  },
    components: {
        Header
    },
    methods: {
        handleFileUpload(event){            
            this.file = event.target.files[0];
        },
        addPost() {
            this.error = false;
            let formData = new FormData();
            if (this.file) {
                formData.append("imgUrl", this.file);
            }
            formData.append("author", this.author);
            formData.append("post", this.message);
            formData.append("posterId", this.posterId);
            console.log(formData);
            axios
                .post(`http://localhost:3000/api/post`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ` + localStorage.getItem("token"),
                },
                })
                .then(() => {
                alert("Votre mesage a été ajouté.");
                this.$router.replace("/home");
                })
                .catch((e) => {
                this.error = e.response.data.message
                    .replace("Validation error:", "")
                    .split(",")[0];

                });
        },
        
    }
}
</script>

<style scoped lang="scss">

    .form-content{
        margin-top: 6rem !important;
        width: 50%;
        margin: 0 auto;
    }


</style>