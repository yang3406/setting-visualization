<!--  -->
<template>
  <div class="top-bar">
    <div>这是头部</div>
  </div>
</template>

<script>
export default {
  name: "topBar",
  data () {
    return {};
  }
};
</script>
<style lang='less' scoped>
.top-bar {
  width: 100vw;
  height: 50px;
  border-bottom: 1px solid gray;
  > div {
    height: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
  }
}
</style>
