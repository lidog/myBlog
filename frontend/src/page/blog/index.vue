<template>
  <div class="content-box">
    <slide ref="slide">
      <div class="list" slot="main">
        <el-table :data="list" @cell-click="toDetail" class="pd20" cell-class-name="cell">
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="content" width="300" label="内容"></el-table-column>
          <el-table-column prop="createtime" label="日期"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle @click.native.stop="updateBlog(scope.row.id,scope.$index)" ></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" circle @click.native.stop="delBlog(scope.row.id,scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-bottom pd20 mgt20 mgb20 flex-bet bg0">
          <el-button slot="main" @click.native="$refs['slide'].open();newBlog=true;" type="primary">增加</el-button>
        </div>
      </div>
      <edit slot="pup" v-if="newBlog" @cancel="closeFn" @save="updateData" action="add"></edit>
      <edit slot="pup" v-if="updateBlogs" @cancel="closeFn" @save="updateData" :blogData="updateBlogData" action="update"></edit>
      <blog-detail slot="pup" v-if="detail" @back="closeFn" :blogDetailData="blogDetailData"></blog-detail>
    </slide>
</div>
</template>
<script>
  import edit from "@/components/edit"

  export default {
    data: function () {
      return {
        newBlog: false,
        updateBlogs: false,
        detail:false,
        blogDetailData:null,
        updateBlogData:null,
        list:[]
      }
    },
    components: {
      edit
    },
    created(){
      this.updateData();
    },
    methods: {
      closeFn(){
        console.log(22)
        if(this.$refs['slide']){
          this.$refs['slide'].close();
        }
        this.newBlog = false;
        this.updateBlogs = false;
        this.detail = false;
      },
      updateData(){
        this.$http({
          url:this.ajaxApi.blogApi.list
        }).then(data=>{
          if(data.length>0){
            data.forEach(item=>{
              item.createtime = this.tools.dateFmt(this.tools.iosNewDate(item.createtime))
            })
            this.list = data;
          }
        });
        this.closeFn();
      },
      updateBlog(id){
        if(id){
          this.$http({
            url:this.ajaxApi.blogApi.detail,
            data:{
              id:id
            }
          }).then(data=>{
            data.createtime = this.tools.dateFmt(this.tools.iosNewDate(data.createtime));
            this.updateBlogData = data;
            this.updateBlogs = true;
            this.$refs['slide'].open();
          })
        }
      },
      delBlog(id,index){
        if(id){
          this.confirm('确定要删除此条blog吗？').then(res=>{
            this.$http({
              url:this.ajaxApi.blogApi.del,
              data:{
                id:id,
                author:'lzh'
              }
            }).then(res=>{
              this.$message('删除成功');
              this.list.splice(index,1)
            })
          })
        }
      },
      toDetail(row={}){
        if(row.id){
            this.$http({
              url:this.ajaxApi.blogApi.detail,
              data:{
                id:row.id
              }
            }).then(data=>{
              data.createtime = this.tools.dateFmt(this.tools.iosNewDate(data.createtime))
              this.blogDetailData = data;
              this.detail = true;
              this.$refs['slide'].open();
            })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content-box /deep/ {
    .el-table .cell{
      white-space: nowrap;
    }
    .cell{
      cursor: pointer;
    }
  }
</style>
