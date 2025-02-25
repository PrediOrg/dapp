// 检测钱包环境
const checkWalletEnvironment = () => {
  const isBinanceWallet = window.BinanceChain !== undefined;
  const isMobile = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);
  
  return {
    isBinanceWallet,
    isMobile
  };
} 