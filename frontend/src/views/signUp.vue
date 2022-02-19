<template>
  <main class="main main--connect">
    <form class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
      <div
        class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch"
      >
        <img class="logo align-self-end" src="../assets/icon.svg" alt="Logo Groupomania" />
        <p>
          <small>
            Vous avez déjà un compte,
            <router-link class="redirection-singup" to="/login">connecter-vous</router-link>
          </small>
        </p>
      </div>
      <div class="block-demi-container p-3">
        <div class="form-group">
          <label for="inputEmail">Email Groupomania</label>
          <input type="email" class="form-control" id="inputEmail"  />
        </div>
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <input type="text" class="form-control" id="inputUsername"  />
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
          />
        </div>
        <button  @click.prevent="signUp"  type="submit" class="btn btn-primary" >Submit</button>
      </div>
    </form>
  </main>
</template>

<script>
  
import axios from "axios";
  export default {
    name : 'SignUp',
    data (){
      return {
        dataSignUp :  {
          username: null,
          email: null,
          password: null
        }
      }
    },
    methods : {
      
      signUp(){
        console.log('1');
          axios.post(
          "http://localhost:8080/api/user/signup",
          {
            email: this.email,
            pseudo: this.username,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      }
    }
  }
</script>

<style lang="scss">
  
    @import "./src/scss/global.scss";
</style>
