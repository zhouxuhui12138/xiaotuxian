<template>
  <div class="xtx-pagination">
    <a
      href="javascript:;"
      v-if="myCurrentPage > 1"
      @click="changePager(myCurrentPage - 1)"
      >上一页</a
    >
    <a href="javascript:;" v-else class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      v-for="item in pager.btnArr"
      :key="item"
      @click="changePager((myCurrentPage = item))"
      :class="{ active: item === myCurrentPage }"
      >{{ item }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      href="javascript:;"
      v-if="myCurrentPage < pager.pageCount"
      @click="changePager(myCurrentPage + 1)"
      >下一页</a
    >
    <a href="javascript:;" v-else class="disabled">下一页</a>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue"

export default {
  name: "XtxPagination",
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    // 按钮个数
    const btnCount = 5
    // 当前显示的页码
    const myCurrentPage = ref(1)
    // 总条数
    const myTotal = ref(100)
    // 每页显示多少条
    const myPageSize = ref(10)

    const pager = computed(() => {
      // 总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      // 计算起始页码和结束页码
      let start = myCurrentPage.value - Math.floor(btnCount / 2)
      let end = start + btnCount - 1 // 12
      // 如果开始小于1
      if (start < 1) {
        start = 1
        end =
          start + btnCount - 1 > pageCount ? pageCount : start + btnCount - 1
      }
      // 如果结束大于总页码
      if (end > pageCount) {
        end = pageCount // 10
        start = end - btnCount + 1 < 1 ? 1 : end - btnCount + 1
      }
      // 得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }

      return {
        pageCount,
        start,
        end,
        btnArr
      }
    })

    // props值改变 改变数据
    watch(
      props,
      () => {
        myTotal.value = props.total
        myCurrentPage.value = props.currentPage
        myPageSize.value = props.pageSize
      },
      { immediate: true }
    )

    // 改变页码
    const changePager = page => {
      myCurrentPage.value = page
      emit('change', page)
    }

    return {
      pager,
      myCurrentPage,
      changePager
    }
  }
}
</script>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
