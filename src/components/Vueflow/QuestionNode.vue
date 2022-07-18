<script setup lang="ts">
/* eslint-disable */
import { Handle, Position, NodeEventsOn ,NodeProps } from '@braks/vue-flow';
import childNode from './ChildNode.vue';
import { computed } from 'vue';
import QuickConnectHandle from './QuickConnectHandle.vue';
import eventBus from '../../event-bus';


interface CustomNodeEvents {
  //click: NodeEventsOn['click'],
  customEvent: (input: string) => void,
}


const sourceHandleStyleB = computed(() => ({
  top: '18.5px',
}));

interface QuestionNodeProps extends NodeProps<any, CustomNodeEvents>  {
  type: string;
  selected: string;
  connectable: boolean;
  position: {
    x: Number;
    y: Number;
  }
  
  data: {
    questionID: Number;
    answersQuantity: Number;
    questionText: string;
    questionShort: string;
    openEnded: Boolean;
    event: NodeEventsOn['click'];
  };
  id: string;
  events: CustomNodeEvents;
}

const props = defineProps<QuestionNodeProps>();

console.log(props);



const onAddWeight = () => {
  /*props.data.event.click(() => {
  })*/
  //props.events.click()//() =>x {
  //console.log(`Node ${props.id} clicked`)
//})

eventBus.emit('addWeight', props.data.questionID )
  //props.events.customEvent('custom event triggered');
}

function capitalizeFirstLetter(string) {
    return string.toString().charAt(0).toUpperCase() + string.toString().slice(1);
}

const mouseDown = () => {
  console.log("Quick Connect started");
}

/*var emitter = require('tiny-emitter/instance');
 
emitter.emit('addWeight', props.data.question.id );
*/



</script>

<script lang="ts">
/* eslint-disable */
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
    type="target"
    :position="Position.Left"
    :style="sourceHandleStyleB"
  />
  <!--
  <div class="quickConnect active-tooltip" @mousedown="mouseDown">
    <div class="top-tooltip">Quick Connect</div>
  </div>
  -->

  <QuickConnectHandle v-if="!props.data.openEnded" class="quickConnect" :questionID="props.data.questionID" :answerQuantity="props.data.answersQuantity"/>

  <div v-if="props.data.openEnded" @click="onAddWeight" class="weightBtn">Add Weight</div>
</template>

<style>

.vue-flow__handle.quickConnect{
  background-color: #586e8a;
  border: solid 2px #ffffff;
  width: 10px;
  height: 10px;
  right:-6px;
  position:absolute;
  top:18px;
  border-radius: 100%;
}

.vue-flow__nodeHeader {
  width: calc(100% + 22px);
  margin: -11px;
  padding: 10px;
  background-color: #586e8b;
  color: #ffffff;
  font-weight: bold;
  
}

.vue-flow__handle.vue-flow__handleStyle {
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
