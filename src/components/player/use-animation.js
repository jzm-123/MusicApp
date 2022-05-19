import { ref } from 'vue'
import animations from 'create-keyframe-animation'

export default function useAnimation() {
  const cdWrapperRef = ref(null)
  let entering = false
  let leaving = false

  function enter(el, done) {
    if (leaving) {
      afterLeave()//快速切换，leave还未完成直接清除
    }
    entering = true
    const { x, y, scale } = getPosAndScale()

    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`//小cd
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)'//变回原样
      }
    }

    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
      }
    })

    animations.runAnimation(cdWrapperRef.value, 'move', done)
  }

  function afterEnter() {
    entering = false
    animations.unregisterAnimation('move')
    cdWrapperRef.value.style.animation = ''
  }

  function leave(el, done) {
    if (entering) {
      afterEnter()
    }
    leaving = true
    const { x, y, scale } = getPosAndScale()
    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = 'all .6s cubic-bezier(0.45, 0, 0.55, 1)'//过渡效果
    cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`//切换
    cdWrapperEl.addEventListener('transitionend', next)

    function next() {
      cdWrapperEl.removeEventListener('transitionend', next)
      done()
    }
  }

  function afterLeave() {
    leaving = false
    const cdWrapperEl = cdWrapperRef.value

    cdWrapperEl.style.transition = ''
    cdWrapperEl.style.transform = ''
  }

  function getPosAndScale() {
    const targetWidth = 40//小cd的宽度
    const paddingLeft = 40//小cd据左边的距离
    const paddingBottom = 30//小cd到底部的距离
    const paddingTop = 80//大cd到顶部
    const width = window.innerWidth * 0.8 //大cd
    const x = -(window.innerWidth / 2 - paddingLeft)//往左偏移负值
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
    const scale = targetWidth / width

    return {
      x,
      y,
      scale
    }
  }

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave
  }
}
