<template>
    <Header />
    <form class="form-content">            
        <div class="form-group">
            <textarea type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Quoi de neuf ?" />
            <div id="emailHelp" class="form-text text-muted"><a href="#">Ajouter une Image à votre post</a></div>            
            <div id="emailHelp" class="form-text text-muted"> <img  ></div>
        </div>
        <div class="d-flex flex-row justify-content-around">
            <button type="submit" class="btn btn-primary">Publier</button>
            <button type="submit" class="btn btn-danger">Annuler</button>
        </div>
    </form>
</template>
<script>

import Header from '../components/Header.vue'
export default {
    name: 'new',
    components: {
        Header
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