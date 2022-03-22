<template>
  <div class="member-home">
    <!-- 概况 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏" />
    <!-- 足迹 -->
    <HomePanel title="我的足迹" />
    <!-- 猜你喜欢 -->
    <GoodsRecommend />
  </div>
</template>

<script setup>
import HomeOverview from "./HomeOverview.vue"
import HomePanel from "./HomePanel.vue"
import GoodsRecommend from "../../goods/GoodsRecommend.vue"
import { ref } from "vue"

</script>

<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>
