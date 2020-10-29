<template>
  <button @click="count++">❤</button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    icon: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>

<style scoped>
  button {
    position: relative;
    margin: 30px;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    font-size: 25px;
    border: none;
    box-shadow: 
            -10px -10px 20px #29292F , 
            10px 10px 30px #1D1E23;
    background: linear-gradient(45deg, #2B2C32, #24252A);
    color: #A1A2A9;
    background-clip: padding-box;
  }
  button:before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    margin: -5px;
    border-radius: inherit;
    background: linear-gradient(to right, red, orange);
  }
  button.active {
    color: #F1805D;
    text-shadow: #F18A6B;
  }
</style>
