<template>
  <div>
    <div class="vote">
      <td class="row">
        <div class="col-md-2 mx-auto">
          <div class="input-group">
            <div class="input-group-prepend">
              <button
                type="button"
                class="btn btn-sm btn-qty"
                @click.prevent="upvote(oneAnswer._id)"
              >
                <i class="fas fa-chevron-up" role="button"></i>
              </button>
            </div>
            <input
              type="text"
              class="form-control form-control-sm text-center"
              id
              aria-describedby
              :value="oneAnswer.upvotes.length-oneAnswer.downvotes.length"
              disabled
            >
            <div class="input-group-append">
              <div>
                <button
                  type="button"
                  class="btn btn-sm btn-qty"
                  @click.prevent="downvote(oneAnswer._id)"
                >
                  <i class="fas fa-chevron-up fa-rotate-180" role="button"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </div>
    <div>
      <h4 class="title">{{oneAnswer.title}}</h4>
    </div>
    <div class="description">
      <p v-html="oneAnswer.description"></p>
    </div>
    <div>
      <p>Posted By: {{oneAnswer.userId.email}}</p>
    </div>
    <div>
      <p>{{oneAnswer.createdAt}}</p>
    </div>
    <div class="option" v-if="user.id===oneAnswer.userId._id">
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-secondary float-left"
          v-on:click="getOneAnswer(oneAnswer._id)"
        >
          <i class="fas fa-edit"></i> Edit
        </button>
        <button
          type="button"
          class="btn btn-danger float-right"
          v-on:click="deleteAnswer(oneAnswer._id)"
        >
          <i class="far fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
    <div
      class="modal fade"
      id="updateAnswer"
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
            <form @submit.prevent="updateAnswer(oneAnswer._id)">
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Title</label>
                <input type="text" class="form-control" v-model="title" id="recipient-name">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Message:</label>
                <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>
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
</template>

<style scoped>
.title {
  border-bottom: 1px solid grey;
}
.description {
  background-color: lightgrey;
}
.icon-flipped {
  transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
}
.option {
  margin: 10px;
}

.delete {
  margin: 10px;
}

.update {
  margin: 10px;
}
</style>

<script>
import axios from "@/api/axios.js";
import Toast from "@/api/sweetalert.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapState } from "vuex";
export default {
  props: ["oneAnswer"],
  data() {
    return {
      title: "",
      description: "",
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
  },
  methods: {
    upvote(id) {
      axios
        .put(
          `/answers/upvote/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "Upvoted"
          });
          this.$store.dispatch("getOneQuestion", this.$route.params.id);
          this.$store.dispatch("getAllQuestion");
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    downvote(id) {
      axios
        .put(
          `/answers/downvote/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "Downvoted"
          });
          this.$store.dispatch("getOneQuestion", id);
          this.$store.dispatch("getAllQuestion");
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    getOneAnswer(id) {
      axios
        .get(`/answers/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          $("#updateAnswer").modal("toggle");
          this.title = data.title;
          this.description = data.description;
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    cancel() {
      this.title = "";
      this.description = "";
    },
    updateAnswer(id) {
      axios
        .put(
          `/answers/${id}`,
          {
            title: this.title,
            description: this.description
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          $("#updateAnswer").modal("toggle");
          this.title = "";
          this.description = "";
          this.$store.dispatch("getOneQuestion", this.$route.params.id);
          this.$store.dispatch("getAllQuestion");
        })
        .catch(err => {
          console.log(err);
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    deleteAnswer(id) {
      axios
        .delete(`/answers/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "Delete Answer success"
          });
          this.$store.dispatch("getOneQuestion", this.$route.params.id);
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

