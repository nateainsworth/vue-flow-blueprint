import { defineStore } from 'pinia';
import { isNode } from '@braks/vue-flow';

const useStore = defineStore('elementsStore', {
  state() {
    return {
      elements: [
        {
          id: '1',
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
  },
});

export default useStore;
