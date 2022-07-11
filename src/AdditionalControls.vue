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
    return {
      toggle: false,
    };
  },
  watch: {
    // It listens to the change in prop name
    xPosition: function () {
      console.log('x change');
      this.toggle = true; // print out when the name changes
    },
    yPosition: function () {
      console.log('y change');
      this.toggle = true; // print out when the name changes
    },
  },
  mounted() {
    //this.xPosition = 0;
    //this.yPosition = 100;
    console.log('ypos: ' + this.yPosition);
  },
  methods: {
    ToggleMenu() {
      console.log('menu location', this.xPosition);
    },
    CloseMenu() {
      this.toggle = false;
    },
    onAdd() {
      console.log('test');
    },
  },
});
</script>
<template>
  <div
    v-if="toggle"
    :style="style"
    class="card flow-menu"
    v-click-outside="CloseMenu"
  >
    <div class="card-header noselect">Add Node</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item noselect" @click="onAdd">Question</li>
      <li class="list-group-item noselect">Intevention</li>
      <li class="list-group-item noselect">Branch Link</li>
      <li class="list-group-item noselect" @click="onEndAdd">End Session</li>
    </ul>
  </div>

  <div class="save__controls">
    <button class="flow-buttons" @click="onSave">save</button>
    <button class="flow-buttons" @click="onRestore">restore</button>
    <button class="flow-buttons" @click="onAdd">add node</button>
    <button class="flow-buttons" @click="onEndAdd">add End node</button>
  </div>
</template>

<style>
.save__controls {
  position: absolute;
  z-index: 100;
  top: 10px;
  left: 20px;
}

.flow-menu .list-group-item:hover {
  background-color: #e5e5e5;
}
</style>
