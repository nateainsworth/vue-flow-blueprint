<script lang="ts" setup>
import { NodeId, useHandle, useVueFlow } from '@braks/vue-flow'
import type { HandleProps, Position } from '@braks/vue-flow'

interface QuickConnectProps extends HandleProps {
  /** Unique id of handle element */
  id?: string
  /** Handle type (source / target) {@link HandleType} */
  type?: HandleType
  /** Handle position (top, bottom, left, right) {@link Position} */
  position?: Position
  /** A valid connection func {@link ValidConnectionFunc} */
  isValidConnection?: ValidConnectionFunc
  /** Enable/disable connecting to handle */
  connectable?: boolean

  questionID: Number

  answerQuantity: Number
}

const quicknodeID = `question_node-${props.questionID}`;

const props = withDefaults(defineProps<QuickConnectProps>(), {
  type: 'source',
  position: 'right' as Position,
  connectable: true,
})

const { id, hooks, connectionStartHandle } = useVueFlow()
//const nodeId = "answer_node-0-to-1";//inject(NodeId, '')
const nodeId2 = "answer_node-0-to-2";

const { onMouseDown, onClick } = useHandle()
const onMouseDownHandler = (event: MouseEvent) => {
  for(var i = 0; i < props.answerQuantity; i++){
    const nodeId = `answer_node-${i}-to-${props.questionID}`;
    console.log(nodeId);
    onMouseDown(event, props.id ?? null, nodeId, props.type === 'target', props.isValidConnection, undefined, (connection) =>
      hooks.value.connect.trigger(connection),
    )
  }
  var nodeId = `vue-flow__quick-handle-${props.questionID}`;
  onMouseDown(event, props.id ?? null, quicknodeID, props.type === 'target', props.isValidConnection, undefined, (connection) =>{}
      //hooks.value.connect.trigger(connection),
    )
}

const onClickHandler = (event: MouseEvent) => {
  var nodeId = `vue-flow__quick-handle-${props.questionID}`;
  onClick(event, props.id ?? null, nodeId, props.type, props.isValidConnection)
  /*for(var i = 0; i < props.answerQuantity; i++){
    const nodeId = `answer_node-${i}-to-${props.questionID}`;
    onClick(event, props.id ?? null, nodeId, props.type, props.isValidConnection)
  }*/
}
</script>

<script lang="ts">
export default {
  name: 'Handle',
}
</script>


<template>
  <div
    :data-handleid="props.id"
    :data-nodeid="nodeId"
    :data-handlepos="props.position"
    class="vue-flow__handle nodrag active-tooltip"
    :class="[
      `vue-flow__handle-${props.position}`,
      `vue-flow__quick-handle-${props.questionID}`,
      {
        source: props.type !== 'target',
        target: props.type === 'target',
        connectable: props.connectable,
        connecting:
          connectionStartHandle?.quicknodeId === quicknodeId &&
          connectionStartHandle?.handleId === props.id &&
          connectionStartHandle?.type === props.type,
      },
    ]"
    @mousedown="onMouseDownHandler"
    @click="onClickHandler"
  ><div class="top-tooltip">Quick Connect</div>
    <slot :node-id="quicknodeId" v-bind="props"></slot>
  </div>
</template>