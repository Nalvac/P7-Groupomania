<template>
    <Header/>
    <div class="form-content">
        <form>            
            <div class="d-flex flex-column align-items-center">
                 <img :src="imgProfil" width="130" class="rounded-circle">
                <div class="form-group">
                <label for="formFile" class="form-label mt-4 primary">Changer votre photo :</label>
                <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    @change="handleFileUpload($event)"
                />
                </div>   
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Pseudo</label>
                <input type="name" class="form-control" id="exampleInputPassword1" v-bind:placeholder="pseudo"  v-model="pseudo">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Poste actuel</label>
                <input type="name" class="form-control" id="exampleInputPassword1" placeholder="Poste actuel"  v-model="poste">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-bind:placeholder="email"  v-model="email">
            </div>
            <div class="d-flex flex-row justify-content-around">
                <button type="submit" class="btn btn-primary" @click="updateProfil(userId)">Enregistrer</button>
                <router-link  class="btn btn-danger" to="/home" tag="button">Annuler</router-link>
            </div>
        </form>
        <div>
            
                <button class="btn btn-dark" @click="deleteUser()">Suppimer mon Compte</button>
        </div>

    </div>
</template>
<script>
import axios from "axios"
import Header from '../components/Header.vue'
export default {
    name: 'Profil',
    components: {
        Header,

    },
    data() {
        return {
            pseudo: localStorage.getItem("pseudo"),
            email: localStorage.getItem("email"),
            userId: localStorage.getItem("id"),
            isAdmin: localStorage.getItem("isAdmin"),
            imgProfil:  localStorage.getItem("imgProfil") ? localStorage.getItem("imgProfil"): "https://cdn-icons-png.flaticon.com/512/64/64572.png",
            poste: localStorage.getItem("poste"),
            file: "",
        }
    },
    created() {

    },
    methods: {
         handleFileUpload(event){            
            this.file = event.target.files[0];
        },
        updateProfil(id) {
            let formData = new FormData();
            if (this.file) {
                console.log('fil');
                formData.append("imgProfil", this.file);
            }
            formData.append("pseudo", this.pseudo);
            formData.append("email", this.email);
            formData.append("poste", this.poste);
            console.log(formData);
            axios
                .put(`http://localhost:3000/api/user/${id}`,formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ` + localStorage.getItem("token"),
                },
                })
                .then((user) => {
                     console.log(user);
                     localStorage.setItem("user", JSON.stringify(user.data)); // envoie de données dans le localstorage
                     localStorage.setItem("pseudo", user.data.data.pseudo);
                     localStorage.setItem("email", user.data.data.email);
                     localStorage.setItem("id", user.data.data.id);                     
                     localStorage.setItem("imgProfil", user.data.data.imgProfil);
                alert("Votre profil a été modifié.");
                this.$router.replace("/home");
                })
                .catch((e) => {
                this.error = e.response.data.message
                    .replace("Validation error:", "")
                    .split(",")[0];

                });
        },
        deleteUser() {
            axios
            .delete(`http://localhost:3000/api/user/${this.userId}`, {
            // récupération de tous les posts d'un utilisateur
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ` + localStorage.getItem("token"),
            },
            })
            .then(response => {
            // suppression du localstorage
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("pseudo");
            localStorage.removeItem("email");
            localStorage.removeItem("isAdmin");
            localStorage.removeItem("id");
            alert("Votre compte a été supprimé." + response);
            this.$router.replace("/");
            });
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
    .rounded-circle {
      border-radius: 200px !important;
    }

</style>
