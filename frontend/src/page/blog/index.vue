<template>
  <div class="content-box">
    <slide v-model="editing">
      <div class="list" slot="main">
        <ul>
          <li v-for="item in list">{{item.title}}</li>
        </ul>
        <el-button slot="main" @click.native="editing = true">增加</el-button>
      </div>
      <edit slot="pup" @cancel="editing=false"></edit>
    </slide>
</div>
</template>
<script>
  import edit from "@/components/edit"

  export default {
    data: function () {
      return {
        editing: false,
        list:[]
      }
    },
    components: {
      edit
    },
    created(){
      this.$http({
        url:this.ajaxApi.blogApi.list
      }).then(data=>{
        if(data.length>0){
          this.list = data;
        }
      })
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>

</style>
