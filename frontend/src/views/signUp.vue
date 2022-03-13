<template>
  <main class="main main--connect">
    <form @submit.prevent="signup()" class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
      <div
        class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch"
      >
        <img class="logo align-self-end" src="../assets/icon.svg" alt="Logo Groupomania" />
        <p>
          <small>
            Vous avez déjà un compte,
            <router-link class="redirection-singup" to="/">connecter-vous</router-link>
          </small>
        </p>
      </div>
      <div class="block-demi-container p-3">
        <div class="form-group">
          <label for="inputEmail">Email Groupomania</label>
          <input type="email" class="form-control" id="inputEmail"  v-model="email" />
        </div>
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <input type="text" class="form-control" id="inputUsername"  v-model="pseudo"/>
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
             v-model="password"
          />
        </div>
        <button  type="submit" class="btn btn-primary" >Submit</button>
      </div>
    </form>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </main>
</template>

<script>
  
  import axios from "axios"
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      pseudo: "",
      password: "",
      error: false,
    };
  },
  methods: {
    // fonction d'inscription
    signup() {
      this.error = false;
      axios
        .post(
          // inscription
          "http://localhost:3000/api/user/signup",
          {
            email: this.email,
            pseudo: this.pseudo,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((user) => {
        localStorage.setItem("user", JSON.stringify(user.data.data));
        localStorage.setItem("pseudo", user.data.data.pseudo);
        localStorage.setItem("email", user.data.data.email);
        localStorage.setItem("id", user.data.data.id);
        localStorage.setItem("isAdmin", user.data.data.isAdmin);
        localStorage.setItem("token", user.data.token);
        alert("Votre inscription est validé.");
        this.$router.replace("/home");
        })
        .catch( error => {
          this.error = error.response.data.message.replace("Validation error:", "");
        });
    },
  },
};
</script>

<style lang="scss">
  
    @import "./src/scss/global.scss";
</style>
