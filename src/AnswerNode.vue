<script lang="ts" setup>
import { Handle, Position, NodeProps } from '@braks/vue-flow';

interface AnswerNodeProps extends NodeProps {
  data: {
    answerID: string;
    answerText: string;
  };
  /*isValidTargetPos: {
    type: Function;
    required: false;
  };*/
}
const additionalProps = defineProps<AnswerNodeProps>();

/*const props = defineProps({
  isValidTargetPos: {
    type: Function,
    required: false,
  },
});*/
function shorten(str, maxLen, separator = ' ') {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen)) + "...";
}

const shortenedAnswer = shorten(additionalProps.data.answerText, 30);

</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div class="answers">
  <div class="answer-tooltip">testing longer text field</div>
  {{ additionalProps.data.answerID }}: {{ shortenedAnswer }}
  </div>
  <Handle type="source" :position="Position.Right" />
  <!--:is-valid-connection="props.isValidTargetPos"-->
</template>

<style>

.answer-tooltip{
  position:absolute;
  top:0;
  left:0;
  font-size: 9px;
  background-color:green;
  padding:6px;
  margin:-6px;
  transform: translate(calc(100% - 100px));
}

.vue-flow__node-answernode{
  border:none;
  padding: 10px 0px;
  text-align:left;
  
}

.vue-flow__node-answernode .answers{
  font-size: 9px;
  position:relative;
}

.vue-flow__node-answernode .vue-flow__handle {
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
