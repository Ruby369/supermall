<template>
    <div class="recommend">
        <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
            <a>
                <img :src="item.image">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },

};
</script>

<style scoped>
.recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0px 25px;
    border-bottom: 8px solid #eeeeee;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom:10px;
}
</style>