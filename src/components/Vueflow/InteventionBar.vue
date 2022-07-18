<script setup>
var inteventions ='[{"id":1,"Description":"Deleports the user to the top of the worry tree, working there way down each branch","Title":"Worry Tree Intevention"},{"id":2,"Description":"Mindfulness description","Title":"Mindfulness Intevention"},{"id":3,"Description":"5 Areas intevention description","Title":"5 Areas Intevention"},{"id":4,"Description":"Thought Record intevention description","Title":"Thought Record Intevention"}]';

var inteventionData = JSON.parse(inteventions);
console.log(inteventionData[2].id);

const onDragStart = (event, nodeType, inteventionID) => {
  console.log('drag started! ');
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('inteventionID',inteventionData[inteventionID].id);
    event.dataTransfer.setData('inteventionDesc',inteventionData[inteventionID].Description);
    event.dataTransfer.setData('inteventionTitle',inteventionData[inteventionID].Title);

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
    <div v-for="(singleI, index) in inteventionData" :key="index">
    <div class="nodes">
      <div
        class="vue-flow__node-select"
        :draggable="true"
        @dragstart="onDragStart($event, 'inteventionnode', index)">
        {{singleI.Title}}
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