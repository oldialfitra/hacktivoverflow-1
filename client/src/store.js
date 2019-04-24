/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from './api/axios';
import Toast from './api/sweetalert';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false,
      id: '',
    },
    question: {
      questions: [],
      question: '',
    },
    tagged: false,
    tags: [],
  },
  mutations: {
    changeLogged(state, payload) {
      state.user.isLoggedIn = payload.status;
      state.user.id = payload.id;
      if (payload.status === false) {
        state.question.questions = [];
        state.question.question = '';
      }
    },
    changeQuestions(state, payload) {
      state.question.questions = payload;
    },
    changeQuestion(state, payload) {
      state.question.question = payload;
    },
    changeTagged(state, payload) {
      state.tagged = payload;
    },
    changeTags(state, payload) {
      state.tags = payload;
    },
  },
  actions: {
    sign(context, option) {
      console.log('masuk ke sini');
      context.commit('changeLogged', option);
    },
    getAllQuestion(context) {
      axios
        .get('/questions', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          context.commit('changeTagged', false);
          context.commit('changeQuestions', data);
        })
        .catch((err) => {
          console.log(err);
          Toast.fire({
            type: 'error',
            title: err.response.data.message,
          });
        });
    },
    getOneQuestion(context, payload) {
      axios
        .get(`/questions/${payload}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          context.commit('changeQuestion', data);
          router.push(`/onequestion/${payload}`);
        })
        .catch((err) => {
          console.log(err);
          Toast.fire({
            type: 'error',
            title: err.response.data.message,
          });
        });
    },
    getTag(context, tag) {
      axios
        .get('/questions', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          console.log(tag);
          let spesificQuestion = [];
          data.forEach((e, index) => {
            if (e.tags.length > 0) {
              for (let i = 0; i < e.tags.length; i++) {
                console.log(e.tags[i])
                console.log(e.tags[i] === tag)
                if (e.tags[i] === tag) {
                  console.log('sama')
                  spesificQuestion.push(e);
                  break;
                }
              }
            }
          });
          console.log(spesificQuestion)
          context.commit('changeTagged', true);
          context.commit('changeQuestions', spesificQuestion);
        })
        .catch((err) => {
          console.log(err)
          Toast.fire({
            type: 'error',
            title: err.response.data.message,
          });
        });
    },
    getMyTag(context) {
      axios
        .get('/users/tags', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          console.log(data.tags);
          context.commit('changeTags', data.tags);
        })
        .catch((err) => {
          Toast.fire({
            type: 'error',
            title: err.response.data.message,
          });
        });
    },
    editWatchedTag(context, payload) {
      axios
        .put('/users/tags', {
          tags: payload,
        }, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          context.commit('changeTags', data.tags);
          Toast.fire({
            type: 'success',
            title: 'Save Watched Tags',
          });
        })
        .catch((err) => {
          Toast.fire({
            type: 'error',
            title: err.response.data.message,
          });
        });
    },
  },
});
