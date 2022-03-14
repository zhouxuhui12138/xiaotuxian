<template>
  <div class="xtx-city" ref="targer">
    <div class="select" @click="toggle" :class="{ active: show }">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="show">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span
          @click="changeAddress(item)"
          class="ellipsis"
          v-for="item in currList"
          :key="item.code"
        >{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from "@vueuse/core"
import { ref, computed, reactive } from "vue"
import axios from "axios"

export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 获取城市列表
    const citys = ref([])

    // 控制显示或隐藏
    const show = ref(false)
    const loading = ref(false)
    const open = () => {
      show.value = true
      loading.value = true
      // 请求城市数据
      getCityData().then(res => {
        citys.value = res
        loading.value = false
      })
      // 清空之前选择的地区
      for (let key in changeResult) {
        changeResult[key] = ''
      }
    }
    const close = () => {
      show.value = false
    }
    const toggle = () => {
      show.value ? close() : open()
    }

    // 点击城市框以外时 关闭城市框
    const targer = ref(null)
    onClickOutside(targer, () => {
      close()
    })

    // 显示当前地图的数组
    const currList = computed(() => {
      // 省
      let currList = citys.value
      // 市
      if (changeResult.provinceCode) {
        currList = currList.find(p => p.code === changeResult.provinceCode).areaList
      }
      // 区
      if (changeResult.cityCode) {
        currList = currList.find(c => c.code === changeResult.cityCode).areaList
      }
      return currList
    })

    // 定义省市区数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    // 点击切换地区
    const changeAddress = item => {
      switch (item.level) {
        case 0:
          changeResult.provinceCode = item.code
          changeResult.provinceName = item.name
          break;
        case 1:
          changeResult.cityCode = item.code
          changeResult.cityName = item.name
          break;
        case 2:
          changeResult.countyCode = item.code
          changeResult.countyName = item.name
          close()
          // 通知父组件
          changeResult.fullLocation = `${changeResult.provinceName}${changeResult.cityName}${changeResult.countyName}`
          emit('change', changeResult)
          break;
      }
    }

    return {
      toggle,
      show,
      targer,
      loading,
      currList,
      changeAddress
    }
  }
}

// 定义获取城市列表函数
const getCityData = () => {
  return new Promise((resolve, reject) => {
    // 没有缓存添加缓存
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(res.data)
      })
    }
  })
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    // 省略...
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
