<template>
  <div class="mg20 bg0 pd20 ab">
    <div class="header">
      <p class="flex-bet">
        <el-button icon="el-icon-back" size="mini" @click.native="$emit(`back`)">返回</el-button>
       <span>{{blogDetailData.createtime}}</span>
      </p>
      <h1 class="flex-center pd20">{{blogDetailData.title}}</h1>
    </div>
    <div class="content markdown-body" v-html="blogDetailData.html"></div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {

      }
    },
    props:{
      action:{
        type:String,
        default:"add",
      },
      blogDetailData:{
        type:Object,
        default:()=>{return {}}
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>

</style>
