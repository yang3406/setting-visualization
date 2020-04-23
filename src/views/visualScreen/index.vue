<!--  -->
<template>
  <router-view></router-view>
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
      console.log("----");
      this.$router.push(url);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
