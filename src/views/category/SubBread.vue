<template>
  <div class="container">
    <!-- 面包屑 -->
    <xtx-bread>
      <xtx-bread-item path="/">首页</xtx-bread-item>
      <Transition mode="out-in" name="fade-right">
        <xtx-bread-item
          v-if="category.top"
          :path="`/category/${category.top.id}`"
          >{{ category.top.name }}</xtx-bread-item
        >
      </Transition>
      <Transition mode="out-in" name="fade-right">
        <xtx-bread-item v-if="category.sub">
          {{ category.sub.name }}
        </xtx-bread-item>
      </Transition>
    </xtx-bread>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"

const store = useStore()
const route = useRoute()

// 获取一级分类和二级分类的名字和id
const category = computed(() => {
  const cate = {}

  store.state.category.list.forEach(top => {
    if (top.children) {
      // 获取二级分类
      const sub = top.children.find(sub => sub.id === route.params.id)
      if (sub) {
        cate.top = { id: top.id, name: top.name }
        cate.sub = { id: sub.id, name: sub.name }
      }
    }
  })

  return cate
})
</script>
