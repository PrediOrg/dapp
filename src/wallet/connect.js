// 需要实现的基础连接代码示例
const connectBinanceWallet = async () => {
  if (typeof window.BinanceChain !== 'undefined') {
    try {
      // 连接钱包
      const accounts = await window.BinanceChain.request({ 
        method: 'eth_requestAccounts' 
      });
      
      // 获取链ID
      const chainId = await window.BinanceChain.request({ 
        method: 'eth_chainId' 
      });
      
      return { accounts, chainId };
    } catch (error) {
      console.error('连接错误:', error);
    }
  } else {
    console.log('请安装Binance钱包');
  }
} 

// 现有的钱包连接代码
import { ethers } from 'ethers';
import { getBinanceDeeplink } from '../utils/binance';

// 支持的钱包类型枚举
export const WalletType = {
  METAMASK: 'MetaMask',
  BINANCE: 'Binance', // 添加Binance钱包类型
  WALLETCONNECT: 'WalletConnect'
};

// 检查钱包环境
export const checkWalletEnvironment = () => {
  const isBinanceWallet = !!window.BinanceChain;
  const isMetaMask = !!window.ethereum?.isMetaMask;
  const isMobile = /Android|webOS|iPhone|iPad/i.test(navigator.userAgent);
  
  return {
    isBinanceWallet,
    isMetaMask,
    isMobile
  };
};

// 检查Binance环境
export const checkBinanceEnvironment = () => {
  const isInBinanceWallet = !!window.BinanceChain;
  const isBinanceAvailable = !!window.BinanceChain && !!window.BinanceChain.isConnected;
  
  return {
    isInBinanceWallet,
    isBinanceAvailable
  };
};

// 连接钱包的统一接口
export const connectWallet = async (walletType = WalletType.BINANCE) => {
  try {
    // 检查是否在Binance App内
    const { isInBinanceWallet, isBinanceAvailable } = checkBinanceEnvironment();
    
    if (isInBinanceWallet) {
      // 在Binance App内
      let provider;
      let accounts;
      
      switch (walletType) {
        case WalletType.BINANCE:
          provider = new ethers.providers.Web3Provider(window.BinanceChain);
          accounts = await window.BinanceChain.request({ 
            method: 'eth_requestAccounts' 
          });
          break;
        
        case WalletType.METAMASK:
          if (!window.ethereum) {
            throw new Error('请安装MetaMask钱包');
          }
          provider = new ethers.providers.Web3Provider(window.ethereum);
          accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          break;
        
        // 可以添加其他钱包类型的支持
        default:
          throw new Error('不支持的钱包类型');
      }

      const chainId = await provider.getNetwork().then(network => network.chainId);
      const signer = provider.getSigner();

      return {
        provider,
        signer,
        address: accounts[0],
        chainId
      };
    } else if (isBinanceAvailable) {
      // 有Binance插件但不在App内
      const currentUrl = window.location.href;
      window.location.href = `https://app.binance.com/dapp/browser?url=${encodeURIComponent(currentUrl)}`;
      return;
    } else {
      // 需要引导用户安装
      throw new Error('请安装Binance钱包');
    }
  } catch (error) {
    if (error.code === 4001) {
      throw new Error('用户拒绝连接');
    }
    if (error.code === -32002) {
      throw new Error('请在Binance钱包中确认连接请求');
    }
    console.error('钱包连接错误:', error);
    throw error;
  }
};

// 切换网络
export const switchNetwork = async (chainId, walletType = WalletType.METAMASK) => {
  try {
    const provider = walletType === WalletType.BINANCE ? window.BinanceChain : window.ethereum;
    
    if (!provider) {
      throw new Error('未检测到钱包');
    }

    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });

    return true;
  } catch (error) {
    // 如果链未添加,则添加链
    if (error.code === 4902) {
      try {
        await addNetwork(chainId, walletType);
        return true;
      } catch (addError) {
        throw addError;
      }
    }
    throw error;
  }
};

// 添加网络
export const addNetwork = async (chainId, walletType = WalletType.METAMASK) => {
  const networkParams = {
    // 这里配置支持的网络参数
    // 例如:
    56: {  // BSC Mainnet
      chainId: '0x38',
      chainName: 'BNB Smart Chain Mainnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com']
    },
    97: {  // BSC Testnet
      chainId: '0x61',
      chainName: 'BNB Smart Chain Testnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      blockExplorerUrls: ['https://testnet.bscscan.com']
    }
  };

  const params = networkParams[chainId];
  if (!params) {
    throw new Error('不支持的网络');
  }

  const provider = walletType === WalletType.BINANCE ? window.BinanceChain : window.ethereum;
  
  await provider.request({
    method: 'wallet_addEthereumChain',
    params: [params],
  });
};

// 监听账户变化
export const listenAccountsChanged = (callback) => {
  if (window.BinanceChain) {
    window.BinanceChain.on('accountsChanged', callback);
  }
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', callback);
  }
};

// 监听链变化
export const listenChainChanged = (callback) => {
  if (window.BinanceChain) {
    window.BinanceChain.on('chainChanged', callback);
  }
  if (window.ethereum) {
    window.ethereum.on('chainChanged', callback);
  }
};

// 移除监听器
export const removeListeners = () => {
  if (window.BinanceChain) {
    window.BinanceChain.removeListener('accountsChanged');
    window.BinanceChain.removeListener('chainChanged');
  }
  if (window.ethereum) {
    window.ethereum.removeListener('accountsChanged');
    window.ethereum.removeListener('chainChanged');
  }
}; 