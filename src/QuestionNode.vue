<script setup lang="ts">
import { Handle, Position, NodeEventsOn ,NodeProps } from '@braks/vue-flow';
import childNode from './ChildNode.vue';
import { computed } from 'vue';
import QuickConnectHandle from './QuickConnectHandle.vue';


const sourceHandleStyleB = computed(() => ({
  top: '18.5px',
}));

interface QuestionNodeProps extends NodeProps {
  data: {
    questionID: Number;
    answersQuantity: Number;
    questionText: string;
    questionShort: string;
    openEnded:Boolean;
    event: NodeEventsOn['click'];
  };  
}

const props = defineProps<QuestionNodeProps>();

console.log(props);

const onAddWeight = () => {
  props.data.event.click(() => {
  })
}

function capitalizeFirstLetter(string) {
    return string.toString().charAt(0).toUpperCase() + string.toString().slice(1);
}

const mouseDown = () => {
  console.log("Quick Connect started");
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
    type="target"
    :position="Position.Left"
    
    :style="sourceHandleStyleB"
  />
<!--
  <div class="quickConnect active-tooltip" @mousedown="mouseDown">
    <div class="top-tooltip">Quick Connect</div>
  </div>
  -->

<QuickConnectHandle :questionID="props.data.questionID" :answerQuantity="props.data.answersQuantity"/>
<div
    :data-handleid="props.id"
    :data-nodeid="nodeId"
    :data-handlepos="props.position"
    class="vue-flow__handle nodrag quickConnect active-tooltip"
    :class="[
      `vue-flow__handle-${props.position}`,
      `vue-flow__handle-${id}`,
      {
        source: props.type !== 'target',
        target: props.type === 'target',
        connectable: props.connectable,
        connecting:
          connectionStartHandle?.nodeId === nodeId &&
          connectionStartHandle?.handleId === props.id &&
          connectionStartHandle?.type === props.type,
      },
    ]"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  ><div class="top-tooltip">Quick Connect</div></div>

  <div v-if="props.data.openEnded" @click="onAddWeight" class="weightBtn">Add Weight</div>
</template>

<style>

.quickConnect{
  background-color: #586e8a;
  border: solid 2px #ffffff;
  width: 10px;
  height: 10px;
  right:-6px;
  position:absolute;
  top:14px;
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
