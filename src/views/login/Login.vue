<template>
  <div class="login-container">
    <van-icon name="cross" @click="$router.back()" />
    <!-- logo登录区 -->
    <div class="logo">
      <van-image class="img" radius="20px" fit="contain" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1253989213,694395908&fm=26&gp=0.jpg" />
      <div class="login-text">起点账号登录</div>
    </div>
    <!-- /logo登录区 -->
    <!-- 表单区域 -->
    <van-form @submit="onSubmit">
      <van-field
      v-model="username"
      name="用户名"
      placeholder="手机号/邮箱"
      left-icon="contact"
      :rules="loginFormRules.userNameRules"
      >
        <template #left-icon>
          <i class="iconfont icon-yonghu-copy"></i>
        </template>
      </van-field>
      <van-field
      v-model="password"
      name="密码"
      placeholder="密码"
      type="password"
      ref="password"
      :rules="loginFormRules.passwordRules"
      >
        <template #left-icon>
          <i class="iconfont icon-mima"></i>
        </template>
        <template #right-icon>
          <i class="iconfont icon-yanjing1" @click="editTypeAttribute"></i>
        </template>
      </van-field>
      <div class="login-btn">
        <van-button block type="info" native-type="submit" color="#fbb9bb">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /表单区域 -->
    <div class="footer">
      <van-cell title="忘记密码？" value="注册新账号"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      username: '',
      password: '',
      loginFormRules: {
        userNameRules: [
          { required: true, message: '用户名不能为空' },
          { pattern: /^1[34578]\d{9}$/, message: '用户名格式错误' }
        ],
        passwordRules: [
          { required: true, message: '密码不能为空' },
          {
            message: '密码长度在6-16位之间',
            validator: (value, rules) => {
              console.log(value, rules)
              if (value.length < 6 || value.length > 16) {
                return false
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 20
      })
      this.$router.push('/bookcity')
    },
    editTypeAttribute () {
      if (this.$refs.password.type === 'text') {
        this.$refs.password.type = 'password'
      } else {
        this.$refs.password.type = 'text'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container{
    padding: 20px 20px 0;
      .van-icon-cross{
        font-size: 50px;
      }
    .logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 300px;
      .img{
        width: 150px;
        height: 150px;
        margin-bottom: 30px;
      }
      .login-text{
        font-family: SimSun;
        font-size: 40px;
        font-weight: 600;
      }
    }
    .iconfont {
      font-size: 40px;
    }
    .login-btn{
      margin: 20px;
      .van-button{
        border-radius: 16px;
      }
    }
    .footer {
      .van-cell__title{
        color: #acacad;
      }
      .van-cell__value{
        color: #000;
      }
    }
  }
</style>
