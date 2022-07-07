<script setup>
import {
  VueFlow,
  useVueFlow,
  Controls,
  Background,
  MiniMap,
} from '@braks/vue-flow';
import { computed } from 'vue';
import useStore from './store.js';
import AdditionalControls from './AdditionalControls.vue';
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';
import { markRaw } from 'vue';

const nodeTypes = {
  custominput: markRaw(CustomInput),
};

const store = useStore();

const { onConnect, addEdges } = useVueFlow();

const elements = ref([
  { id: '1', label: 'Node 1', position: { x: 100, y: 100 } },
]);

onConnect((params) => addEdges([params]));
</script>

<template>
  <VueFlow
    v-model="store.elements"
    :fit-view-on-init="true"
    :node-types="nodeTypes"
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
