<template>
<div class="searchContainer">
    <Topbar :navBarData="navBarData"></Topbar>
    <router-view :key="$route.fullPath"></router-view>
</div>
</template>

<script>
import Topbar from "@/components/navbar/Topbar.vue";
export default {
    components: {
        Topbar
    },
    mounted() {
        // console.log(this.$route.query.id);
    },
    data() {
        return {
            navBarData: [
                { _id: 1, name: "单曲", path:`/search/searchsongs/?id=${this.$route.query.id}`},
                { _id: 2, name: "歌手", path: `/search/searchSinger/?id=${this.$route.query.id}` },
                { _id: 3, name: "专辑", path: `/Individuation/ranking/?id=${this.$route.query.id}` },
                { _id: 4, name: "视频", path: `/Individuation/singer/id${this.$route.query.id}` },
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
.searchContainer{
    padding: 20px 30px;
}
</style>