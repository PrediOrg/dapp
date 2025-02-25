// 链切换功能
const switchChain = async (targetChainId) => {
  try {
    await window.BinanceChain.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: targetChainId }],
    });
  } catch (error) {
    // 处理切换失败的情况
    console.error('切换链失败:', error);
  }
}

// 扩展现有的switchNetwork函数
export const autoSwitchNetwork = async (provider) => {
  // 这个功能会自动检测并切换到正确的链
  // 比如用户在BSC上，但你的dApp需要在BEVM上运行
  // 会自动提示并帮助用户切换
};

// 检查链是否支持
const isSupportedChain = (chainId) => {
  const supportedChains = [
    '0x38',  // BSC Mainnet
    '0x61',  // BSC Testnet
    // 添加其他支持的链
  ];
  return supportedChains.includes(chainId);
}; 