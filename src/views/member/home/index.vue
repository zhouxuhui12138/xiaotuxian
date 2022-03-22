<template>
  <div class="member-home">
    <!-- 概况 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodsItem v-for="i in 4" :key="i" :goods="goods" />
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹">
      <GoodsItem v-for="i in 4" :key="i" :goods="goods" />
    </HomePanel>
    <!-- 猜你喜欢 -->
    <GoodsRecommend />
  </div>
</template>

<script setup>
import HomeOverview from "./HomeOverview.vue"
import HomePanel from "./HomePanel.vue"
import GoodsRecommend from "../../goods/GoodsRecommend.vue"
import GoodsItem from "../../category/GoodsItem.vue"

const goods = {
  id: "1",
  name: "自煮火锅不排队 麦饭石不粘鸳鸯火锅",
  picture: "https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg",
  desc: "清汤鲜香 红汤劲爽",
  price: "159.00"
}
</script>

<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>
