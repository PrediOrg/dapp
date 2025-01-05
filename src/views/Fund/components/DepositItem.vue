<template>
  <a-row :gutter="50" class="deposit-panel">
    <a-col :span="2" :xs="24" :sm="24" :md="12" :lg="12">
      <div class="title" @click="getBalance">{{ activeIndex == 0 ? 'Deposit' : 'Withdraw' }} {{ item.name }}</div>
      <div class="info-list" style="margin-top: 20px">
        <div class="info-item">
          <div class="name">Balance</div>
          <div class="value orange">{{ BigNumber(item.balance).toFixed(2) }}</div>
        </div>
        <div class="info-item">
          <div class="name">Locked amount</div>
          <div class="value orange">{{ BigNumber(item.locked_amount).toFixed(2) }}</div>
        </div>
        <div class="info-item">
          <div class="name">Unlock time</div>
          <div class="value">
            {{ countDownString }}
          </div>
        </div>
      </div>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12">
      <div class="select-box">
        <div class="select-item" :class="{ active: activeIndex == 0 }" @click="activeIndex = 0">Deposit</div>
        <div class="select-item" :class="{ active: activeIndex == 1 }" @click="activeIndex = 1">Withdraw</div>
      </div>
      <div v-show="activeIndex == 0">
        <div class="flex-box">
          <div class="left">Balance</div>
          <div class="right">
            {{ balance.toFixed(2) }}
          </div>
        </div>
        <div class="input-box">
          <input v-model="amount" type="text" placeholder="0.0" />
        </div>
        <a-button v-if="allowance.lt(amount)" @click="approve" type="primary" shape="round" size="large" :loading="isLoading" block> Approve </a-button>
        <a-button v-else @click="deposit" :loading="isLoading" type="primary" shape="round" size="large" block> Deposit </a-button>
      </div>
      <div v-show="activeIndex == 1">
        <div class="flex-box">
          <div class="left">Amount</div>
          <div class="right">{{ BigNumber(item.balance).toFixed(2) }} Available</div>
        </div>
        <div class="input-box">
          <input v-model="amount" type="text" placeholder="0.0" />
        </div>
        <a-button @click="withdraw" :loading="isWLoading" type="primary" shape="round" size="large" block> Withdraw </a-button>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import cdsSdk from '@/sdk';
