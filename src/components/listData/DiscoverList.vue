<template>
    <ul class="discoverList">
        <li v-for="item in personalizedList" :key="item.id">
            <img :src="item.picUrl" alt="">
            <div class="title">{{item.name}}</div>
        </li>
    </ul>
</template>

<script>
export default {
    props:{
        personalizedList:{
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            
        }
    },
};
</script>

<style lang="scss" scoped>
.discoverList{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 15px 0;
    li{
        width: 18%;
        margin-bottom: 20px;
        img{
            border-radius: 8px;
            width: 100%;
            cursor: pointer;
        }
        .title{
            margin-top: 8px;
            font-size: 13px;
            color: rgb(22, 22, 22);
            padding: 0 2px;
            line-height: 18px;
            cursor: pointer;
        }
    }
}
</style>