<template>
  <div id="app">
    <Navbar/>
    <div class="container" v-if="user.isLoggedIn===true">
      <div id="div1">
        <h4>Watched Tags</h4>
        <form @submit.prevent="editMyTags">
          <tags-input element-id="tags" v-model="$store.state.tags" :typeahead="true"></tags-input>
          <button type="submit" class="btn btn-secondary">Save Tag</button>
        </form>
        <div class="d-flex justify-content-center flex-wrap">
          <div v-for="(tag, index) in $store.state.tags" :key="index">
            <button type="button" class="btn btn-link" @click.prevent="clickTag(tag)">{{tag}}</button>
          </div>
        </div>
      </div>
      <div
        v-if="$store.state.user.isLoggedIn===true && $store.state.tagged===true"
        class="container"
      >
        <button type="button" class="btn btn-light" @click.prevent="clearTag">Clear Tag</button>
      </div>
    </div>
    <router-view @sign-in="signIn" @sign-up="signUp"/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#div1 {
  margin: 20px auto;
  padding: 10px 10px 0px 10px;
  border: 3px solid black;
  border-radius: 8px;
}
</style>

<script>
import axios from "@/api/axios.js";
import Toast from "@/api/sweetalert.js";
import Navbar from "@/components/Navbar.vue";
import VoerroTagsInput from "@voerro/vue-tagsinput";
import { mapState } from "vuex";
export default {
  components: {
    Navbar,
    "tags-input": VoerroTagsInput
  },
  data() {
    return {
      myTags: [],
      showTag: true
    };
  },
  methods: {
    editMyTags() {
      this.$store.dispatch('editWatchedTag', this.$store.state.tags)
    },
    clickTag(tag) {
      this.$store.dispatch("getTag", tag);
    },
    showAdd() {
      this.showTag = false;
    },
    signIn(payload) {
      axios
        .post("/users/signin", {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          this.$router.push("/");
          Toast.fire({
            type: "success",
            title: "Signed up successfully"
          });
          this.$store.dispatch("sign", {
            status: true,
            id: localStorage.getItem("id")
          });
          this.$store.dispatch("getAllQuestion");
          this.$store.dispatch("getMyTag");
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    signUp(payload) {
      axios
        .post("/users/signup", {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          this.$router.push("/signin");
          Toast.fire({
            type: "success",
            title: "Signed up successfully"
          });
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    clearTag() {
      this.$store.dispatch("getAllQuestion");
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/");
      this.$store.dispatch("sign", {
        status: true,
        id: localStorage.getItem("id")
      });
      this.$store.dispatch("getAllQuestion");
      this.$store.dispatch("getMyTag");
    } else {
      this.$router.push("/signin");
      this.$store.dispatch("sign", { status: false, id: "" });
    }
  },
  computed: mapState(["user"])
};
</script>

