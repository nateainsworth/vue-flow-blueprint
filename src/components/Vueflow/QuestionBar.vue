<script setup>
var questions ='[{"id":1,"QuestionShort":"Mood question","QuestionIndex":"1","Question":"How is your mood, choose a response that is closest to how you’ve been feeling over the previous week?","Answers":"{\\"Answers\\" :[\\"Always in a good mood\\",\\"mostly happy the odd bad days\\",\\"More good days than bad\\",\\"testing\\"]}","Type":null,"Session_Allocation":1},{"id":2,"QuestionShort":"Second mood question","QuestionIndex":"2","Question":"How is your mood, choose a response that is closest to how you’ve been feeling over the previous week?","Answers":"{\\"Answers\\" :[\\"Always in a good mood\\",\\"mostly happy the odd bad days\\",\\"More good days than bad\\",\\"Feel low most of the time\\",\\"Always feel extremely low\\",\\"None of these\\"]}","Type":null,"Session_Allocation":1},{"id":3,"QuestionShort":"How are you feeling","QuestionIndex":"1.1","Question":"Can you tell me a bit more about how you’re feeling?","Answers":"{\\"Answers\\" :[]}","Type":null,"Session_Allocation":1}]';

var questionsData = JSON.parse(questions);
console.log(questionsData[2].id);

const onDragStart = (event, nodeType, questionID) => {
  console.log('drag started! ');
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('questionID',questionsData[questionID].id);
    event.dataTransfer.setData('questionText',questionsData[questionID].Question);
    event.dataTransfer.setData('questionAnswers',questionsData[questionID].Answers);
    event.dataTransfer.setData('questionShort',questionsData[questionID].QuestionShort);

  }
};

</script>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  // type inference enabled
  props: {
    
  },
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    closePanel() {
      this.$emit('closePanel', true);
    },
  },
});
</script>
<template>
  <aside>
    <div class="closeBtn" @click="closePanel">Close</div>
    <div class="description">You can drag these nodes to the pane.</div>
    <div v-for="(singleQ, index) in questionsData" :key="index">
    <div class="nodes">
      <div
        class="vue-flow__node-select"
        :draggable="true"
        @dragstart="onDragStart($event, 'questionnode', index)">
        {{singleQ.Question}}
      </div>
    </div>
    </div>
  </aside>
</template>

<style>
.closeBtn{
  color:black;
}

</style>