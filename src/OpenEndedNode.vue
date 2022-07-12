<script lang="ts" setup>
import { Handle, Position, NodeProps } from '@braks/vue-flow';

interface OpenEndedNodeProps extends NodeProps {
  data: {
    nodeText: string;
    parentID: string;
    isWeight: Boolean;
  };
  
  /*isValidTargetPos: {
    type: Function;
    required: false;
  };*/
}
const props = defineProps<OpenEndedNodeProps>();

/*const props = defineProps({
  isValidTargetPos: {
    type: Function,
    required: false,
  },
});*/




</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div v-if="!props.data.isWeight" class="openText">Open Ended Answer</div>
  <div v-else class="openText"><input type="text" placeholder="Keyword Weight"/></div>

  <Handle type="source" :position="Position.Right" />
  <!--<div class="weightBtn">Add Weight</div>-->
  <!--:is-valid-connection="props.isValidTargetPos"-->
</template>

<style>

.vue-flow__node-opennode{
  border:none;
  padding: 10px 0px;
  text-align:left;
  
}

.vue-flow__node-opennode .openText{
  font-size: 9px;
}

.vue-flow__node-opennode .vue-flow__handle {
    background: #586e8a;
    /*border: 1px solid #586e8a;*/
     border: 2px solid #e8e8e8;
    right: -29px;
    width: 10px;
    height: 10px;
}



/*
background: #586e8a;
    border: 2px solid #e8e8e8;
    right: -29px;
    width: 10px;
    height: 10px;
}
*/

</style>
