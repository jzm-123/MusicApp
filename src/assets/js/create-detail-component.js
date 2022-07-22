import MusicList from '@/components/music-list/music-list'
import storage from 'good-storage'
import { processSongs } from '@/service/song'
import { computed,ref,onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router'
export default function createDetailComponent(name, key, fetch) {
  return {
    name:name,
    components:{
      MusicList
    },
    props:{
      data:Object
    },
    setup(props) {
      const songs=ref([])
      const loading=ref(true)
      const route=useRoute();
      const router=useRouter();
      const computedData=computed(()=>{
        let ret=null;
        const data=props.data
        if(data){
          ret=data
        }
        else{
          const cached=storage.session.get(key)
          // console.log('cached',cached)
          if(cached && (cached.mid ||cached.id+'')===route.params.id){
            ret=cached
          }
        }
        return ret;
      })
      const pic=computed(()=>{
        const data=computedData.value
        return data && data.pic
      })
      const title=computed(()=>{
        const data=computedData.value
        return data && (data.name || data.title)
      })
      onMounted(async ()=>{
        const data=computedData.value
        if(!data){
          const path=route.matched[0].path; //一级路由,
          router.push({path});
          return
        }
        const result=await fetch(data)
        songs.value=await processSongs(result.songs)
        loading.value=false
      })
      return{
        songs,
        loading,
        pic,
        title
      }
    },
  //   data(){
  //     return{
  //       songs:[],
  //       loading:true
  //       }
  //   },
  //   computed:{
  //     computedData(){
  //       let ret=null;
  //       const data=this.data
  //       if(data){
  //         ret=data
  //       }
  //       else{
  //         const cached=storage.session.get(key)
  //         if(cached && (cached.mid ||cached.id+'')===this.$route.params.id){
  //           ret=cached
  //         }
  //       }
  //       return ret;
  //     },
  //     pic(){
  //       const data=this.computedData
  //       return data && data.pic
  //     },
  //     title(){
  //       const data=this.computedData
  //       return data && (data.name || data.title)
  //     }
  //   },
  //   async created(){
  //     const data=this.computedData
  //     if(!data){
  //       const path=this.$route.matched[0].path; //一级路由
  //       this.$router.push({path});
  //       return
  //     }
  //     const result=await fetch(data)
  //     this.songs=await processSongs(result.songs)
  //     this.loading=false
  //   }
  }
}
