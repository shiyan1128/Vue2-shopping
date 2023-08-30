<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">{{ totalSecond === second ? '获取验证码' : second + '秒后重新发送'}}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request'
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '', // 图形验证码
      picKey: '',
      picUrl: '',
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数，开定时器，second--
      timer: null,
      mobile: '', // 手机号
      msgCode: '' // 短信验证码
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      // console.log(res)
      this.picUrl = base64 // 存储地址
      this.picKey = key // 存储唯一标识
      // this.$toast('图形验证码获取成功')
      this.$toast.success('图形验证码获取成功')
    },
    // 校验 手机号 和 图形验证码 是否合法
    // 通过返回true 否则返回false
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        // 没通过校验，不能获取验证码，直接返回
        return
      }
      // 当前没有定时器开着且totalSecond 和 second 秒数相等，才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        console.log(res)
        this.$toast('短信已发送，注意查收')
        this.timer = setInterval(() => {
          // console.log('正在倒计时')
          this.second--
          if (this.second <= 0) {
            this.second = this.totalSecond
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    async login () {
      // 登录之前也要验证
      if (!this.validFn()) {
        // 没通过校验，不能获取验证码，直接返回
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      console.log('发送登录请求')
      const res = await codeLogin(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      // console.log(res)
      this.$toast('登录成功')

      // 进行判断，看地址有无回跳地址
      // 如果有 ， 说明是其他页面拦截到登录页来的，需要回跳
      // 如果没有， 正常去首页
      const url = this.$route.query.backUrl || '/'
      // 此时不宜用push，push会缓存历史路径，点返回时会返回登录页
      // this.$router.push(url)
      // 而replace不会缓存历史路径，会直接在原来的路径上进行替换
      this.$router.replace(url)
    }
  },
  destroyed () {
    clearInterval(this.timer) // 离开页面时要清除定时器
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
