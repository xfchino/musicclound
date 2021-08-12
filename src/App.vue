<template>
    <div id="#app">
      <Home></Home>
    </div>
</template>
<script>
import Home from './views/Home.vue'
export default {
  components:{
    Home
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./assets/css/reset.css";
#app{
  width: 100%;
  height: 100vh;
}

</style>
