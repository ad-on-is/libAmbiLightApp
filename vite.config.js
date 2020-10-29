export default {
  optimizeDeps: {
    include: ['axios', 'socket.io-client', 'micro-emitter']
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