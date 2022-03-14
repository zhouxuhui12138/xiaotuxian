<template>
  <div class="goods-sku" v-if="goods">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="[{ selected: val.selected }, { disabled: val.disabled }]"
            @click="changeSku(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
          />
          <span
            :class="[{ selected: val.selected }, { disabled: val.disabled }]"
            @click="changeSku(item, val)"
            v-else
          >{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup>
import powerSet from '@/vender/power-set.js'

const props = defineProps({
  goods: {
    type: Object,
    default: () => { }
  },
  skuId: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['change'])

// 页面默认选中功能
if (props.skuId) {
  // 找出sku信息
  const sku = props.goods.skus.find(sku => sku.id === props.skuId)
  props.goods.specs.forEach((item, index) => {
    const val = item.values.find(val => val.name === sku.specs[index].valueName)
    val.selected = true
  })
}

// 得到一个路径字典
const pathMap = {}
const getPathMap = (skus) => {
  skus.forEach(sku => {
    if (sku.inventory > 0) {
      // 计算子集
      const skuArr = sku.specs.map(item => item.valueName)
      const powerSetArr = powerSet(skuArr)
      // 遍历子集 往pathMap插入数据
      powerSetArr.forEach(item => {
        const key = item.join('★')
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
getPathMap(props.goods.skus)

// 获取被选中按钮的数组
const getSelectedVals = (specs) => {
  const arr = []
  specs.forEach(item => {
    const selectedVal = item.values.find(val => val.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}

// 更新按钮是否可以选中
const updataDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, index) => {
    const selectedArr = getSelectedVals(specs)
    item.values.forEach(val => {
      if (val.selected) return
      selectedArr[index] = val.name
      const key = selectedArr.filter(value => value).join('★')
      val.disabled = !pathMap[key]
    })
  })
}
// 页面初始化更新
updataDisabledStatus(props.goods.specs, pathMap)

// 选中与取消选择
const changeSku = (item, val) => {
  // 如果商品disabled为真 不往下面执行
  if (val.disabled) return
  // 如果选中 取消即可
  if (val.selected) {
    val.selected = false
  } else {
    // 排他
    item.values.forEach(item => {
      item.selected = false
    })
    val.selected = true
  }
  updataDisabledStatus(props.goods.specs, pathMap)

  // 选择的sku信息发送出去
  const selectedArr = getSelectedVals(props.goods.specs).filter(v => v)
  // 选择有效的sku 发送给父组件 否则发送一个空对象
  if (selectedArr.length === props.goods.specs.length) {
    const skuId = pathMap[selectedArr.join('★')]
    const sku = props.goods.skus.find(sku => sku.id === skuId[0])
    emit('change', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs.reduce((pre, current) => `${pre} ${current.name}: ${current.valueName}`, '').trim()
    })
  } else {
    emit('change', {})
  }
} 
</script>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
