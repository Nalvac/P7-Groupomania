<template>
  <main class="main main--connect">
    <form class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
      <div
        class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch"
      >
        <img class="logo align-self-end" src="../assets/icon.svg" alt="Logo Groupomania" />
        <p>
          <small>
            Vous n'avez pas encore de compte,
            <router-link class="redirection-singup" to="/signUp">enregistrez-vous</router-link>
          </small>
        </p>
      </div>
      <div class="block-demi-container p-3">
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <input type="text" class="form-control" id="inputUsername" v-model="dataLogin.username" />
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="dataLogin.password"
          />
        </div>
        <button type="submit" class="btn btn-primary" @click="login">Submit</button>
      </div>
    </form>
  </main>
</template>

<script>
 
    export default {
        name : 'Login',
        data (){
            return {
                dataLogin : {
                    username: null,
                    password: null
                }
            }
        },
        computed :  {

        },
        methods : {
            login(){
                if (this.dataLogin.username != null && this.dataLogin.password != null){
                    
                    console.log( this.dataLogin);
                }
            }
        }

    }

</script>

<style lang="scss">
    @import "./src/scss/global.scss";
</style>