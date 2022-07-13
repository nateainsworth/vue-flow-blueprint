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
  onPaneReady,
  instance,
} = useVueFlow();

onPaneReady(({ fitView }) => {
  fitView()
})

const onSave = () => {
  localStorage.setItem(flowKey, JSON.stringify(instance.value?.toObject()));
};

const onRestore = () => {
  const flow = JSON.parse(localStorage.getItem(flowKey));

  if (flow) {
    const [x = 0, y = 0] = flow.position;
    setNodes(flow.nodes);
    setEdges(flow.edges);
    instance.value?.setTransform({ x, y, zoom: flow.zoom || 0 });
  }
};

const onAdd = () => {
  var answerQantity = 3;
  var questionHeight = 47 + 40 * answerQantity;

  const id = nodes.value.length + 1;
  const newNode = {
    id: `question_node-${id}`,
    type: 'questionnode',
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
      height: `${questionHeight}px`,
    },
    class: 'light',
    data: { questionID: id, questionText: 'example question' },
  };
  addNodes([newNode]);

  for (let i = 0; i < answerQantity; i++) {
    console.log('adding answers');

    let y = 40 + 40 * i;
    const AnswerChildNode = {
      id: `answer_node-${i}-to-${id}`,
      type: 'answernode',
      //label: `Node ${id}`,
      targetHandle: Position.Left, // or Bottom, Left, Right,
      sourceHandle: Position.Left,
      position: {
        x: 25,
        y: y,
      },
      extent: 'parent',
      parentNode: `question_node-${id}`,
      class: 'light',
      expandParent: true,
      draggable: false,
      data: { answerID: i + 1, answerText: 'example answer' },
    };
    addNodes([AnswerChildNode]);
  }
  /*
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
    parentNode: `question_node-${id}`,
    extent: 'parent',
    class: 'light',
    expandParent: false,
    draggable: false,
  };
*/
  //, newChildNode, newChildNode2
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

const onInvAdd = () => {
  const id = nodes.value.length + 1;
  const newNode = {
    id: `Intevention-Node-${id}`,
    type: 'inteventionnode',
    label: 'parent',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: {
      x: dimensions.value.width / 2,
      y: dimensions.value.height / 2,
    },
    data: { inteventionText: 'Worry Tree Intevention', inteventionDescription: 'Intevention description..........' },
  };
  addNodes([newNode]);
};

const onTreeAdd = () => {
  const id = nodes.value.length + 1;
  const newNode = {
    id: `TreeLink-Node-${id}`,
    type: 'treelinknode',
    label: 'parent',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: {
      x: dimensions.value.width / 2,
      y: dimensions.value.height / 2,
    },
    data: { treelinkText: 'Another Tree', treelinkDescription: 'Links to a different tree' },
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
    xPosition: Number,
    yPosition: Number,
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
    onQuestionPressed() {
      this.onAdd();
      this.CloseMenu();
    },
    onEndPressed() {
      this.onEndAdd();
      this.CloseMenu();
    },
    openQuestionPanel () {
      this.$emit('questionToggle', true);
      this.CloseMenu();
    },
    openInteventionPanel () {
      this.$emit('inteventionToggle', true);
      this.CloseMenu();
    },
    openTreesPanel () {
      this.$emit('treesToggle', true);
      this.CloseMenu();
    }

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
      <li class="list-group-item noselect" @click="openQuestionPanel">
        Question
      </li>
      <li class="list-group-item noselect" @click="onInvAdd">Intevention</li>
      <li class="list-group-item noselect" @click="onTreeAdd">Tree Link</li>
      <li class="list-group-item noselect" @click="onEndPressed">
        End Session
      </li>
    </ul>
  </div>

  <div class="save__controls">
    <button class="flow-buttons" @click="onSave">save</button>
    <button class="flow-buttons" @click="onRestore">restore</button>
    <button class="flow-buttons" @click="openQuestionPanel">Add Question Node</button>
    <button class="flow-buttons" @click="onEndAdd">Add End Node</button>
    <button class="flow-buttons" @click="onTreeAdd">Add Tree Node</button>
    <button class="flow-buttons" @click="onInvAdd">Add Intevention Node</button>
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
