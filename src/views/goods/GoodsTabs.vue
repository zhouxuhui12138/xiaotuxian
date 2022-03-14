<template>
  <div class="goods-tabs">
    <nav>
      <a
        @click="active = 'GoodsDetail'"
        :class="{ active: active === 'GoodsDetail' }"
        href="javascript:;"
        >商品详情</a
      >
      <a
        href="javascript:;"
        @click="active = 'GoodsComment'"
        :class="{ active: active === 'GoodsComment' }"
      >
        商品评价
        <span>({{ goods.commentCount }})</span>
      </a>
    </nav>
    <!-- 切换内容的地方 -->
    <goods-detail v-if="active === 'GoodsDetail'" />
    <goods-comment v-if="active === 'GoodsComment'" />
  </div>
</template>

<script setup>
import { ref, inject } from "vue"
import GoodsComment from "./GoodsComment.vue"
import GoodsDetail from "./GoodsDetail.vue"

// 控制显示哪个tab
const active = ref("GoodsDetail")

// 从上级组件拿取数据
const goods = inject("goods")
</script>

<style lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
