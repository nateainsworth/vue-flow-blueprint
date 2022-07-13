<script setup lang="ts">
import { Handle, Position, NodeEventsOn ,NodeProps } from '@braks/vue-flow';
import childNode from './ChildNode.vue';
import { computed } from 'vue';

const sourceHandleStyleB = computed(() => ({
  top: '20px',
}));



interface QuestionNodeProps extends NodeProps {

  data: {
    questionID: string;
    questionText: string;
    questionShort: string;
    openEnded:Boolean;
    event: NodeEventsOn['click'];
  };
  
}
const props = defineProps<QuestionNodeProps>();

console.log(props);
//props.events.customEvent();


/*
const props = defineProps({

});*/
const onAddWeight = () => {
  props.data.event.click(() => {
  })
}

function capitalizeFirstLetter(string) {
    return string.toString().charAt(0).toUpperCase() + string.toString().slice(1);
}

</script>

<script lang="ts">
export default {
  inheritAttrs: true,
};
</script>

<template>

  <div class="vue-flow__nodeHeader active-tooltip">
  <div class="top-tooltip">{{capitalizeFirstLetter(props.data.questionText)}}</div>
  {{ props.data.questionShort }}</div>
  <Handle
    class="vue-flow__handleStyle"
    type="source"
    :position="Position.Left"
    
    :style="sourceHandleStyleB"
  />
  <div v-if="props.data.openEnded" @click="onAddWeight" class="weightBtn">Add Weight</div>
</template>

<style>
.vue-flow__nodeHeader {
  width: calc(100% + 22px);
  margin: -11px;
  padding: 10px;
  background-color: #586e8b;
  color: #ffffff;
  font-weight: bold;
  
}

.vue-flow__handleStyle {
  background-color: #ffffff;
  border: solid 2px #586e8a;
  width: 10px;
  height: 10px;
}

.vue-flow__node-questionnode .weightBtn{
    text-align:center;
    background-color:#586e8a;
    color: #ffffff;
    border-radius:30px;
    margin: 15px 0px;
    /*position:absolute;
    width: calc(100% - 20px);
    bottom:5px;
*/    
}

.vue-flow__node-questionnode .vue-flow__handle-left {
    left: -6px;
}
</style>
