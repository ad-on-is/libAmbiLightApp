<template>
  <section id="tabs">
    <button
      class="tab"
      v-for="(light, index) in this.lightModel.getState().lights"
      :key="index"
      @click="addLight"
    >
      {{ light.name }}
    </button>
  </section>
</template>

<script>
export default {
  name: "Tab",
  props: {
    // icon: String
  },
  inject: ["lightModel"],
  created() {
    // console.log(this.lightModel.getState().lights[0]);
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";
#tabs {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border: 5px solid #2a2b2f;
  border-radius: 30px;
  overflow: hidden;
  .tab {
    background: none;
    flex-grow: 1;
    padding: 5px 10px;
    border: none;
    border-right: 2px solid #2a2b2f;
    color: #fff;
    &:last-of-type {
      border: none;
    }
    &.active {
      color: $primaryColor;
      background: #1f2024;
    }
  }
}
</style>
