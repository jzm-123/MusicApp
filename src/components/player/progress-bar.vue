<template>
  <div
    class="progress-bar"
    @click="onClick"
  >
    <div class="bar-inner" ref="progressInnerRef">
      <div
        class="progress"
        ref="progressRef"
        :style="progressStyle"
      ></div>
      <div
        class="progress-btn-wrapper" 
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
        ref="progressBtnRef"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<!-- <script>
  const progressBtnWidth = 16
  export default {
    name: 'progress-bar',
    emits: ['progress-changing', 'progress-changed'],
    props: {
      progress: {        //播放的当前时间
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        offset:0
      }
    },
    computed: {
      progressStyle() {
        return `width:${this.offset}px`
      },
      btnStyle() {
        return `transform:translate3d(${this.offset}px,0,0)`
      }
    },
    watch: {
      progress(newProgress){ //progress 0-1
        this.setOffset(newProgress)
      }
    },
    created() {
      this.touch={}
    },
    methods: {
      onTouchStart(e){
        this.touch.x1=e.touches[0].pageX
        console.log('onTouchStart this.$refs.progress.clientWidth',this.$refs.progressRef.clientWidth)
        this.touch.beginWidth=this.$refs.progressRef.clientWidth
      },
      onTouchMove(e){
        const delta = e.touches[0].pageX - this.touch.x1
        const tempWidth = this.touch.beginWidth + delta
        console.log('onTouchMove this.$el.clientWidth ',this.$el.clientWidth )
        const barWidth = this.$el.clientWidth - progressBtnWidth//整个进度条宽度
        const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
        this.offset = barWidth * progress
        this.$emit('progress-changing', progress)
      },
      onTouchEnd(e){
        console.log('End this.$el.clientWidth',this.$el.clientWidth)
        console.log('End this.$refs.progress.clientWidth',this.$refs.progressRef.clientWidth)
        const barWidth = this.$el.clientWidth - progressBtnWidth
        const progress = this.$refs.progressRef.clientWidth / barWidth
        this.$emit('progress-changed', progress)
      },
      onClick(e){
        console.log('onClick this.$el.getBoundingClientRect()',this.$el.getBoundingClientRect())
        const rect = this.$el.getBoundingClientRect()//进度条总长
        const offsetWidth = e.pageX - rect.left 
        console.log('onClick this.$el.clientWidth',this.$el.clientWidth)
        const barWidth = this.$el.clientWidth - progressBtnWidth
        const progress = offsetWidth / barWidth
        this.$emit('progress-changed', progress)
      },
      setOffset(progress) {
        const barWidth=this.$el.clientWidth-progressBtnWidth;//progress-bar的宽度-progress-btn(进度条的按钮)的宽度 class progress左侧的黄条
        this.offset=barWidth*progress
      }
    }
  }
</script> -->
<script>
import { ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core';
//progress蓝色条，progress-btn-wrapper按钮，bar-inner黑色条
const progressBtnWidth = 16
export default {
    name: 'progress-bar',
    emits: ['progress-changing', 'progress-changed'],
    props: {
      progress: {        //播放的当前时间
        type: Number,
        default: 0
      }
    },
  setup(props,{emit}) {
      const offset=ref(0);
      const touch=ref({})
      const progressRef=ref(null)
      const progressBtnRef=ref(null)
      const progressInnerRef=ref(null)
      const progressStyle=computed(()=>{
        return `width:${offset.value}px`
      })
      const btnStyle=computed(()=>{
        return `transform:translate3d(${offset.value}px,0,0)`
      })
      watch(()=>props.progress,(newProgress)=>{
        setOffset(newProgress)
      })
      function onTouchStart(e){
        touch.value.x1=e.touches[0].pageX
        touch.value.beginWidth=progressRef.value.clientWidth
      }
      function onTouchMove(e){
        const delta = e.touches[0].pageX - touch.value.x1
        const tempWidth = touch.value.beginWidth + delta
        const barWidth = progressInnerRef.value.clientWidth - progressBtnWidth//整个进度条宽度
        const progress = Math.min(1, Math.max(tempWidth / barWidth, 0))
        offset.value = barWidth * progress;
        emit('progress-changing', progress)
      }
      function onTouchEnd(e){
        const barWidth = progressInnerRef.value.clientWidth - progressBtnWidth;
        const progress = progressRef.value.clientWidth / barWidth;
        emit('progress-changed', progress)
      }
      function onClick(e){
        const rect = progressInnerRef.value.getBoundingClientRect()//进度条总长
        const offsetWidth = e.pageX - rect.left ;
        const barWidth = progressInnerRef.value.clientWidth - progressBtnWidth;
        const progress = offsetWidth / barWidth;
        emit('progress-changed', progress)
      }
      function setOffset(progress) {
        const barWidth=progressInnerRef.value.clientWidth-progressBtnWidth;//progress-bar的宽度-progress-btn(进度条的按钮)的宽度 class progress左侧的黄条
        offset.value=barWidth*progress
      }
      return {
        offset,
        touch,
        progressStyle,
        btnStyle,
        progressRef,
        progressBtnRef,
        setOffset,
        progressInnerRef,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onClick

      }
  },
}
</script>

<style lang="scss" scoped>
  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>
