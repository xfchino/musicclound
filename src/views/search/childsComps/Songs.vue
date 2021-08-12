<template>
    <div class="searchSongs">
        <div>找到{{searchSongList.songCount}}首单曲</div>
        <!-- 匹配歌手 -->
        <div class="optimum" >
            <div class="title">最佳匹配</div>
            <div class="optimum-style">
                <!-- 歌手 -->
                <template v-for="item in multimatch.artist">
                     <div class="singer" 
                v-if="multimatch.artist&&currentPage==1"
                :key="item.id">
                <div class="singer-pic">
                    <img
                        :src="item.img1v1Url+'?param=156y156'"
                        alt=""
                    />
                </div>
                <div class="singer-name">{{item.occupation}}:  {{item.name}}
                    <span class="alias" v-if="item.alias&&item.alias.length !=0">({{item.alias[0]}})</span>
                </div>
                <div class="icon">
                    <i class="iconfont icon-arrow-right-bold"></i>
                </div>
            </div>
                </template>
            <!-- 专辑或其他 -->
            <template v-for="item in multimatch.album">
                <div class="singer"  :key="item.id"
                 v-if="multimatch.album&&currentPage==1"
                >
                <div class="singer-pic">
                    <img
                        :src="item.picUrl+'?param==240y240'"
                        alt=""
                    />
                </div>
                <div class="singer-name">专辑:  {{item.name}}
                    <span class="alias" v-if="item.alias&&item.alias.length !=0">({{item.alias[0]}})</span>
                    <p  class="alias" style="margin-top:5px">{{item.artist.name}}</p>
                </div>
                <div class="icon">
                    <i class="iconfont icon-arrow-right-bold"></i>
                </div>
            </div>    
            </template>
            
            </div>
        </div>
        <!-- 表格 -->
        <el-table
        @cell-dblclick="clickRow"
        highlight-current-row
        stripe
        :data="searchSongList.songs" style="width: 100%">
            <el-table-column type="index" width="40" :index="indexMethod">
            </el-table-column>
            <el-table-column  label="音乐标题" min-width="200">
                <template slot-scope="scope">
                    {{scope.row.name}} 
                    <span class="song-alia" v-if="scope.row.alia&&scope.row.alia.length !=0">( {{scope.row.alia[0]}} )</span>
                </template>
            </el-table-column>
            <!--  -->
            <el-table-column  label="歌手"  min-width="100">
                <template slot-scope="scope">
                    {{scope.row.ar[0].name}}
                    <span class="singer-alia" v-if="scope.row.ar[0].alia&&scope.row.ar[0].alia.length !=0">({{scope.row.ar[0].alia[0]}})</span>
                    <!-- 循环别名需要可以加上<template  v-if="scope.row.ar[0].alia&&scope.row.ar[0].alia.length !=0">
                    <span class="singer-alia" v-for="item in scope.row.ar[0].alia" :key="item">/{{item}}</span>
                    </template> -->
                </template> 
            </el-table-column>
            <el-table-column prop="al.name" min-width="100" label="专辑"> </el-table-column>
             <el-table-column prop="dt" min-width="60" label="时长"> </el-table-column>
              <el-table-column prop=""  min-width="60" label="热度"> </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapMutations} from 'vuex';
import {computeMusicTime} from '@/utils/utils.js'
export default {
    data() {
        return {
            // 多重匹配,搜索歌手和专辑
            multimatch:{},
            // 页数
            currentPage:1,
            //搜索出来的单曲
            searchSongList:{}
        };
    },
    mounted() {
        this.searchMultimatch();
        this.getListSong(); 
        // console.log(this.$route); 
    },
    methods: {
        // vuex
        ...mapMutations(['UPDATA_MUSICID','UPDATA_MUSIC_LIST']),
        // 索引
        indexMethod(index){
            index=index+1;
            if(index<10){
                return '0'+index
            }else{
                return index
            }
            
        },
        // 搜索多重匹配
        async searchMultimatch(){
            const res=await this.$http.songs.searchMultimatch({keywords:this.$route.query.id})
            if(res.code==200){
                this.multimatch=res.result;
            }
        },
        // 搜索单曲
        async getListSong(){
            const res=await this.$http.songs.getListSong({keywords:this.$route.query.id})
            // console.log(res);
            if(res.code==200){
                this.searchSongList=res.result;
                // 处理音乐时间
                this.searchSongList.songs.map((item,index)=>{
                    // 封装了处理函数
                    item.dt=computeMusicTime(item.dt);
                })
            }
            
        },
        //点击某一行
        clickRow(row, column, cell, event){
            // 双击获取先获取播放列表,查看是否存在
            const musicList=this.$store.state.musicList;
            let currentIndex=this.$store.state.currentIndex;
            const isExist=musicList.find(item=>item.id==row.id);
            if(isExist){
                // 如果存在
                console.log('歌曲存在');
                this.UPDATA_MUSICID(row.id);
                return;
            }
            musicList.splice(currentIndex+1,0,row);//追加到当前播放的下一首
            this.UPDATA_MUSICID(row.id);
            this.UPDATA_MUSIC_LIST({
                musicList,//更改后的播放列表
                id:row.id//点击的id
            });
        }
    },
    beforeUpdate(to,from,next) {
            // console.log(to);
    },
};
</script>

<style lang="scss" scoped>

.optimum-style{
    display: flex;
    flex-wrap: wrap;
}
.song-alia{
    color: rgb(180, 180, 180);
}
.singer-alia{
    color: #7490C8;
}
.searchSongs {
    box-sizing: border-box;
    padding-bottom: 20px;
    .optimum {
        .title {
            font-size: 13px;
            font-weight: bold;
            margin: 15px 0px;
        }
        .singer {
            display: flex;
            align-items: center;
            // justify-content: space-between;
            height: 80px;
            width: 360px;
            background: #f4f4f4;
            border-radius: 5px;
            margin-bottom: 10px;
            margin-right: 25px;
            position: relative;
            .singer-pic {
                img {
                    height: 80px;
                    width: 80px;
                    border-radius: 5px 0 0 5px;
                    border: 1px solid rgb(231, 231, 231);
                }
            }
            .singer-name {
                margin-left: 10px;
                font-size: 14px;
                .alias{
                    font-size: 13px;
                    color: rgb(172, 172, 172);
                }
            }
            .icon{
                position: absolute;
                right: 10px;
                
            }
            i {
                color: #a9a9a9;
                // margin-right: -100px;
                font-size: 18px;
            }
        }
    }
}
</style>