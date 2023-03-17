import { h, render } from 'vue'
import messageComponent from './index.vue'

type messageType = 'warn' | 'error' | 'success'

export const message = (type: messageType, content: string, duration: number = 3000) => {

  const onDestroy = () => {
    render(null, document.body)
  }

  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy,
  })

  render(vnode, document.body)
}
