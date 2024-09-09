<template>
  <div class="TokenMove">
    <div class="history-dialog" v-show="isShowHistory">
      <div class="mask" @click="isShowHistory = false"></div>
      <div class="history-dialog-content">
        <div class="title">
          History
          <img @click="isShowHistory = false" width="26" height="26" src="@/assets/images/close.png" alt="" />
        </div>
        <div class="table">
          <div class="header">
            <div class="col">Amount</div>
            <div class="col">Fees</div>
            <div class="col">Current Chain</div>
            <div class="col">Target Chain</div>
            <div class="col">Time</div>
          </div>
          <div class="row-box">
            <div class="row-item" v-for="(item, index) in historyArr" :key="index">
              <div class="col">
                <!--                <img width="16" style="margin-right: 5px" src="@/assets/images/logo.png" alt=""/>-->
                {{ BigNumber(item.amount).toFixed(2) }} FBET
              </div>
              <div class="col">
                {{ BigNumber(item.fees).toFixed(6) }}
              </div>
              <div class="col">
                <a target="_blank" :href="EtherScanMap[getChainName(item.from_chain)] + '/tx/' + item.from_trans_hash">{{ getChainName(item.from_chain) }}</a>
              </div>
              <div class="col">
                <a v-if="item.to_trans_hash" target="_blank" :href="EtherScanMap[getChainName(item.to_chain)] + '/tx/' + item.to_trans_hash">{{ getChainName(item.to_chain) }}</a>
                <span v-else>
                  {{ getChainName(item.to_chain) }}
                </span>
              </div>
              <div class="col">
                {{ item.updated_at }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title">FBET Bridge</div>
    <!--    <div class="info">-->
    <!--      Send your assets between layers using the Bridge. This transaction can take up to 15 minutes.-->

    <!--      <a href="https://chain.link/cross-chain" target="_blank">Secured with Chainlink CCIP.</a>-->
    <!--    </div>-->
    <div class="send-box">
      <div class="send-header">
        <div class="left">Token</div>
        <div class="right">
          <!--          <img src="@/assets/images/logo.png" alt="" class="logo"/>-->
          FBET
          <img width="22" @click="showHistory()" style="margin-left: 10px; cursor: pointer" src="@/assets/images/history.png" alt="" />
        </div>
      </div>
      <div class="operate-part">
        <div class="input-header">
          <div class="left">From</div>
          <div class="right">Balance: {{ balance | decimals(2) }}</div>
        </div>
        <div class="input-box">
          <a-select v-model="selectChain" @select="handleSelect" style="width: 120px">
            <a-select-option value="ETH">
              <img width="16" style="margin-top: -2px" src="@/assets/images/eth.svg" alt="" />
              ETH
            </a-select-option>
            <a-select-option value="BSC">
              <img width="16" style="margin-top: -2px" src="@/assets/images/bsc.svg" alt="" />
              BSC
            </a-select-option>
          </a-select>
          <input type="text" v-model="amount" placeholder="0" />
          <div class="set-max" @click="setMax">MAX</div>
        </div>
      </div>
      <img width="26" height="26" @click="transfer" class="transfer" src="@/assets/images/transfer.png" alt="" />
      <div class="operate-part" style="margin-top: 50px">
        <div class="input-header">
          <div class="left">To</div>
          <div class="right"></div>
        </div>
        <div class="input-box">
          <a-select v-model="desireChain" @select="handleSelectDesir" style="width: 120px">
            <a-select-option value="ETH">
              <img width="16" style="margin-top: -2px" src="@/assets/images/eth.svg" alt="" />
              ETH
            </a-select-option>
            <a-select-option value="BSC">
              <img width="16" style="margin-top: -2px" src="@/assets/images/bsc.svg" alt="" />
              BSC
            </a-select-option>
          </a-select>
          <input type="text" v-model="amount" placeholder="0" style="background: none" />
        </div>
      </div>
      <a-button class="submit" v-if="!isOnRightChain" @click="connect"> Switch right chain</a-button>
      <a-button class="submit" v-else-if="!account" @click="connect"> Connect wallet</a-button>
      <a-button class="submit" v-else-if="BigNumber(balance).lt(amount)" disabled> Excess balance</a-button>
      <template v-else>
        <a-button v-if="BigNumber(allowanceNum).lt(amount)" :loading="isLoading" class="submit" @click="handleMove"> Approve && Send Tokens </a-button>
        <a-button v-else :loading="isLoading" class="submit" @click="handleMove"> Send Tokens</a-button>
      </template>

      <div class="info-row">
        <div class="left">Gas Fee</div>
        <div class="right">≈{{ fee.toFixed(6) }} ETH</div>
      </div>
      <div class="info-row">
        <div class="left">Time Spend</div>
        <div class="right">10～15minutes</div>
      </div>
    </div>
    <div class="progress">
      <div v-show="isLoading">
        Waiting for Current Chain Confirmation
        <img src="@/assets/images/loading.svg" alt="" />
      </div>
      <div v-show="isWaiting">
        Waiting for Target Chain Confirmation
        <img src="@/assets/images/loading.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getTokenMoveInfo, getMyTokenMoveHistory, getPending } from '@/api/tokenMove';
import { ETHDecimal, ChainIdMap, BridgeAddr, EtherScanMap } from '@/config/constants';
import BigNumber from 'bignumber.js';
import { message } from 'ant-design-vue';
import { getMyTokenMoveLast } from '@/api/tokenMove';
import cdsSdk from '@/sdk';

let timeOut;
export default {
  name: 'TokenMove',
  components: {},
  computed: {
    ...mapState({
      account: (state) => state.account,
      chainId: (state) => state.chainId,
      desireChainId: (state) => state.desireChainId,
    }),
    isOnRightChain() {
      if (this.chainId == this.desireChainId) {
        return true;
      }
      return false;
    },
    ...mapGetters(['payToken']),
  },
  data() {
    return {
      EtherScanMap,
      BigNumber,
      amount: undefined,
      isWaiting: false,
      isLoading: false,
      historyArr: [],
      selectChain: 'ETH',
      desireChain: 'BSC',
      configArr: [],
      fee: 0,
      isShowHistory: false,
      balance: 0,
      allowanceNum: 0,
      decimals: 18,
    };
  },
  watch: {
    amount() {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        if (BigNumber(this.balance).lt(this.amount)) {
          this.setMax();
        }
      }, 1000);
    },
    account() {
      this.getData();
    },

    chainId() {
      if (this.chainId == ChainIdMap['BSC']) {
        this.selectChain = 'BSC';
        this.desireChain = 'ETH';
      } else {
        this.selectChain = 'ETH';
        this.desireChain = 'BSC';
      }
      this.getData();
    },
  },
  methods: {
    async showHistory() {
      this.isShowHistory = true;
      const history = await getMyTokenMoveHistory({
        address: this.account,
      });
      if (history.code == 0) {
        this.historyArr = history.data;
      }
    },
    getChainName(id) {
      if (id == 1) {
        return 'ETH';
      } else {
        return 'BSC';
      }
    },
    transfer() {
      if (this.desireChain == 'BSC') {
        this.desireChain = 'ETH';
      } else {
        this.desireChain = 'BSC';
      }
      this.handleSelectDesir();
    },
    connect() {
      if (this.$store.state.web3model) {
        this.$store.state.web3model.openModal();
      }
    },
    async getRes(hash) {
      const res = await getMyTokenMoveLast({
        trans_hash: hash,
      });
      if (res.code == 0 && res.data && res.data.to_trans_hash) {
        message.success('Transition success on desire chain');
        this.isWaiting = false;
      } else {
        setTimeout(() => {
          this.getRes(hash);
        }, 3000);
      }
    },
    handleSelect() {
      this.$store.commit('SET_DesireChain', ChainIdMap[this.selectChain]);

      if (this.selectChain == 'BSC') {
        this.desireChain = 'ETH';
      } else {
        this.desireChain = 'BSC';
      }
    },
    handleSelectDesir() {
      if (this.desireChain == 'BSC') {
        this.selectChain = 'ETH';
      } else {
        this.selectChain = 'BSC';
      }
      this.$store.commit('SET_DesireChain', ChainIdMap[this.selectChain]);
    },
    async handleMove() {
      if (!this.amount) {
        return;
      }
      this.isLoading = true;
      const amount = BigNumber(this.amount.toString()).multipliedBy(BigNumber(10).pow(this.decimals));
      if (BigNumber(this.allowanceNum.toString()).lt(amount)) {
        const isP = await this.approve();
        if (!isP) {
          this.isLoading = false;
          message.error('Insufficient allowance');
          return;
        }
      }
      let chainSelector = this.configArr[1].chainSelector;
      if (this.selectChain == 'BSC') {
        chainSelector = this.configArr[0].chainSelector;
      }
      const value = BigNumber(this.fee.toString())
        .multipliedBy(10 ** ETHDecimal)
        .toFixed(0)
        .toString();
      try {
        const tx = await cdsSdk.moveToChain(chainSelector, amount.toFixed(0).toString(), false, value);
        await tx.wait();
        this.dealRes(tx.hash);
      } catch (e) {
        this.dealCatchErr(e);
        return false;
      }
    },
    setMax() {
      this.amount = this.balance;
    },
    async dealRes(hash) {
      this.isWaiting = true;
      await this.getRes(hash);
      this.isLoading = false;
      setTimeout(() => {
        this.getData();
        message.success('Transaction Success');
      }, 2000);
    },
    dealCatchErr(e) {
      this.isLoading = false;
      if (e.code === 4001 || e.code === 'ACTION_REJECTED') {
        message.error('User canceled  transaction');
        return;
      }
      console.log(e);
      if (e.message && e.message.indexOf('{') < 0) {
        message.error(e.message);
      } else {
        const err = JSON.parse(e.message.substr(e.message.indexOf('{'), e.message.length));
        if (err.originalError) {
          message.error(err.originalError.message);
        } else {
          message.error(e.message.substr(0, e.message.indexOf('{')));
        }
      }
    },
    async allowance() {
      let res = await cdsSdk.allowance(this.payToken.address, this.account, BridgeAddr);
      this.allowanceNum = res;
    },
    async approve() {
      try {
        const tx = await cdsSdk.approve(this.payToken.address, BridgeAddr, BigNumber(this.balance).multipliedBy(BigNumber(10).pow(this.decimals)).toFixed(0));
        await tx.wait();
        await this.allowance();
        const amount = BigNumber(this.amount.toString()).multipliedBy(BigNumber(10).pow(this.decimals));
        return BigNumber(this.allowanceNum.toString()).gte(amount);
      } catch (e) {
        return false;
      }
    },
    async getBalance() {
      if (!this.payToken.address) {
        return;
      }
      if (!this.account) {
        return;
      }
      this.decimals = this.payToken.decimals;
      const balance = await cdsSdk.balanceOf(this.payToken.address, this.account);
      this.balance = BigNumber(balance.toString()).div(10 ** this.decimals);
    },
    async getData() {
      const res = await getTokenMoveInfo();
      if (!this.chainId) {
        return;
      }
      if (!this.account) {
        return;
      }
      const pendingData = await getPending({
        address: this.account,
      });
      if (pendingData.data) {
        this.isWaiting = true;
        this.getRes(pendingData.data);
      } else {
        this.isWaiting = false;
      }
      if (!this.isOnRightChain) {
        return;
      }
      await this.getBalance();
      await this.allowance();
      if (res && res.code == 0) {
        this.configArr = res.data;
        let chainSelector = this.configArr[1].chainSelector;
        if (this.chainId == ChainIdMap['BSC']) {
          chainSelector = this.configArr[0].chainSelector;
          this.selectChain = 'BSC';
          this.desireChain = 'ETH';
        }
        let amount;
        if (!this.amount) {
          amount = 0;
        } else {
          amount = BigNumber(this.amount.toString()).multipliedBy(BigNumber(10).pow(this.decimals));
        }
        const fee = await cdsSdk.calculatedFees(chainSelector, false, amount.toString());
        this.fee = BigNumber(fee.toString()).div(10 ** ETHDecimal);
      }
    },
  },
  created() {
    this.getData();

    if (this.chainId == ChainIdMap['BSC']) {
      this.selectChain = 'BSC';
      this.desireChain = 'ETH';
    } else {
      this.selectChain = 'ETH';
      this.desireChain = 'BSC';
    }
  },
};
</script>

