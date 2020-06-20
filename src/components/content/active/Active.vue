<template>
  <div class="active-btn">
    <div class="active-icon" :class="{'check':checked}">
      <i class="iconfont " :class="{'icon-check1':checked}"></i>
    </div>
    <slot name="title"></slot>
  </div>
</template>

<script>
import "assets/img/iconfont/iconfont.css";
import "assets/img/iconfont/iconfont.js";
export default {
  name: "Active",
  props:{
    checked:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    // activeClick() {
    //   this.$emit('activeClick')
    // }
  }
};
</script>

<style scoped>
.active-btn {
  display: flex;
  align-items: center;
}
.active-icon {
  height: 16px;
  width: 16px;
  border: 1px solid #ccc;
  border-radius: 100%;
}
.icon-check1 {
  color: #ff8198;
}
.check{
  border: none;
}
</style>