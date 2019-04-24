<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <a href="#" class="navbar-brand">
      <i class="fab fa-stack-overflow"></i>
      HacktivOverFlow
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navigation"
      aria-controls="navigation"
      aria-expanded="false"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navigation">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item" v-if="user.isLoggedIn===true">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item" v-if="user.isLoggedIn===true">
          <router-link class="nav-link" data-toggle="modal" data-target="#addModal" to>Add Question</router-link>
        </li>
      </ul>
      <ul class="navbar-nav form-inline my-2 my-lg-0">
        <li class="nav-item" v-if="user.isLoggedIn===false">
          <router-link class="nav-link" to="/signin">Sign In</router-link>
        </li>
        <li class="nav-item" v-if="user.isLoggedIn===true">
          <a href="#" class="nav-link" v-on:click.prevent="signOut">Sign Out</a>
        </li>
      </ul>
      <div
        class="modal fade"
        id="addModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Question</h5>
              <button
                type="button"
                class="close"
                @click="cancel"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addQuestion">
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Title</label>
                  <input type="text" class="form-control" v-model="title" id="recipient-name">
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">Message:</label>
                  <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">Tags:</label>
                  <tags-input element-id="tags" v-model="tags" :typeahead="true"></tags-input>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="cancel"
                    data-dismiss="modal"
                  >Close</button>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: #f4a041;
}
.nav-item::after {
  content: "";
  display: block;
  width: 0px;
  height: 2px;
  background: black;
  transition: 0.2s;
}
.nav-item:hover::after {
  width: 100%;
}
.navbar-dark .navbar-nav .active > .nav-link,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .show > .nav-link,
.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: black;
}
.nav-link {
  padding: 15px 5px;
  transition: 0.2s;
}
.navbar-dark .navbar-brand {
  color: black;
}
.navbar-dark .navbar-nav .nav-link {
  color: black;
}
.dropdown-item.active,
.dropdown-item:active {
  color: #212529;
}
.dropdown-item:focus,
.dropdown-item:hover {
  background: black;
}
</style>

<script>
import axios from "@/api/axios.js";
import Toast from "@/api/sweetalert.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VoerroTagsInput from "@voerro/vue-tagsinput";
import { mapState } from "vuex";
export default {
  components: { "tags-input": VoerroTagsInput },
  data() {
    return {
      title: "",
      description: "",
      tags: [],
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
  },
  methods: {
    signOut() {
      localStorage.clear();
      this.$router.push('/signin')
      this.$store.dispatch("sign", { status: false, id: "" });
    },
    cancel() {
      this.title = "";
      this.description = "";
      this.tags = [];
    },
    getAllQuestion() {
        console.log('masuk ke mari')
        this.$store.dispatch('getAllQuestion')
    },
    addQuestion() {
      axios
        .post(
          "/questions",
          {
            title: this.title,
            description: this.description,
            tags: this.tags
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          $("#addModal").modal("toggle");
          this.$router.push("/");
          this.title = "";
          this.description = "";
          this.tags = [];
          Toast.fire({
            type: "success",
            title: "Added question successfully"
          });
          this.$store.dispatch("getAllQuestion");
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    }
  },
  computed: mapState(["user"])
};
</script>
