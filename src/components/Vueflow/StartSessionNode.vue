<script setup>
import { Handle, Position } from '@braks/vue-flow';

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
  <div>Start Session</div>
  <Handle
    type="source"
    :position="Position.Right"
    :is-valid-connection="props.isValidTargetPos"
  />
</template>

<style>
.vue-flow__node-startsessionnode{
  background-color:#74955a;/*#6e8b58;*/
  color:#ffffff;
  font-weight: bold;
}

.vue-flow__node-startsessionnode .vue-flow__handle-right {
  right: -6px;
  background-color: #ffffff;
  border: solid 2px #74955a;
  width: 10px;
  height: 10px;
}

</style>
