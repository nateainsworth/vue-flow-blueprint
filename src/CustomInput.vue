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
  <div>Only connectable with B</div>
  <Handle
    type="source"
    :position="Position.Right"
    :is-valid-connection="props.isValidTargetPos"
  />
</template>

<style>
.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.validationflow .vue-flow__node {
  width: 150px;
  border-radius: 5px;
  padding: 10px;
  color: #555;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 12px;
}
.validationflow .vue-flow__node-customnode {
  background: #e6e6e9;
  border: 1px solid #ddd;
}
.validationflow .vue-flow__node-custominput .vue-flow__handle {
  background: #e6e6e9;
}
.validationflow .vue-flow__node-custominput {
  background: #fff;
}
.validationflow .vue-flow__handle-connecting {
  background: #ff6060;
}
.validationflow .vue-flow__handle-valid {
  background: #55dd99;
}
</style>
