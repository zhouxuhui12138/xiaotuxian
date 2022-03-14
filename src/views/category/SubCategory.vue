<template>
  <div class="sub-category container">
    <!-- 面包屑 -->
    <sub-bread />
    <!-- 筛选区 -->
    <sub-filter @filterChange="filterChange" />
    <!-- 排序和商品列表区域 -->
    <div class="goods-list">
      <!-- 排序 -->
      <sub-sort @sortChange="sortChange" />
      <!-- 商品 -->
      <ul>
        <li v-for="item in list" :key="item.id">
          <goods-item :goods="item" />
        </li>
      </ul>
      <!-- 加载更多 -->
      <xtx-infinite-loading @infinite="getData" :loading="loading" :finished="finished" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { getSubCategoryGoods } from '@/api/category.js'
import SubBread from "./SubBread.vue"
import SubFilter from "./SubFilter.vue"
import SubSort from "./SubSort.vue"
import GoodsItem from "./GoodsItem.vue";
import { useRoute } from "vue-router"

const route = useRoute()
const loading = ref(false)
const finished = ref(false)
const list = ref([])
let params = {
  page: 1,
  pageSize: 20
}

const getData = async () => {
  // 请求数据...
  loading.value = true
  params.categoryId = route.params.id
  const { result } = await getSubCategoryGoods(params)

  if (result.items.length) {
    list.value.push(...result.items)
    params.page++
  } else {
    // 加载完毕
    finished.value = true
  }

  loading.value = false
}

// 如果切换分类 重新请求数据
watch(() => route.params.id, (newVal) => {
  if (newVal && `/category/sub/${newVal}` === route.path) {
    // 重新加载
    finished.value = false
    list.value = []
    params = {
      page: 1,
      pageSize: 20
    }
  }
})

// 重新排序时 数据发生变化
const sortChange = (sortParams) => {
  finished.value = false
  // 合并参数 重新发送请求
  params = { ...params, ...sortParams }
  params.page = 1
  list.value = []
}

// 筛选时 重新请求数据
const filterChange = (filterParams) => {
  finished.value = false
  // 合并参数 重新发送请求
  params = { ...params, ...filterParams }
  params.page = 1
  list.value = []
}
</script>

<style lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
