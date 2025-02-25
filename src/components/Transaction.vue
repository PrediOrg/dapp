<script>
import { sendTransaction } from '@/wallet/transaction';

export default {
  methods: {
    async handleTransaction() {
      try {
        const tx = {
          to: '0x...',
          value: ethers.utils.parseEther('0.1')
        };
        
        // 使用优化后的交易发送
        const response = await sendTransaction(tx);
        
        // 处理交易结果
        this.handleTransactionResponse(response);
      } catch (error) {
        // 使用新的错误处理
        this.handleTransactionError(error);
      }
    }
  }
}
</script> 