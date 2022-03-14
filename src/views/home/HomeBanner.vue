<template>
  <div class="home-banner">
    <xtx-swiper class="swiper" :banners="banners" :autoPlay="true" :duration="3000" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue"
import { getBannerListApi } from "@/api/home.js"

const banners = ref([])

onBeforeMount(async () => {
  const res = await getBannerListApi()
  banners.value = res.result
})

</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}

// 覆盖样式
.swiper {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
