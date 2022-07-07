<script setup>
import { useVueFlow, Position } from '@braks/vue-flow';

const flowKey = 'example-flow';

const {
  nodes,
  addNodes,
  setNodes,
  setEdges,
  dimensions,
  setTransform,
  toObject,
  updateEdge,
} = useVueFlow();

const onEdgeUpdateStart = (edge) => console.log('start update', edge);
const onEdgeUpdateEnd = (edge) => console.log('end update', edge);
const onEdgeUpdate = ({ edge, connection }) => {
  elements.value = updateEdge(edge, connection, elements.value);
};

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
    type: 'custominput',
    label: 'parent',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: {
      x: dimensions.value.width / 2,
      y: dimensions.value.height / 2,
    },
    style: {
      backgroundColor: 'rgb(232 232 232)',
      width: '200px',
      height: '300px',
    },
    class: 'light',
    updatable: true,
  };
  const newChildNode = {
    id: `child_node-${id}`,
    type: 'childnode',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: {
      x: 25,
      y: 40,
    },
    extends: 'parent',
    parentNode: `random_node-${id}`,
    class: 'light',
    updatable: true,
    draggable: false,
  };
  const newChildNode2 = {
    id: `child_node-2-${id}`,
    type: 'childnode',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: {
      x: 25,
      y: 80,
    },
    extends: 'parent',
    parentNode: `random_node-${id}`,
    class: 'light',
    updatable: true,
    draggable: false,
  };

  addNodes([newNode, newChildNode, newChildNode2]);
};
</script>

<template>
  <div class="save__controls">
    <button style="background-color: rgb(232 232 232)" @click="onSave">
      save
    </button>
    <button style="background-color: rgb(232 232 232)" @click="onRestore">
      restore
    </button>
    <button style="background-color: rgb(232 232 232)" @click="onAdd">
      add node
    </button>
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
