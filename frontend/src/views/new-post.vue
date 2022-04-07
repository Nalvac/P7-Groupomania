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
    </form>
    <div class="d-flex flex-row justify-content-around form-content">
        <button @click="addPost()" v-if="this.postId === 'null'" class="btn btn-primary">Publier</button>            
        <button @click="modifyPost(this.postId)" v-if="this.postId != 'null' " class="btn btn-success">Modifer</button>
        <router-link  class="btn btn-danger" to="/home" tag="button">Annuler</router-link>
        <button @click="deletePost(this.postId)" v-if="this.postId != 'null'" class="btn btn-danger">Supprimer</button>
    </div>
                      
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
      postId: this.$route.params.id,
      error: false,      
      postProfil: "",
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
            if (this.postId === 'null') {
                            this.error = false;
            let formData = new FormData();
            if (this.file) {
                formData.append("imgUrl", this.file);
            }
            formData.append("author", this.author);
            formData.append("post", this.message);
            formData.append("posterId", this.posterId);
            formData.append("postProfil", localStorage.getItem("imgProfil"));
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
                
                alert(e.response.data.message);
 
                });
            }else {
              if (this.postId != 'null'){
                this.modifyPost(this.postId)
              }
            }
        },
        
    deletePost (id) {
            if (confirm('Voulez vous supprimer ce post ?') == true){
            axios
            .delete(`http://localhost:3000/api/post/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then(() => {                   
            axios
                .delete(`http://localhost:3000/api/comment/post/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                })
                .then(() => {                    
                    alert("Votre message est supprimé."); 
                    this.$router.replace("/home");
                });
                 
                     this.$router.replace("/home");
            })
            .catch((e) => {              
                alert(e.response.data.message);
            });
          }
          else {
              console.log('Non')
          }
    },
    getOnePost(id) {
    axios
        .get(`http://localhost:3000/api/post/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((posts) => {
           this.message = posts.data.data.post;
          this.file = posts.data.data.imgUrl;
        });

      axios
        .get(`http://localhost:3000/api/comment/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((comments) => {
          this.comments = comments.data.comments;
        });
    },
    modifyPost(id) {
      this.error = false;
      let formData = new FormData();
      if (this.file != null){
      formData.append("imgUrl", this.file);
      }
      formData.append("post", this.message);
      axios
        .put(`http://localhost:3000/api/post/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Votre message a bien été modifié");
          
            this.$router.replace("/home");
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    },
        
    },
    created() {
        console.log(this.postId)
        if (this.postId != 'null') {            
         this.getOnePost(this.postId);
        }else {
            this.message = ""
        }
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