import { defineStore } from 'pinia';
import { isNode, updateEdge } from '@braks/vue-flow';

const useStore = defineStore('elementsStore', {
  state() {
    return {
      elements: [
        {
          id: 'start-session-node',
          type: 'startsessionnode',
          label: 'Node 1',
          position: { x: 250, y: 5 },
          class: 'light',
        },
      ],
    };
  },
  actions: {
    log() {
      //console.log('stored elements', this.elements);
      console.log(JSON.stringify(this.elements))
    },
    onEdgeUpdateStart(edge) {
      console.log('start update', edge);
    },
    onEdgeUpdateEnd(edge) {
      console.log('end update', edge);
    },
    onEdgeUpdate({ edge, connection }) {
      this.elements = updateEdge(edge, connection, this.elements);
    },
  },
});

export default useStore;
