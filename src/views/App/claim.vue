<template>
    <div class="claim-container">
      <div class="claim-card">
        <div class="title">
        
          Claim PRDs For Free
        </div>
        <div class="subtitle">Get your PRDs tokens with just one click</div>
        <div class="info-list">
          <div class="info-item">
            <div class="name">Wallet Address</div>
            <div class="value" v-if="account">{{ account }}</div>
            <div class="value address-placeholder" v-else>Please Connect Wallet First</div>
          </div>
          <div class="info-item">
            <div class="name">Status</div>
            <div class="value status-text" :class="{'claimed': claimButtonText === 'Already Claimed', 'eligible': eligibilityStatus === 'You are eligible to claim', 'error': eligibilityStatus === 'Error checking eligibility'}">
              {{ eligibilityStatus }}
            </div>
          </div>
        </div>
        <a-button 
          type="primary" 
          class="claim-button" 
          @click="handleClaimAction" 
          :loading="isLoading"
          :disabled="!canClaim"
        >
          <span class="button-text">{{ claimButtonText }}</span>
        </a-button>
        
        <div class="claim-footer">
          <div class="info-circle">i</div>
          <div class="info-text">Each wallet can claim only once. Make sure you're connected to the correct network.</div>
        </div>
      </div>
    </div>
  </template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import cdsSdk from '@/sdk';
import { confirmTransaction } from '@/utils/trans';
import { message } from 'ant-design-vue';

