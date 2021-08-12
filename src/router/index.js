import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
// 发现菜单
const Individuation =()=>import('../views/individuation/Individuation.vue')
const Recommend=()=>import ('@/views/individuation/childsComps/Recommend.vue')
const SongList=()=>import ('@/views/individuation/childsComps/SongList.vue')
// 搜索
const Search=()=>import ('@/views/search/Search.vue')
const Songs=()=>import ('@/views/search/childsComps/Songs.vue')
const Singer=()=>import ('@/views/search/childsComps/Singer.vue')
const routes = [
  {
    path: '/',
    redirect: '/Individuation',
  },
  // 发现
  {
    path: '/Individuation',
    name: 'Individuation',
    component: Individuation,
    redirect: '/Individuation/recommend',
    children:[
      {
        path: 'recommend',
        name: 'Recommend',
        component: Recommend,
      }
    ]
  },
  // 搜索结果
  {
    path: '/search/:id?',
    name: 'Search',
    component: Search,
    redirect: '/search/searchsongs',
    children:[
      {
        path: 'searchsongs/:id?',
        name: 'Songs',
        component: Songs,
      },
      {
        path: 'searchSinger/:id?',
        name: 'Singer',
        component: Singer,
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
