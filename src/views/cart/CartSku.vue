<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="isShow">
      <div class="loading" v-if="loading"></div>
      <template v-else>
        <GoodsSku @change="skuChange" :skuId="skuId" :goods="goods" />
        <XtxButton @click="submit" type="primary" size="mini" style="margin-left: 60px">确认</XtxButton>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core"
import { ref } from "vue"
import { getCartSku } from "@/api/cart"
import GoodsSku from "../goods/GoodsSku.vue"

const props = defineProps({
  attrsText: {
    type: String,
    defalut: ""
  },
  skuId: {
    type: String,
    defalut: ""
  }
})

// 切换
const goods = ref(null)
const loading = ref(false)
const isShow = ref(false)

const hide = () => {
  isShow.value = false
}

const show = async () => {
  isShow.value = true
  // 请求数据
  loading.value = true
  const { result } = await getCartSku(props.skuId)
  goods.value = result
  loading.value = false
}

const toggle = () => {
  isShow.value ? hide() : show()
}

// 点击其他组件关闭
const target = ref(null)
onClickOutside(target, () => {
  hide()
})

// sku改变
const currentSku = ref(null)
const skuChange = sku => {
  currentSku.value = sku
}

// sku改变时通知父组件
const emit = defineEmits(["change"])
const submit = () => {
  if (currentSku.value && currentSku.value.skuId && currentSku.value.skuId !== props.skuId) {
    emit("change", currentSku.value)
    hide()
  }
}
</script>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
