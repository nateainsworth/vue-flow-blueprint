import { defineStore } from 'pinia';
import { isNode, updateEdge } from '@braks/vue-flow';

var storedData;

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
      storedData = JSON.stringify(this.elements);
    },
    restore(){
      console.log("restoring...");
      console.log(storedData);
      this.elements = JSON.parse(storedData);
      console.log()
      const [x = 0, y = 0] = this.elements.position;
      setNodes(this.elements.nodes);
      setEdges(this.elements.edges);
      setTransform({ x, y, zoom: this.elements.zoom || 0 })
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
