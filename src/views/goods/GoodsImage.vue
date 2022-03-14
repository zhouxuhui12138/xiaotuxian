<template>
  <div class="goods-image">
    <!-- 放大镜 -->
    <div
      class="large"
      v-show="show"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
    ></div>
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt />
      <!-- 遮罩层 -->
      <div class="layer" v-show="show" :style="layerPosition"></div>
    </div>
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <img @mouseenter="currIndex = i" :src="img" alt />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useMouseInElement } from '@vueuse/core';
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

// 控制图片的索引
const currIndex = ref(0)
// 控制遮罩层和大图是否显示
const show = ref(null)
// 动态控制大图和遮罩层的定位样式
const layerPosition = reactive({
  top: 0,
  left: 0
})
const largePosition = reactive({
  backgroundPositionX: 0,
  backgroundPositionY: 0
})
// 获取鼠标是否出于容器内 和x y坐标
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)
// 动态修改自己的数据
watch([elementX, elementY, isOutside], () => {
  show.value = !isOutside.value
  // 计算移动多少
  const position = { x: 0, y: 0 }
  if (elementX.value < 100) {
    position.x = 0
  } else if (elementX.value > 300) {
    position.x = 200
  } else {
    position.x = elementX.value - 100
  }
  if (elementY.value < 100) {
    position.y = 0
  } else if (elementY.value > 300) {
    position.y = 200
  } else {
    position.y = elementY.value - 100
  }

  // 赋值
  layerPosition.left = position.x + 'px'
  layerPosition.top = position.y + 'px'
  largePosition.backgroundPositionX = -position.x + 'px'
  largePosition.backgroundPositionY = -position.y + 'px'
})
</script>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
