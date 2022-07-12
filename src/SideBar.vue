<script setup>
var questions ='[{"id":1,"QuestionIndex":"1","Question":"How is your mood, choose a response that is closest to how you’ve been feeling over the previous week?","Answers":"{\\"Answers\\" :[\\"Always in a good mood\\",\\"mostly happy the odd bad days\\",\\"More good days than bad\\",\\"testing\\"]}","Type":null,"Session_Allocation":1},{"id":2,"QuestionIndex":"2","Question":"How is your mood, choose a response that is closest to how you’ve been feeling over the previous week?","Answers":"{\\"Answers\\" :[\\"Always in a good mood\\",\\"mostly happy the odd bad days\\",\\"More good days than bad\\",\\"Feel low most of the time\\",\\"Always feel extremely low\\",\\"None of these\\"]}","Type":null,"Session_Allocation":1},{"id":3,"QuestionIndex":"1.1","Question":"Can you tell me a bit more about how you’re feeling?","Answers":"{\\"Answers\\" :[]}","Type":null,"Session_Allocation":1}]';

var questionsData = JSON.parse(questions);
console.log(questionsData);

const onDragStart = (event, nodeType, questionID) => {
  console.log('drag started! ');
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType);
    event.dataTransfer.setData('test', questionsData[questionID]);
    event.dataTransfer.effectAllowed = 'move';
  }
};
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>
    <div class="nodes">
      <div
        class="vue-flow__node-input"
        :draggable="true"
        @dragstart="onDragStart($event, 'default', 2)">
        Input Node
      </div>
    </div>
  </aside>
</template>
