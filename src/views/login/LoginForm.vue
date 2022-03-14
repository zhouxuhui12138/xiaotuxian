<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      class="form"
      autocomplete="off"
      :validation-schema="myValidate"
      v-slot="{ errors }"
      ref="target"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              name="account"
              v-model="form.account"
              type="text"
              placeholder="请输入用户名或手机号"
              :class="{ error: errors.account }"
            />
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              name="password"
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              name="mobile"
              v-model="form.mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              name="code"
              v-model="form.code"
              type="text"
              placeholder="请输入验证码"
            />
            <span class="code" @click="send">
              {{ time === 0 ? "发送验证码" : `${time}秒后发送` }}
            </span>
          </div>
          <!-- 错误提示 -->
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="xtx-checkbox" v-model="form.isAgree" name="isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <!-- 错误提示 -->
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
        @click="qqLogin"
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, reactive, ref, watch } from "vue"
import { Form, Field } from "vee-validate"
import validate from "@/utils/vee-validate-schema.js"
import Message from "@/components/library/Message.js"
import { loginByAccount, sendMsg, loginByMsg } from "@/api/user.js"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router"
import { useIntervalFn } from "@vueuse/core"

// 控制显示账号登录还是短信登录
const isMsgLogin = ref(false)
// 表单数据对象
const form = reactive({
  isAgree: true,
  account: "zhousg",
  password: "123456",
  mobile: "13666666666",
  code: null
})

// 校验规则
const myValidate = {
  account: validate.account,
  password: validate.password,
  mobile: validate.mobile,
  code: validate.code,
  isAgree: validate.isAgree
}

// 切换登录规则时清空表单内容
const target = ref(null)
watch(isMsgLogin, () => {
  form.isAgree = true
  form.account = null
  form.password = null
  form.mobile = null
  form.code = null
  target.value.resetForm()
})

// 登录验证
const store = useStore()
const router = useRouter()
const route = useRoute()
const login = async () => {
  const valid = await target.value.validate()
  if (valid) {
    try {
      let data = null
      if (isMsgLogin.value) {
        // 手机号登录
        const { mobile, code } = form
        data = await loginByMsg({ mobile, code })
      } else {
        // 账号登录
        const { account, password } = form
        data = await loginByAccount({ account, password })
      }
      // 登录成功存储数据到vuex
      const { id, account, nickname, avatar, token, mobile } = data.result
      store.commit("users/setProfile", {
        id,
        account,
        nickname,
        avatar,
        token,
        mobile
      })
      // 提示
      Message({ text: "登录成功", type: "success" })
      // 跳转
      router.push(route.query.redirectUrl || "/")
    } catch (error) {
      Message({
        text: error.response.data.message || "登录失败",
        type: "error"
      })
    }
  }
}

// 发送验证码
let time = ref(0)
const { pause, resume } = useIntervalFn(
  () => {
    time.value--
    if (time.value <= 0) pause()
  },
  1000,
  false
)
onUnmounted(() => {
  pause()
})

const send = async () => {
  const valid = myValidate.mobile(form.mobile)
  if (valid === true) {
    // 发送验证码
    if (time.value === 0) {
      try {
        const res = await sendMsg(form.mobile)
        Message({ text: "发送成功", type: "success" })
        time.value = 60
        resume()
      } catch (error) {
        Message({
          text: error.response.data.message || "发送失败",
          type: "error"
        })
      }
    }
  } else {
    // 提示
    target.value.setFieldError("mobile", valid)
  }
}

const qqLogin = () => {
  Message({
    text: "敬请期待",
    type: "warn"
  })
}
</script>

<style lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
