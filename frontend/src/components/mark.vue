<template>
  <div class="pd20 edit">
    <el-form ref="form" :model="form" label-width="100px" :label-position="`left`" :rules="rules" size="medium">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="form.content" rows="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button @click.native="$emit(`cancel`)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        form: {
          title: '',
          content: '',
          author:'lzh',
        },
        rules:{
          title: [
            { required: true, message: '请输入博客标题名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入正文内容', trigger: 'blur' }
          ],
        }
      }
    },
    props:{
      action:{
        type:String,
        default:"add",
      },
      blogData:{
        type:Object,
        default:()=>{return {};}
      }
    },
    mounted(){
      if(this.action=='update'){
        this.form.title = this.blogData.title;
        this.form.content = this.blogData.content;
        this.form.id = this.blogData.id;
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate(res=>{
          if(res){
            this.blog(this.form,this.action)
          }
        })
      },
      blog(formData = {},action='add'){
        let url = action=='add'?this.ajaxApi.blogApi.new:this.ajaxApi.blogApi.update;
        let message = action=='add'?'发布成功':'更新成功';
        this.$http({
          url:url,
          type:'post',
          data:formData
        }).then(suc=>{
          this.$message(message);
          this.$emit(`save`)
          this.form.title = "";
          this.form.content = "";
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .edit /deep/{
    .el-form-item__label{
      font-size: 18px;
    }
  }
</style>
