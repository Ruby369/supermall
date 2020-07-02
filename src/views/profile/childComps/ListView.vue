<template>
  <div id="list">
    <div class="list-item" v-for="(item,index) in listData" :key="index">
        <img :src="item.src" alt />
        <div>{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props:{
      listData:{
          type:Array,
          default(){
              return[]
          }
      }
  }
};
</script>

<style scoped>
#list{
    border-top: 10px solid #f2f2f2;
}
.list-item{
    display:flex;
    padding:12px 15px;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
}
.list-item img{
    width: 20px;
    height: 20px;
}
.list-item div{
    padding-left: 15px;
    font-size: 15px;
}
</style>