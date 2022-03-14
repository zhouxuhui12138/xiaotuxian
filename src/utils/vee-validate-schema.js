/**
 * 表单校验规则
 */

export default {
  // 校验用户名
  account(value) {
    // 返回字符串为不通过 true为校验通过
    if (!value) return "请输入用户名"
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-19个字符"
    return true
  },
  // 校验密码
  password(value) {
    if (!value) return "请输入密码"
    if (!/^\w{6,24}$/.test(value)) return "请输入6-24个字符"
    return true
  },
  // 手机号
  mobile(value) {
    if (!value) return "请输入手机号"
    if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) return "手机号格式不正确"
    return true
  },
  // 校验密码
  code(value) {
    if (!value) return "请输入验证码"
    if (!/^\d{6}$/.test(value)) return "验证码格式不正确"
    return true
  },
  // 是否勾选协议
  isAgree(value) {
    if (!value) return "请勾选用户协议"
    return true
  },
}
