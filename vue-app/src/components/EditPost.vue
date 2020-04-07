<template>
  <div class="wrapper">
    <div id="topicForm">
      <h1>Edit post</h1>
      <form @submit.prevent="editPost">
        <div class="form-group">
          <label for="title">Title:</label>
          <input id="title" type="text" v-model="$v.title.$model" />
          <template v-if="$v.title.$error">
            <p class="alert" v-if="!$v.title.required">The title is required</p>
            <p class="alert" v-else-if="!$v.title.minLength">The title must be min 8 chars</p>
            <p class="alert" v-else-if="!$v.title.maxLength">The title must be below 70 chars</p>
          </template>
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea id="content" v-model="$v.content.$model"></textarea>
          <template v-if="$v.content.$error">
            <p class="alert" v-if="!$v.content.required">The content is required</p>
            <p class="alert" v-else-if="!$v.content.minLength">The content must be min 100 chars</p>
            <p class="alert" v-else-if="!$v.content.maxLength">The content must be below 2000 chars</p>
          </template>
        </div>
        <div class="form-group">
          <label for="imgUrl">Upload image :</label>
          <input id="imgUrl" type="url" v-model="$v.imgUrl.$model" />
          <template v-if="$v.imgUrl.$error">
            <p class="alert" v-if="!$v.imgUrl.required">The image url is required</p>
            <p class="alert" v-else-if="!$v.imgUrl.url">Not valid url</p>
          </template>
        </div>
        <div class="form-group">
          <p>Select category:</p>
          <input type="radio" id="vw" name="category" value="vw" v-model="category" />
          <label class="radio" for="vw">VW</label>
          <input type="radio" id="audi" name="category" value="audi" v-model="category" />
          <label class="radio" for="audi">AUDI</label>
          <input type="radio" id="bmw" name="category" value="bmw" v-model="category" />
          <label class="radio" for="bmw">Bmw</label>
          <input type="radio" id="mercedes" name="category" value="mercedes" v-model="category" />
          <label class="radio" for="mercedes">MERCEDES</label>
          <template v-if="$v.category.$error">
            <p class="alert" v-if="!$v.category.required">You must select a category</p>
          </template>
        </div>
        <button :disabled="$v.$invalid">Edit post</button>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import { db } from "../main";
export default {
  mixins: [validationMixin],
  props: ["id"],
  data() {
    return {
      title: "",
      content: "",
      imgUrl: "",
      category: ""
    };
  },
  methods: {
    editPost() {
      let data = {
        title: this.title,
        content: this.content,
        imgUrl: this.imgUrl,
        category: this.category
      };
      db.collection("categories")
        .doc(this.id)
        .set(data, { merge: true })
        .then(() => {
          let url = "/single-post/" + this.id;
          this.$router.replace(url);
        });
    }
  },
  created() {
    let data = this.$store.state.posts.filter(post => post.uid == this.id)[0];
    (this.title = data.title),
      (this.content = data.content),
      (this.imgUrl = data.imgUrl),
      (this.category = data.category);
  },
  validations: {
    title: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(70)
    },
    content: {
      required,
      minLength: minLength(100),
      maxLength: maxLength(2000)
    },
    imgUrl: {
      required,
      url
    },
    category: {
      required
    }
  }
};
</script>

<style scoped>
#topicForm {
  width: 50%;
  margin: 30px auto;
  background-color: white;
  padding: 30px;
}
input {
  width: 100%;
  padding: 7px 0;
  margin: 0;
  display: inline-block;
  border: none;
  border-bottom: 1px solid #000000;
}
input[type="radio"] {
  width: auto;
  margin: 0 10px;
  display: inline-block;
}
textarea {
  width: 100%;
  height: 200px;
  padding: 7px 0;
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
  color: rgb(255, 0, 0);
  font-size: 16px;
  cursor: pointer;
}
button:disabled {
  border: none;
  background-color: #eee;
  color: #000000;
  cursor: progress;
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
  color: #b94242;
}
h1 {
  text-align: center;
}
</style>