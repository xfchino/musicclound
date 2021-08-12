<template>
    <div class="handClass">
        <div class="music-header-title">
            <img src="../../assets/img/login2.png" alt="" @click="handleHome" />
            <span>网易云音乐</span>
        </div>
        <div class="music-header-search">
            <div class="clickIcon">
                <i class="iconfont icon-arrow-left-bold back"></i>
                <i class="iconfont icon-arrow-right-bold forward"></i>
            </div>
            <div class="search">
                <!-- trigger="focus" -->
                <el-popover
                    placement="bottom"
                    width="300"
                    trigger="focus"
                    :visible-arrow="false"
                    v-model="isShowSearch"
                    popper-class="popoverStyle"
                >
                    <!-- -->
                    <!-- 热搜和提示 -->
                    <div class="hotSearch" v-if="!searchSuggestList.songs">
                        <div class="text">热搜榜</div>
                        <div
                            class="hotSearch-item"
                            v-for="(item, index) in topSearch"
                            :key="index"
                        >
                            <div
                                class="number"
                                :class="index < 3 ? 'topThree' : ''"
                            >
                                {{ index + 1 }}
                            </div>
                            <div class="hotConetnt">
                                <div :class="index < 3 ? 'topThreeText' : ''">
                                    {{ item.searchWord }}
                                    <span>{{ item.score }}</span
                                    ><img
                                        :src="item.iconUrl + '?param=40y22'"
                                        alt=""
                                    />
                                </div>
                                <div>{{ item.content }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 搜索建议 -->
                    <div class="searchSuggest" v-if="inputValue != ''">
                        <div class="searchText">搜索建议</div>
                        <!-- 单曲 -->
                        <div
                            class="suggestItem"
                            v-if="
                                searchSuggestList.songs &&
                                searchSuggestList.songs.length != 0
                            "
                            
                        >
                            <div class="title">
                                <i class="iconfont icon-yinle"></i> 单曲
                            </div>
                            <div
                                class="suggestItemDetail"
                                v-for="item in searchSuggestList.songs"
                                :key="item.id"
                                @click="handleSearchsongs(item.id)"
                            >
                                {{ item.name }}-
                                <span
                                    v-for="item2 in item.artists"
                                    :key="item2.name"
                                    >{{ item2.name }}</span
                                >
                            </div>
                        </div>
                        <!-- 歌手 -->
                        <div
                            class="suggestItem"
                            v-if="
                                searchSuggestList.artists &&
                                searchSuggestList.artists.length != 0
                            "
                        >
                            <div class="title">
                                <i class="iconfont icon-mic"></i> 歌手
                            </div>
                            <div
                                class="suggestItemDetail"
                                v-for="item in searchSuggestList.artists"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                        <!-- 专辑 -->
                        <div
                            class="suggestItem"
                            v-if="
                                searchSuggestList.albums &&
                                searchSuggestList.albums.length != 0
                            "
                        >
                            <div class="title">
                                <i class="iconfont icon-yinle"></i> 专辑
                            </div>
                            <div
                                class="suggestItemDetail"
                                v-for="item in searchSuggestList.albums"
                                :key="item.id"
                            >
                                {{ item.name }}-{{ item.artist.name }}
                            </div>
                        </div>
                        <!-- 歌单 -->
                        <div
                            class="suggestItem"
                            v-if="
                                searchSuggestList.playlists &&
                                searchSuggestList.playlists.length != 0
                            "
                        >
                            <div class="title">
                                <i class="iconfont icon-gedan"></i> 歌单
                            </div>
                            <div
                                class="suggestItemDetail"
                                v-for="item in searchSuggestList.playlists"
                                :key="item.id"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                    <!-- 输入框 -->
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        size="mini"
                        slot="reference"
                        @input="searchInput"
                        v-model="inputValue"
                        @keyup.enter.native="onSubmit"
                    ></el-input>
                </el-popover>
            </div>
        </div>
        <div class="login">
            <div class="noLogin">
                <el-popover
                    placement="bottom"
                    width="300"
                    trigger="click"
                    popper-class="loginPopover"
                >
                    <!-- 登录模块 -->
                    <el-form
                        ref="form"
                        :model="login"
                        label-width="60px"
                        size="mini"
                        class="loginForm"
                    >
                        <el-form-item label="手机号" required>
                            <el-input v-model="login.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" required>
                            <el-input v-model="login.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="submitForm(login)"
                                >登录</el-button
                            >
                            <el-button> 注册</el-button>
                        </el-form-item>
                    </el-form>
                    <el-avatar
                        class="avatar"
                        :size="28"
                        icon="el-icon-user-solid"
                        slot="reference"
                    ></el-avatar>
                </el-popover>
                <div class="text">点击头像登录</div>
            </div>
        </div>
    </div>
</template>

<script>
let timer;
export default {
    data() {
        return {
            // 热搜列表
            topSearch: [],
            // 是否显示热搜
            isShowSearch: false,
            // 搜索建议列表
            searchSuggestList: [],
            // 搜索关键字
            inputValue: "",
            // 登录信息
            login: {
                phone: "",
                password: "",
            },
        };
    },
    mounted() {
        this.getHotSearch();
    },
    methods: {
        //回到首页
        handleHome(){
            if(this.$route.fullPath !='/Individuation/recommend'){
                this.$router.push('/Individuation')
            }
        },
        // 热搜获取
        async getHotSearch() {
            const res = await this.$http.songs.getHotSearch();
            console.log(res);
            if (res.code == 200) {
                this.topSearch = res.data;
            }
        },
        // 搜索建议请求
        async searchSuggest(keywords) {
            const res = await this.$http.songs.getSearchSuggest({ keywords });
            // console.log(res);
            if (res.code == 200) {
                this.searchSuggestList = res.result;
            }
        },
        // input事件搜索
        searchInput(keywords) {
            console.log(11);
            if (keywords != "") {
                this.searchSuggest(keywords);
            } else {
                this.searchSuggestList = {};
                // 不加return会出现没有东西输入不显示热搜
                return;
            }
            // clearTimeout(timer)
            // if(keywords !=""){
            //     timer=setTimeout(()=>{
            //         this.searchSuggest(keywords);
            //     },200)
            // }else{
            //     this.searchSuggestList={};
            // }
        },
        // 聚焦回车搜索
        onSubmit() {
            this.goSongsSearch();
            // this.$router.go(0)
        },
        // 回车搜索
        goSongsSearch() {
            this.isShowSearch = false;
            this.$router.push({
                name: "Songs",
                query: { id: this.inputValue },
            });
        },
        //点击单曲搜索
        handleSearchsongs(id){
            this.isShowSearch = false;
            this.$router.push({
                name: "Songs",
                query: {id},
            });
        },
        // 登录
        async submitForm(login){
            const res=await this.$http.users.login({
                ...login,
                withCredentials: true
            });
            console.log(res);
            if(res.code==200){
                localStorage.userInfo=res.profile
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.handClass {
    height: 58px;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #ff87b4;
    position: relative;
    .music-header-title {
        margin-left: 17px;
        img {
            width: 40px;
            vertical-align: middle;
            background-color: #ff87b4;
            cursor: pointer;
        }
        span {
            vertical-align: middle;
            font-size: 20px;
            color: white;
            margin-left: 8px;
        }
    }
    .music-header-search {
        display: flex;
        align-items: center;
        margin-left: 80px;
        .clickIcon {
            color: #f0cad8;
            height: 20px;
            i {
                background-color: #d67096;
                border-radius: 50%;
                font-size: 13px;
                padding: 5px;
                margin: 0 4px;
            }
        }
        .search {
            margin-left: 15px;
        }
        // 搜索建议
        // .searchSuggest {
        //     .searchText {
        //         font-size: 13px;
        //         margin: 10px 0 5px 20px;
        //     }
        //     .suggestItem {
        //         .title {
        //             padding: 4px 8px;
        //             background-color: #f5f5f7;
        //             i {
        //                 font-size: 18px;
        //                 vertical-align: middle;
        //             }
        //         }
        //         .suggestItemDetail {
        //             padding: 7px 27px;
        //             font-size: 12px;
        //             &:hover{
        //                 background-color: #ececec;
        //             }
        //         }
        //     }
        // }
    }
    .login {
        position: absolute;
        right: 150px;
        .noLogin {
            display: flex;
            align-items: center;
            .avatar {
                margin-right: 10px;
                background-color: rgb(224, 224, 224);
            }
            .text {
                font-size: 12px;
                color: white;
            }
        }
    }
}
// 搜索建议
.popoverStyle {
    .searchSuggest {
        .searchText {
            font-size: 13px;
            margin: 10px 0 5px 20px;
        }
        .suggestItem {
            cursor: pointer;
            .title {
                padding: 4px 8px;
                background-color: #f5f5f7;
                i {
                    font-size: 18px;
                    vertical-align: middle;
                }
            }
            .suggestItemDetail {
                padding: 7px 27px;
                font-size: 12px;
                &:hover {
                    background-color: #ececec;
                }
            }
        }
    }
}
// 热搜
.popoverStyle {
    .hotSearch {
        height: 400px;
        overflow-y: scroll;
        .text {
            font-size: 15px;
            margin: 10px 0 5px 20px;
        }
        .hotSearch-item {
            padding: 7px 20px;
            display: flex;
            align-items: center;
            .number {
                font-size: 16px;
                margin-right: 15px;
                color: #aaa;
            }
            .topThree {
                color: red;
            }
            .hotConetnt {
                .topThreeText {
                    font-weight: bold !important;
                }
                div {
                    font-size: 12px;
                    &:nth-child(1) {
                        color: rgb(43, 43, 43);
                        span {
                            color: rgb(146, 146, 146);
                            margin: 0px 5px;
                            font-size: 11px;
                        }
                        img {
                            // width: 20px;
                            height: 11px;
                            vertical-align: middle;
                            display: inline-block;
                        }
                    }
                    &:nth-child(2) {
                        // width: 300px;
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                        // white-space: nowrap;
                        color: rgb(158, 158, 158);
                    }
                }
            }
        }
    }
}
// 设置滚动条
::-webkit-scrollbar {
    width: 3px;
}
*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ccc;
}
</style>