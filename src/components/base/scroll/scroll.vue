<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
  import useScroll from './use-scroll'
  import { ref } from 'vue'

  export default {
    name: 'scroll',
    props: {
      click: {
        type: Boolean,
        default: true
      },
      probeType: { //获取滚动位置
        type: Number,
        default: 0
      }
    },
    emits: ['scroll'],//自定义事件，派发事件
    setup(props, { emit }) {
      const rootRef = ref(null)
      const scroll = useScroll(rootRef, props, emit)
      return {
        rootRef,
        scroll
      }
    }
  }
</script>
