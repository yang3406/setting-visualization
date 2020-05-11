<template>
  <div>
    <topBar></topBar>
    <div class='main'>
      <viewMenu class="left main-area"></viewMenu>
      <workSpace
        class="middle main-area"
        ref="workspace"
        :reportAttr="reportAttr"
        @drop.native="workspaceDrop"
        @dragover.native.prevent="() => {}"
      ></workSpace>
      <setting class="right main-area"></setting>
    </div>
  </div>
</template>

<script>
import topBar from "./topBar";
import workSpace from "./_workSpace/index";
import viewMenu from "./_viewMenu/index";
import setting from "./_setting/index";
export default {
  components: { topBar, workSpace, viewMenu, setting },
  data () {
    return {
      reportAttr: {
        name: "内容",
        width: 1920,
        height: 1080,
        bgColor: "rgba(28,25,42,1)",
        bgImg: "",
        bgImgState: "width",
        themeColor: -1,
        themeColors: [],
        themeType: 0,
        isSelfAdaption: false,
        globalVariables: [],
        filterArgs: {},
        filterDatas: []
      }
    };
  },
  methods: {
    workspaceDrop (e) {
      // const curDragObj = this.$store.state.editor.curDragObj;
    }
  }
};
</script>

<style lang='less' scoped>
.main {
  display: flex;
  width: 100vw;
  height: 400px;

  &-area {
    height: 100%;
  }
  .left {
    width: 100px;
    background-color: yellowgreen;
  }
  .middle {
    flex-grow: 1;
    background-color: antiquewhite;
  }
  .right {
    width: 150px;
    background-color: green;
  }
}
</style>
