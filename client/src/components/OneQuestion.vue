<template>
  <div>
    <div class="vote">
      <div class="list-tags">
        <div class="tags-content" v-for="(tag, indexTag) in oneQuestion.tags" :key="indexTag">
          <a href v-on:click.prevent="clickTag(tag)">{{ tag }}</a>
        </div>
      </div>
      <td class="row">
        <div class="col-md-2 mx-auto">
          <div class="input-group">
            <div class="input-group-prepend">
              <button
                type="button"
                class="btn btn-sm btn-qty"
                @click.prevent="upvote(oneQuestion._id)"
              >
                <i class="fas fa-chevron-up" role="button"></i>
              </button>
            </div>
            <input
              type="text"
              class="form-control form-control-sm text-center"
              id
              aria-describedby
              :value=oneQuestion.upvotes.length-oneQuestion.downvotes.length
              disabled
            >
            <div class="input-group-append">
              <div>
                <button
                  type="button"
                  class="btn btn-sm btn-qty"
                  @click.prevent="downvote(oneQuestion._id)"
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
      <router-link to>
        <a class="title" v-on:click.prevent="getOneQuestion(oneQuestion._id, 'detail')">
          <h4 style="text-decoration: none;">{{oneQuestion.title}}</h4>
        </a>
      </router-link>
    </div>
    <div class="description">
      <p v-html="oneQuestion.description"></p>
    </div>
    <div>
      <p>Posted By: {{oneQuestion.userId.email}}</p>
    </div>
    <div>
      <p>{{oneQuestion.createdAt}}</p>
    </div>
    <div>
      <span>{{oneQuestion.comments.length}} Answer(s)</span>
    </div>
    <div class="option" v-if="user.id===oneQuestion.userId._id">
      <div class="btn-group">
        <button
          type="button"
          class="btn btn-secondary float-left"
          v-on:click="getOneQuestion(oneQuestion._id, 'update')"
        >
          <i class="fas fa-edit"></i> Edit
        </button>
        <button
          type="button"
          class="btn btn-danger float-right"
          v-on:click="deleteQuestion(oneQuestion._id)"
        >
          <i class="far fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
    <div
      class="modal fade"
      id="updateModal"
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
            <form @submit.prevent="updateQuestion(oneQuestion._id)">
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
.list-tags {
  height: 60px;
}

.list-tags a {
  text-align: center;
  margin-right: 1%;
  text-decoration: none;
}

.list-tags a:nth-child(1) {
  margin-left: 1%;
}

.tags-content {
  display: inline;
}
</style>

<script>
import axios from "@/api/axios.js";
import Toast from "@/api/sweetalert.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VoerroTagsInput from "@voerro/vue-tagsinput";
import { mapState } from "vuex";
export default {
  props: ["oneQuestion"],
  components: { "tags-input": VoerroTagsInput },
  data() {
    return {
      title: "",
      description: "",
      tags: [],
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the rich-text editor.
      },
      currentVote: "",
    };
  },
  methods: {
    upvote(id) {
      axios
        .put(
          `/questions/upvote/${id}`,
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
          `/questions/downvote/${id}`,
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
        //   this.$store.dispatch("getOneQuestion", id);
          this.$store.dispatch("getAllQuestion");
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    getOneQuestion(id, option) {
      if (option === "detail") {
        this.$store.dispatch("getOneQuestion", id);
      } else {
        axios
          .get(`/questions/${id}`, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(({ data }) => {
            this.title = data.title;
            this.description = data.description;
            this.tags = data.tags;
            $("#updateModal").modal("toggle");
          })
          .catch(err => {
            console.log(err);
            Toast.fire({
              type: "error",
              title: err.response.data.message
            });
          });
      }
    },
    deleteQuestion(id) {
      axios
        .delete(`/questions/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          Toast.fire({
            type: "success",
            title: "Delete Question success"
          });
          this.$store.dispatch("getAllQuestion");
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
      this.tags = [];
    },
    updateQuestion(id) {
      axios
        .put(
          `/questions/${id}`,
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
          $("#updateModal").modal("toggle");
          this.title = "";
          this.description = "";
          this.tags = [];
          Toast.fire({
            type: "success",
            title: "Updated Question success"
          });
          this.$store.dispatch("getAllQuestion");
        })
        .catch(err => {
          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    },
    clickTag(tag) {
      this.$store.dispatch("getTag", tag);
    }
  },
  computed: mapState(["user"])
};
</script>

