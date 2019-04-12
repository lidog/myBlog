<template>
    <div class="content clear pd20" :class="{close:close==true}">
        <div class="pic fr" @click="close=!close">
            <img :src="img">
        </div>
        <p class="description fr dian4">
            满园春色关不住 一串代码飘出来。<br>
            春宵一刻值千金，完事起来敲代码。<br>
            举头望明月，低头敲代码。<br>
            人面不知何处去，原来伊在敲代码。<br>
            松下问童子，言师敲代码。<br>
            座中BUG谁最多，江州司马青衫湿。<br>
            代码没敲完，自挂东南枝。<br>
            生当写程序，死亦敲代码。<br>
            但愿人长久，天天敲代码。<br>
        </p>
        <ul class="navigation fr">
            <li v-for="item in nav" :class="{on:on===item.router}" @click="routerFn(item.router)">
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
                on: 'blog',
                close:false,
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
                ]
            }
        },
        mounted(){
            this.routerFn(this.on)
        },
        watch:{
            $route(val){
                this.on = val.name
            }
        },
        methods: {
            routerFn(str = 'home') {
                this.$router.push('/' + str)
                this.on = str;
            }
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

    .nav-bar-btn{
        position: absolute;
        bottom: 30px;
        right: 30px;
        color:#fff;
        width: 30px;
        height: 30px;
        cursor: pointer;
        transition: all 0.3s ease;
        transform: rotate(-90deg);
    }
    .content.close{
        width: 10% !important;

        .pic img{
            width: 50px;
            height: 50px;
        }
        .description{
            font-size: 12px;
            color: #ccc;
            line-height: 15px;
            margin: 10px 0;
        }
        .nav-bar-btn{
            transform: rotate(0deg);
        }
    }

</style>
