<script setup>
import {
  VueFlow,
  useVueFlow,
  Controls,
  Background,
  MiniMap,
  updateEdge,
  Position,
} from '@braks/vue-flow';
import { onMounted, computed, ref, markRaw } from 'vue';
import useStore from '../Vueflow/store.js';
import AdditionalControls from '../Vueflow/AdditionalControls.vue';
import QuestionNode from '../Vueflow/QuestionNode.vue';
import AnswerNode from '../Vueflow/AnswerNode.vue';
import EndSessionNode from '../Vueflow/EndSessionNode.vue';
import StartSessionNode from '../Vueflow/StartSessionNode.vue';
import QuestionBar from '../Vueflow/QuestionBar.vue';
import FlowLoader from '../Vueflow/VueFlowLoader.vue';
import TreeBar from '../Vueflow/TreeBar.vue';
import InteventionBar from '../Vueflow/InteventionBar.vue';
import OpenEndedNode from '../Vueflow/OpenEndedNode.vue';
import InteventionNode from "../Vueflow/InteventionNode.vue";
import TreeLinkNode from "../Vueflow/TreeLinkNode.vue";
import eventBus from '../../event-bus';

let id = 0;
const getId = () => `dndnode_${id++}`;

const elements = ref([]);

const nodeTypes = {
  questionnode: markRaw(QuestionNode),
  answernode: markRaw(AnswerNode),
  endsessionnode: markRaw(EndSessionNode),
  startsessionnode: markRaw(StartSessionNode),
  opennode: markRaw(OpenEndedNode),
  inteventionnode: markRaw(InteventionNode),
  treelinknode: markRaw(TreeLinkNode),
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
  fitView ,
} = useVueFlow({
  selectionKeyCode: 'Shift'
});

//onConnect((params) => addEdges([params]));

onConnect((params) => {
  addEdges([
    {
      ...params,
      updatable: true,
    },
  ]);
});

fitView();
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
//onPaneReady((instance) => instance.fitView());



  var weightID = 1;

  function addWeights (parentID){
    let y = 60 + 40 * weightID;
    const openEndedNode = {
      id: `weighted_node-${weightID}-to-${parentID}`,
      type: 'opennode',
      //label: `Node ${id}`,
      targetHandle: Position.Left, // or Bottom, Left, Right,
      sourceHandle: Position.Left,
      position: {
        x: 25,
        y: y,
      },
      extent: 'parent',
      parentNode: `question_node-${parentID}`,
      class: 'light',
      expandParent: true,
      draggable: false,
      data: { answerID: '100',isWeight:true,parentID:parentID},
    };
    addNodes([openEndedNode]);
    weightID++;
  }

/*
import { useEventBus } from '@vueuse/core';
const bus = useEventBus('addWeight');

bus.on((event, arg2) => {
  console.log(`addWeight: ${event} : ${arg2}`)
  // `e` will be `{ name: foo }`
})
*/
// listen to an event
//const unsubscribe = bus.on(listener);
/*
bus.on('addWeight', (id) => {
  console.log('event called');
  // `e` will be `{ name: foo }`
})*/



//bus.emit("10","test2");
//eventBus.$on('addWeight')

eventBus.on('addWeight', (id, arg2) => {
  console.log(`add weight: ${id}`);
  addWeights (id);
  //eventBus.reset('addWeight');
 
})
/*
eventBus.off('addWeight', (id, arg2) => {
  console.log(`add weight turned off: ${id}`);
 
 
})
*/




