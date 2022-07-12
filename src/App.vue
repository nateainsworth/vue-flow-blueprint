<script setup>
import {
  VueFlow,
  useVueFlow,
  Controls,
  Background,
  MiniMap,
  updateEdge,
} from '@braks/vue-flow';
import { onMounted, computed, ref, markRaw } from 'vue';
import useStore from './store.js';
import AdditionalControls from './AdditionalControls.vue';
import CustomInput from './CustomInput.vue';
import ChildNode from './ChildNode.vue';
import EndSessionNode from './EndSessionNode.vue';
import StartSessionNode from './StartSessionNode.vue';
import Sidebar from './SideBar.vue';

let id = 0;
const getId = () => `dndnode_${id++}`;

const elements = ref([]);

const nodeTypes = {
  custominput: markRaw(CustomInput),
  childnode: markRaw(ChildNode),
  endsessionnode: markRaw(EndSessionNode),
  startsessionnode: markRaw(StartSessionNode),
};

const store = useStore();

const {
  onConnect,
  addEdges,
  nodes,
  addNodes,
  project,
  viewport,
  edges,
  onPaneReady,
  instance,
} = useVueFlow();

//onConnect((params) => addEdges([params]));

onConnect((params) => {
  addEdges([
    {
      ...params,
      updatable: true,
    },
  ]);
});

/*
onMounted(() => {
  elements.value = [
    {
      id: '1',
      type: 'startsessionnode',
      label: 'Node 1',
      position: { x: 250, y: 5 },
      class: 'light',
    },
  ];
});
*/

const onDragOver = (event) => {
  console.log('dragging node');
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
};

//const position = vueFlowInstance.project({ x: event.clientX - 40, y: event.clientY - 18 });

//var newinstance;
onPaneReady((instance) => instance.fitView());

const onDrop = (event) => {
  console.log('dropping node');
  const type = event.dataTransfer?.getData('application/vueflow');
  const test = event.dataTransfer?.getData('test');
  console.log('result' + test);

  const position = instance.value.project({
    x: event.clientX,
    y: event.clientY - 40,
  });
  const newNode = {
    id: getId(),
    type,
    position,
    label: `${type} node`,
  };
  addNodes([newNode]);
};
</script>
<script>
export default {
  data() {
    return {
      xPos: 100,
      yPos: 100,
    };
  },
  methods: {
    getPosition(event) {
      this.xPos = event.clientX;
      this.yPos = event.clientY;
    },
  },
};
</script>

<template>
  <div class="dndflow" @drop="onDrop">
    <VueFlow
      v-model="store.elements"
      :fit-view-on-init="true"
      :node-types="nodeTypes"
      @edge-update="store.onEdgeUpdate"
      @edge-update-start="store.onEdgeUpdateStart"
      @edge-update-end="store.onEdgeUpdateEnd"
      @dragover="onDragOver"
    >
      <!--  
      @mousedown.right="getPosition($event)"
      @contextmenu.prevent
    -->
      <AdditionalControls :x-position="xPos" :y-position="yPos" />
      <Sidebar />
      <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
        <button class="flow-buttons" @click="store.log">log store state</button>
      </div>
      <Background pattern-color="#aaa" gap="8" />

      <MiniMap />
      <Controls />
    </VueFlow>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css');

@import url('https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css');

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.flow-menu {
  position: absolute;
  background-color: #ffffff;
  z-index: 5;
  width: 10rem;
  top: 200px;
  left: 400px;
}
</style>
