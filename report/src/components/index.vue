<!--  -->
<template>
  <div
    ref="reportWrap"
    class="report-wrap"
    :class="reportAttr.bgImgState"
    :style="{
      width:`${reportAttr.width}px`,
      height:`${reportAttr.height}px`,
      backgroundColor:reportAttr.bgImg ? '' : reportAttr.bgColor,
      backgroundImage:
       reportAttr.bgImg === '' ? '' : `url(${basePath(reportAttr.bgImg)})`,
       transform:`scale(${scaling})`
    }"
  >
    <div
      class="report"
      @mousedown.self="clearChecked"
    >
      <locating
        ref="list"
        v-for="(item,index) in data"
        :key="item.locating.id"
        :editable="editable"
        :unitType="item.unitType"
        :class="{
          hover:layerHoverIndex === index
        }"
        :style="{
          zIndex:item.layerLevel
        }"
        @mousedown.native="selectItem($event,item,index)"
        @click.native="clickItem($event,item,index)"
        @dblclick="clickItem($event,item,index)"
      >
        <component
          v-if="!['posLine'].includes(item.unitType)"
          :is="item.unitType"
          ref="units"
          :attr="item.attr"
          :locating="item.locating"
          :editable="editable"
          :baseURL="baseURL"
          :basePath="basePath"
          :unitType="item.unitType"
          :store="store"
          @handleEvent="handleEvent"
          :themeColors="reportAttr.themeColors"
          :themeType="reportAttr.themeType"
          @dispatchAllInterface="dispatchAllInterface"
        ></component>
      </locating>
      <checked-area
        ref="checkedArea"
        v-if="editable"
        :checkedList="checkedList"
        @moveLocating="moveLocating"
      ></checked-area>
      <assist-line v-if="editable"></assist-line>
      <textarea
        ref="blurBox"
        class="blurBox"
        :style="{
          top:`${reportScroll.top + 30}px`,
          left:`${reportScroll.left + 30}px`,
        }"
      ></textarea>
    </div>
  </div>
</template>

<script>
import ReportStore from "../store";
import Locating from "./locating";
import CheckedArea from "./checkedArea";
import AssistLine from "./assistLine";
export default {
  name: "dv-report",
  components: {
    Locating,
    CheckedArea,
    AssistLine,
    Rectangle: () => import("./unit/Base/rectangle"),
    TextCom: () => import("./unit/Base/text")
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    reportAttr: {
      type: Object,
      default: () => ({
        name: "内容",
        width: 1920,
        height: 1080,
        bgColor: "rgba(28,25,42,1)",
        bgImg: "",
        bgImgState: "width",
        themeColor: -1,
        themeColors: [],
        isSelfAdpation: false,
        filterArgs: {},
        filterDatas: []
      })
    },
    editable: {
      type: Boolean,
      default: false
    },
    baseURL: {
      type: String,
      default: ""
    }
  },
  data () {
    const store = new ReportStore();
    return {
      store,
      oriCheckList: ""
    };
  },

  computed: {
    checkedList () {
      return this.$store.state.editor.checkedList;
    },
    checkedListIndex () {
      return this.$store.state.editor.checkedListIndex;
    },
    scaling () {
      if (this.editable) return this.$store.state.editor.scaling;
      if (this.reportAttr.isSelfAdpation) {
        const clientWidth = this.$refs.reportWrap.parentNode.offsetWidth;
        return clientWidth / this.reportAttr.width;
      }
      return 1;
    },
    layerHoverIndex () {
      return this.$store.state.editor.layerHoverIndex;
    },
    reportScroll () {
      return this.$store.state.editor.reportScroll;
    }
  },
  watch: {
    reportAttr: {
      handler (val) {
        if (val.globalVariables) {
          this.store.setGlobalVarible(val.globalVariables);
        }
        if (val.filterArgs) {
          this.store.setFilterArgs(val.filterArgs);
        }
        if (val.filterDatas) {
          this.store.setFilterDatas(val.filterDatas);
        }
        if (
          // eslint-disable-next-line no-prototype-builtins
          !val.hasOwnProperty("themeColors") ||
          (val.themeColors && val.themeColors.length)
        ) {
          val.themeColors = this.themeColors;
        }
        // eslint-disable-next-line no-prototype-builtins
        if (!val.hasOwnProperty("themeType")) {
          val.themeType = 0;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    basePath (path) {
      path = path || "";
      return path.startsWith("http") ? path : `${this.baseURL}`;
    },
    clearChecked () {
      this.$refs.blurBox.focus();
      this.$store.commit("editor/clearChecked");
      this.$refs.blurBox.blur();
    },
    selectItem (e, item, index, isOutside) {
      if (this.editable) {
        this.$refs.blurBox.focus();
        if (item.locating.lock && !isOutside) return;
        this.oriCheckList = JSON.stringify(this.checkedList);
        if (
          this.checkedList.length <= 1 ||
          !this.checkedList.some(c => c.locating.id === item.locating.id)
        ) {
          this.$store.commit("editor/selectItem", { e, item, index });
        }
        this.$refs.blurBox.blur();
        if (isOutside) return;
        this.$nextTick(() => {
          this.$refs.CheckedArea.mainMoveEvent(e);
        });
      }
    },
    clickItem (e, item, index) {
      if (this.editable) {
        if (this.locating.lock) return;
        if (this.oriCheckList === JSON.stringify(this.checkedList)) {
          this.$store.commit("editor/selectItem", { e, item, index });
        }
      }
    },
    moveLocating ({ checkedListPos, moveType }) {
      this.$store.commit("editor/moveLocating", checkedListPos);
      this.$nextTick(() => {
        const data = this.data.filter(
          (item, index) => !this.checkedListIndex.includes(index)
        );
        this.$store.commit("editor/adjustAssistLine", { data, moveType });
      });
    }
  }
};
</script>
<style lang='less' scoped>
.repor-wrap {
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 16px 0 #110d16;
  background-repeat: no-repeat;
  transform-origin: 0 0;
  transition: transform 0.3s;
  &.wdith {
    background-size: 100% auto;
  }
  &.height {
    background-size: 100% auto;
  }
  &.full {
    background-size: 100% 100%;
  }
}
.report {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: inherit;
  .hover {
    border: 1px dashed #198ffe;
  }
}
.blurBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  padding: 0;
  margin: 0;
}
</style>
