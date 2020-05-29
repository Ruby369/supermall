<template>
  <div>
    <h2>分类</h2>
    <div class="wrapper">
      <ul class="content">
        <li>分类列表1</li>
        <li>分类列表2</li>
        <li>分类列表3</li>
        <li>分类列表90</li>
        <li>分类列表91</li>
        <li>分类列表92</li>
        <li>分类列表93</li>
        <li>分类列表94</li>
        <li>分类列表95</li>
        <li>分类列表96</li>
        <li>分类列表97</li>
        <li>分类列表98</li>
        <li>分类列表99</li>
        <li>分类列表100</li>
        <li>分类列表1</li>
        <li>分类列表2</li>
        <li>分类列表3</li>
        <li>分类列表4</li>
        <li>分类列表5</li>
        <li>分类列表6</li>
        <li>分类列表7</li>
        <li>分类列表8</li>
        <li>分类列表9</li>
        <li>分类列表10</li>
        <li>分类列表11</li>
        <li>分类列表12</li>
        <li>分类列表13</li>
        <li>分类列表14</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll:null
    };
  },
  mounted(){
    this.scroll = new BScroll(".wrapper", {
      probeType:3,
      pullUpLoad:true
    });
    this.scroll.on('scroll',(position)=>{
      // console.log(position)
    })
    this.scroll.on('pullingUp',() => {
      console.log('上拉加载更多');
      setTimeout(() => {
        this.scroll.finishPullUp()
      }, 2000);
    })
  }
};
</script>

<style scoped>
.wrapper {
  height: 100px;
  background-color: skyblue;
}
</style>