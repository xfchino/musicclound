<template>
    <div class="individuationContainer">
        <Topbar  :navBarData="navBarData"></Topbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Topbar from "@/components/navbar/Topbar.vue";
import Recommend from './childsComps/Recommend.vue'
export default {
    components: {
        Topbar,Recommend
    },
    mounted() {
        
    },
    data() {
        return {
            navBarData: [
                { _id: 1, name: "个性推荐", path: "/Individuation/recommend" },
                { _id: 2, name: "歌单", path: "/Individuation/songlist" },
                { _id: 3, name: "排行榜", path: "/Individuation/ranking" },
                { _id: 4, name: "歌手", path: "/Individuation/singer" },
            ]
        }
    },
    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.individuationContainer{
    padding: 20px;
    box-sizing: border-box;
}
</style>