<!--  -->
<template>
  <div
    class="workspace"
    ref="workspace"
  >
    <!-- <workspace-overview ref="overview" ></workspace-overview> -->
    <!-- <selection
      :workspaceScrollTop="workspaceScrollTop"
      workspaceScrollLeft="workspaceScrollLeft"
    ></selection> -->
    <div
      ref="content"
      class="content"
      :style="{
      minWidth:`${reportAttr.width * scaling + 96}px`,
      minheight:`${reportAttr.height * scaling + 96}px`,
    }"
    >
      <div
        class="ver rulers"
        :style="{
          top:`${workspaceScrollTop}px`
        }"
        @mousedown="addPositonLine($event,'x')"
      >
        <ul>
          <li
            v-for="i in verNum"
            :key="i"
          >
            <span>{{(i-1) % 10 === 0 ? Math.floor((i-1) * 10 /scaling):''}}</span>
          </li>
        </ul>
      </div>

      <div
        class="hor rulers"
        :style="{
          top:`${workspaceScrollLeft}px`
        }"
        @mousedown="addPositonLine($event,'y')"
      >
        <ul>
          <li
            v-for="i in verNum"
            :key="i"
          >
            <span>{{(i-1) % 10 === 0 ? Math.floor((i-1) * 10 /scaling):''}}</span>
          </li>
        </ul>
      </div>
      <div
        class="mix rulers"
        :style="{
        top:`${workspaceScrollTop}px`,
        left:`${workspaceScrollLeft}px`,
      }"
      ></div>
      <report
        ref="report"
        :data="reportData"
        :reportAttr="reportAttr"
        :editable="true"
        :baseURL="config.apiBaseURL"
      >
      </report>
      <pos-line
        ref="line"
        :workspaceScrollTop="workspaceScrollTop"
        :workspaceScrollLeft="workspaceScrollLeft"
      ></pos-line>
    </div>
  </div>
</template>

<script>
import report from "report";
import posLine from "./posLine";
import config from "$config";
export default {
  components: {
    report,
    posLine
  },
  props: {
    reportAttr: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isShowScaleReport () {
      return this.$store.state.editor.isShowScaleReport;
    },
    reportData () {
      return this.$store.state.editor.reportData;
    },
    scaling () {
      return this.$store.state.editor.scaling;
    },
    verNum () {
      const reportVerNum =
        Math.ceil((this.reportAttr.width / 10) * this.scaling) + 4;
      if (this.minVerNum > reportVerNum) return this.minVerNum;
      return reportVerNum;
    },
    horNum () {
      const reportHorNum =
        Math.ceil((this.reportAttr.height / 10) * this.scaling) + 4;
      if (this.minVerNum > reportHorNum) return this.minHorNum;
      return reportHorNum;
    }
  },
  data () {
    return {
      config,
      minVerNum: 100,
      minHorNum: 100,
      workspaceScrollLeft: 0,
      workspaceScrollTop: 0,
      viewArea: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
      }
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      this.minVerNum = Math.ceil(this.$refs.workspace.offsetWidth / 10);
      this.minHorNum = Math.ceil(this.$refs.workspace.offsetHeight / 10);
      this.$refs.workspace.addEventListener("scroll", () => {
        this.workspaceScrollLeft = this.$refs.workspace.scrollLeft;
        this.workspaceScrollTop = this.$refs.workspace.scrollTop;
        this.$store.commit("editor/setReportScroll", {
          top: this.workspaceScrollTop,
          left: this.workspaceScrollLeft
        });
        this.handleViewAttr();
      });
      window.addEventListener("resize", this.handleViewAttr);
      this.$store.commit("editor/setReportVm", this.$refs.Report);
    },
    selectItem (e, item, index) {
      this.$refs.report.selectItem(e, item, index, true);
    },
    handleViewAttr () {
      const workspaceWidth = this.$refs.workspace.offsetWidth;
      const workspaceHeight = this.$refs.workspace.offsetHeight;
      this.viewArea.width =
        workspaceWidth < this.reportAttr.width
          ? this.$refs.overview.handleScaling(workspaceWidth)
          : "188px";

      this.viewArea.height =
        workspaceHeight < this.reportAttr.height
          ? this.$refs.overview.handleScaling(workspaceHeight)
          : "108px";

      this.viewArea.top =
        workspaceHeight < this.reportAttr.height
          ? this.$refs.overview.handleScaling(this.workspaceScrollTop)
          : 0;

      this.viewArea.left =
        workspaceWidth < this.reportAttr.width
          ? this.$refs.overview.handleScaling(this.workspaceScrollLeft)
          : "108px";
    },
    viewAreaMove ({ top, left, scaling }) {
      if (top >= 0 && top <= 110 - parseInt(this.viewArea.height, 10)) {
        this.viewArea.top = `${top}px`;
        this.$refs.workspace.scrollTop = top * scaling;
      }

      if (left >= 0 && left <= 190 - parseInt(this.viewArea.width, 10)) {
        this.viewArea.left = `${left}px`;
        this.$refs.workspace.scrollTop = left * scaling;
      }
    },
    addPositionLine (e, type) {
      let top = 0;
      let left = 0;
      if (type === "x") {
        top = this.workspaceScrollTop;
      } else {
        left = this.workspaceScrollLeft;
      }
      this.$store.commit("editor/addReportData", {
        unitType: "posLine",
        id: new Date().getTime(),
        type,
        top,
        left,
        attr: {},
        locationg: {}
      });
      this.$store.commit("editor/updateHistoryData");
      this.$nextTick(() => {
        const posLines = this.$store.state.editor.reportData.filter(
          item => item.unitType === "posLine"
        );
        this.$refs.line.linMousedown(
          e,
          posLines[posLines.length - 1],
          posLines - 1
        );
      });
    }
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.handleViewAttr);
  }
};
</script>
<style lang='less' scoped>
.workspace {
  position: relative;
  flex: 1;
  overflow: auto;
  .content {
    position: relative;
    padding: 24px;
  }
}

.rulers {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  color: #ffffff;
  background-color: #141019;
  user-select: none;
  &.min {
    width: 24px;
    height: 24px;
    border-right: 1px solid #3b3a4a;
    border-bottom: 1px solid #3b3a4a;
    z-index: 101;
  }
  &.ver {
    width: 100%;
    height: 24px;
    border-bottom: 1px solid #3b3a4a;
    ul {
      display: flex;
      height: 100%;
      padding-left: 24px;
    }
    li {
      width: 10px;
      padding-left: 2px;
      white-space: nowrap;
      &::after {
        bottom: 0;
        left: 0;
        width: 1px;
        height: 4px;
      }
      &:nth-child(5n + 1) {
        &::after {
          height: 9px;
        }
      }
      &:nth-child(10n + 1) {
        &::after {
          height: 9px;
        }
      }
    }
  }
  &.hor {
    width: 24px;
    border-right: 1px solid #3b3a4a;
    ul {
      padding-top: 24px;
    }
    li {
      height: 10px;
      padding-top: 2px;
      span {
        display: inline-block;
        transform: translate(-90deg);
      }
      &::after {
        top: 0;
        right: 0;
        width: 4px;
        height: 1px;
      }
      &:nth-child(5n + 1) {
        &::after {
          width: 24px;
        }
      }
    }
  }
  li {
    position: relative;
    font-size: 12px;
    color: #7a798a;
    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      background-color: #979797;
    }
  }
}
</style>