<style lang="scss" scoped>
.TokenMove {
  position: relative;
  z-index: 30;
}

.history-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;

  .mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
  }

  .history-dialog-content {
    position: absolute;
    left: calc(50% - 450px);
    padding: 30px;
    top: calc(50% - 300px);
    z-index: 1;
    width: 900px;
    height: 520px;
    background: #ffffff;

    border-radius: 17px 17px 17px 17px;
    border: 1px solid #dedede;

    .title {
      font-size: 24px;
      font-weight: 600;
      color: #000000;
      text-align: center;
      margin-bottom: 20px;
      margin-top: 0px;
      position: relative;

      img {
        position: absolute;
        right: 20px;
        cursor: pointer;
      }
    }

    .header {
      height: 50px;
      background: #f8e4ca;
      display: flex;
      border-radius: 5px 5px 5px 5px;
    }

    .col {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      width: 20%;
      display: flex;
      align-items: center;
      padding-left: 20px;

      a {
        color: var(--mainColor);
      }
    }

    .row-item {
      display: flex;
      height: 50px;

      &:nth-child(n + 2) {
        border-top: 0;
      }
    }

    .row-box {
      height: 360px;
      overflow: auto;
    }
  }
}

.TokenMove {
  padding-top: 20px;
  padding-bottom: 50px;
  width: var(--content-width);
  margin: 0 auto;

  .title {
    margin-top: 30px;
    font-size: 40px;
    font-weight: 400;
    color: #333333;
  }

  .progress {
    text-align: center;
    height: 60px;
    font-size: 16px;
  }

  .info {
    font-size: 18px;
    font-family: Roboto-Medium, Roboto;
    font-weight: 500;
    color: #666666;
    margin-top: 10px;
  }

  .send-box {
    background: #ffffff;
    box-shadow: 0px 13px 43px 13px rgba(0, 0, 0, 0.05);
    border-radius: 17px 17px 17px 17px;
    margin: 30px auto;
    width: 420px;
    background: #ffffff;

    padding: 30px 20px;

    .submit {
      width: 380px;
      height: 50px;
      background: linear-gradient( 270deg, #EC1E79 0%, #552683 100%);
      border-radius: 17px 17px 17px 17px;
      margin: 20px auto;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
    }

    .send-header {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 600;
      color: #000000;

      .right {
        display: flex;
        align-items: center;
      }

      .logo {
        margin-right: 10px;
        width: 20px;
      }
    }

    .transfer {
      transform: rotate(90deg);
      position: absolute;
      margin-top: 10px;
      margin-left: -13px;
      left: 50%;
      cursor: pointer;
    }

    .operate-part {
      width: 380px;
      padding: 20px;
      height: 100px;
      background: #f4f4f4;
      border-radius: 17px 17px 17px 17px;
      margin-top: 30px;

      .input-header,
      .input-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
      }

      .input-box {
        position: relative;
        margin-top: 10px;
        overflow: hidden;

        :deep .ant-select-selector {
          background: #fff;
          font-size: 14px;
          font-weight: 600;
          color: #000000;
        }

        :deep .ant-select-selection--single {
          background: #fff;
        }

        :deep .ant-select-arrow {
          transform: scale(0.7) translate(-5000px, 2px);
        }

        input {
          flex: 1;
          border: none;
          font-size: 18px;
          font-weight: 600;
          width: auto;
          background: none;
          padding: 0 10px;

          &::placeholder {
            color: #c6c6c6;
          }
        }

        .set-max {
          cursor: pointer;
          width: 50px;
          position: absolute;
          right: 0px;
          background: linear-gradient( 270deg, #EC1E79 0%, #552683 100%);
          height: 30px;
          font-size: 14px;
          justify-content: center;

          color: #FFFFFF;
          border-radius: 5px 5px 5px 5px;
          display: flex;
          align-items: center;
        }
      }
    }

    .info-row {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:last-child {
        margin-top: 20px;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .TokenMove {
    width: 90%;

    .info {
      font-size: 14px;
    }

    .progress {
      transform: scale(0.8);
      white-space: nowrap;
    }

    .send-box {
      width: 100%;

      .input-header {
        font-size: 16px !important;
      }

      .set-max {
        padding: 0 10px;
        position: absolute;
        font-size: 12px !important;
        right: calc(30px + 5vw);
      }

      :deep .ant-select-selector {
        width: 100px;
        font-size: 12px;
      }

      .operate-part {
        width: 100%;

        .input-box {
          justify-content: space-between;
          overflow: hidden;

          .input {
            width: 100px;
            flex: 1;
          }
        }
      }

      .submit {
        width: 100%;
      }
    }

    .history-dialog-content {
      left: 5%;
      top: 10%;
      height: auto;
      overflow-x: auto;
      padding-bottom: 20px;
      width: 90%;

      .title {
        img {
          display: none;
        }
      }

      .table {
        overflow-x: auto;
        width: 600px;
      }

      .header {
        width: 600px !important;
      }

      .row-box {
        width: 600px;
      }
    }
  }
}
</style>
