<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @select="selectSinger">
    </index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view>
  </div>
</template>
<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'singer',
  components:{
    IndexList
  },
  setup() {
    const singers=ref([]);
    const selectedSinger=ref(null);
    const router=useRouter();
    onMounted(async ()=>{
      const result =await getSingerList();
      singers.value=result.singers
    })
    function selectSinger(singer){
        selectedSinger.value=singer
        cacheSinger(singer)
        router.push({
          path:`/singer/${singer.mid}`
        })
    }
    function cacheSinger(singer){
        storage.session.set(SINGER_KEY,singer);
    }
    return {
      singers,
      selectedSinger,
      selectSinger,
      cacheSinger
    }
  },
}
</script>

<style lang="scss" scoped>
  .singer {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
  }
</style>