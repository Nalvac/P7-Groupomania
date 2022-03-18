<template class="">
<div class="content">
    <div class="container mt-5 mb-2">
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-md-6 border border-secondary">
                <div class="card">
                    <div class="d-flex justify-content-between p-2 px-3">
                        <div class="d-flex flex-row align-items-center"> <img src="https://i.imgur.com/UXdKE3o.jpg" width="50" class="rounded-circle">
                            <div class="d-flex flex-column ml-2"> <span class="font-weight-bold">{{ author }}</span> <small class="text-primary">Collegues</small> </div>
                        </div>
                        <div class="d-flex flex-row mt-1 ellipsis"> <small class="mr-2">{{ updatedAt }}</small> <i class="fa fa-ellipsis-h"></i> </div>
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
            comments: [],
            countComments: 0,
            getPost: false,
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
  },

  methods: {
      addComment(id) {
          console.log(id);
        axios
        .post(
          "http://localhost:3000/api/comment",
          {
            comment: this.commentContent,
            author: this.author,
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
            this.$commentContent = "";
            
            axios
            .get(`http://localhost:3000/api/comment/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then((comments) => {
              this.getPost = true;
              this.$comments = comments.data.comments;
              this.countComments = this.$comments.length;
              console.log(this.countComments);
            });

        },(error)=>{
            console.log(error)
        })
      }
  },
    created() {
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
    padding-top: 5px;
}

</style>