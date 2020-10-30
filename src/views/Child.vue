<template>
  <div class="child">
    <button @click="childClick">子组件传父组件</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    childClick() {
      this.$emit('loadedCompleted')
    }
  }
}
</script>