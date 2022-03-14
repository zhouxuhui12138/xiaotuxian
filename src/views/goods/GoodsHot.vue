<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div class="goodsList">
      <goods-item :goods="item" v-for="item in goods" :key="item.id" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import { getHotGoods } from "@/api/goods.js"
import GoodsItem from "../category/GoodsItem.vue"

const props = defineProps({
  type: {
    type: Number,
    default: 1
  },
  id: {
    type: String,
    default: ""
  }
})

// 标题
const titleObj = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" }
const title = computed(() => {
  return titleObj[props.type]
})

// 获取商品列表
const goods = ref([])
getHotGoods({ id: props.id, type: props.type, limit: 3 }).then(({ result }) => {
  goods.value = result.map(item => {
    item.tag = item.desc
    return item
  })
})
</script>

<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
