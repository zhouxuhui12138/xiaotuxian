<template>
  <XtxDialog :title="formData.id ? '修改地址' : '添加地址'" v-model:visible="visible" class="xtx-dialog">
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input class="input" v-model="formData.receiver" placeholder="请输入收货人" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input class="input" v-model="formData.contact" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity @change="addressChange" :fullLocation="formData.fullLocation" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input class="input" v-model="formData.address" placeholder="请输入详细地址" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input class="input" v-model="formData.postalCode" placeholder="请输入邮政编码" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input class="input" v-model="formData.addressTags" placeholder="请输入地址标签，逗号分隔" />
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <XtxButton type="gray" style="margin-right: 20px" @click="visible = false">取消</XtxButton>
      <XtxButton @click="submit" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref, reactive } from "vue"
import { addAddress, editAddress } from "@/api/pay.js"
import Message from "../../../components/library/Message"

export default {
  setup(props, { emit }) {
    const visible = ref(false)
    const open = address => {
      if (address.id) {
        // 修改
        for (const key in address) {
          formData[key] = address[key]
        }
      } else {
        // 添加
        for (const key in formData) {
          if (key === "isDefault") {
            formData[key] = 1
          } else {
            formData[key] = ""
          }
        }
      }
      visible.value = true
    }

    // 表单数据
    const formData = reactive({
      receiver: "",
      contact: "",
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      address: "",
      postalCode: "",
      addressTags: "",
      isDefault: 1,
      fullLocation: "",
      id: ""
    })

    // 监听城市改变
    const addressChange = city => {
      formData.provinceCode = city.provinceCode
      formData.countyCode = city.countyCode
      formData.cityCode = city.cityCode
      formData.fullLocation = city.fullLocation
    }

    // 提交
    const submit = () => {
      if (formData.id) {
        // 修改
        editAddress(formData).then(() => {
          Message({ text: "修改成功", type: "success" })
          visible.value = false
          emit("editAddress", formData)
        })
      } else {
        // 添加
        addAddress(formData).then(data => {
          formData.id = data.result.id
          Message({ text: "添加", type: "success" })
          visible.value = false
          // 把地址数据提交给父组件
          emit("editAddress", formData)
        })
      }
    }

    return {
      visible,
      open,
      formData,
      addressChange,
      submit
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
