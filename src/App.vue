<template>
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->

  <main v-if="initalized">
    <section>
      <h1 id="title">
        LED Control
        <button @click="this.lightModel.add('192.168.1.33', 'Desk')">
          Add
        </button>
        <button @click="this.lightModel.clear()">Clear</button>
        <button @click="send">send</button>
      </h1>
      <!-- <button id="add">...</button> -->
    </section>
    <section>
      <Tabs />
    </section>

    <section id="content">
      <!-- <color-picker v-bind="color" @input="onInput"></color-picker> -->
      <!-- <IconButton />
      <IconButton />
      <IconButton /> -->
    </section>
  </main>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import IconButton from "./components/IconButton.vue";
import Tabs from "./components/Tabs.vue";
// import ColorPicker from "@radial-color-picker/vue-color-picker";

export default {
  name: "App",
  inject: ["lightModel"],
  data() {
    return {
      color: null,
      initalized: false,
    };
  },

  mounted() {},
  async created() {
    await this.lightModel.init();
    this.initalized = true;

    // this.lightModel.getState().lights.forEach(async (light, index) => {
    //   // light.connect();
    // });
  },
  methods: {
    send() {
      this.lightModel.getState().lights.forEach(async (light, index) => {
        light.save();
      });
    },
  },
  components: {
    HelloWorld,
    IconButton,
    Tabs,
    // ColorPicker,
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/variables.scss";
main {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  align-items: stretch;
  align-content: center;
  > section {
    // flex: 1;
    // align-self: center;
    // border: 1px solid #ff00ff;
    &#content {
      flex: 9;
    }
  }
}

// #header {
//   display: flex;
// }

// #title {
//   flex: 11;
// }

// #add {
//   flex: 1;
// }

h1 {
  font-weight: 100;
}
</style>
