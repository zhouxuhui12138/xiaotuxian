<template>
  <div class="home-hot" ref="target">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <!-- 面板内容 -->
      <transition name="fade">
        <ul v-if="hotList.length" class="goods-list">
          <li v-for="item in hotList" :key="item.id">
            <RouterLink to="/">
              <img v-lazy="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <!-- 骨架屏 -->
        <HomeSkeleton :num="4" v-else />
      </transition>
    </HomePanel>
  </div>
</template>

<script setup>
import HomePanel from "./HomePanel.vue"
import HomeSkeleton from "./HomeSkeleton.vue"
import { getHotApi } from "@/api/home.js"
import { ref } from "vue"
import { useLazyData } from "@/hooks/index.js"

// ref获取dom
const target = ref(null)
let hotList = ref([])

hotList = useLazyData(target, getHotApi)
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