export default {
  name: 'ClaimView',
  data() {
    return {
      eligibilityStatus: "",
      claimButtonText: "Claim",
      canClaim: true,
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
    }),
    ...mapGetters(['isConnected', 'chainType']),
  },
  watch: {
    account(val) {
      if (val) {
        this.checkEligibility();
      } else {
        this.eligibilityStatus = "";
        this.claimButtonText = "Connect";
        this.canClaim = true;
      }
    },
    isConnected(val) {
      if (val) {
        this.checkEligibility();
      }
    },
  },
  mounted() {
    if (this.account && this.isConnected) {
      this.checkEligibility();
    }
  },
  methods: {
    ...mapActions(['wallet/connect']),
    
    async checkEligibility() {
      if (!this.account || !this.isConnected) return;
      
      try {
        const hasClaimed = await cdsSdk.hasClaimed(this.account);
        
        if (hasClaimed) {
          this.eligibilityStatus = "You have claimed already";
          this.claimButtonText = "Already Claimed";
          this.canClaim = false;
        } else {
          this.eligibilityStatus = "You are eligible to claim";
          this.claimButtonText = "Claim";
          this.canClaim = true;
        }
      } catch (error) {
        console.error("Error checking eligibility:", error);
        this.eligibilityStatus = "Error checking eligibility";
      }
    },
    
    async handleClaimAction() {
      if (!this.account || !this.isConnected) {
        // 如果未连接钱包，显示提示信息
        message.info('Please connect your wallet first');
        this.$store.dispatch('wallet/connect');
        return;
      }
      if (this.claimButtonText === "Connect") {
        this.$store.dispatch('wallet/connect');
      } else {
        await this.claimPRDs();
      }
    },
    
    async claimPRDs() {
      if (this.isLoading) return;
      this.isLoading = true;
      
      try {
        const tx = await cdsSdk.claimPRDs();
        await confirmTransaction(tx);
        
        message.success('Claim successful!');
        await this.checkEligibility();
      } catch (err) {
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          message.error('Transaction Cancelled');
          return;
        }
        
        if (err.message && err.message.includes("Each user can only claim once")) {
          message.error('Each user can only claim once');
        } else if (err.message && err.message.includes("Insufficient balance")) {
          message.error('Insufficient balance in contract, please try again later');
        } else {
          console.error("Claim error:", err);
          message.error('Claim failed, please try again later');
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.claim-container {
  max-width: var(--content-width);
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding-top: 30px;
  
  .claim-card {
    margin-top: 60px;
    position: relative;
    padding: 40px 30px;
    background: var(--MintBGColor);
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.08);
    border-radius: 20px;
    opacity: 1;
    border: 1px solid var(--LineColor2);
    z-index: 1;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.12);
    }
    
    .claim-icon {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
      color: var(--mainColor);
    }
    
    .title {
      font-size: 32px;
      font-weight: 600;
      color: var(--FontColor1);
      line-height: 42px;
      text-align: center;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .subtitle {
      text-align: center;
      color: var(--FontColor3);
      font-size: 16px;
      margin-bottom: 30px;
    }
    
    .info-list {
      max-width: 600px;
      margin: 0 auto;
      margin-top: 20px;
      background: rgba(255, 255, 255, 0.05);
      padding: 20px;
      border-radius: 12px;
      
      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 50px;
        padding: 8px 0;
        border-bottom: 1px dashed rgba(125, 125, 125, 0.15);
        
        &:last-child {
          border-bottom: none;
        }
        
        .name {
          color: var(--FontColor3);
          font-weight: 500;
        }
        
        .value {
          color: var(--FontColor1);
          word-break: break-all;
          text-align: right;
          max-width: 300px;
          font-family: monospace;
          font-size: 14px;
          
          &.address-placeholder {
            color: var(--FontColor3);
            font-style: italic;
          }
        }
        
        .status-text {
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 500;
          
          &.claimed {
            background-color: rgba(76, 175, 80, 0.1);
            color: #4CAF50;
          }
          
          &.eligible {
            background-color: rgba(33, 150, 243, 0.1);
            color: #2196F3;
          }
          
          &.error {
            background-color: rgba(244, 67, 54, 0.1);
            color: #F44336;
          }
        }
      }
    }
    
    .claim-button {
      display: block;
      margin: 40px auto 0;
      width: 220px;
      height: 56px;
      background: var(--mainColor);
      border: none;
      border-radius: 28px;
      font-size: 18px;
      font-weight: 600;
      box-shadow: 0 8px 15px rgba(87, 62, 243, 0.2);
      transition: all 0.3s ease;
      
      .button-text {
        letter-spacing: 0.5px;
      }
      
      &:hover:not(:disabled) {
        opacity: 0.85;
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(87, 62, 243, 0.3);
      }
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
    
    .claim-footer {
      margin-top: 30px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: var(--FontColor3);
      padding: 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.03);
      
      .info-circle {
        width: 20px;
        height: 20px;
        min-width: 20px;
        border-radius: 50%;
        background: var(--FontColor3);
        color: var(--MintBGColor);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        font-style: italic;
        font-weight: bold;
        font-size: 12px;
      }
      
      .info-text {
        line-height: 1.4;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .claim-container {
    padding: 0 15px;
    
    .claim-card {
      width: 100%;
      margin: 20px auto;
      padding: 0.5rem;
      
      .title {
        font-size: 0.4rem;
        flex-direction: column;
        
        .claim-icon {
          margin-right: 0;
          margin-bottom: 0.2rem;
          width: 0.6rem;
          height: 0.6rem;
        }
      }
      
      .subtitle {
        font-size: 0.28rem;
        margin-bottom: 0.4rem;
      }
      
      .info-list {
        width: 100%;
        padding: 0.3rem;
        
        .info-item {
          flex-direction: column;
          align-items: flex-start;
          padding: 0.2rem 0;
          
          .name {
            margin-bottom: 0.1rem;
          }
          
          .value {
            font-size: 0.28rem;
            max-width: 100%;
          }
        }
      }
      
      .claim-button {
        width: 80%;
        height: 0.9rem;
        font-size: 0.32rem;
        margin-top: 0.5rem;
        border-radius: 0.45rem;
      }
      
      .claim-footer {
        flex-direction: column;
        text-align: center;
        
        .info-circle {
          margin: 0 auto 0.2rem;
        }
      }
    }
  }
}
</style>