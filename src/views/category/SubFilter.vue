<template>
  <!-- 筛选区 -->
  <div class="sub-filter container" v-if="filterData && !loading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in filterData.brands"
          @click="changeBrand(item.id)"
          :key="item.id"
          :class="{ active: item.id === filterData.checkedBrand }"
        >{{ item.name }}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="prop in item.properties"
          @click="changeProps(item, prop.id)"
          :class="{ active: prop.id === item.checkedAttr }"
          :key="prop.id"
        >{{ prop.name }}</a>
      </div>
    </div>
  </div>

  <!-- 骨架屏 -->
  <div v-else class="sub-filter">
    <xtx-skeleton class="item" width="800px" height="40px" />
    <xtx-skeleton class="item" width="800px" height="40px" />
    <xtx-skeleton class="item" width="600px" height="40px" />
    <xtx-skeleton class="item" width="600px" height="40px" />
    <xtx-skeleton class="item" width="600px" height="40px" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { getSubFilter } from "@/api/category.js"
import XtxSkeleton from "../../components/library/XtxSkeleton.vue"

const route = useRoute()
const emit = defineEmits(['filter-change'])
const filterData = ref([])
const loading = ref(false)

// 监听二级分类改变来请求数据
watch(
  () => route.params.id,
  async newVal => {
    loading.value = true
    // 变化的id有值并且处于当前路径 发送请求
    if (newVal && `/category/sub/${newVal}` === route.path) {
      const { result } = await getSubFilter(newVal)
      // 修改数据
      result.checkedBrand = null
      result.brands.unshift({ id: null, name: "全部" })
      result.saleProperties.forEach(item => {
        item.checkedAttr = null
        item.properties.unshift({ id: null, name: "全部" })
      })
      filterData.value = result
      loading.value = false
    }
  },
  { immediate: true }
)

// 改变品牌
const changeBrand = (brandId) => {
  // 阻止重复请求
  if (brandId === filterData.value.checkedBrand) return
  filterData.value.checkedBrand = brandId
  // 通知父组件
  emit('filter-change', getFilterParams())
}

// 改变参数
const changeProps = (item, propId) => {
  // 阻止重复请求
  if (propId === item.checkedAttr) return
  item.checkedAttr = propId
  // 通知父组件
  emit('filter-change', getFilterParams())
}

// 获取筛选参数
const getFilterParams = () => {
  const obj = {
    brandId: null,
    attrs: []
  }

  // 品牌
  obj.brandId = filterData.value.checkedBrand
  // 属性
  filterData.value.saleProperties.forEach(item => {
    // 如果属性被选中了
    if (item.checkedAttr) {
      const prop = item.properties.find(prop => prop.id === item.checkedAttr)
      obj.attrs.push({
        groupName: item.name,
        propertyName: prop.name
      })
    }
  })

  if (obj.attrs.length === 0) obj.attrs = null
  return obj
}
</script>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>
