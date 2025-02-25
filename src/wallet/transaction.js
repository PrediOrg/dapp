export const sendTransaction = async (tx, walletType = WalletType.BINANCE) => {
  try {
    const provider = await getProvider(walletType);
    
    // 获取gas估算
    const gasEstimate = await provider.estimateGas(tx);
    
    // 获取当前gas价格
    const gasPrice = await provider.getGasPrice();
    
    // 使用略高于估算的gas，确保交易成功
    const transaction = {
      ...tx,
      gasLimit: gasEstimate.mul(120).div(100), // 增加20%的gas限制
      gasPrice: gasPrice
    };

    const signer = provider.getSigner();
    const response = await signer.sendTransaction(transaction);
    
    return response;
  } catch (error) {
    handleTransactionError(error);
  }
};

// 处理交易错误
const handleTransactionError = (error) => {
  if (error.code === 4001) {
    throw new Error('用户取消交易');
  }
  if (error.message.includes('insufficient funds')) {
    throw new Error('余额不足');
  }
  // ...更多错误处理
}; 