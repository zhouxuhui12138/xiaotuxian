<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <XtxCheckbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']">全选</XtxCheckbox>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <!-- 购物车没有商品时显示 -->
            <tr v-if="$store.getters['cart/trueList'].length === 0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
            <tr v-for="goods in $store.getters['cart/trueList']" :key="goods.skuId">
              <td><XtxCheckbox @change="checkOne(goods.skuId, $event)" :modelValue="goods.selected" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`"><img :src="goods.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ goods.name }}
                    </p>
                    <!-- 选择规格组件 -->
                    <CartSku
                      @change="updataSku(goods.skuId, $event)"
                      :skuId="goods.skuId"
                      :attrsText="goods.attrsText"
                    />
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
                <p v-if="goods.price - goods.nowPrice > 0">
                  比加入时降价
                  <span class="red">&yen;{{ goods.price - goods.nowPrice }}</span>
                </p>
              </td>
              <td class="tc">
                <XtxNumbox @change="changeNum(goods.skuId, $event)" :modelValue="goods.count" />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (Math.round(goods.nowPrice * 100) * goods.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;" @click="delect(goods.skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/unUsedList'].length">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr v-for="item in $store.getters['cart/unUsedList']" :key="item.skuId">
              <td>
                <XtxCheckbox style="color: #eee" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`"><img :src="item.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ item.name }}
                    </p>
                    <p class="attr">{{ item.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
              </td>
              <td class="tc">{{ item.count }}</td>
              <td class="tc">
                <p>&yen;{{ (Math.round(item.nowPrice * 100) * item.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']">全选</XtxCheckbox>
          <a href="javascript:;" @click="batchDelectCart">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDelectCart(-1)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters["cart/trueTotal"] }} 件商品，已选择
          {{ $store.getters["cart/selectedTotal"] }} 件，商品合计：
          <span class="red">¥{{ $store.getters["cart/selectedTotalPrice"] }}</span>
          <XtxButton @click="pay" type="primary">下单结算</XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodsRecommend />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import Confirm from "../../components/library/Confirm"
import Message from "../../components/library/Message"
import GoodsRecommend from "../goods/GoodsRecommend.vue"
import CartNone from "./CartNone.vue"
import CartSku from "./CartSku.vue"

// 修改单选状态
const store = useStore()
const checkOne = (skuId, selected) => {
  store.dispatch("cart/updataCart", { skuId, selected })
}

// 选中全部
const checkAll = selected => {
  store.dispatch("cart/checkAllCart", selected)
}

// 改变数量
const changeNum = (skuId, count) => {
  store.dispatch("cart/updataCart", { skuId, count })
}

// 删除
const delect = skuId => {
  Confirm({ text: "是否删除此商品" })
    .then(() => {
      store.dispatch("cart/delectCart", skuId).then(() => {
        Message({ text: "删除成功", type: "success" })
      })
    })
    .catch(err => err)
}

// 批量删除选中的商品
const batchDelectCart = isClear => {
  // 删除选中商品
  Confirm({ text: "是否删除" })
    .then(() => {
      store.dispatch("cart/batchDelectCart", isClear).then(() => {
        Message({ text: "删除成功", type: "success" })
      })
    })
    .catch(err => err)
}

// 改变过后的sku
const updataSku = (oldSkuId, newSku) => {
  store.dispatch("cart/updataCartSku", { oldSkuId, newSku })
}

const router = useRouter()
const pay = () => {
  if (store.getters["cart/selectedList"].length === 0) {
    return Message({ text: "请至少选择一件商品", type: "warn" })
  }
  Confirm({ text: "下单需要登录，现在登录？" })
    .then(() => {
      router.push("/member/checkout")
    })
    .catch(e => e)
}
</script>

<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
