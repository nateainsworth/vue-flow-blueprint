<script setup>
import { Handle, Position } from '@braks/vue-flow';
import childNode from './ChildNode.vue';
import { computed } from 'vue';

const sourceHandleStyleB = computed(() => ({
  top: '20px',
}));

const props = defineProps({
  isValidTargetPos: {
    type: Function,
    required: false,
  },
});
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="vue-flow__nodeHeader">Question ...</div>
  <Handle
    class="vue-flow__handleStyle"
    type="source"
    :position="Position.Left"
    :is-valid-connection="props.isValidTargetPos"
    :style="sourceHandleStyleB"
  />

  <!--<div>
    <childNode />
  </div>-->
</template>

<style>
.vue-flow__nodeHeader {
  width: calc(100%);
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
