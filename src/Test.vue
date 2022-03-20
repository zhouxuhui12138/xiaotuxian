<template>
  <div>
    <input type="text" v-model="val" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

const val = ref(null)

watch(val, (newVal) => {
  console.log(newVal)
}, {immediate: true})
</script>
