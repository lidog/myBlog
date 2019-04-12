<template>
  <div class="content wh100">
    <transition name="slide-main">
      <div class="main" v-show="!show">
        <slot name="main"></slot>
      </div>
    </transition>
    <transition name="slide-pup">
      <div class="pup" v-show="show">
        <slot name="pup"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        show:false
      }
    },
    methods:{
      open(){
        this.show = true;
      },
      close(){
        this.show = false;
      }
    },
  }
</script>
<style lang="scss" scoped>
  .content {
    position: relative;
    overflow-x: hidden;
    .main {
      position: absolute;
      left: 0;
      top: 0;
    }
    .pup {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 100;
      background: #f8f8f8;
    }
  }

  .main, .pup {
    min-height: 100%;
    width: 100%;
  }

  .slide-main-enter-active, .slide-main-leave-active {
    transition: all .3s ease-out;
  }

  .slide-main-enter, .slide-main-leave-to {
    transform: scale(0.80);
    box-shadow: 0 0 15px #000;
    border-radius: 10px;
  }

  .slide-pup-enter-active, .slide-pup-leave-active {
    transition: all .3s ease-out;
  }

  .slide-pup-enter, .slide-pup-leave-to {
    transform: translateX(100%) scale(0.9);
    box-shadow: 0 0 15px #000;
    border-radius: 10px;
  }
</style>
