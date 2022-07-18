/*
import { default  as emitter } from 'tiny-emitter/instance'

export default {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
}

*/

import { useEventBus } from '@vueuse/core'


// fooKey.ts
//import type { EventBusKey } from '@vueuse/core'

//export const fooKey: EventBusKey<{ name: foo }> = Symbol('symbol-key')

/*const bus = useEventBus('addWeight')

const bus = useEventBus('addWeight');

bus.on((event, arg2) => {
  console.log(`addWeight: ${event} : ${arg2}`)
  // `e` will be `{ name: foo }`
})*/
/*


bus.on((e) => {
  // `e` will be `{ name: foo }`
})
*/

export default {
  on: (eventName, ...args) => useEventBus(eventName).on(...args),
  once: (eventName, ...args) => useEventBus(eventName).once(...args),
  off: (eventName, ...args) => useEventBus(eventName).off(...args),
  emit: (eventName, ...args) => useEventBus(eventName).emit(...args),
  reset:(eventName) => useEventBus(eventName).reset(),
}
