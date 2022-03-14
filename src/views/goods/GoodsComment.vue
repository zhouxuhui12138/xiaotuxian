<template>
  <div class="goods-comment">
    <!-- 头部 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:;"
            :class="{ active: currentTags === index }"
            v-for="(item, index) in commentInfo.tags"
            :key="item.title"
            @click="changeTag(index)"
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        href="javascript:;"
        @click="changeSort(null)"
        :class="{ active: params.sortField === null }"
        >默认</a
      >
      <a
        href="javascript:;"
        @click="changeSort('createTime')"
        :class="{ active: params.sortField === 'createTime' }"
        >最新</a
      >
      <a
        href="javascript:;"
        @click="changeSort('praiseCount')"
        :class="{ active: params.sortField === 'praiseCount' }"
        >最热</a
      >
    </div>
    <!-- 列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatName(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              class="iconfont icon-wjx01"
              v-for="i in item.score"
              :key="i + 's'"
            ></i>
            <i
              class="iconfont icon-wjx02"
              v-for="i in 5 - item.score"
              :key="i + 'k'"
            ></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
            <!-- 图片组件 -->
            <GoodsCommentImg v-if="item.pictures.length" :pictures="item.pictures" />
          </div>
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <xtx-pagination v-if="total" :total="total" :currentPage="params.page" :pageSize="params.pageSize" @change="changePage" />
  </div>
</template>

<script setup>
import { getCommentInfo, getCommentList } from "@/api/goods.js"
import { reactive, ref, watch } from "vue"
import { useRoute } from "vue-router"
import GoodsCommentImg from "./GoodsCommentImg.vue";

const route = useRoute()

// 请求头部信息
const commentInfo = ref([])
getCommentInfo(route.params.id).then(({ result }) => {
  // 往tags追加数据
  result.tags.unshift({ title: "有图", tagCount: result.hasPictureCount })
  result.tags.unshift({ title: "全部评价", tagCount: result.evaluateCount })
  commentInfo.value = result
})

// 控制tags激活的索引
const currentTags = ref(0)

// 改变tag
const changeTag = index => {
  currentTags.value = index
  const cuurenTag = commentInfo.value.tags[index].title
  if (cuurenTag === "全部评价") {
    params.hasPicture = false
    params.tag = null
  } else if (cuurenTag === "有图") {
    params.hasPicture = true
    params.tag = null
  } else {
    params.hasPicture = false
    params.tag = cuurenTag
  }
  params.page = 1
}

// 改变排序
const changeSort = sortField => {
  params.sortField = sortField
  params.page = 1
}

// 筛选条件
const params = reactive({
  page: 1,
  pageSize: 10,
  hasPicture: null,
  tag: null,
  sortField: null
})

// params发生改变时 请求数据
const commentList = ref([])
const total = ref(0)
watch(
  params,
  async () => {
    const { result } = await getCommentList(route.params.id, params)
    commentList.value = result.items
    total.value = result.counts
  },
  { immediate: true }
)

// 页码发生切换时 重新请求数据
const changePage = page => {
  params.page = page
}

// 格式化specs
const formatSpecs = specs => {
  return specs.reduce((p, c) => `${p} ${c.name}: ${c.nameValue}`, "").trim()
}
// 格式化name
const formatName = nickName => {
  return nickName.substr(0, 1) + "****" + nickName.substr(-1)
}
</script>

<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
