<template>
  <div class="wrapper">
    <div class="header">
      <h1>Welcome to Max Throttle</h1>
      <h3>Sign up NOW ! And don't miss you'r daily dosage of tires and oil.</h3>
    </div>
    <div class="vw">
      <h2>Recent post from VW</h2>
      <div class="single-item" v-for="post in getVWData" :key="post.uid">
        <router-link :to="'/single-post/' + post.uid">
          <div class="div-img">
            <img :src="post.imgUrl" alt />
          </div>
          <h3>{{post.title}}</h3>
          <p>{{post.content | sliceData}}</p>
        </router-link>
      </div>
    </div>
    <div class="audi">
      <h2>Recent post from AUDI</h2>
      <div class="single-item" v-for="post in getAUDIData" :key="post.uid">
        <router-link :to="'/single-post/' + post.uid">
          <div class="div-img">
            <img :src="post.imgUrl" alt />
          </div>
          <h3>{{post.title}}</h3>
          <p>{{post.content | sliceData}}</p>
        </router-link>
      </div>
    </div>
    <div class="bmw">
      <h2>Recent post from BMW</h2>
      <div class="single-item" v-for="post in getBMWData" :key="post.uid">
        <router-link :to="'/single-post/' + post.uid">
          <div class="div-img">
            <img :src="post.imgUrl" alt />
          </div>
          <h3>{{post.title}}</h3>
          <p>{{post.content | sliceData}}</p>
        </router-link>
      </div>
    </div>
    <div class="mercedes">
      <h2>Recent post from MERCEDES</h2>
      <div class="single-item" v-for="post in getMERCEDESData" :key="post.uid">
        <router-link :to="'/single-post/' + post.uid">
          <div class="div-img">
            <img :src="post.imgUrl" alt />
          </div>
          <h3>{{post.title}}</h3>
          <p>{{post.content | sliceData}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchPosts");
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    getVWData() {
      return this.$store.state.posts
        .filter(post => post.category == "vw")
        .slice(-3);
    },
    getAUDIData() {
      return this.$store.state.posts
        .filter(post => post.category == "audi")
        .slice(-3);
    },
    getBMWData() {
      return this.$store.state.posts
        .filter(post => post.category == "bmw")
        .slice(-3);
    },
    getMERCEDESData() {
      return this.$store.state.posts
        .filter(post => post.category == "mercedes")
        .slice(-3);
    }
  },
  filters: {
    sliceData(val) {
      return val.slice(0, 100) + "...";
    }
  }
};
</script>

<style scoped>
.header {
  margin: 30px auto;
  padding: 30px 150px;
  text-align: center;
}
h1,
h2,
h3,
h4 {
  color: #be0e0e;
}
h2 {
  color: white;
  padding: 10px 0;
  background-color: #000000;
  text-align: center;
}
.single-item {
  width: 30%;
  height: 360px;
  margin: 15px;
  padding: 15px;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  background-color: rgb(216, 216, 216);
  box-shadow: 0 0 10px -6px #000000;
}
.div-img {
  width: 80%;
  height: 180px;
  margin: 0 auto;
  padding: 10px;
  display: inline-block;
}
img {
  width: 100%;
}
.vw,
.audi,
.bmw,
.mercedes {
  text-align: center;
}
</style>