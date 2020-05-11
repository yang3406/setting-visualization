<!--  -->
<template>
  <div
    :style="{
    width:`${curValue.width}px`,
    height:`${curValue.height}px`,
    top:`${curValue.posY}px`,
    left:`${curValue.posX}px`,
    opacity:curValue.opacity*0.01,
    borderRadius:`${curValue.commonRadius}px`,
    borderWidth:`${curValue.commonBorderWidth}px`,
    borderColor:curValue.commonBorderColor,
    borderStyle:curValue.commonBorderStyle,
    transform:(unitType !== 'unitSelect' ? `rotate(${curValue.rotate}deg)` : 'none')
  }"
    class="locating"
    :class="{editable,lock:curValue.lock}"
    ref="locating"
  >
    <div class="slot"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    editable: {
      type: Boolean,
      default: false
    },
    unitType: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      curValue: {}
    };
  },
  watch: {
    value: {
      handle (val) {
        this.curValue = { ...val };
      }
    },
    deep: true
  },

  mounted () {
    this.curValue = this.value;
  }
};
</script>
<style lang='less' scoped>
.locating {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  transition: box-shadow, opacity, border 0.3s;
  z-index: 1;
  user-select: none;
  &.editable {
    cursor: move;
    .slot {
      display: block;
    }
    &.lock {
      cursor: default;
    }
  }
}
.slot {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}
</style>
