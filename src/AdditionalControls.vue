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
    id: `question_node-${id}`,
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
  };
  const newChildNode = {
    id: `answer_node-1-to-${id}`,
    type: 'childnode',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: {
      x: 25,
      y: 40,
    },
    extends: 'parent',
    parentNode: `question_node-${id}`,
    class: 'light',
    draggable: false,
  };
  const newChildNode2 = {
    id: `answer_node-2-of-${id}`,
    type: 'childnode',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: {
      x: 25,
      y: 80,
    },
    extends: 'parent',
    parentNode: `question_node-${id}`,
    class: 'light',
    draggable: false,
  };

  addNodes([newNode, newChildNode, newChildNode2]);
};

const onEndAdd = () => {
  const id = nodes.value.length + 1;
  const newNode = {
    id: `End-Session-Node-${id}`,
    type: 'endsessionnode',
    label: 'parent',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: {
      x: dimensions.value.width / 2,
      y: dimensions.value.height / 2,
    },
  };
  addNodes([newNode]);
};

function ToggleMenu() {
  console.log('menu location', this.xPosition);
}
</script>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  // type inference enabled
  props: {
    xPosition: String,
    yPosition: String,
  },
  computed: {
    style() {
      return 'top: ' + this.yPosition + 'px; left: ' + this.xPosition + 'px;';
    },
  },
  data() {
    return {};
  },
  mounted() {
    //this.xPosition = 0;
    //this.yPosition = 100;
    console.log('ypos: ' + this.yPosition);
  },
  actions: {
    ToggleMenu() {
      console.log('menu location', this.xPosition);
    },
  },
});
</script>
<template>
  <div :style="style" class="card flow-menu">
    <div class="card-header">Add Node</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" @click="onAdd">Question</li>
      <li class="list-group-item">Intevention</li>
      <li class="list-group-item">Branch Link</li>
      <li class="list-group-item" @click="onEndAdd">End Session</li>
    </ul>
  </div>

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
    <button style="background-color: rgb(232 232 232)" @click="onEndAdd">
      add End node
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
