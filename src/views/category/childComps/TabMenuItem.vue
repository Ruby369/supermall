<template>
    <div id="tab-menu-item">
        <a v-for="(item,index) in menuItem" :key="index">
            <img :src="item.image" @load="imgLoad" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>
</template>

<script>
import {debounce} from 'common/utils'
export default {
    name:'TabMenuItem',
    props:{
        menuItem:Array
    },
    methods:{
        imgLoad(){
            debounce(this.$emit('imgLoad'),50);
        }
    }
}
</script>

<style scoped>
#tab-menu-item{
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
#tab-menu-item a {
    width: 33%;
    padding: 10px;
}
#tab-menu-item a img{
    width: 100%;
}
#tab-menu-item a div{
    text-align: center;
    font-size: 12px;
}
</style>