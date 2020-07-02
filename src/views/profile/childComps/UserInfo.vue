<template>
  <div id="user-info">
      <a href="#" class="userinfo">
          <div class="head-box">
              <img src="~assets/img/profile/avatar.svg" alt="">
          </div>
          <div class="head-info">
              <div class="login">登录/注册</div>
              <div class="phone"><img src="~assets/img/profile/phone.svg" alt="">暂无绑定手机号</div>
          </div>
          <div class="head-i">
              <i class="iconfont icon-dayuhao"></i>
          </div>
      </a>
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