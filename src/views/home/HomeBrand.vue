<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a
        @click="toggle(0)"
        :class="{ disabled: index === 0 }"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        @click="toggle(1)"
        :class="{ disabled: index === 1 }"
        href="javascript:;"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <div class="box">
      <Transition name="fade">
        <ul v-if="brandList.length" class="list" :style="`transform: translateX(-${translateX}px);`">
          <li v-for="item in brandList" :key="item.id">
            <RouterLink to="/">
              <img v-lazy="item.picture" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px" />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup>
import { computed, ref } from "vue"
import HomePanel from "./HomePanel.vue"
import { getBrandApi } from "@/api/home.js"
import { useLazyData } from "@/hooks/index.js"

const target = ref(null)
let brandList = ref([])
brandList = useLazyData(target, getBrandApi)

// 切换效果
const index = ref(0)
const toggle = temp => {
  if (temp < 0 || temp > 1) return
  index.value = temp
}

const translateX = computed(() => {
  return index.value === 0 ? 0 : 1240
})
</script>

<style scoped lang="less">
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
