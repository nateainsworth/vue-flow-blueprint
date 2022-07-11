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
  <div class="vue-flow__nodeHeader">Question {{ props.data.questionID }}</div>
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
  width: calc(100% + 20px);
  margin: -10px;
  padding: 10px;
  background-color: #d9d9d9;
}

.vue-flow__handleStyle {
  background-color: #373f8d;
  width: 10px;
  height: 10px;
}
</style>
