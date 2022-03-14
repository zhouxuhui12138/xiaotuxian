<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item path="/">首页</xtx-bread-item>
        <Transition mode="out-in" name="fade-right">
          <xtx-bread-item v-if="topCategory" :key="topCategory.id">{{ topCategory.name }}</xtx-bread-item>
        </Transition>
      </xtx-bread>
      <!-- 轮播图 -->
      <xtx-swiper :banners="banners" style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul v-if="topCategory">
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类商品 -->
      <div class="ref-goods" v-for="sub in goodsList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">{{ sub.desc }}</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="goods in sub.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getBannerListApi } from "@/api/home.js"
import { getTopCategory } from "@/api/category.js"
import { computed, ref, watch } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import GoodsItem from "./GoodsItem.vue"

// 轮播图
const banners = ref([])
getBannerListApi().then(res => {
  banners.value = res.result
})

// 分类
const store = useStore()
const route = useRoute()
const topCategory = computed(() => {
  return store.state.category.list.find(item => {
    return item.id === route.params.id
  })
})

// 获取分类商品
const goodsList = ref([])
watch(
  () => route.params.id,
  newVal => {
    // 只有在顶级类目下才发请求
    if (newVal && `/category/${newVal}` === route.path) {
      getTopCategory(route.params.id).then(res => {
        goodsList.value = res.result.children
      })
    }
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
