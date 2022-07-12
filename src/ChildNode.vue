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
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}
console.log(shorten("The quick brown fox jumps over the lazy dog", 25));

const trimmedAnswer = additionalProps.data.answerText.substring(0, 80);
const shortenedAnswer = shorten(additionalProps.data.answerText, 25);//= trimmedAnswer.substring(0, Math.min(trimmedAnswer.length, trimmedAnswer.lastIndexOf(" ")))

</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div>{{ additionalProps.data.answerID }}: {{ shortenedAnswer }}</div>
  <Handle type="source" :position="Position.Right" />
  <!--:is-valid-connection="props.isValidTargetPos"-->
</template>

<style>

.vue-flow__node-childnode{
  border:none;
  padding: 10px 0px;
  text-align:left;
}

.vue-flow__node-childnode .vue-flow__handle {
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
