<!--  -->
<template>
  <div>
    <h1>这是可视化入口</h1>
    <span @click="goToUrl('/visualScreen/content/edit')">这是编辑页面</span>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },

  components: {},

  computed: {},

  methods: {
    goToUrl (url) {
      this.$router.push(url);
    }
  }
};
</script>
<style lang='less' scoped>
</style>
