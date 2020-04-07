<template>
  <div id="regForm" class="wrapper">
    <h1>Sign up now!</h1>
    <form @submit.prevent="registerFormHandler">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="$v.name.$model" />
        <template v-if="$v.name.$error">
          <p class="alert" v-if="!$v.name.required">You must surely have name ?</p>
          <p class="alert" v-else-if="!$v.name.minLength">The name must be at least 3 characters</p>
        </template>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="$v.email.$model" />
        <template v-if="$v.email.$error">
          <p class="alert" v-if="!$v.email.required">Email is required</p>
          <p class="alert" v-else-if="!$v.email.email">Invalid email</p>
        </template>
      </div>
      <div class="form-group">
        <label for="phone">Phone number:</label>
        <input id="phone" type="number" v-model.number="$v.phone.$model" />
        <template v-if="$v.phone.$error">
          <p class="alert" v-if="!$v.phone.required">Phone number is required</p>
          <p class="alert" v-else-if="!$v.phone.decimal">Phone number must be valid</p>
        </template>
      </div>
      <div class="form-group">
        <label for="imgUrl">Image:</label>
        <input id="imgUrl" type="url" v-model="$v.imgUrl.$model" />
        <template v-if="$v.imgUrl.$error">
          <p class="alert" v-if="!$v.imgUrl.required">To continue an image is required</p>
          <p class="alert" v-else-if="!$v.imgUrl.url">Not valid url</p>
        </template>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="$v.description.$model" />
        <template v-if="$v.description.$error">
          <p class="alert" v-if="!$v.description.required">The description is required</p>
          <p class="alert" v-else-if="!$v.description.minLength">Minimum of characters is 10</p>
          <p class="alert" v-else-if="!$v.description.maxLength">Maximum of characters is 600</p>
        </template>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="$v.password.$model" />
        <template v-if="$v.password.$error">
          <p class="alert" v-if="!$v.password.required">The password is required</p>
          <p class="alert" v-else-if="!$v.password.minLength">Password must be minimum 8 symbols</p>
          <p class="alert" v-else-if="!$v.password.maxLength">Password must be maximum 24 symbols</p>
        </template>
      </div>
      <div class="form-group">
        <label for="rePassword">Confirm password:</label>
        <input id="rePassword" type="password" v-model.trim="$v.rePassword.$model" />
        <template v-if="$v.rePassword.$error">
          <p class="alert" v-if="!$v.rePassword.sameAsPass">Passwords are not the same</p>
        </template>
      </div>
      <button :disabled="$v.$invalid">Register</button>
    </form>
    <p>
      <router-link to="/login">You have account? Sign in now</router-link>
    </p>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
  url,
  sameAs,
  decimal
} from "vuelidate/lib/validators";
import { db } from "../main";
import firebase from "firebase";
export default {
  mixins: [validationMixin],
  data() {
    return {
      name: "",
      email: "",
      imgUrl: "",
      password: "",
      rePassword: "",
      phone: "",
      description: ""
    };
  },
  methods: {
    registerFormHandler() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.setUserData(data.user);
          this.$router.replace("/login");
        })
        .catch(err => {
          console.error(err);
        });
      console.log("Form send");
    },
    setUserData(user) {
      const userRef = db.doc(`users/${user.uid}`);
      const userData = {
        uid: user.uid,
        email: user.email,
        imageURL: this.imgUrl,
        publicName: this.name,
        phone: this.phone,
        description: this.description
      };

      return userRef.set(userData, { merge: true });
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      decimal
    },
    description: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(600)
    },
    imgUrl: {
      required,
      url
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(24)
    },
    rePassword: {
      sameAsPass: sameAs("password")
    }
  }
};
</script>

<style scoped>
#regForm {
  width: 50%;
  margin-top: 30px;
  background-color: white;
  padding: 30px;
}
textarea {
  height: 80px;
}
input,
textarea {
  width: 100%;
  padding: 8px 0;
  margin: 0;
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
  background-color: #000000;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
button:disabled {
  border: none;
  background-color: #eee;
  color: #ff0000;
  cursor: wait;
  font-weight: bold;
}
.alert {
  color: red;
  padding: 0;
  margin: 0 0 10px 0;
  font-size: smaller;
  
}
.form-group {
  margin: 20px 0;
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