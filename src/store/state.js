import { PLAY_MODE, SEARCH_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'
const state = {
  sequenceList: [],
  playlist: [], //真实的播放列表
  playing: false,//播放状态
  playMode: PLAY_MODE.sequence,//播放模式
  currentIndex: 0,//当前播放的歌曲
  fullScreen: false,//全屏还是收缩
  favoriteList: [],
  searchHistory: load(SEARCH_KEY),//有则从本地存储拿
  playHistory: []
}

export default state
