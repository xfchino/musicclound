<template>
    <div class="music-footer">
        <audio
            :src="music.Url"
            ref="musicControls"
            autoplay
            @play="changeState(true)"
            @pause="changeState(false)"
            @timeupdate="timeupdate"
        ></audio>
        <div class="footer-left">
            <!-- 音乐头像 -->
            <div class="avatar">
                <img
                    v-if="songList.al"
                    :src="songList.al.picUrl + '?param=86y86'"
                    alt=""
                />
                <img v-else src="" alt="" />
            </div>
            <div class="musicInfo">
                <p class="music-name">
                    {{ songList.name ? songList.name : "" }}
                </p>
                <p class="music-singer">
                    {{ songList.ar ? songList.ar[0].name : "" }}
                </p>
            </div>
        </div>
        <div class="footer-center">
            <div class="switch">
                <span><i class="iconfont icon-xunhuan"></i> </span>
                <span><i class="iconfont icon-shangyishou"></i></span>
                <span v-if="music.state == false"
                    ><i
                        class="iconfont icon-icon_play"
                        @click="changeState(true)"
                    ></i
                ></span>
                <span v-else
                    ><i
                        class="iconfont icon-zantingtingzhi"
                        @click="changeState(false)"
                    ></i
                ></span>
                <span><i class="iconfont icon-xiayishou"></i></span>
                <span><i class="iconfont icon-xihuan"></i></span>
            </div>
            <!-- 进度条 -->
            <div
                class="slider"
                @mousedown="isDraging = true"
                @mouseup="isDraging = false"
            >
                <span class="currentTime">{{
                    music.currentTime ? music.currentTime : ""
                }}</span>
                <el-slider
                    :show-tooltip="false"
                    v-model="timeProgress"
                    @change="changeProgress"
                    class="center-silder"
                ></el-slider>
                <span class="endTime">{{
                    songList.dt ? songList.dt : ""
                }}</span>
            </div>
        </div>
        <div class="footer-right">
            <el-popover
                placement="top"
                trigger="hover"
                popper-class="right-prover "
            >
                <i class="el-icon-headset" slot="reference"></i>
                <div class="right-silder">
                    <el-slider
                        v-model="volume"
                        vertical
                        height="100px"
                        @change="changeVolume"
                    >
                    </el-slider>
                </div>
            </el-popover>
            <div class="playlist" @click="changeDrawer">
                <i class="iconfont icon-bofangliebiao"></i>
            </div>
        </div>

        <el-drawer
            title="当前播放"
            :visible.sync="drawer"
            :with-header="false"
            :show-close="false"
            :size="400"
            custom-class="drawerList"
        >
            <div class="title">
                <span>共{{ songMusicLists.length }}首</span>
                <span class="clearText">清空列表</span>
            </div>
            <el-table
                :data="songMusicLists"
                stripe
                style="width: 100%"
                :show-header="false"
                highlight-current-row
                lazy
                @cell-dblclick="clickRow"
            >
                <el-table-column prop="date" width="200">
                    <template slot-scope="scope">
                        {{ scope.row.name }}
                        <span
                            class="song-alia"
                            v-if="scope.row.alia && scope.row.alia.length != 0"
                            >( {{ scope.row.alia[0] }} )</span
                        >
                    </template>
                </el-table-column>
                <el-table-column prop="name" width="130">
                    <template slot-scope="scope">
                        {{ scope.row.ar[0].name }}
                        <span
                            class="singer-alia"
                            v-if="
                                scope.row.ar[0].alia &&
                                scope.row.ar[0].alia.length != 0
                            "
                            >({{ scope.row.ar[0].alia[0] }})</span
                        >
                        <!-- 循环别名需要可以加上<template  v-if="scope.row.ar[0].alia&&scope.row.ar[0].alia.length !=0">
                    <span class="singer-alia" v-for="item in scope.row.ar[0].alia" :key="item">/{{item}}</span>
                    </template> -->
                    </template>
                </el-table-column>
                <el-table-column prop="dt" width="70"> </el-table-column>
            </el-table>
        </el-drawer>
    </div>
</template>

