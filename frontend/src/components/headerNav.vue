<template>
  <div class="content clear pd20" :class="{close:close==true}">
    <div class="pic fr" @click="close=!close">
      <img :src="img">
    </div>
    <p class="description fr dian4">
      生当写程序，死亦敲代码。<br>
      但愿人长久，天天敲代码。<br>
    </p>
    <ul class="navigation fr">
      <li v-for="item in nav" :class="{on:on===item.router}" @click="routerFn(item.router,item.method)">
        {{item.text}}
      </li>
    </ul>
    <div class="nav-bar-btn" @click="close=!close">
      <v-icon name="menu"></v-icon>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        img: require('../assets/t3.jpg'),
        on: 'register',
        close: true,
        nav: [
          {
            text: '首页',
            router: 'home',
          },
          {
            text: '文章',
            router: 'blog',
          },
          {
            text: '笔记',
            router: 'note',
          },
          {
            text: '心情',
            router: 'mood',
          },
          {
            text: '好文',
            router: 'article',
          },
          {
            text: '退出',
            router: 'register',
            method:this.loginOut
          },
        ]
      }
    },
    watch: {
      $route(val) {
        this.on = val.name
      }
    },
    methods: {
      routerFn(str = 'home',method) {
        if(method){
          method();
        }
        this.$router.replace('/' + str)
        this.on = str;
      },
      loginOut(){
        this.$http({
          url:this.ajaxApi.userApi.loginOut
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    text-align: right;
    background: url("../assets/banner-1.jpg") 0 0 no-repeat;
    overflow: hidden;
    padding-top: 50px;
    position: relative;
    transition: all 0.3s ease;
  }

  .pic {
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto;
      border: 4px solid rgba(255, 255, 255, 0.39);
      transition: all 0.3s ease;
    }
  }

  .description {
    font-size: 14px;
    color: #ccc;
    line-height: 30px;
    margin: 20px 0;
    width: 100%;
    transition: all 0.3s ease;
  }

  .navigation {
    user-select: none;
    li {
      font-size: 16px;
      color: #fff;
      margin: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    li.on {
      color: #00a8e0;
      font-weight: bolder;
    }
  }

  .nav-bar-btn {
    position: absolute;
    bottom: 30px;
    right: 30px;
    color: #fff;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: rotate(-90deg);
  }

  .content.close {
    width: 10% !important;

    .pic img {
      width: 50px;
      height: 50px;
    }
    .description {
      font-size: 12px;
      color: #ccc;
      line-height: 15px;
      margin: 10px 0;
    }
    .nav-bar-btn {
      transform: rotate(0deg);
    }
  }

</style>
