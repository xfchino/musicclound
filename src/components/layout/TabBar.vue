<template>
    <div class="music-tabbar">
        <b-menu
        class=""
        item-width="100%"
        item-height="50px"
        :menu="menu" vertical/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu:[
            {line:'/',icon:'iconfont icon-music',content:'个性推荐'},
            {line:'',icon:'iconfont icon-swticonzuqiu',content:'歌单'},
            {line:'',icon:'iconfont icon-pingpangqiu',content:'排行榜'},
            {line:'',icon:'iconfont icon-icon10',content:'歌手'},
            {line:'',icon:'iconfont icon-icon10',content:'MV'},
            {line:'',icon:'iconfont icon-icon10',content:'最新音乐'},
        ],
        }
    },
}
</script>

<style lang="scss" scoped>
// .vbestui-menu-ul li{
//     box-sizing: border-box;
//     border-left: 10px solid beige ;
// }
.music-tabbar{
    height: calc(100vh - 58px - 60px);
    width: 18%;
    background-color: rgb(247, 247, 247);
    float: left;
}
</style>