import { Vault_CONTRACT } from '@/config/constants';
import BigNumber from 'bignumber.js';
import { confirmTransaction } from '@/utils/trans';
import { signWithdraw } from '@/api/signApi';
import moment from 'moment';
import { message } from 'ant-design-vue';
let countdown = null;
export default {
  name: 'DepositItem',
  props: {
    item: Object,
  },
  data() {
    return {
      BigNumber,
      activeIndex: 0,
      isLoading: false,
      isWLoading: false,
      availableNum: 0,
      amount: undefined,
      allowance: BigNumber(0),
      balance: BigNumber(0),
      countDownString: '',
      lockedExpired: undefined,
    };
  },
  watch: {
    account: function (val) {
      if (!val) {
        return;
      }
      this.initData();
    },
    isConnected: function (val) {
      if (!val) {
        return;
      }
      this.initData();
    },
    item: function (old, newVal) {
      if (old == newVal) {
        return;
      }
      this.getBalance();
      this.getAllowance();
      this.lockedExpired = newVal.locked_expired;
      if (countdown) {
        clearInterval(countdown);
      }
      if (!this.lockedExpired) {
        this.countDownString = '';
        return;
      }
      countdown = setInterval(() => {
        const timeCap = this.lockedExpired - Math.floor(parseInt(Date.now().toString()) / 1000);
        if (timeCap > 0) {
          this.countDownString = parseInt(timeCap / 60) + 'm ' + parseInt(timeCap % 60) + 's';
          this.refrshLock = true;
        } else {
          this.countDownString = '';
          if (this.refrshLock) {
            this.refrshLock = false;
            setTimeout(() => {
              this.requestUserInfo();
            }, 1000);
            clearInterval(countdown);
          }
        }
      }, 1000);
    },
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
    }),
    ...mapGetters(['chainType', 'isConnected', 'chainName']),
  },
  async mounted() {
    if (this.account) {
      this.initData();
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
    async deposit() {
      if (BigNumber(this.amount).gt(this.balance)) {
        this.$notification['error']({
          message: 'Insufficient balance',
        });
        return;
      }
      this.isLoading = true;
      try {
        const receipt = await cdsSdk.deposit(
          this.item.contract,
          BigNumber(this.amount)
            .multipliedBy(10 ** this.item.decimals)
            .toFixed(0)
        );
        await confirmTransaction(receipt.hash);
        this.$notification['success']({
          message: 'Transaction success',
        });
        this.amount = '';
      } catch (err) {
        console.log(err);
        this.isLoading = false;
        this.connectedLoading = false;
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation Cancelled',
          });
          return;
        }
        if (err['reason']) {
          this.$notification['error']({
            message: err['reason'],
          });
          return;
        }
        if (err.data && err.data.data && err.data.data.reason) {
          this.$notification['error']({
            message: err.data.data.reason,
          });
        } else {
          this.$notification['error']({
            message: 'Transcation Failed',
          });
        }
      }
      this.isLoading = false;
      this.initData();
    },

    async withdraw() {
      const amount = BigNumber(this.amount).toString();
      if (BigNumber(amount).gt(this.item.balance)) {
        this.$notification['error']({
          message: 'Insufficient balance',
        });
        return;
      }
      const name = this.chainName;
      const token = this.item.name;
      const timestamp = Math.floor(parseInt(Date.now().toString()) / 1000);
      const date = moment.unix(timestamp).utc().format('YYYY-MM-DD HH:mm:ss');
      let messageInfo = `withdraw\namount:${amount}\nchain:${name}\ntoken:${token}\ndate:${date}`;
      this.isWLoading = true;
      try {
        const signature = await cdsSdk.getSigner().signMessage(messageInfo);
        const req = {
          user: this.account,
          signature,
          amount,
          token,
          timestamp,
          chain: name,
        };
        const resp = await signWithdraw(req);
        this.requestUserInfo();
        const amount2 = BigNumber(this.amount)
          .multipliedBy(10 ** this.item.decimals)
          .toFixed(0);
        if (resp.data) {
          const expired = resp.extra.expire;
          const signature2 = resp.data;
          const receipt = await cdsSdk.withdraw(this.item.contract, amount2, expired, signature2);
          await confirmTransaction(receipt.hash);
          this.$notification['success']({
            message: 'Transaction success',
          });
          this.amount = '';
          this.initData();
        } else {
          message.error(resp.msg);
        }
      } catch (err) {
        console.log(err);
        this.isWLoading = false;
        this.connectedLoading = false;
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation Cancelled',
          });
          return;
        }
        if (err.data && err.data.data && err.data.data.reason) {
          this.$notification['error']({
            message: err.data.data.reason,
          });
        } else {
          this.$notification['error']({
            message: 'Transcation Failed',
          });
        }
      }
      this.isWLoading = false;
    },

    async approve() {
      try {
        this.isLoading = true;
        let amount = BigNumber(this.balance);
        if (BigNumber(this.amount).gt(amount)) {
          amount = BigNumber(this.amount);
        }
        const tx = await cdsSdk.approve(this.item.contract, Vault_CONTRACT, amount.multipliedBy(10 ** this.item.decimals).toFixed(0));
        await tx.wait();
        await this.getAllowance();
        this.isLoading = false;
        this.$notification['success']({
          message: 'Transaction success',
        });
      } catch (err) {
        this.isLoading = false;
        this.connectedLoading = false;
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation Cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation Failed',
        });
      }
    },
    async getBalance() {
      if (!this.account) {
        return;
      }
      try {
        let res = await cdsSdk.balanceOf(this.item.contract, this.account);
        this.balance = BigNumber(res.toString()).div(10 ** this.item.decimals);
      } catch (err) {
        console.log(this.item.contract, this.account);
        console.log(err);
      }
    },
    async requestUserInfo() {
      if (!this.account) {
        return;
      }
      await this.getUserInfo(this.account);
    },
    async initData() {
      if (!this.account) {
        return;
      }
      if (!this.isConnected) {
        return;
      }
      await this.requestUserInfo();
    },
    async getAllowance() {
      let res = await cdsSdk.allowance(this.item.contract, this.account, Vault_CONTRACT);
      this.allowance = BigNumber(res.toString()).div(1e18);
    },
  },
  beforeDestroy() {
    clearInterval(countdown);
  },
};
</script>

<style scoped lang="scss">
.depositView {
  max-width: var(--content-width);
  min-height: 200px;
  margin: 24px auto 0;

  .deposit-panel {
    margin-top: 60px;
    position: relative;
    padding: 30px 20px;
    background: #ffffff;
    box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);
    border-radius: 20px 20px 20px 20px;
    opacity: 1;
    border: 1px solid #eaeaea;
    z-index: 1;

    .title {
      font-size: 30px;
      font-weight: 400;
      color: #333333;
      line-height: 35px;
    }

    .info-list {
      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        .name {
          color: #999999;
        }

        .value {
          color: #000000;
        }

        .value.orange {
          font-size: 30px;
          font-weight: 400;
          color: #f18c18;
        }
      }
    }

    .select-box {
      display: flex;

      background: #f4f4f4;
      width: 100%;
      border-radius: 10px;

      .select-item {
        padding: 16px;
        width: 50%;
        cursor: pointer;
        border-radius: 10px;
        text-align: center;

        &.active {
          background: #573EF3;
          color: #FFFFFF;
        }
      }
    }

    .flex-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;

      .right {
        color: #f18c18;
      }
    }

    .input-box {
      margin: 0 0 13px 0;
      height: 60px;
      background: #f4f4f4;
      border-radius: 10px;

      input {
        border: none;
        height: 100%;
        padding: 0 20px;
        background: none;
        font-size: 30px;
      }
    }

    button {
      padding: 0 30px;
      min-width: 160px;
      height: 50px;
      background: $background-linear-color;
      border: none;
      border-radius: 10px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .depositView {
    display: flex;
    justify-content: center;
    .deposit-panel {
      width: var(--content-width);
      margin: 0 auto;
      overflow: hidden;
      padding: 0.4rem;
      .select-box {
        margin-top: 20px;
      }
      .info-list {
        .info-item {
          .value.orange {
            font-size: 26px;
          }
        }
      }
    }
  }
}
</style>
