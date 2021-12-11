<template>
  <div class="login-main">
    <div class="login-container">
      <div class="title-container">
        <h3 class="title">店家管理系統</h3>
      </div>
      <img class="main-image" src="@/assets/shop/shop.png" alt="shop">

      <div class="content-container">
        <h5 class="content">登入</h5>
        <div class="third-party">
          <svg-icon icon-class="line" @click="handleLoginByLine" />
        </div>
      </div>
    </div>
    <div class="freepik-icon-text">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getLoginByLineUrl, loginByLine } from '@/api/auth'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  async created() {
    const { from, code, state } = this.$route.query
    if (from === 'login-callback-line') {
      try {
        const { token } = await loginByLine({ code, state, redirectUri: process.env.VUE_APP_LINE_LOGIN_REDIRECT_URI })

        await this.$store.dispatch('user/logged', token)

        this.$router.replace({ path: this.redirect || '/' })
      } catch (e) {
        this.$router.replace({ path: '/' })
      }
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async handleLoginByLine() {
      const { url } = await getLoginByLineUrl({ redirectUri: process.env.VUE_APP_LINE_LOGIN_REDIRECT_URI })
      window.location.href = url
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-main {
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  align-content: center;

  .login-container {
    height: 100%;
    margin-bottom: -50px;

    img {
      width: 250px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .title-container {
      .title {
        font-size: 26px;
        color: $light_gray;
        text-align: center;
        font-weight: bold;
      }

    }

    .content-container {
      margin-top: 100px;

      .content {
        font-size: 20px;
        color: $light_gray;
        text-align: center;
      }

      .third-party {
        font-size: 50px;
        text-align: center;
        pointer-events: all;

        .svg-icon {
          cursor: pointer;
        }
      }
    }
  }

  .freepik-icon-text {
    height: 50px;
    text-align: center;
    font-size: 12px;
    color: #576477;
  }
}

</style>
