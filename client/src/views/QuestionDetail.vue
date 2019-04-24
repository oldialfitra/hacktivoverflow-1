<template>
  <div class="container">
    <div id="div1" class="well text-center">
      <div id="div2">
        <div class="vote">
          <td class="row">
            <div class="col-md-2 mx-auto">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    type="button"
                    class="btn btn-sm btn-qty"
                    @click.prevent="upvote(question.question._id)"
                  >
                    <i class="fas fa-chevron-up" role="button"></i>
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control form-control-sm text-center"
                  id
                  aria-describedby
                  :value="question.question.upvotes.length-question.question.downvotes.length"
                  disabled
                >
                <div class="input-group-append">
                  <div>
                    <button
                      type="button"
                      class="btn btn-sm btn-qty"
                      @click.prevent="downvote(question.question._id)"
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
          <h4 class="title">{{question.question.title}}</h4>
        </div>
        <div class="description">
          <p v-html="question.question.description"></p>
        </div>
        <div>
          <p>Posted By: {{question.question.userId.email}}</p>
        </div>
        <div>
          <p>{{question.question.createdAt}}</p>
        </div>
        <div>
          <span>{{question.question.comments.length}} Answer(s)</span>
        </div>
        <div class="option" v-if="$store.state.user.id===question.question.userId._id">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-secondary float-left"
              data-toggle="modal"
              data-target="#updateModal"
              v-on:click="getOneArticle(question.question._id)"
            >
              <i class="fas fa-edit"></i> Edit
            </button>
            <button
              type="button"
              class="btn btn-danger float-right"
              v-on:click="deleteArticle(question.question._id, indexArticle)"
            >
              <i class="far fa-trash-alt"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="div3">
      <input type="submit" value="Add Answer" data-toggle="modal" data-target="#updateModal">
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
              <form @submit.prevent="addAnswer(question.question._id)">
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
      <div v-for="(item, index) in question.question.comments" :key="index">
        <OneAnswer id="div4" :one-answer="item"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
#div1 {
  margin: 20px auto;
  padding: 10px 10px 0px 10px;
  border: 3px solid black;
  border-radius: 8px;
}

#div3 {
  margin: 20px auto;
  padding: 10px 10px 0px 10px;
  border: 3px solid black;
  border-radius: 8px;
}

#div2 {
  margin: 0 auto;
}

#div4 {
  margin: 0 auto;
  margin-bottom: 20px;
  border-bottom: 2px solid black;
}
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
input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: white;
  border: none;
  color: black;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 80px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #f4a041;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
</style>


<script>
import OneAnswer from "@/components/OneAnswer.vue";
import axios from "@/api/axios.js";
import Toast from "@/api/sweetalert.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VoerroTagsInput from "@voerro/vue-tagsinput";
import { mapState } from "vuex";
export default {
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
  components: {
    OneAnswer
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
    cancel() {
      this.title = "";
      this.description = "";
      this.tags = [];
    },
    addAnswer(id) {
      axios
        .post(
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
          $("#updateModal").modal("toggle");
          this.title = "";
          this.description = "";
          Toast.fire({
            type: "success",
            title: "Added Answer successfully"
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
  computed: mapState(["question"])
};
</script>

