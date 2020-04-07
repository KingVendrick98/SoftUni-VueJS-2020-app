import Vue from "vue";
import VueRouter from "vue-router";
import {
  store
} from "../store";
import Home from "../components/Home.vue";
import Register from "../authentication/Register.vue";
import Login from "../authentication/Login.vue";
// import UserDetail from "./auth/UserDetail.vue";
// import CreatePost from "./core/CreatePost.vue";
// import EditPost from "./core/EditPost.vue";
// import VW from "./core/VW.vue";
// import SinglePost from "./core/SinglePost.vue";
// import AUDI from "./core/AUDI.vue";
// import BMW from "./core/BMW.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [{
      path: "/",
      component: Home
    },
    {
      path: "/register",
      component: Register,
      beforeEnter: (to, from, next) => {
        if (!store.state.isLoggedIn) {
          next(true);
        } else {
          next("/");
        }
      }
    },
    {
      path: "/login",
      component: Login,
      beforeEnter: (to, from, next) => {
        if (!store.state.isLoggedIn) {
          next(true);
        } else {
          next("/");
        }
      }
    }
  ]
});