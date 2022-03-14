<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ id ? '同类商品推荐' : '猜你喜欢' }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <xtx-swiper :banners="banners" />
  </div>
</template>

<script setup>
import { getRecommednGoods } from '@/api/goods.js'
import { ref } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

// 请求推荐商品数据
const banners = ref([])
getRecommednGoods({ id: props.id, limit: 16 }).then(({ result }) => {
  const pageSize = 4
  const pageCount = Math.ceil(result.length / pageSize)
  // 分页
  for (let i = 0; i < pageCount; i++) {
    banners.value.push(result.slice(pageCount * i, pageCount * (i + 1)))
  }
})
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
