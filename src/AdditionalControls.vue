<script setup>
import { useVueFlow } from '@braks/vue-flow';
import CustomInput from './CustomInput.vue';

const flowKey = 'example-flow';

const {
  nodes,
  addNodes,
  setNodes,
  setEdges,
  dimensions,
  setTransform,
  toObject,
} = useVueFlow();

const onSave = () => {
  localStorage.setItem(flowKey, JSON.stringify(toObject()));
};

const onRestore = () => {
  const flow = JSON.parse(localStorage.getItem(flowKey));

  if (flow) {
    const [x = 0, y = 0] = flow.position;
    setNodes(flow.nodes);
    setEdges(flow.edges);
    setTransform({ x, y, zoom: flow.zoom || 0 });
  }
};

const onAdd = () => {
  const id = nodes.value.length + 1;
  const newNode = {
    id: `random_node-${id}`,
    type: CustomInput,
    //label: `Node ${id}`,
    //targetHandle: Position.Right, // or Bottom, Left, Right,
    //sourceHandle: Position.Right,
    position: {
      x: dimensions.value.width / 2,
      y: dimensions.value.height / 2,
    },
    class: 'light',
  };
  addNodes([newNode]);
};
</script>

<template>
  <div class="save__controls">
    <button style="background-color: #33a6b8" @click="onSave">save</button>
    <button style="background-color: #113285" @click="onRestore">
      restore
    </button>
    <button style="background-color: #6f3381" @click="onAdd">add node</button>
  </div>
</template>

<style>
.save__controls {
  position: absolute;
  z-index: 100;
  top: 10px;
  left: 20px;
}
</style>
