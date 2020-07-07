<template>
  <div id="user-info">
      <div class="userinfo">
          <div class="head-box">
              <slot name="box-img"><img src="~assets/img/profile/avatar.svg" alt=""></slot>
          </div>
          <div class="head-info">
              <div class="login"><slot name="login">登录/注册</slot> </div>
              <div class="phone"><slot name="phone"><img src="~assets/img/profile/phone.svg" alt="">暂无绑定手机号</slot></div>
          </div>
          <div class="head-i">
              <div class="exit"><slot name="exit"><i class="iconfont icon-dayuhao"></i></slot></div>
          </div>
      </div>
  </div>
</template>

<script>
import "assets/img/iconfont/iconfont.css";
import "assets/img/iconfont/iconfont.js";
export default {
    name:'UserInfo'
}
</script>

<style scoped>
#user-info{
    background-color: #ff8198;
}
.userinfo{
    display: -webkit-box;
    display: flex;
    align-items: center;
    padding: 15px;
}
.head-info{
    flex: 1;
    padding-left: 5px;
}
.head-box img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
.head-info > div > img{
    width: 20px;
    height: 28px;
}
.head-info,.icon-dayuhao{
    color: #ffffff;
}
.login{
    padding-left: 4px;    
}
.phone{
    font-size: 14px;
}
.phone img{
    vertical-align:middle;
}
</style>