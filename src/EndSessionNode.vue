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

<template >
  <div >End Session</div>
  <Handle
    type="source"
    :position="Position.Top"
    :is-valid-connection="props.isValidTargetPos"
  />
</template>

<style>
.vue-flow__node-endsessionnode{
  background-color:#b45252;/*#a05757;*/
  color:#ffffff;
  font-weight: bold;
}

.vue-flow__node-endsessionnode .vue-flow__handle-top {
  right: -6px;
  background-color: #ffffff;
  border: solid 2px #b45252;
  width: 10px;
  height: 10px;
}

</style>
