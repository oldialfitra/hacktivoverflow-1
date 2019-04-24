<template>
  <div class="container">
      <div class="d-flex justify-content-center flex-wrap">
          <div v-for="(tag, index) in $store.state.tags" :key="index">
              {{item}}
          </div>
      </div>
    <div v-for="item in question.questions" :key="item._id">
      <div id="div1" class="well text-center">
        <OneQuestion id="div2" class="container" :one-question="item"></OneQuestion>
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

#div2 {
  margin: 0 auto;
}
.list-tags {
	height: 60px;
}

.list-tags a {
	text-align: center;
	margin-right: 1%;
}

.list-tags a:nth-child(1) {
	margin-left: 2%;
}

.tags-content {
	display: inline;
}
</style>


<script>
import OneQuestion from "@/components/OneQuestion.vue";
import { mapState } from "vuex";
export default {
  components: {
    OneQuestion
  },
  computed: mapState(["question"])
};
</script>

