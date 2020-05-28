<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isActive" class="item-icon">
      <slot name="item-icon"></slot>
    </div>
    <div v-else class="item-icon-active">
      <slot name="item-icon-active"></slot>
    </div>
    <div class="item-text" :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      dafault: "red"
    }
  },
  data() {
    return {
      // isActive:true
    };
  },
  computed: {
    isActive() {
      // /home ->item(/home) ture
      // /home ->item(/category) false
      // /home ->item(/cart) false
      // /home ->item(/profile) false
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemclick() {
      this.$router.push(this.path).catch(err => {});
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item .item-icon img,.item-icon-active img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}
</style>