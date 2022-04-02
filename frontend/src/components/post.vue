
<template class="">
<div class="content">
    <div class="container mt-5 mb-2">
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-md-6 border border-secondary">
                <div class="card">
                    <div class="d-flex justify-content-between p-2 px-3">
                        <div class="d-flex flex-row align-items-center"> <img :src="imgProfil" width="50" class="rounded-circle">
                            <div class="d-flex flex-column ml-2"> <span class="font-weight-bold">{{ author }}</span> <small class="text-primary">{{poste}}</small> </div>
                        </div>
                        <div class="d-flex flex-row mt-1 ellipsis"> <small class="mr-2">{{ updatedAt }}</small> 
                            <i v-if="author === name " id="show-modal" @click="deletePost(id)" class="fa fa-ellipsis-h"></i> 
                        </div>
                           <vue-confirm-dialog></vue-confirm-dialog>
                    </div> <img :src="imgUrl" class="img-fluid">
                    <div class="p-2">
                        <p class="text-justify">{{ post }}</p>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-row icons d-flex align-items-center"> <i class="fa fa-heart"></i> <i class="fa fa-smile-o ml-2"></i> </div>
                            <div class="d-flex flex-row muted-color">
                                <span v-if="!getPost">{{cunt}} Commentaires</span>
                                <span v-if="getPost">{{countComments}} Commentaires</span>
                            </div>
                        </div>
                        <hr>
                        <div class="comments">
                            <div class="comment-input"> <input type="text" class="form-control" v-model="commentContent">
                             
                                <div class="fonts" @click="addComment(id)"
                                type="button" > <i class="fa fa-paper-plane"></i> </div>
                                    
                            </div>
                        </div>
                        <div  v-bind:class="{ 'comment-scroll':comments && comments.length > 3 || commentaires.length > 3}" >
                            <div v-if="!getPost">
                                <div v-for="item in comments" :key="item.comment">
                                    <div  class="commentaires-div">
                                        <h8>{{item.author}}</h8>
                                        <br>
                                        <span class="commentaires-text">{{item.comment}}</span>
                                    <br>
                                    </div>
                                    <div class="commentaires-text" v-if="item.author === name" style="display: flex;
                                        justify-content: space-around;"> 
                                        <a @click="deleteCommentaire(item.id)">Supprimer</a> 
                                        <a >Modifier</a>  
                                    </div>  
                                </div>
                            </div>
                            <div v-if="getPost">
                                <div  v-for="item in commentaires" :key="item.comment">
                                    <div  class="commentaires-div">
                                        <h8>{{item.author}}</h8>
                                        <br>
                                        <span class="commentaires-text">{{item.comment}}</span>
                                    <br>
                                    </div>
                                    <div class="commentaires-text" v-if="item.author === name" style="display: flex;
                                        justify-content: space-around;"> 
                                        <a  @click="deleteCommentaire(item.id)">Supprimer</a> 
                                        <a >Modifier</a>   
                                    </div>                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>
</template>
<script>
import axios from "axios"
export default {
    name: 'Post',
    data() {
         return {
            commentContent: "",
            poste: localStorage.getItem("poste"),
            countComments: 0,
            getPost: false,
            commentaires: "",
            name: localStorage.getItem('pseudo'),
            imgProfil:  localStorage.getItem("imgProfil") ? localStorage.getItem("imgProfil"): "https://cdn-icons-png.flaticon.com/512/64/64572.png",

        }
    },
      props: {
    // interractions avec le composant parent
    author: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    posterId: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    cunt: {
      type: Number,
      required: true,
    },
    comments: {
        type: Array
    }
  },

  methods: {
      addComment(id) {
          console.log(id);
        axios
        .post(
          "http://localhost:3000/api/comment",
          {
            comment: this.commentContent,
            author: localStorage.getItem("pseudo"),
            postId: id,
            commenterId: this.commenterId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
            console.log(res);
            
            axios
            .get(`http://localhost:3000/api/comment/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then((comments) => {
              this.getPost = true;
              this.commentaires = comments.data.comments;
              console.log(this.commentaires)
              this.countComments = comments.data.comments.length;
            });

        },(error)=>{
            console.log(error)
        })
      },
      deleteCommentaire(id) {
          console.log(id);
         axios
        .delete(`http://localhost:3000/api/comment/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        }).then(
            () => {                
              alert("votre commentaire a bien été supprimé.");
              this.$router.go();
            },
            () => {}
        )
      },
      deletePost(id) {
          if (confirm('Voulez vous supprimer ce post ?') == true){
            axios
            .delete(`http://localhost:3000/api/post/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then(() => {                
            alert("Vo;tre message est supprimé.");           
            this.$router.go();    
            this.axios
                .delete(`http://localhost:3000/api/comment/post/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                })
                .then(() => {
                    alert("Vo;tre message est supprimé.");            
                    this.$router.go();
                });
                 this.$router.go();
            });
          }
          else {
              console.log('Non')
          }
      }
      
  },
    created() {
        console.log (localStorage.getItem('pseudo'));
  }
}
</script>
 
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");
@import "./src/scss/global.scss";
body {
    background-color: #eee;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    margin-top: 10%;
}
.form-inline {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
}
.add-post{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
    margin-top: 11px;
    margin-left: 17px;
    width: 100%;
    overflow: hidden;
}
.searchBar{
    margin-top: 5rem !important;
    margin-bottom: 1rem !important;
}

.card {
    border: none
}

.ellipsis {
    color: #a09c9c
}

hr {
    color: #a09c9c;
    margin-top: 4px;
    margin-bottom: 8px
}

.muted-color {
    color: #a09c9c;
    font-size: 13px
}

.ellipsis i {
    margin-top: 3px;
    cursor: pointer
}

.icons i {
    font-size: 25px
}

.icons .fa-heart {
    color: #3b5998
}

.icons .fa-smile-o {
    color: yellow;
    font-size: 29px
}

.rounded-image {
    border-radius: 50% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px
}

.name {
    font-weight: 600
}

.comment-text {
    font-size: 12px
}

.status small {
    margin-right: 10px;
    color: blue
}

.form-control {
    border-radius: 26px
}

.comment-input {
    position: relative
}

.fonts {
    position: absolute;
    right: 13px;
    top: 8px;
    color: #a09c9c
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: none
}
.content {
    padding-top: 36px;
}
.commentaires-div {
    margin-top: 5px;
    padding: 10px;
    background-color: aliceblue;
    border-radius: 20px;
    text-align: start;
}
.commentaires-text{
    font-size: 13.5px;
}
.comment-scroll{
    height: 210px;
    overflow-y: scroll;
}
a{
    font-size: 12px;
    cursor: pointer;
    color: rgb(70, 70, 245);

}
a:hover{
    text-decoration: underline;        
    color: rgb(70, 70, 245);
}

</style>