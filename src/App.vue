<script setup>
import {
  VueFlow,
  useVueFlow,
  Controls,
  Background,
  MiniMap,
  updateEdge,
} from '@braks/vue-flow';
import { computed } from 'vue';
import useStore from './store.js';
import AdditionalControls from './AdditionalControls.vue';
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';
import ChildNode from './ChildNode.vue';
import EndSessionNode from './EndSessionNode.vue';
import StartSessionNode from './StartSessionNode.vue';

import { markRaw } from 'vue';

const nodeTypes = {
  custominput: markRaw(CustomInput),
  childnode: markRaw(ChildNode),
  endsessionnode: markRaw(EndSessionNode),
  startsessionnode: markRaw(StartSessionNode),
};
const onEdgeUpdateStart = (edge) => console.log('start update', edge);
const onEdgeUpdateEnd = (edge) => console.log('end update', edge);
const onEdgeUpdate = ({ edge, connection }) => {
  store.elements.value = updateEdge(edge, connection, store.elements.value);
};

const store = useStore();

const { onConnect, addEdges } = useVueFlow();

onConnect((params) => addEdges([params]));

/*onConnect((params) => {
  addEdges([
    {
      ...params,
      updatable: true,
    },
  ]);
});
*/

const getPosition = (event) => {
  console.log('event');
};
</script>

<template>
  <VueFlow
    v-model="store.elements"
    :fit-view-on-init="true"
    :node-types="nodeTypes"
    @edge-update="onEdgeUpdate"
    @edge-update-start="onEdgeUpdateStart"
    @edge-update-end="onEdgeUpdateEnd"
  >
    <AdditionalControls />

    <div
      class="background-area"
      style="width: 100%; height: 100%; position: absolute; top: 0; left: 0"
      @click="getPosition(event)"
    ></div>
    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button style="margin-right: 5px" @click="store.updatePosition">
        update positions
      </button>
      <button style="margin-right: 5px" @click="store.toggleClass">
        toggle class
      </button>
      <button @click="store.log">log store state</button>
    </div>
    <div
      class="background-area"
      style="width: 100%; height: 100%; position: absolute; top: 0; left: 0 z-index: 3;"
      @click="getPosition(event)"
    ></div>
    <Background pattern-color="#aaa" gap="8" @click="getPosition(event)" />
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
