<template>
    <Header/>
    <div class="form-content">
        <form>            
            <div class="d-flex flex-column align-items-center">
                 <img src="https://i.imgur.com/UXdKE3o.jpg" width="70" class="rounded-circle">
                 <a href="#" class="color: primary">Changer votre photo</a>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Nom</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Nom">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Prenom</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Prenom">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Pseudo</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Pseudo">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Poste actuel</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Poste actuel">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Adresse Email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="d-flex flex-row justify-content-around">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
                <button type="submit" class="btn btn-danger">Annuler</button>
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
