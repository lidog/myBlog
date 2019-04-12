<template>
  <div id="app" class="flex-bet">
    <headerNav class="left"></headerNav>
    <router-view class="right"/>
  </div>
</template>

<script>
import headerNav from "@/components/headerNav.vue"
export default {
  name: 'App',
  components:{
    headerNav
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="scss" scoped>
  .left{
    width:23%;
    height: 100vh;
  }
  .right{
    flex: 1;
    height: 100vh;
    overflow: auto;
    background: #f3f3f3;
  }
</style>
