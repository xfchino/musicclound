<template>
    <div class="music-article">
        <div class="music-main">
            article
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.music-article{
    width: 82%;
    height: calc(100vh - 58px - 60px);
    float: left;
}
</style>