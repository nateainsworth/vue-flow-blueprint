<script setup>
import { getBezierPath, getEdgeCenter, useVueFlow } from '@braks/vue-flow';
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  markerEnd: {
    type: String,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
});

const { applyEdgeChanges } = useVueFlow();

const foreignObjectSize = 40;



const edgePath = computed(() =>
  getBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })
);

const center = computed(() =>
  getEdgeCenter({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
  })
);
</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<template>
  <path
    :id="id"
    :style="style"
    class="vue-flow__edge-path"
    :d="edgePath"
    :marker-end="markerEnd"
  />
</template>
