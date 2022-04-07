<template>
  <nav class="navbar-light bg-light d-flex flex-row justify-content-between align-items-center">
    <div class="logo">
      <router-link class="navbar " to="/home">
        <img alt="Logo Groupomania" src="../assets/icon-left-font-monochrome-black.png" />
      </router-link>
    </div>
    <div class="searchBar">
        <form class="form-inline">            
             <img :src="imgProfil" width="50" class="rounded-circle">
            <input class="form-control mr-sm-2" type="search" placeholder="Quoi de neuf ?😎" aria-label="Search"  disabled="disabled" >
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="addPost">Ajouter un post ✔</button>
        </form>
    </div>
      <ul class="navbar-nav mt-2 mt-lg-0 d-flex flex-row  justify-content-between ">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Accueil</router-link>
        </li>
        <li class="nav-item" >
          <router-link class="nav-link" to="/profil">
            <i class="user-icon fas fa-user"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <button type="button" class="btn btn-primary disconnect" @click="disconnect">Déconnexion</button>
        </li>
      </ul>
  </nav>
</template>
<script>
 export default {
  name: 'Header',
  data() {
    return {
      
      imgProfil:  localStorage.getItem("imgProfil"),
    }
  },
  methods: {
    addPost (){
        this.$router.push({ name: 'new', params: { id: 'null' } });
    },
    disconnect(){
      localStorage.removeItem("user"); // suppression du localstrorage
      localStorage.removeItem("token");
      localStorage.removeItem("pseudo");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");      
      localStorage.removeItem("imgProfil");
      localStorage.removeItem("id");
      this.$router.replace("/")
    }
  }
}
</script>
<style lang='scss'>
nav {
  height: 80px;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  
  min-width: 830px;
  top: 0;
  left: 0;
  z-index: 10000;
  .logo{
    img{
      height: 140px;
      object-fit: contain;
    }
  }
  .btn {
    margin-top: 0;
  }
  ul{
    width: 203px;
    margin-right: 2%;
  }
  .disconnect{
    right: 10;
  }
  .rounded-circle {
      border-radius: 200px !important;
      margin-right: 10px;
  }
}

</style>