<template>
  <div class="pd20 edit">
    <el-button icon="el-icon-back" size="mini" @click.native="cancel">返回</el-button>
    <el-form ref="form" :model="form" label-position="top" :rules="rules" size="medium">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <mavon-editor v-model="form.content" :toolbars="markdownOption" @change="change"/>
      </el-form-item>
      <el-form-item class="flex-right">
        <el-button type="primary" @click="onSubmit">{{butText}}</el-button>
        <el-button @click.native="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        markdownOption:{
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          save: true, // 保存（触发events中的save事件）
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true, // 预览
          navigation: true, // 导航目录
        },
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
        },
        butText:"保存",
        oldTitle:"",
        oldContent:"",
        content:"",
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
        this.oldTitle = this.form.title = this.blogData.title;
        this.oldContent = this.form.content = this.blogData.content;
        this.form.id = this.blogData.id;
      }
      this.butText = this.action=='add'?'发布':'更新';
    },
    methods: {
      change(mark,html){
        this.form.html = html;
      },
      cancel(){
        if(this.oldTitle!==this.form.title||this.oldContent!==this.form.content){
          this.confirm("文章内容以及改变，需要保存吗？","保存","不保存").then(()=>{
            this.onSubmit();
          }).catch(()=>{
            this.$emit('cancel')
          })
        }else {
          this.$emit('cancel')
        }
      },
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
