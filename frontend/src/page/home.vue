<template>
  <div>
    <header></header>
  </div>
</template>
<script>
  import header from "@/haader"
  export default {
    data: function () {
      return {
        list:[]
      }
    },
    components:{
      header
    },
    created(){
      this.$http({
        url:this.ajaxApi.blogApi.list
      }).then(res=>{
        console.log(res)
      })
    },
  }
</script>
<style lang="scss" scoped>
</style>
