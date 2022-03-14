<template>
  <div class="home-new" ref="target">
    <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <!-- 查看更多 -->
      <template #right>
        <XtxMore />
      </template>
      <!-- 面板内容 -->
      <transition name="fade">
        <ul class="goods-list" v-if="newsList.length">
          <li v-for="item in newsList" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img v-lazy="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <!-- 骨架屏 -->
        <HomeSkeleton :num="4" :bg="'#f0f9f4'" v-else />
      </transition>
    </home-panel>
  </div>
</template>

<script setup>
import HomePanel from "./HomePanel.vue"
import HomeSkeleton from "./HomeSkeleton.vue"
import { getNewsApi } from "@/api/home.js"
import { ref } from "vue"
import { useLazyData } from '@/hooks/index.js'

// ref获取dom
const target = ref(null)
let newsList = ref([])

newsList = useLazyData(target, getNewsApi)
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
