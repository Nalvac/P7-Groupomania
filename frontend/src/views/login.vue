<template>
  <main class="main main--connect">
    <form @submit.prevent="login()" class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
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
          <label for="inputUsername">Email</label>
          <input type="email" class="form-control" id="inputEmail"  v-model="email" />
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
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </main>
</template>

<script>
import axios from "axios"
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  methods: {
    login() {
      this.error = false;
      axios.post(
          "http://localhost:3000/api/user/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((user) => {
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user.data.data)); // envoie de données dans le localstorage
          localStorage.setItem("pseudo", user.data.data.pseudo);
          localStorage.setItem("email", user.data.data.email);
          localStorage.setItem("id", user.data.data.id);
          localStorage.setItem("isAdmin", user.data.data.isAdmin);
          localStorage.setItem("token", user.data.token);
          this.$router.replace("/home");
        })
        .catch((e) => {
          this.error = e.response.data.message.replace("Validation error:", "");
        });
    },
  },
};
</script>

<style lang="scss">
    @import "./src/scss/global.scss";
</style>