<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <form class="contact-form" @submit.prevent="sendEmail">
      <div class="contact-form_title">Contact us now! Don't hesitate</div>
      <div class="separator"></div>
      <label for="user_name">Name</label>
      <input
        type="text"
        v-model="user.user_name"
        id="user_name"
        name="user_name"
        class="form-control"
        :class="{ 'is-invalid': submitted && $v.user.user_name.$error }"
      />
      <div
        v-if="submitted && !$v.user.user_name.required"
        class="invalid-feedback"
      >First Name is required</div>
      <div class="separator"></div>
      <label for="user_email">Email</label>
      <input
        type="email"
        v-model="user.user_email"
        id="user_email"
        name="user_email"
        class="form-control"
        :class="{ 'is-invalid': submitted && $v.user.user_email.$error }"
      />
      <div v-if="submitted && $v.user.user_email.$error" class="invalid-feedback">
        <span v-if="!$v.user.user_email.required">Email is required</span>
        <span v-if="!$v.user.user_email.email">Email is invalid</span>
      </div>
      <div class="separator"></div>
      <label for="message">Message</label>
      <input
        type="text"
        v-model="user.message"
        id="message"
        name="message"
        class="form-control"
        :class="{ 'is-invalid': submitted && $v.user.message.$error }"
      />
      <div
        v-if="submitted && !$v.user.message.required"
        class="invalid-feedback"
      >Minimum 30 letters are required.</div>
      <input class="button" type="submit" value="Send" />
    </form>
  </form>
</template>

<script>
import emailjs from "emailjs-com";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "Contact",
  data() {
    return {
      user: {
        user_name: "",
        user_email: "",
        message: ""
      },
      submitted: false
    };
  },
  validations: {
    user: {
      user_name: { required },
      user_email: { required, email },
      message: { required, minLength: minLength(30) }
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    },
    sendEmail: e => {
      emailjs
        .sendForm(
          "default_service",
          "template_mh2BAzWs",
          e.target,
          "user_9k2vtw6uOvJC7LXy2r6qS"
        )
        .then(
          result => {
            alert("Thank you for your message. It has been sent.", result.status, result.text);
          },
          error => {
            console.log("FAILED...", error);
          }
        );
    }
  }
};
</script>

<style>
body {
  background: #f1f1f1;
  font-family: "Roboto", sans-serif;
}

.contact-form {
  font-family: 16px;
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
}

.contact-form .separator {
  border-bottom: solid 1px #ccc;
  margin-bottom: 15px;
}

.contact-form_title {
  color: #333;
  text-align: center;
  font-size: 40px;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea {
  border: solid 1px #e8e8e8;
  font-family: "Roboto", sans-serif;
  padding: 10px 7px;
  margin-bottom: 15px;
  outline: none;
}

.contact-form textarea {
  resize: none;
}

.contact-form .button {
  background: #ffffff;
  border: solid 1px #ff0000;
  color: rgb(255, 0, 0);
  cursor: pointer;
  padding: 10px 50px;
  text-align: center;
  text-transform: uppercase;
}

.contact-form .button:hover {
  background: #000000;
  border: solid 1px #ff0000;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea,
.contact-form .button {
  font-size: 15px;
  border-radius: 3px;
}
</style>