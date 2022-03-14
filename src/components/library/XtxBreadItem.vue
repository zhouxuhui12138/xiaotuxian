<template>
  <div class="xtx-bread-item">
    <RouterLink :to="path" v-if="path"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>

<script>
export default {
  name: "XtxBreadItem",
  props: {
    path: {
      type: [String, Object],
      default: ""
    }
  }
}
</script>
