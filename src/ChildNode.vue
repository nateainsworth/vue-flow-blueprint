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
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div>Answer {{ additionalProps.data.answerID }}</div>
  <Handle type="source" :position="Position.Right" />
  <!--:is-valid-connection="props.isValidTargetPos"-->
</template>

<style></style>
