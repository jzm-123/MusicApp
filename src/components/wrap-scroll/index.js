import { h, mergeProps, withCtx, renderSlot, ref, computed, watch, nextTick } from 'vue'
import Scroll from '@/components/base/scroll/scroll'
import { useStore } from 'vuex'
//高阶Scroll组件
export default {
  name: 'wrap-scroll',
  props:Scroll.props,
  emits:Scroll.emits,
  render(ctx){//create_element，组件渲染
    return h(Scroll,mergeProps({ref:'scrollRef'},ctx.$props,{
      onScroll:(e)=>{
        ctx.$emit('scroll',e)//与Scroll的emits绑定的父子组件相关
      }
    }),
    {default:withCtx(()=>{
      return [renderSlot(ctx.$slots,'default')]//slots，插槽，<scroll><slot /><scroll/> // 包含其子节点的插槽
    })})  
  },
  setup(){
    const scrollRef=ref(null);
    const scroll=computed(()=>{
      return scrollRef.value.scroll//真正访问到了scroll实例
    })
    const store=useStore();
    const playlist=computed(()=>store.state.playlist);
    watch(playlist,async (newPlaylist)=>{
      await nextTick();
      scroll.value.refresh();//对应scroll.vue的返回值中的 scroll
    })
    return {
      scrollRef,
      scroll
    }
  }
}
