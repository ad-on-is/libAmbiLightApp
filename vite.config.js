export default {
  optimizeDeps: {
    include: ['axios', 'socket.io-client', 'micro-emitter', 'paho-mqtt']
  //   allowNodeBuiltins: ['socket.io-adapter']
  },
  cssPreprocessOptions: {
    sass: {
      // modifyVars: {
      //   'primaryColor': '#F18A6B'
      // }
    }
  }
}