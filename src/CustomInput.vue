<script setup lang="ts">
import { Handle, Position } from '@braks/vue-flow';
import childNode from './ChildNode.vue';
import { computed } from 'vue';

const sourceHandleStyleB = computed(() => ({
  top: '20px',
}));

interface QuestionNodeProps extends NodeProps {
  isValidTargetPos: {
    type: Function;
    required: false;
  };
  data: {
    questionID: string;
    questionText: string;
    questionShort: string;
  };
}
const props = defineProps<QuestionNodeProps>();

/*
const props = defineProps({

});*/
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="vue-flow__nodeHeader">{{ props.data.questionShort }}</div>
  <Handle
    class="vue-flow__handleStyle"
    type="source"
    :position="Position.Left"
    :is-valid-connection="props.isValidTargetPos"
    :style="sourceHandleStyleB"
  />
  <!--
  <template>
    <childNode data-handleid="testing" />
  </template>
  <template>
    <childNode />
  </template>-->
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

.vue-flow__node-custominput .vue-flow__handle-left {
    left: -6px;
}
</style>
