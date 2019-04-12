<template>
  <div class="mg20 bg0 pd20 ab">
    <div class="header mgb20">
      <div class="flex-bet">
        <el-button icon="el-icon-back" size="mini" @click.native="$emit(`back`)">返回</el-button>
        <p>
          <el-button size="mini" @click.native="toEdit">编辑</el-button>
        </p>
      </div>
      <h1 class="flex-center pd20">{{blogDetailData.title}}</h1>
      <p class="time tr">更新于 {{blogDetailData.createtime}}</p>
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
      toEdit(){
        this.$emit('editBlog',this.blogDetailData.id)
      },
    }
  }
</script>
<style lang="scss" scoped>
  .time{
    color: #999;
  }
  .header{
    border-bottom: 1px solid #ccc;
  }
</style>