const onDrop = (event) => {
  console.log('dropping node');
  const type = event.dataTransfer?.getData('application/vueflow');

  //todo: use type in if statement to work out what is being added

    const position = project({
      x: event.clientX,
      y: event.clientY - 40,
    });

if(type == 'questionnode'){
  const questionID = event.dataTransfer?.getData('questionID');
  const questionText = event.dataTransfer?.getData('questionText');
  const questionAnswers = JSON.parse(event.dataTransfer?.getData('questionAnswers'));
  const questionShort = event.dataTransfer.getData('questionShort');



  console.log(questionAnswers);
  console.log(Object.keys(questionAnswers.Answers).length);
  

  var answerQantity = Object.keys(questionAnswers.Answers).length;
  
  var questionHeight = 47 + 40 * answerQantity;
  var openended = false;
  if(answerQantity == 0){
    var questionHeight = 47 + 40+20;
    openended = true;
  }



console.log("is open:" + openended)
  
  //const id = nodes.value.length + 1;
  const newNode = {
    id: `question_node-${questionID}`,
    type: 'questionnode',
    label: 'parent',
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: position,
    style: {
      backgroundColor: 'rgb(232 232 232)',
      width: '200px',
      height: `${questionHeight}px`,
    },
    class: 'light',
    data: { questionID: questionID, questionText: questionText, questionShort: questionShort,openEnded: openended,answersQuantity:answerQantity
    },
    events: {
      /*click: () => {
        console.log('Node activated')
        
      },*/
      customEvent: () => {
        console.log('Node 1 custom event');
        //addWeights (questionID)
      },
    },
    /*
    , event:{
      click: () => {
        console.log('Node activated')
        addWeights (questionID)
      },
    },
    */
    
  };
  addNodes([newNode]);

  for (let i = 0; i < answerQantity; i++) {
    let y = 40 + 40 * i;
    const AnswerChildNode = {
      id: `answer_node-${i}-to-${questionID}`,
      type: 'answernode',
      //label: `Node ${id}`,
      targetHandle: Position.Left, // or Bottom, Left, Right,
      sourceHandle: Position.Left,
      position: {
        x: 25,
        y: y,
      },
      extent: 'parent',
      parentNode: `question_node-${questionID}`,
      class: 'light',
      expandParent: true,
      draggable: false,
      data: { answerID: i + 1, answerText: questionAnswers.Answers[i]},
    };
    addNodes([AnswerChildNode]);
  }
  if(answerQantity == 0){
      let y = 60;
      const openEndedNode = {
      id: `openended_node-to-${questionID}`,
      type: 'opennode',
      //label: `Node ${id}`,
      targetHandle: Position.Left, // or Bottom, Left, Right,
      sourceHandle: Position.Left,
      position: {
        x: 25,
        y: y,
      },
      extent: 'parent',
      parentNode: `question_node-${questionID}`,
      class: 'light',
      expandParent: true,
      draggable: false,
      data: { answerID: 'Open Ended',isWeight:false,parentID:questionID},
    };
    addNodes([openEndedNode]);
  }
}else if(type == 'inteventionnode'){

    const inteventionId = event.dataTransfer?.getData('inteventionID');
   const inteventionDesc =  event.dataTransfer?.getData('inteventionDesc');
    const inteventionTitle = event.dataTransfer?.getData('inteventionTitle');

  const newNode = {
    id: `Intevention-Node-${inteventionId}`,
    type: 'inteventionnode',
    label: 'parent',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: position,/*{
      x: dimensions.value.width / 2,
      y: dimensions.value.height / 2,
    },*/
    data: { inteventionText: inteventionTitle, inteventionDescription: inteventionDesc },
  };
  addNodes([newNode]);
}else if(type == 'treelinknode'){

    const treeLinkId = event.dataTransfer?.getData('treelinkID');
    const treeDesc =event.dataTransfer?.getData('treelinkDesc');
    const treeTitle =event.dataTransfer?.getData('treelinkTitle');


  const newNode = {
    id: `TreeLink-Node-${treeLinkId}`,
    type: 'treelinknode',
    label: 'parent',
    //label: `Node ${id}`,
    targetHandle: Position.Left, // or Bottom, Left, Right,
    sourceHandle: Position.Left,
    position: position, /*{
      x: dimensions.value.width / 2,
      y: dimensions.value.height / 2,
    },*/
    data: { treelinkText: treeTitle, treelinkDescription: treeDesc },
  };
  addNodes([newNode]);
}
};
</script>
<script>
export default {
  data() {
    return {
      xPos: 100,
      yPos: 100,
      qPanel: false,
      iPanel: false,
      tPanel: false,
    };
  },
  methods: {
    getPosition(event) {
      this.xPos = event.clientX;
      this.yPos = event.clientY;
    },
    openQuestionPanel () {
      this.qPanel = true;

      this.tPanel = false;
     
      this.iPanel = false;
    },
    openInteventionPanel () {
     this.iPanel = true;
      this.tPanel = false;
      this.qPanel = false;
     
    },
    openTreesPanel () {
     this.tPanel = true;
 
      this.qPanel = false;
      this.iPanel = false;
    },
    closePanel(){
      
      this.tPanel = false;
      this.qPanel = false;
      this.iPanel = false;
    }
  },
};
</script>

