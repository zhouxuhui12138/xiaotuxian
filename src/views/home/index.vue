<template>
  <div class="home-enter">
    <div class="container">
      <!-- 分类 -->
      <home-category />
      <!-- 轮播图 -->
      <home-banner />
      <!-- 新鲜好物 -->
      <home-news />
      <!-- 人气推荐 -->
      <home-hot />
      <!-- 热门品牌 -->
      <home-brand />
      <!-- 商品区域 -->
      <home-product />
      <!-- 最新专题 -->
      <home-special />
    </div>
  </div>
</template>

<script setup>
import HomeCategory from "./HomeCategory.vue"
import HomeBanner from "./HomeBanner.vue"
import HomeNews from './HomeNews.vue'
import HomeHot from './HomeHot.vue'
import HomeBrand from './HomeBrand.vue'
import HomeProduct from './HomeProduct.vue'
import homeSpecial from './HomeSpecial.vue'
</script>

