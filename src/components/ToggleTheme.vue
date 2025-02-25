<template>
  <div class="toggle-theme" :class="{ 'mobile': isMobile }">
    <svg t="1736430142309" class="theme-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19319" width="30" height="30">
      <path d="..." fill="#98A2B3" p-id="19320"></path>
    </svg>
    <div class="framer-17uat6s-container" id="toggle-theme">
      <!-- 保持现有内容 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false
    }
  },
  
  mounted() {
    // 检测是否是移动设备
    this.isMobile = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);
  }
}
</script>

<style lang="scss" scoped>
.toggle-theme {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  .theme-icon {
    width: 30px;
    height: 30px;
  }
  
  &.mobile {
    opacity: 0.8;
    transform: scale(0.6);
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 99999;
    
    // 调整容器样式
    ::v-deep .framer-17uat6s-container {
      width: 45px !important;  // 减小宽度
      height: 25px !important; // 减小高度
      
      > div {
        width: 45px !important;
        height: 25px !important;
        padding: 0 5px !important;
        
        // 调整内部圆点大小
        > div {
          width: 18px !important;
          height: 18px !important;
          
          svg {
            width: 18px !important;
            height: 18px !important;
          }
        }
      }
    }
    
    .theme-icon {
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
    
    &:hover {
      opacity: 1;
    }
  }
}

// 暗色主题适配
:global(.dark) {
  .toggle-theme.mobile {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 5px;
  }
}
</style> 