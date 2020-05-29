<template>
  <div ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    nama:'Scroll',
    data() {
        return {
            scroll:null
        }
    },
    mounted(){
        //不要用js原生方法拿元素 用ref定义来拿
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true

        })
    }
}
</script>

<style scoped>

</style>