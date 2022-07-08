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
  <div>End Session</div>
  <Handle
    type="source"
    :position="Position.right"
    :is-valid-connection="props.isValidTargetPos"
  />
</template>

<style></style>
