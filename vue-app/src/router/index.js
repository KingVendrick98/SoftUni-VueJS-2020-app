import Vue from "vue";
import VueRouter from "vue-router";
import {
  store
} from "../store";
import Home from "../components/Home.vue";
import Register from "../authentication/Register.vue";
import Login from "../authentication/Login.vue";
import Profile from "../authentication/Profile.vue";
import CreatePost from "../components/CreatePost.vue";
import EditPost from "../components/EditPost.vue";
import VW from "../components/VW.vue";
import SinglePost from "../components/SinglePost.vue";
import AUDI from "../components/AUDI.vue";
import BMW from "../components/BMW.vue";
import MERCEDES from "../components/MERCEDES.vue";

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
    },
    {
      path: "/user-detail",
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (store.state.isLoggedIn) {
          next(true);
        } else {
          next("/login");
        }
      }
    },
    {
      path: "/edit-post/:id",
      component: EditPost,
      beforeEnter: (to, from, next) => {
        if (store.state.isLoggedIn) {
          next(true);
        } else {
          next("/login");
        }
      },
      props: true
    },
    {
      path: "/create-post",
      component: CreatePost,
      beforeEnter: (to, from, next) => {
        if (store.state.isLoggedIn) {
          next(true);
        } else {
          next("/login");
        }
      }
    },
    { path: "/VW-posts", component: VW },
    { path: "/AUDI-posts", component: AUDI },
    { path: "/BMW-posts", component: BMW },
    { path: "/MERCEDES-posts", component: MERCEDES },
    { path: "/single-post/:id", component: SinglePost, props: true }
  ]
});