<template>
    <div class="RecommendContainer">
        <div class="recommend">
            <div class="carouse">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item
                        v-for="(item,index) in bannerList"
                        :key="index"
                    >
                        <!-- <h3 class="medium">{{ item }}</h3> -->
                        <img :src="item.imageUrl" alt="" class="carouse-pic" />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 推荐列表 -->
            <div class="recommendList">
                <h3>推荐歌单 <i class="el-icon-arrow-right"></i></h3>
                <Discover-list :personalizedList="personalizedList"></Discover-list>
            </div>
        </div>
    </div>
</template>

<script>
import DiscoverList from '@/components/listData/DiscoverList.vue'
export default {
    components:{
        DiscoverList
    },
    data() {
        return {
            bannerList: [],
            personalizedList:[]
        };
    },
    mounted() {
        this.getTabBar();
        this.getPersonalized();
    },
    methods: {
        // 轮播图
        async getTabBar() {
            const res = await this.$http.discover.banner();
            if (res.code == 200) {
                this.bannerList = res.banners;
            }
        },
        // 推荐歌单
         async getPersonalized() {
            const res = await this.$http.discover.personalized({limit:10});
            if (res.code == 200) {
                this.personalizedList = res.result;
                console.log(res);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.RecommendContainer {
    display: flex;
    justify-content: center;
    overflow: hidden;
    .recommend {
        // max-width: 1000px;
        width: 1100px;
        min-width: 950px;
        // 推荐列表
        .recommendList{
            margin-top: 10px;
            h3{
                color: #373737;
                font-weight: bold;
                font-size: 20px;
            }
        }
    }
}
.carouse {
    width: 100%;
    .el-carousel{
        // width: 1000px;
    }
    .carouse-pic {
        height: 100%;
        width: 100%;
        border-radius: 10px;
    }
}
</style>