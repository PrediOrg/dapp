export default {
  mounted() {
    // 防止页面弹性滚动
    document.body.addEventListener('touchmove', this.handleTouchMove, { 
      passive: false 
    });
  },
  
  methods: {
    handleTouchMove(e) {
      // 在某些情况下阻止滚动
      if (this.shouldPreventScroll) {
        e.preventDefault();
      }
    }
  },
  
  beforeDestroy() {
    document.body.removeEventListener('touchmove', this.handleTouchMove);
  }
} 