<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item path="/">首页</xtx-bread-item>
        <xtx-bread-item :path="`/category/${goods.categories[1].id}`"
          >{{ goods.categories[1].name }}
        </xtx-bread-item>
        <xtx-bread-item :path="`/category/sub/${goods.categories[0].id}`"
          >{{ goods.categories[0].name }}
        </xtx-bread-item>
        <xtx-bread-item>{{ goods.name }}</xtx-bread-item>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goods-image :images="goods.mainPictures" />
          <goods-sales />
        </div>
        <div class="spec">
          <goods-name :goods="goods" />
          <!-- sku组件 -->
          <goods-sku :goods="goods" @change="skuChange" v-if="goods" />
          <!-- 数量组件 -->
          <xtx-numbox v-model="num" :max="goods.inventory" label="数量" />
          <xtx-button type="primary" style="margin-top: 20px" @click="addCart"
            >加入购物车
          </xtx-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <goods-recommend :id="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品评价 -->
          <goods-tabs />
          <!-- 注意事项 -->
          <goods-warn />
        </div>
        <!-- 24热榜专题推荐 -->
        <div class="goods-aside">
          <goods-hot :type="1" :id="goods.id" />
          <goods-hot :type="2" :id="goods.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { provide, ref, watch } from "vue"
import { getGoods } from "@/api/goods.js"
import { useRoute } from "vue-router"
import GoodsImage from "./GoodsImage.vue"
import GoodsSales from "./GoodsSales.vue"
import GoodsName from "./GoodsName.vue"
import GoodsSku from "./GoodsSku.vue"
import GoodsRecommend from "./GoodsRecommend.vue"
import GoodsTabs from "./GoodsTabs.vue"
import GoodsHot from "./GoodsHot.vue"
import GoodsWarn from "./GoodsWarn.vue"
import { useStore } from "vuex"
import Message from "@/components/library/Message"

const route = useRoute()

// 获取商品详情数据
const goods = ref(null)
// 路由id可能会发生变化 使用watch
watch(
  () => route.params.id,
  async newVal => {
    if (newVal && `/product/${newVal}` === route.path) {
      const { result } = await getGoods(route.params.id)
      goods.value = result
    }
  },
  { immediate: true }
)

// 子组件传过来的sku数据
const currentSku = ref(null)
const skuChange = sku => {
  if (sku.skuId) {
    // 修改价格
    goods.value.price = sku.price
    goods.value.oldPrice = sku.oldPrice
    goods.value.inventory = sku.inventory
  }
  // 保存sku
  currentSku.value = sku
}

// 传递数据给后代组件使用
provide("goods", goods)

// 购买数量
const num = ref(1)

// 加入购物车
const store = useStore()
const addCart = () => {
  if (currentSku.value && currentSku.value.skuId) {
    store.dispatch("cart/addCart", {
      id: goods.value.id,
      skuId: currentSku.value.skuId,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: currentSku.value.price,
      nowPrice: currentSku.value.price,
      count: num.value,
      attrsText: currentSku.value.specsText,
      selected: true,
      isEffective: true,
      stock: currentSku.value.inventory
    }).then(() => {
      Message({type: 'success', text: '提交成功'})
    })
  } else {
    Message({ type: "warn", text: "请选择参数" })
  }
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;

  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }

  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}

.goods-footer {
  display: flex;
  margin-top: 20px;

  .goods-article {
    width: 940px;
    margin-right: 20px;
  }

  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
</style>
