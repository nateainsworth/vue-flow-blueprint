<script setup lang="ts">
import { Handle, Position, NodeEventsOn ,NodeProps } from '@braks/vue-flow';
import { computed } from 'vue';

const sourceHandleStyleB = computed(() => ({
  top: '18.5px',
}));

interface InteventionNodeProps extends NodeProps {

  data: {
    inteventionText: string;
    inteventionDescription: string;
    event: NodeEventsOn['click'];
  };
  
}
const props = defineProps<InteventionNodeProps>();

</script>

<script lang="ts">
export default {
  inheritAttrs: true,
};
</script>

<template>

  <div class="vue-flow__nodeHeader active-tooltip">
  <div class="top-tooltip">{{props.data.inteventionDescription}}</div>
  {{ props.data.inteventionText}}</div>
  <Handle
    class="vue-flow__handleStyle"
    type="target"
    :position="Position.Left"
    :style="sourceHandleStyleB"
  />
  <Handle
    class="vue-flow__handleStyle"
    type="source"
    :position="Position.Right"
    :style="sourceHandleStyleD"
  />
</template>

<style>
.vue-flow__node-inteventionnode .vue-flow__nodeHeader{
  width: calc(100% + 22px);
  margin: -11px;
  padding: 10px;
  background-color: #68588b;
  color: #ffffff;
  font-weight: bold;
  
}

.vue-flow__node-inteventionnode .vue-flow__handleStyle {
  background-color: #ffffff;
  border: solid 2px #68588b;
  width: 10px;
  height: 10px;
}


.vue-flow__node-inteventionnode .vue-flow__handle-left {
    left: -6px;
}

.vue-flow__node-inteventionnode .vue-flow__handle-right {
    right: -6px;
}
</style>