<script>
import { computeMusicTime, convertSecond } from "@/utils/utils.js";
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            //抽屉
            drawer: false,
            drawerOpen: false,
            song: {},
            // 当前播放单曲的详情
            songList: [],
            // 当前index
            currentIndex: -1,
            lastcurrentIndex: -1,
            //歌单表
            songMusicLists: [],
            //进度时间条
            timeProgress: 0,
            // 音量
            volume: 20,
            // 音乐时间
            music: {
                // 音乐地址
                Url: "",
                // 默认不播放,静音
                state: false,
                // 当前时间
                currentTime: 0,
                // 总时长带:
                endTime: 0,
                // 总时长秒的
                endTimeSecond: 0,
            },
        };
    },
    mounted() {
        // this.getSongList();
        // this.getSong();
        // setInterval(this.toggleSound(),100);
    },
    methods: {
        ...mapMutations(["CHANGE_INDEX", "UPDATA_MUSICID"]),
        // 获取音乐列表
        async getSongList() {
            const res = await this.$http.songs.getListSong({
                keywords: "第三心脏",
                type: 1,
            });
            this.songList = res.result.songs;
            // console.log(this.songList);
        },
        // 获取单个音乐url
        async getSong(id) {
            const res = await this.$http.songs.getOneSong({ id });
            if (res.code == 200) {
                this.music.Url = res.data[0].url;
                this.music.state = true;
                // 音量
                this.$refs.musicControls.volume = this.volume / 100;
            }
        },
        // 更改音乐播放状态
        changeState(state) {
            if (this.music.Url) {
                const $audio = this.$refs.musicControls;
                if (state) {
                    $audio.play();
                    this.music.state = true;
                } else {
                    $audio.pause();
                    this.music.state = false;
                }
            }
        },
        //首次不播放问题,qq浏览器可以,谷歌没解决
        toggleSound() {
            const $audio = this.$refs.musicControls; //获取dom
            console.log($audio.paused);
            if ($audio.paused) {
                //判读是否播放
                $audio.paused = false;
                $audio.play(); //没有就播放
            }
        },
        // audio时间变化时间
        timeupdate() {
            // 获取当前音乐播放的时间
            let time = Math.floor(this.$refs.musicControls.currentTime);
            // 当前时间带秒的
            // this.music.currentTimeSecond=time;
            // 当前时间带:的
            this.music.currentTime = computeMusicTime(time);
            const that = this;
            // 计算出总时间秒数
            //进度条百分比
            let enTime = convertSecond(that.music.endTime);
            //this.isDraging解决滑块回弹
            // 出现这种问题的原因是audio的timeupdate方法约每秒触发一次，js代码在播放音频时没有进行处理，此方法一直在修改slider的model值，当把滑块拖到目标位置（过程超过1s）松开时，slider拖动的实际值已经被timeupdate修改成了currentTime，所以松手后滑块会立刻回到currentTime值的位置。
            if (time != enTime && !this.isDraging) {
                this.music.endTimeSecond = enTime;
                this.timeProgress = (time / enTime) * 100;
            }
        },
        // 拖进度条松开
        changeProgress(val) {
            const that = this;
            // 把滑块的当前秒数赋值给auido
            const time = parseInt((val / 100) * that.music.endTimeSecond);
            this.$refs.musicControls.currentTime = time;
        },
        //改变音量
        changeVolume(val) {
            this.$refs.musicControls.volume = val / 100;
        },
        // 抽屉开关
        changeDrawer() {
            this.drawer = !this.drawer;
            this.drawerOpen = true;
            this.changeDrawerPlay(this.currentIndex);
        },
        // 修改抽屉中当前播放table颜色
        changeDrawerPlay(newIndex, oldIndex) {
            // 给当前播放的音乐添加上class,dom操作
            //  this.lastcurrentIndex=oldIndex;
            this.$nextTick(() => {
                let tableRow = document
                    .querySelector(".music-footer")
                    .querySelectorAll(".el-table__row");
                if (tableRow[newIndex]) {
                    tableRow[newIndex].children[0]
                        .querySelector(".cell")
                        .classList.add("palyRow");
                    tableRow[newIndex].children[1]
                        .querySelector(".cell")
                        .classList.add("palyRow");
                }
                // 删除户上一个样式
                if (oldIndex != -1 && tableRow[oldIndex]) {
                    tableRow[oldIndex].children[0]
                        .querySelector(".cell")
                        .classList.remove("palyRow");
                    tableRow[oldIndex].children[1]
                        .querySelector(".cell")
                        .classList.remove("palyRow");
                }
            });
        },
        // 双击点击抽屉列表的歌单,切歌
        clickRow(row) {
            this.UPDATA_MUSICID(row.id);
        },
    },
    watch: {
        // 针对id变化播放音乐
        "$store.state.currentMusic.id"(id) {
            // 获取所有播放的歌
            this.songMusicLists = this.$store.state.musicList;
            console.log(this.songMusicLists);
            this.songMusicLists.forEach((item, index) => {
                if (item.id == id) {
                    this.CHANGE_INDEX(index);
                    this.currentIndex = index;
                    // 单曲详情
                    this.songList = item;
                    this.music.endTime = this.songMusicLists[index].dt;
                }
            });
            this.getSong(id);
            // console.log(this.$store.state.musicLis);
        },
        // 侦听列表中index变化
        "$store.state.currentIndex"(newIndex, oldIndex) {
            // console.log(newIndex, oldIndex);
            // 打开过抽屉才渲染table
            if (this.drawerOpen) {
                this.changeDrawerPlay(newIndex, oldIndex);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.music-footer {
    height: 69px;
    // background-color: rgb(94, 182, 223);
    border-top: 1px solid #ddd;
    position: fixed;
    z-index: 3000;
    background-color: white;
    bottom: 0;
    width: 100%;
    left: 0;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .footer-left {
        display: flex;
        align-items: center;
        // 音乐头像
        .avatar {
            width: 45px;
            height: 45px;
            cursor: pointer;
            margin-right: 10px;
            img {
                width: 100%;
                border-radius: 6px;
                border: 1px solid rgb(241, 241, 241);
            }
        }
        // 音乐信息
        .musicInfo {
            color: rgb(37, 37, 37);
            font-size: 15px;
            width: 160px;
            .music-name {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .music-singer {
                width: 100%;
                font-size: 13px;
                margin-top: 7px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .footer-center {
        margin-left: -180px;
        .switch {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            justify-content: center;
            i {
                margin-left: 26px;
                font-size: 18px;
            }
        }
        .slider {
            display: flex;
            align-items: center;
            span {
                font-size: 3px;
                color: #9f9f9f;
            }
            .el-slider {
                width: 370px;
                margin-left: 7px;
                margin-right: 7px;
            }
        }
    }
    .footer-right {
        display: flex;
        margin-right: 20px;
        align-items: center;
        // position:absolute;
        .right-prover {
            // padding: 10px;
        }
        .right-silder {
            .el-slider {
            }
        }
        .playlist {
            i {
                margin-left: 10px;
                font-size: 20px;
                // color: rgb(187, 187, 187);
            }
        }
    }
}
</style>
<style>
/* .drawerList {
    padding: 16px !important;
} */
.drawerList .title {
    color: rgb(201, 201, 201);
    font-size: 13px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}
.drawerList .title .clearText {
    font-size: 14px;
    color: #7490c8;
}
</style>