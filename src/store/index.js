import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //当前播放音乐信息
    currentMusic:{
      id:'',
      url:''
    },
    //播放的右侧歌单
    musicList:[],
    //播放列表的id
    musicListID:'',
    // 当前播放的列表index
    currentIndex:-1,
    // 用户信息
    userInfo:{},
    // 当前是否登录
    isLogin:false,

  },
  mutations: {
    // 更改当前播放音乐id
    UPDATA_MUSICID(state,payload){
      state.currentMusic.id=payload;
    },
    //添加播放的音乐
    UPDATA_MUSIC_LIST(state,{musicList,id}){
      if(state.currentMusic.id !=id){
        state.musicListID=id;
        state.currentIndex=-1;
      }
      // 得使用深拷贝,因为直接使用的话push的row地址是一样的
      state.musicList=JSON.parse(JSON.stringify(musicList));
      console.log( state.musicList);
    },
    // 当前下标
    CHANGE_INDEX(state,payload){
      // console.log(payload);
      state.currentIndex=payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
