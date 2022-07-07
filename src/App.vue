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

import { markRaw } from 'vue';

const nodeTypes = {
  custominput: markRaw(CustomInput),
  childnode: markRaw(ChildNode),
};
const onEdgeUpdateStart = (edge) => console.log('start update', edge);
const onEdgeUpdateEnd = (edge) => console.log('end update', edge);
const onEdgeUpdate = ({ edge, connection }) => {
  elements.value = updateEdge(edge, connection, elements.value);
};

const store = useStore();

const { onConnect, addEdges } = useVueFlow();

onConnect((params) => addEdges([params]));
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

    <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
      <button style="margin-right: 5px" @click="store.updatePosition">
        update positions
      </button>
      <button style="margin-right: 5px" @click="store.toggleClass">
        toggle class
      </button>
      <button @click="store.log">log store state</button>
    </div>
    <Background pattern-color="#aaa" gap="8" />
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
