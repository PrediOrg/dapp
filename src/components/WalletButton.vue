<template>
  <div class="wallet-connect-btn">
    <img 
      v-if="walletType === 'Binance'" 
      src="@/assets/images/binance-logo.png" 
      class="wallet-logo"
    />
    <span>{{ buttonText }}</span>
  </div>
</template>

<style scoped>
.wallet-logo {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style> 