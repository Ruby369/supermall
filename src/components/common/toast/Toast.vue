<template>
      <div class="toast" v-show="isshow">{{message}}</div>
</template>

<script>
export default {
    name:'Toast',
    // props:{
    //     message:{
    //         type:String,
    //         default:''
    //     },
    //     toastShow:false
    // }
    data(){
        return{
            message:'',
            isshow:false
        }
    },
    methods: {
        show(message="默认文字",duration=2000){
            this.isshow = true;
            this.message = message;
            setTimeout(() => {
                this.isshow = false;
                this.message = ''
            }, duration);
        }
    },
}
</script>

<style>
.toast{
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    color: #fff;
    padding: 10px;
    z-index: 999;
    background-color: rgba(0,0,0,0.75);
}
</style>