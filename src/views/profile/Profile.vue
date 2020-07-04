<template>
  <div id="profile">
    <nav-bar class="pro-nav">
      <div slot="center">购物商城</div>
    </nav-bar>
    <user-info v-if="!$store.state.token" @click.native="loginClick">
      <div slot="box-img" class="head-box">
        <img src="~assets/img/profile/avatar.svg" alt />
      </div>
      <div slot="login">登录/注册</div>
      <div slot="phone" class="phone">
        <img src="~assets/img/profile/phone.svg" alt />暂无绑定手机号
      </div>
    </user-info>
    <user-info v-else>
      <div slot="box-img" class="head-box">
        <img src="~assets/img/profile/info-head.jpg" alt />
      </div>
      <div slot="login">ruby</div>
      <div slot="phone" class="phone">
        <img src="~assets/img/profile/phone.svg" alt />123456789
      </div>
    </user-info>
    <div class="account">
      <div class="account-row">
        <div class="number">
          <span>0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-row">
        <div class="number">
          <span>0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-row">
        <div class="number">
          <span>0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </div>
    <list-view :listData="list_one"></list-view>
    <list-view :listData="list_two"></list-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView
  },
  data() {
    return {
      list_one: [
        { src: require("assets/img/profile/message.svg"), info: "我的消息" },
        { src: require("assets/img/profile/pointer.svg"), info: "积分商城" },
        { src: require("assets/img/profile/vip.svg"), info: "会员卡" }
      ],
      list_two: [
        { src: require("assets/img/profile/cart.svg"), info: "我的购物车" },
        { src: require("assets/img/profile/shopping.svg"), info: "下载购物APP" }
      ],
    };
  },
  methods: {
    loginClick() {
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
#profile {
  padding-top: 44px;
}
.pro-nav {
  background-color: #ff8198;
  color: #ffffff;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
}
.account {
  display: flex;
  text-align: center;
}
.account-row {
  flex: 1;
  padding: 15px;
  border-right: 1px solid #f2f2f2;
}
.account-row:last-child {
  border-right: 0px;
}
.number span {
  color: #ff5f3e;
  font-size: 24px;
}
.account-info {
  margin-top: 5px;
}

.head-box {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.phone img {
  width: 20px;
  height: 28px;
}
</style>