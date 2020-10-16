<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="person-wrap" ref="personWrap">
      <ul class="person-list" ref="personTab">
        <li class="person-item">1</li>
        <li class="person-item">2</li>
        <li class="person-item">3</li>
        <li class="person-item">4</li>
        <li class="person-item">5</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this.personScroll();
    });
  },
  methods: {
 personScroll() {
      // 默认有六个li子元素，每个子元素的宽度为120px
      let width = 6 * 120;
      this.$refs.personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  }
}
</script>

<style scoped>

</style>