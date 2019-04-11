<template>
    <div>
      <div class="pic"></div>
      <p class="description"></p>
      <ul class="navigation">
        <li>首页</li>
        <li>文章</li>
        <li>笔记</li>
        <li>心情</li>
        <li>好文</li>
      </ul>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {}
        },
    }
</script>
<style lang="scss" scoped>
  .pic{
    width: 100px;
    height: 100px;
    padding:5px;
    background-color: #ccc;
  }
</style>
