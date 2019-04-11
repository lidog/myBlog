<template>
    <div class="content clear pd20">
        <div class="pic fr">
            <img :src="img">
        </div>
        <p class="description fr">
            Eu ac iaculis ac nunc nisi lorem
            vulputate lorem neque cubilia ac in
            adipiscing in curae
        </p>
        <ul class="navigation fr">
            <li v-for="item in nav" :class="{on:on===item.router}" @click="routerFn(item.router)">
                {{item.text}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                img: require('../assets/t3.jpg'),
                on: 'blog',
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
    }

    .pic {
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 0 auto;
            border: 4px solid rgba(255, 255, 255, 0.39);
        }
    }

    .description {
        font-size: 18px;
        color: #ccc;
        line-height: 30px;
        margin: 20px 0;
    }

    .navigation {
        user-select: none;
        li {
            font-size: 16px;
            color: #fff;
            margin: 20px;
            cursor: pointer;
        }
        li.on {
            color: #00a8e0;
            font-weight: bolder;
        }
    }
</style>
