<template>
  <div class="feature">
    <a>
      <img src="~assets/img/home/recommend_bg.jpg"  @load="recomload">
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  methods: {
    recomload() {
      this.$emit("recomLoad");
    }
  }
};
</script>

<style scoped>
.feature img {
  width: 100%;
}
</style>