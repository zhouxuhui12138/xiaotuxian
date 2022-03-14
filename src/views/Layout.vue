<template>
  <div class="layout">
    <AppNavBar />
    <AppHeaderSticky  />
    <AppHeader />

    <!-- 二级路由 -->
    <div class="main">
      <router-view></router-view>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import AppNavBar from "@/components/AppNavBar.vue"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import { useStore } from "vuex"
import AppHeaderSticky from "@/components/AppHeaderSticky.vue"

const store = useStore()

// 请求分类数据
store.dispatch("category/getList")
</script>

<style scoped lang="less"></style>
