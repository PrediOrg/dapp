export default {
  data() {
    return {
      keyboardHeight: 0
    }
  },
  
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  
  methods: {
    handleResize() {
      // 处理键盘弹出时的视口变化
      const viewportHeight = window.visualViewport.height;
      this.keyboardHeight = window.innerHeight - viewportHeight;
      
      if (this.keyboardHeight > 0) {
        // 键盘弹出时，调整内容区域
        document.body.style.height = `${viewportHeight}px`;
      } else {
        document.body.style.height = '';
      }
    }
  },
  
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
} 