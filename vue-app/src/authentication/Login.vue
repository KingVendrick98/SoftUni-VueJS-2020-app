<template>
  <div class="wrapper">
    <div id="loginForm">
      <h1>Login to Max Throttle</h1>
      <form @submit.prevent="loginHandler">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" v-model="$v.email.$model" placeholder="Enter your email" />
          <template v-if="$v.email.$error">
            <p class="alert" v-if="!$v.email.required">Email is required</p>
            <p class="alert" v-else-if="!$v.email.email">Invalid email</p>
          </template>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            id="password"
            type="password"
            v-model="$v.password.$model"
            placeholder="Enter your password"
          />
          <template v-if="$v.password.$error">
            <p class="alert" v-if="!$v.password.required">Password is required</p>
          </template>
        </div>
        <button :disabled="$v.$invalid">Login</button>
      </form>
      <p>
        <router-link to="/register">Don`t have account? Sign up now!</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import firebase from "firebase";

export default {
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",
      isLogedIn: true
    };
  },
  methods: {
    loginHandler() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          this.$store.dispatch("updateUser", res.user.uid);
          this.$store.dispatch("login");
          this.$router.replace("/");
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }
};
</script>

<style scoped>
#wrapper {
  width: 1280px;
  margin: 0 auto;
}
#loginForm {
  width: 50%;
  margin: 30px auto;
  background-color: white;
  padding: 30px;
}
input {
  width: 100%;
  padding: 7px 0;
  margin: 10px 0;
  display: inline-block;
  border: none;
  border-bottom: 1px solid #000000;
}

label {
  display: inline-block;
  font-size: 16px;
  color: #000000;
  cursor: pointer;
  font-weight: bold;
}
button {
  width: 100%;
  margin: 10px 0;
  padding: 7px 40px;
  border: none;
  display: inline-block;
  background-color: #ff0000;
  color: white;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
}
button:disabled {
  border: none;
  background-color: #eee;
  color: #ff0000;
  cursor: progress;
  font-weight: bold;
}
.alert {
  color: red;
  padding: 0;
  margin: -8px 0 10px 0;
  font-size: smaller;
}
a {
  text-decoration: none;
  color: #ff0000;
  font-weight: bold;
}
h1 {
  text-align: center;
}
</style>