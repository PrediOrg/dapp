import { isInBinance, getDeeplink } from '@binance/w3w-utils';

export const checkBinanceEnvironment = () => {
  return {
    isInBinanceWallet: isInBinance(),
    isBinanceAvailable: !!window.BinanceChain
  };
};

// 这个功能可以让用户在手机浏览器访问时，自动跳转到Binance App
export const getBinanceDeeplink = (url, chainId = 56) => {
  return getDeeplink(url, chainId);
}; 