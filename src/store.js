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
      console.log('stored elements', this.elements);
    },
    toggleClass() {
      console.log(this.elements);
      this.elements.forEach(
        (el) => (el.class = el.class === 'light' ? 'dark' : 'light')
      );
    },
    updatePosition() {
      this.elements.forEach((el) => {
        if (isNode(el)) {
          el.position = {
            x: Math.random() * 400,
            y: Math.random() * 400,
          };
        }
      });
    },
    onEdgeUpdateStart(edge) {
      console.log('start update', edge);
      console.log(this.elements);
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
