<template>
    <Header/>
    <div class="form-content">
        <form>            
            <div class="d-flex flex-column align-items-center">
                 <img src="https://i.imgur.com/UXdKE3o.jpg" width="70" class="rounded-circle">
                 <a href="#" class="color: primary">Changer votre photo</a>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Pseudo</label>
                <input type="name" class="form-control" id="exampleInputPassword1" v-bind:placeholder="pseudo">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Poste actuel</label>
                <input type="name" class="form-control" id="exampleInputPassword1" placeholder="Poste actuel">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-bind:placeholder="email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="d-flex flex-row justify-content-around">
                <button type="submit" class="btn btn-primary" @click="updateProfil()">Enregistrer</button>
                <button type="cancel" class="btn btn-danger">Annuler</button>
            </div>
        </form>
    </div>
</template>
<script>
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
        }
    },
    created() {

    },
    methods: {}
}
</script>
<style scoped lang="scss">
    .form-content{
        margin-top: 6rem !important;
        width: 50%;
        margin: 0 auto;
    }

</style>
