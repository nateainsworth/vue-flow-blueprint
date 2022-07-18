<script setup>
var treelinks ='[{"id":1,"Description":"Concerned Keyword Tree","Title":"Concerned Keyword Tree"},{"id":2,"Description":"Worry Tree Session","Title":"Worry Tree Session"}]';

var treelinkData = JSON.parse(treelinks);
console.log(treelinkData[0].id);

const onDragStart = (event, nodeType, treelinkID) => {
  console.log('drag started! ');
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('treelinkID',treelinkData[treelinkID].id);
    event.dataTransfer.setData('treelinkDesc',treelinkData[treelinkID].Description);
    event.dataTransfer.setData('treelinkTitle',treelinkData[treelinkID].Title);

  }
};

</script>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
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
    <div v-for="(singleI, index) in treelinkData" :key="index">
    <div class="nodes">
      <div
        class="vue-flow__node-select"
        :draggable="true"
        @dragstart="onDragStart($event, 'treelinknode', index)">
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