<template>
    <div id="topbar">
        <div class="navbar">
            <div
                class="navbar-item"
                :class="{ active: isActive == item._id }"
                v-for="item in navBarData"
                :key="item._id"
                @click="handleChangeBar(item._id,item.path)"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        navBarData:{
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            isActive: "1",
        }
    },
    created(){
        // this.navBarData.forEach((item,index)=>{
        //     console.log(decodeURI(this.$router.path).search(item.path));
        //     // if(decodeURI(this.$router.path).search(item.path) !=-1){

        //     // }
        // })
    },
    methods: {
      // 点击切换tabBar
      handleChangeBar(_id,path){
        this.isActive=_id;
        this.$router.push(path)
      }
    },
};
</script>

<style lang="scss" scoped >
#topbar {
    height: 75px;
    .navbar {
        display: flex;
        align-items: center;
        .navbar-item {
            font-size: 16px;
            cursor: pointer;
            color: #373737;
            margin-right: 15px;
        }
        .active {
            font-size: 18px !important;
            color: black;
            font-weight: bold;
            padding-bottom: 7px;
            border-bottom: 3.75px solid #44aaf8;
            transform: translateY(4px);
        }
    }
}
</style>
