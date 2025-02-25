<script>
import { checkBinanceEnvironment } from '@/utils/binance';

export default {
  async created() {
    const { isInBinanceWallet } = checkBinanceEnvironment();
    
    // 如果不在Binance App内，使用deeplink
    if (!isInBinanceWallet && this.isMobile) {
      const { bnc } = getBinanceDeeplink(window.location.href);
      window.location.href = bnc;
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div class="content-wrapper">
      <!-- 你的应用内容 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
.app-container {
  // 设置最小高度，确保内容填充
  min-height: 100vh;
  // 使用flex布局
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  // 让内容区域自动填充
  flex: 1;
  // 添加底部间距
  padding-bottom: 60px; // Binance底栏高度
}

// 移动端特殊处理
@media screen and (max-width: 768px) {
  .content-wrapper {
    // 适配不同机型的底部安全区域
    padding-bottom: calc(60px + env(safe-area-inset-bottom));
  }
  
  // 处理iPhone X及以上机型的底部黑条
  @supports (padding: max(0px)) {
    .content-wrapper {
      padding-bottom: max(60px, calc(60px + env(safe-area-inset-bottom)));
    }
  }
}
</style> 