<template>
  <FlowLoader />
  <div class="dndflow" @drop="onDrop">
    <VueFlow
      v-model="store.elements"
      :fit-view-on-init="true"
      :node-types="nodeTypes"
      @edge-update="store.onEdgeUpdate"
      @edge-update-start="store.onEdgeUpdateStart"
      @edge-update-end="store.onEdgeUpdateEnd"
      @dragover="onDragOver"
      selection-key-code="Shift"
      
    >
      <!--  
      @mousedown.right="getPosition($event)"
      @contextmenu.prevent
    -->
      <AdditionalControls 
      :x-position="xPos" 
      :y-position="yPos" 
      @questionToggle="openQuestionPanel()"
      @inteventionToggle="openInteventionPanel()"
      @treesToggle="openTreesPanel()"
      />
      <QuestionBar v-if="qPanel" @closePanel="closePanel()"/>
      <TreeBar v-if="tPanel" @closePanel="closePanel()"/>
      <InteventionBar v-if="iPanel" @closePanel="closePanel()"/>
      <div style="position: absolute; right: 10px; top: 10px; z-index: 4">
        <button class="flow-buttons" @click="store.log">log store state</button>
        <button class="flow-buttons" @click="store.restore">restore log state</button>
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


/* 
Tooltip useage

- add class to parent container to activate on hover "active-tooltip"
- add class "vue-tooltip" to tooltip
*/

.left-tooltip{
  position:absolute;
  top:0;
  left:0;
  font-size: 9px;
  background-color: #2d3f56;
  color: white;
  font-weight: 600;
  border-radius:5px;
  padding:6px;
  margin:-6px;
  width:max-content;
  transform: translate(calc(-20px - 100%));
  display:none;
}

.left-tooltip::after{
  content:"";
  position:absolute;
  top:calc(50% - 8px);
  right:-4px;
  width: 0; 
  height: 0; 
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid #2d3f56;
  z-index:1001;
}


.right-tooltip{
  position:absolute;
  top:0;
  right:0;
  font-size: 9px;
  background-color: #2d3f56;
  color: white;
  font-weight: 600;
  border-radius:5px;
  padding:6px;
  margin:-6px;
  width:max-content;
  transform: translate(calc(100% + 20px));
  z-index:1001;
  display:none;
}

.right-tooltip::after{
  content:"";
  position:absolute;
  top:calc(50% - 8px);
  left:-4px;
  width: 0; 
  height: 0; 
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid #2d3f56;;
}

.top-tooltip{
  position:absolute;
  top: -10px;/*top:-100%;*/
  left:50%;
  font-size: 9px;
  background-color: #2d3f56;
  color: white;
  font-weight: 600;
  border-radius:5px;
  padding:6px;
  margin:-6px;
  width:max-content;
  transform: translate(calc( 50% - 100% + 6px),calc( -50%)); /* calc also adds the padding */
  z-index:1001;
  display:none;
}

.top-tooltip::after{
  content:"";
  position:absolute;
  bottom:calc(0% - 4px);
  left:calc(50% - 5px);
  width: 0; 
  height: 0; 
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-top: 5px solid #2d3f56;;
}

.bottom-tooltip{
  position:absolute;
  top:calc(200% + 6px);
  left:50%;
  font-size: 9px;
  background-color: #2d3f56;
  color: white;
  font-weight: 600;
  border-radius:5px;
  padding:6px;
  margin:-6px;
  width:max-content;
  transform: translate(calc( 50% - 100% + 6px),0);
  z-index:1001;
  display:none;
}

.bottom-tooltip::after{
  content:"";
  position:absolute;
  top:calc(0% - 4px);
  left:calc(50% - 5px);
  width: 0; 
  height: 0; 
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  border-bottom: 5px solid #2d3f56;;
}


.active-tooltip:hover .bottom-tooltip,.active-tooltip:hover .top-tooltip,.active-tooltip:hover .left-tooltip,.active-tooltip:hover .right-tooltip{
  display:block;
}

</style>
