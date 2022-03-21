<template>
  <div class="checkout-address">
    <div class="text">
      <div class="none" v-if="!address">您需要先添加收货地址才可提交订单。</div>
      <template v-if="address">
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ address.receiver }}
          </li>
          <li><span>联系方式：</span>{{ address.contact }}</li>
          <li><span>收货地址：</span>{{ address.fullLocation + address.address }}</li>
        </ul>
        <a href="javascript:;" @click="openEditAddress(address)">修改地址</a>
      </template>
    </div>
    <div class="action">
      <XtxButton class="btn" @click="openDialog">切换地址</XtxButton>
      <XtxButton class="btn" @click="openEditAddress({})">添加地址</XtxButton>
    </div>
  </div>
  <!-- 切换地址对话框 -->
  <XtxDialog title="切换收货地址" v-model:visible="visible">
    <div
      class="text item"
      :class="{ active: selectedAdress && selectedAdress.id === item.id }"
      v-for="item in list"
      :key="item.id"
      @click="selectedAdress = item"
    >
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ item.receiver }}
        </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation.replace(/ /g, "") + item.address }}</li>
      </ul>
    </div>
    <template #footer>
      <XtxButton type="gray" style="margin-right: 20px" @click="visible = false">取消</XtxButton>
      <XtxButton type="primary" @click="confirmAddress">确认</XtxButton>
    </template>
  </XtxDialog>

  <!-- 添加地址对话框 -->
  <AddressEdit @editAddress="editAddress" ref="addressEditCom" />
</template>

<script setup>
import { ref } from "vue"
import AddressEdit from "./AddressEdit.vue"

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

// 如果有地址 取出默认地址
const address = ref(null)
if (props.list.length) {
  const defaultaddress = props.list.find(item => item.isDefault === 0)
  if (defaultaddress) {
    address.value = defaultaddress
  } else {
    address.value = props.list[0]
  }
}

// 发送收货地址id给父组件
const emit = defineEmits(["change"])
emit("change", address.value && address.value.id)

// 控制对话框是否显示
const visible = ref(false)

// 开启添加地址对话框
const addressEditCom = ref(null)
const openEditAddress = (address) => {
  addressEditCom.value.open(address)
}

// 改变地址 切换地址并且跳转父组件
const selectedAdress = ref(null)
const confirmAddress = () => {
  address.value = selectedAdress.value
  emit('change', selectedAdress.value?.id)
  visible.value = false
}

const openDialog = () => {
  selectedAdress.value = null
  visible.value = true
}

// 修改地址成功时 修改list列表
const editAddress = (formData) => {
  // 因为formData和list指向同一个内存地址 所以formData在提交完成后不能清空
  // 实现深拷贝
  console.log(formData)
  const obj = JSON.stringify(formData)
  props.list.unshift(JSON.parse(obj))
}
</script>

<style scoped lang="less">
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
