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

const elements = ref([]);

const nodeTypes = {
  custominput: markRaw(CustomInput),
  childnode: markRaw(ChildNode),
  endsessionnode: markRaw(EndSessionNode),
  startsessionnode: markRaw(StartSessionNode),
};

const store = useStore();

const { onConnect, addEdges } = useVueFlow();

//onConnect((params) => addEdges([params]));

onConnect((params) => {
  addEdges([
    {
      ...params,
      updatable: true,
    },
  ]);
});

const getPosition = (event) => {
  console.log('event');
};

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
</script>

<template>
  <div class="card" style="width: 18rem">
    <div class="card-header">Featured</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>
  </div>

  <VueFlow
    v-model="store.elements"
    :fit-view-on-init="true"
    :node-types="nodeTypes"
    @edge-update="store.onEdgeUpdate"
    @edge-update-start="store.onEdgeUpdateStart"
    @edge-update-end="store.onEdgeUpdateEnd"
  >
    <AdditionalControls />

    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button style="margin-right: 5px" @click="store.updatePosition">
        update positions
      </button>
      <button style="margin-right: 5px" @click="store.toggleClass">
        toggle class
      </button>
      <button @click="store.log">log store state</button>
    </div>
    <Background pattern-color="#aaa" gap="8" @click="getPosition(event)" />
    <div
      class="background-area"
      style="width: 100%; height: 100%; position: absolute; top: 0; left: 0"
      @click="getPosition(event)"
    ></div>
    <MiniMap />
    <Controls />
  </VueFlow>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
