<template>
  <div>
    <ul class="menu">
      <li
        v-for="item in menuList"
        :key="item.id"
        @click="gotoPath(item.path)"
      >{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "home",
  data () {
    return {
      menuList: [
        {
          name: "visualScreen",
          label: "可视化屏幕",
          path: "/visualScreen/content"
        },
        { name: "blog", label: "blog项目", path: "/blog/edit" },
        { name: "visualScreen", label: "kiki", path: "/kiki/edit" }
      ]
    };
  },
  methods: {
    gotoPath (url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped lang="less">
ul.menu {
  display: inline-block;
  background-color: aqua;
  margin: 20px;
  padding: 10px;
  li {
    margin: 10px 0px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
