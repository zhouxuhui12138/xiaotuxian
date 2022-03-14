<template>
  <div class="xtx-carousel" @mouseleave="start()" @mouseenter="stop()">
    <!-- 轮播图 -->
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(item, i) in banners"
        :key="i"
        :class="{ fade: index === i }"
      >
        <!-- 图片轮播 -->
        <router-link to="/" v-if="item.imgUrl">
          <img :src="item.imgUrl" />
        </router-link>
        <!-- 商品轮播 -->
        <div v-else class="slider">
          <router-link v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </router-link>
        </div>
      </li>
    </ul>
    <!-- 切换按钮 -->
    <a href="javascript:;" class="carousel-btn prev" @click="change('pre')">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <a href="javascript:;" class="carousel-btn next" @click="change('next')">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <!-- 小圆点 -->
    <div class="carousel-indicator">
      <span v-for="(item, i) in banners" :key="i" :class="{ active: index === i }"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from "vue"

export default {
  name: "XtxSwiper",
  props: {
    // 轮播图数据
    banners: {
      type: Array,
      default: () => []
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 自动播放间隔时长
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    // 控制图片显示哪一张的索引
    const index = ref(0)

    // 自动播放
    let timer = null
    const autoPlayFn = () => {
      timer = setInterval(() => {
        if (index.value >= props.banners.length - 1) {
          index.value = 0
        } else {
          index.value++
        }
      }, props.duration)
    }
    watch(
      () => props.banners,
      newVal => {
        // 有数据 开启自动播放
        if (newVal.length && props.autoPlay) {
          index.value = 0
          autoPlayFn()
        }
      },
      { immediate: true }
    )

    // 移入暂停 移出继续播放
    const stop = () => {
      // 如有定时器 清楚
      if (timer) {
        clearInterval(timer)
      }
    }
    const start = () => {
      if (props.autoPlay && props.banners.length) {
        autoPlayFn()
      }
    }

    // 切换按钮
    const change = type => {
      if (type === "next") {
        index.value >= props.banners.length - 1 ? (index.value = 0) : index.value++
      } else {
        index.value === 0 ? (index.value = props.banners.length - 1) : index.value--
      }
    }

    // 组件销毁 清楚定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      index,
      stop,
      start,
      change
    }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}

// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>
