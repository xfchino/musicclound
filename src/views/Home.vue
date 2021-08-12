<template>
    <el-container>
        <el-header>
            <Headers></Headers>
        </el-header>
        <el-container>
            <el-aside width="12%">
                <el-menu default-active="/Individuation" class="el-menu" router>
                    <el-menu-item index="/Individuation">
                        <i class="el-icon-menu"></i>
                        <span slot="title">发现音乐</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">视频</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">收藏</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-setting"></i>
                        <span slot="title">每日推荐</span>
                    </el-menu-item>
                    <!-- 创建歌单 -->
                    <el-menu-item-group>
                        <template slot="title">创建的歌单</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-menu>
            </el-aside>
            <!-- 内容 -->
            <el-main>
                <router-view class="router-main"></router-view>
            </el-main>
        </el-container>
        <Footers></Footers>
    </el-container>
</template>

<script>
import Footers from "../components/layout/Footer.vue";
import Headers from "../components/layout/Header.vue";
export default {
    components: {
        Footers,
        Headers,
    },
    name: "Home",
    data() {
        return {
            sing: "",
            // 用户信息
            userInfo:{}
        };
    },
    async mounted() {
        this.getUserMusicInfo();
        // console.log(new Date().getTime());
    },
    methods: {
        getUserMusicInfo(){
            //默认是未登录
            if(!this.$store.state.isLogin){
                this.$message.error('请先登录')
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.el-header {
    height: 58px !important;
    padding: 0;
    margin: 0;
    z-index: 100;
}
.el-aside {
    height: calc(100vh - 58px - 69px);
    border-right: 1px solid #ccc;
}
.el-menu {
    border: none;
}
.el-menu-item:hover {
    background-color: #f5f5f6 !important;
}
// 内容
.el-main {
    padding: 0;
}
.router-main {
    padding: 0 15px;
    margin: 0;
    // width: 100%;
    height: calc(100vh - 58px - 69px);
}
::-webkit-scrollbar {
    width: 8px;
}
*::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: #ccc;
}
</style>
