<template>
  <div class="binance-wallet">
    <!-- 连接按钮 -->
    <wallet-button 
      :connected="isConnected"
      :wallet-type="walletType"
      @click="handleConnect"
    />
    
    <!-- 交易信息 -->
    <transaction-info 
      v-if="isConnected"
      :address="address"
      :chain-id="chainId"
    />
  </div>
</template>

<script>
import { connectWallet, autoSwitchNetwork } from '@/wallet/connect';
import { checkWalletEnvironment, checkBinanceEnvironment } from '@/utils/walletDetect';

export default {
  data() {
    return {
      isConnected: false,
      address: '',
      chainId: '',
      walletType: 'Binance'
    };
  },
  
  methods: {
    async handleConnect() {
      try {
        // 1. 检查环境
        const { isInBinanceWallet } = checkBinanceEnvironment();
        
        // 2. 连接钱包
        const { provider, address } = await connectWallet();
        
        // 3. 自动切换到正确的链
        await autoSwitchNetwork(provider);
        
        // 4. 设置监听器
        this.setupListeners(provider);
        
      } catch (error) {
        // 使用新的错误处理
        this.handleError(error);
      }
    },
    
    handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        this.isConnected = false;
      } else {
        this.address = accounts[0];
      }
    },
    
    handleChainChanged(chainId) {
      this.chainId = chainId;
      // 可以在这里处理链切换后的逻辑
    }
  },
  
  beforeDestroy() {
    // 清理监听器
    if (window.BinanceChain) {
      window.BinanceChain.removeListener('accountsChanged', this.handleAccountsChanged);
      window.BinanceChain.removeListener('chainChanged', this.handleChainChanged);
    }
  }
};
</script> 