<!--  -->
<template>
  <div>
    <pannel title="组件库">
      <div
        class="component-lib"
        :key="index"
        v-for="(item,index) in componentLib"
      >
        <span>{{item.title}}</span>
        <ul v-show="item.show">
          <li
            v-for="(unit,uIndex) in item.list"
            :key="uIndex"
            draggable
            @dragstart="unitDragStart(unit)"
          >
            <div class="unit-img">
              <img :src="require(`assets/editor/${unit.bg}.png`)">
            </div>
          </li>
        </ul>
      </div>
    </pannel>
  </div>
</template>

<script>
import componentLib from "./componentLib";
import pannel from "./pannel";
export default {
  data () {
    return {
      componentLib
    };
  },
  methods: {
    unitDragStart (unit) {
      const obj = {
        ...unit,
        dragFrom: "lib"
      };
      this.$store.commit("editor/setCurDragObj", obj);
    }
  },
  components: { pannel }
};
</script>
<style lang='less' scoped>
.unit-img {
  img {
    width: 30px;
    height: 30px;
  }
}
</style>
