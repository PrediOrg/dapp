<template>
  <div class="nftLicence" :class="{ 'mobile-style': device == 'mobile' }">
    <!--    <div class="markets-banner"/>-->
    <div class="nft-licence-bg1" />
    <div class="nft-mint-box">
      <div class="nft-mint">
        <h1 class="title pc">
          GET License
          <div class="right-part">
            <div class="in-line">
              <div class="name">Referral Rewards</div>
              <div class="share-btn" v-clipboard:copy="copyShareLink" v-clipboard:success="onCopy">
                <img src="@/assets/images/share-btn.png" alt="" class="icon" />
                <span>Share</span>
              </div>
            </div>
            <div class="in-line">
              <div class="value">
                <div class="reward-box">
                  <img class="icon" src="@/assets/images/USDT.png" alt="" />
                  {{ rewardEth | decimalsPrecision(payToken.decimals, 4) }}
                </div>
              </div>
              <!--              v-if="parseFloat(reward) !== 0"-->
              <a-button type="primary" style="width: 100px" shape="round" size="large" @click="rewardCollect" block :loading="collectLoading">Withdraw </a-button>
            </div>
          </div>
        </h1>

        <h1 class="title m">
          <div class="in-line">
            <div class="title">GET License</div>
            <div class="share-btn" v-clipboard:copy="copyShareLink" v-clipboard:success="onCopy">
              <img src="@/assets/images/share-btn.png" alt="" class="icon" />
            </div>
          </div>
          <div class="in-line">
            <div class="left-part">
              <div class="name">Referral Rewards</div>
              <div class="value">
                <div class="reward-box">
                  <img class="icon" src="@/assets/images/USDT.png" alt="" />
                  {{ rewardEth | decimalsPrecision(payToken.decimals, 4) }}
                </div>
              </div>
            </div>
            <div class="right-part">
              <div class="in-line">
                <!--              v-if="parseFloat(reward) !== 0"-->
                <a-button type="primary" style="width: 100px" shape="round" size="large" @click="rewardCollect" block :loading="collectLoading">Withdraw </a-button>
              </div>
            </div>
          </div>
        </h1>
        <div class="mint-op">
          <div class="mint-op-shadow"></div>
          <div class="mint-op-box">
            <div class="mint-header"></div>
            <div class="issue-tip">
              {{ $t('NFT.issueTip') }}
            </div>
            <div class="mint-number">
              NFT License
              <span style="font-size: 15px; float: right; margin-top: 10px">{{ current }}/{{ max }}</span>
            </div>
            <div class="mint-price">
              <p class="flex-box" @click="showChoosePrice = true">
                <label>{{ $t('NFT.price') }}</label>
                <!--              <img class="trade-input-icon mg-r8" :src="ferc20.icon"/>-->
                <span class="default">
                  <img class="icon"  src="@/assets/images/USDT.png" alt="" />
                  <strong>{{price}}USDT</strong>
                  <img class="downIcon" src="@/assets/images/arrow-down-bold.svg" alt="" />
                </span>
              </p>
              <div class="choose-box" v-show="showChoosePrice">
                <div class="mask" @click.stop="showChoosePrice = false"></div>
                <div class="choose-content animate__animated animate__fadeIn">
<!--                  <div class="choose-item" @click.stop="chooseCoin(1)">-->
<!--                    <img src="@/assets/images/ethIcon.png" alt="" />-->
<!--                    <strong>{{ ethPrice }} ICP</strong>-->
<!--                  </div>-->
                  <div class="choose-item" @click.stop="chooseCoin(2)">
                    <img src="@/assets/images/USDT.png" alt="" />
                    <strong>{{ fercPrice }} USDT</strong>
                  </div>
                </div>
              </div>
            </div>
            <a-button type="primary" class="mint-btn" :disable="remain == 0" @click="buy()" shape="round" size="large" block :loading="loading">
              {{ $t('NFT.mintNow') }}
            </a-button>
          </div>
        </div>

        <div class="usage">
          <h2 class="title">Usage Rights</h2>
          <div class="usage-content">
            <div class="usage-content-item">
              <img src="@/assets/images/usage_icon2.png" alt="" class="content-icon" />
              <div class="item-name">Issue Betting Products</div>
            </div>
            <div class="usage-content-item">
              <div class="nft-licence-bg2" />
              <img src="@/assets/images/usage_icon1.png" alt="" class="content-icon" />
              <div class="item-name">Governance</div>
            </div>
          </div>
        </div>
        <div class="properties">
          <h2 class="title">Properties</h2>
          <div class="content-list">
            <div class="list-item">
              <img src="../../assets/images/propertie_icon1.png" alt="" class="list-icon" />
              <div class="list-item-name">Tradable</div>
            </div>
            <div class="list-item">
              <img src="../../assets/images/propertie_icon3.png" alt="" class="list-icon" />
              <div class="list-item-name">Rentable</div>
            </div>
            <div class="list-item">
              <img src="../../assets/images/propertie_icon2.png" alt="" class="list-icon" />
              <div class="list-item-name">Usable</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model="showSuccess" :centered="true" :footer="null" :width="device == 'mobile' ? '100%' : '436px'" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="cyrox-modal-info">
        <div class="cyrox-modal-title">{{ $t('NFT.success') }}</div>
        <div class="cyrox-modal-subTitle">{{ $t('NFT.getNFT') }}</div>
        <div class="swiper-slide">
          <div class="swiper-slide-info">
            <div class="swiper-slide-info-img">
              <img :src="getTicket.thumb_image_400" style="width: 100%; height: 100%" />
            </div>
            <div class="swiper-slide-info-selected">
              <div>Selected</div>
            </div>
          </div>
          <div class="swiper-slide-Id">Predi License #{{ ticketId }}</div>
        </div>
        <div class="cyrox-modal-btn">
          <!--          <a-button @click="issue">-->
          <a-button @click="onBuild">
            {{ $t('NFT.issueCDS') }}
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import BigNumber from 'bignumber.js';
import cdsSdk from '@/sdk';
import { confirmTransaction } from '@/utils/trans';
import { TicketSale_CONTRACT, ChainIdMap } from '@/config/constants';
import { nftDetail, ticketSale } from '@/api/index';
import { message } from 'ant-design-vue';
import { constants } from 'ethers';

export default {
  name: 'PREDINFT',
  data() {
    return {
      showChoosePrice: false,
      ticketId: '',
      showSuccess: false,
      selectIndex: null,
      loading: false,
      stageNum: null,
      nftList: [],
      inviter: '',
      getTicket: {},
      price: '200',
      curCoin: 'USDT',
      collectLoading: false,
      reward: '0',
      rewardEth: 0,
      ethPrice: 0,
      fercPrice: 100,
      remain: 0,
      max: 3000,
      current: 0,
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
      desireChainId: (state) => state.desireChainId,
      allowance: (state) => state.allowance,
    }),
    copyShareLink() {
      return window.location.origin + window.location.pathname + '?inviter=' + this.account;
    },
    ...mapGetters(['chainType', 'payToken','ferc20', 'chainName']),
  },
  watch: {
    account: {
      immediate: true,
      handler: function (val) {
        if (!val) {
          return;
        }
        this.init();
      },
    },
    chainId: {
      immediate: false,
      handler: function (val) {
        if (!val) {
          return;
        }
        this.init();
      },
    },
  },

  async mounted() {
    await this.loadData();
    let inviter = this.$route.query.inviter;
    if (inviter) {
      this.inviter = inviter;
    }
    if (inviter === '') {
      inviter = constants.AddressZero;
    }
  },
  methods: {
    ...mapActions(['switchNetwork']),
    async loadData() {
      const data = await ticketSale({
        chain: 1,
      });
      if (data && data.code == 0) {
        this.ethPrice = BigNumber(data.data.ethPrice).dividedBy(10 ** 18);
        this.fercPrice = BigNumber(data.data.price).dividedBy(10 ** 18);
        this.remain = data.data.remain;
        this.max = data.data.max;
        this.current = data.data.current;
      }
    },
    onBuild() {
      message.warn('Coming Soon!');
    },
    chooseCoin(type) {
      if (type == 1) {
        this.price = this.ethPrice;
        this.curCoin = 'ICP';
      } else {
        this.price = this.fercPrice;
        this.curCoin = 'USDT';
      }
      this.showChoosePrice = false;
    },
    async init() {
      if (this.chainId == this.$store.state.desireChainId && this.account && this.chainName == 'ICPCHAIN') {
        let { reward, rewardEth } = await cdsSdk.rewardQuery(this.account);
        this.reward = reward.toString();
        this.rewardEth = rewardEth.toString();
      }
      this.loadData();
    },
    onCopy() {
      message.success('copy success');
    },
    async rewardCollect() {
      if (this.rewardEth == 0 && this.reward == 0) {
        message.warn('no reward');
        return;
      }
      try {
        let tx = await cdsSdk.withdrawReward();
        let { receipt } = await confirmTransaction(tx.hash);
        if (receipt.status != 0) {
          this.init();
          this.$notification['success']({
            message: 'Transaction success',
          });
        } else {
          this.$notification['error']({
            message: 'Transaction failed',
          });
        }
      } catch (err) {
        this.$notification['error']({
          message: 'Transaction failed',
        });
      }
    },
    async buy() {
      if (!this.account) {
        // await this.$store.dispatch('connected');
        message.warn('Please connect wallet');
        return;
      }
      const desireChainId = ChainIdMap.BSC;
      if (this.chainId != '') {
        await this.switchNetwork(desireChainId);
      }
      if (this.chainId != desireChainId) {
        this.$notification['error']({
          message: 'Wrong Network',
        });
        return;
      }
      if (this.remain == 0) {
        this.$notification['error']({
          message: 'The remaining quantity is 0',
        });
        return;
      }
      const isW = await cdsSdk.whiteList(this.account);
      this.loading = true;
      try {
        //ERC20 buy
        let nftPrice = BigNumber(this.price).multipliedBy(1e18);
        const balance = await cdsSdk.balance(this.account);
        if (this.curCoin == 'ICP') {
          if (!isW && BigNumber(balance.toString()).isLessThan(BigNumber(10).pow(18).multipliedBy(this.ethPrice))) {
            this.$notification['error']({
              message: 'Not sufficient funds',
            });
            this.loading = false;

            return;
          }
          await this.buyNFT(isW);
          return;
        }

        const allowance = await cdsSdk.allowance(this.payToken.address, this.account, TicketSale_CONTRACT);
        const tokenBalance = await cdsSdk.balanceOf(this.payToken.address, this.account);

        if (!isW && nftPrice.gt(tokenBalance.toString())) {
          this.$notification['error']({
            message: 'Not sufficient funds',
          });
          this.loading = false;
          return;
        }
        if (isW || BigNumber(allowance.toString()).gt(nftPrice)) {
          await this.buyNFT(isW);
          return;
        }

        let tx = await cdsSdk.approve(this.payToken.address, TicketSale_CONTRACT, tokenBalance);

        let receipt = await cdsSdk.waitForTransaction(tx.hash);
        if (receipt.status != 0) {
          await this.buyNFT(isW);
        } else {
          this.$notification['error']({
            message: 'Transcation failed',
          });
          this.loading = false;
        }
      } catch (err) {
        console.log(err);
        this.loading = false;
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation failed',
        });
      }
    },
    async buyNFT(isW) {
      try {
        let inviter = this.inviter;
        if (!inviter) {
          inviter = constants.AddressZero;
        }
        let tx;
        if (!isW && this.curCoin == 'ICP') {
          const price = BigNumber(this.ethPrice).multipliedBy(1e18);
          tx = await cdsSdk.ethBuyNftErc20(inviter, price);
        } else {
          tx = await cdsSdk.buyNftErc20(inviter);
        }
        let { receipt, extra } = await confirmTransaction(tx.hash, 1);

        if (receipt.status != 0) {
          this.showSuccess = true;
          nftDetail({
            token_id: extra.ticket_id,
            chain: 1,
          }).then(({ data, code }) => {
            if (code != 0) {
              return;
            }
            this.getTicket = data;
          });
          this.ticketId = extra.ticket_id;
          this.init();
        } else {
          this.$notification['error']({
            message: 'Transcation failed',
          });
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation failed',
        });
      }
    },
    issue() {
      this.$router.push('/issue');
    },
  },
};
</script>
<style scoped lang="scss">
.nftLicence {
  position: relative;
  z-index: 2;
}

.markets-banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/nft_banner.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  z-index: 0;
}

.nft-mint-box {
  position: relative;
  z-index: 1;

  .nft-mint {
    width: var(--content-width);
    margin: 0 auto;

    .title.m {
      display: none;
    }

    .title {
      position: relative;

      z-index: 2;
      font-size: 43px;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      color: #333333;
      display: flex;
      justify-content: space-between;

      .reward-box {
        display: flex;
        align-items: center;
        font-size: 20px;

        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }

      .right-part {
        margin-top: -10px;
      }

      .in-line {
        margin: 0 auto;
        font-size: 16px;
        color: var(--mainColor);
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:last-child {
          margin-top: 10px;
        }

        .name {
          font-size: 20px;
          font-family: Orelega One-Regular, Orelega One;
          font-weight: 400;
          color: #333333;
        }

        .value {
          font-size: 26px;
          font-family: Orelega One-Regular, Orelega One;
          font-weight: 400;
        }
      }

      .ant-btn {
        width: 111px !important;
        height: 43px;
        background: linear-gradient( 270deg, #EC1E79 0%, #552683 100%);
        border-radius: 9px 9px 9px 9px;
        opacity: 1;
      }

      .share-btn {
        margin-left: 10px;
        width: 111px;
        height: 44px;
        background: #ffffff;
        box-shadow: 0px 9px 43px 9px rgba(0, 0, 0, 0.05);
        border-radius: 9px;
        border: 1px solid #eaeaea;
        font-size: 17px;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: #146e51;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .icon {
          width: 20px;
          height: 20px;
        }

        span {
          margin-left: 8px;
        }
      }
    }
  }
}

.mint-op {
  width: 360px;
  margin: 100px auto 0;
  position: relative;

  .mint-op-shadow {
    position: absolute;
    background-size: 100% 100%;
    width: 800px;
    flex-shrink: 0;
    border-radius: 50%;
    background: radial-gradient(circle, #ec1e7b41 0%, #f9f9f964 100%);
    height: 800px;
    left: -230px;
    top: -350px;
    filter: blur(50px);
  }
}

.ant-select {
  width: 100%;
}

.ant-select .ant-select-selection {
  background: none;
}

.mint-op-box {
  @include font_color($font-color-s, $font-color-s1);
  @include bg_color_change($background-color-change3, $background-color-change4);
  @include box_shadow_color;
  position: relative;

  padding: 32px 25px;
  font-size: 16px;
  border-radius: 16px;

  .mint-header {
    position: absolute;
    top: -160px;
    left: 46px;
    width: 256px;
    height: 160px;
    background: url('../../assets/images/mint_header.png') no-repeat;
    background-size: 100% 100%;
  }

  .mint-btn {
    width: 100%;
    height: 60px;
    border-radius: 17px;
    margin-top: 20px;
  }

  .issue-tip {
    font-size: 17px;
    font-family: Orelega One-Regular, Orelega One;
    font-weight: 400;
    color: #999999;
  }

  .mint-number {
    font-size: 29px;
    font-family: Orelega One-Regular, Orelega One;
    font-weight: 400;
    color: #782581;
  }

  .mint-price {
    background: #f4f4f4;
    border-radius: 17px 17px 17px 17px;
    padding: 30px 17px;
    margin-top: 20px;
    position: relative;

    .choose-box {
      .mask {
        z-index: 0;
        position: fixed;
        left: 0;
        width: 100vw;
        top: 0;
        height: 100vh;
      }

      .choose-content {
        position: absolute;
        top: 100px;
        width: 100%;
        left: 0;
        z-index: 1;
        background: #fff;
        padding: 0 30px;
        box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);
        border-radius: 20px 20px 20px 20px;
        border: 1px solid #eaeaea;
        animation-duration: 0.3s;
      }

      .choose-item {
        padding: 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:last-child {
          border-top: 1px #eaeaea solid;
        }

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        strong {
          margin-left: 10px;
          font-size: 20px;
          font-family: Orelega One-Regular, Orelega One;
          font-weight: 400;
          color: #333333;
        }
      }
    }

    .flex-box {
      justify-content: space-between;
      overflow: visible;

      .default {
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .downIcon {
          width: 20px;
          height: 20px;

          margin-left: 10px;
        }
      }

      label {
        font-size: 17px;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: #999999;
      }

      strong {
        font-size: 26px;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}

.nft-licence-bg1,
.nft-licence-bg2 {
  position: absolute;
  left: -330px;
  top: 500px;
  width: 600px;
  height: 600px;
  //background: url('../../assets/images/nft-img.png') no-repeat;
  background-size: 100% auto;
  z-index: 0;
}

@keyframes moveLeftIn {
  0% {
    transform: translateX(-600px) rotateY(180deg);
  }
  90% {
    transform: translateX(0) rotateY(180deg);
  }
  100% {
    transform: translateX(-600px) rotateY(180deg);
  }
}

.nft-licence-bg1 {
  transform: rotateY(180deg);
  //animation: moveLeftIn 10s infinite;
  //animation-delay: 1500ms;
}

.nft-licence-bg2 {
  width: 125px;
  height: 160px;
  left: 900px;
  top: 20px;
  z-index: -1;
}

.markets-info {
  @include font_color($font-color-s, $font-color-s1);
  @include bg_color_change($background-color-change3, $background-color-change4);
  @include box_shadow_color;

  position: relative;
  width: 360px;
  margin: 0 auto;
  padding: 32px 25px;
  font-size: 16px;
  font-family: 'Lucida-Grande';
  border-radius: 10px;

  &:after {
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    background: $background-linear-color;
    content: '';
    z-index: -1;
    border-radius: 10px;
  }

  .markets-info-title,
  .markets-common-p {
    span {
      background: $background-linear-color;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  label {
    font-size: 12px;
    @include font_color($font-color-s10, $font-color-s3);
    padding-bottom: 8px;
    line-height: 16px;
    display: inline-block;
  }

  .markets-info-price {
    p {
      font-size: 24px;
      font-family: 'Lucida-Grande-Bold';
      color: #00d871;
    }
  }

  .markets-common-p {
    font-size: 22px;
  }

  .markets-info-title {
    span {
      font-size: 28px;
      line-height: 34px;
      font-family: 'Lucida-Grande-Bold';
    }
  }

  .nft-button {
    margin-top: 36px;

    button {
      border: none;
      height: 56px;
      @include bg_color_change($background-color-change3, $background-color-change12);
      @include font_color($font-color-s, $font-color-s1);
      @include box_shadow_color;
      border-radius: 10px;
      font-size: 22px;

      &:hover,
      &:focus {
        background: $background-linear-color;
        color: #ffffff;
      }
    }

    &.nft-button-active {
      button {
        background: $background-linear-color;
        color: #ffffff;
      }
    }
  }
}

.usage {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  position: relative;

  .usage-content {
    display: flex;
    margin-top: 30px;

    .usage-content-item {
      position: relative;

      .nft-licence-bg2 {
        right: 0px;
        left: auto;
        top: -70px !important;
      }

      padding: 58px 40px;
      background: #ffffff;
      box-shadow: 0px 13px 43px 13px rgba(0, 0, 0, 0.05);
      border-radius: 17px 17px 17px 17px;
      border: 1px solid #eaeaea;
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 376px;

      &:last-child {
        margin-left: 20px;
      }

      .content-icon {
        width: 66px;
        height: 66px;
      }

      .item-name {
        font-size: 26px;
        white-space: nowrap;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: $main-font-color;
        margin-top: 20px;
      }
    }
  }
}

.properties {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;

  .content-list {
    display: flex;
    margin-top: 50px;

    .list-item {
      width: 230px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &:first-child {
        margin-left: 0;
      }

      .list-icon {
        width: 66px;
        height: 66px;
      }

      .list-item-name {
        font-size: 26px;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: $main-font-color;
        margin-top: 20px;
      }
    }
  }
}

.trade-input-icon {
  width: 30px;
  height: 30px;
}

.cyrox-modal {
  /deeo/ .ant-modal-content {
    background: #fff;
  }

  /deep/ .ant-modal-content {
    //background: transparent;

    .ant-modal-close {
      top: 12px;
      right: 24px;

      .ant-modal-close-x {
        width: 24px;
        line-height: normal;
        background: url('~@/assets/images/close.svg') no-repeat top center;
        background-size: contain;
        display: block;

        .ant-modal-close-icon {
          display: none;
        }
      }
    }
  }

  .cyrox-modal-info {
    background: #fff;
    box-shadow: 0px 4px 15px 0px rgba(251, 251, 251, 0.2);
    border-radius: 10px;
    padding: 24px 48px 34px;
    .swiper-slide-info-img img {
      border-radius: 10px;
    }
    .cyrox-modal-title {
      font-size: 18px;
      font-family: 'Lucida-Grande-Bold';
      text-align: center;
    }

    .cyrox-modal-subTitle {
      font-size: 14px;
      text-align: center;
      padding: 8px 0 12px;
    }

    .swiper-slide {
      display: flex;
      flex-direction: column;
      align-items: center;

      .swiper-slide-info {
        width: 180px;
        height: 210px;
        border-radius: 10px;
        position: relative;

        .swiper-slide-info-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 14px;
          height: 28px;
          background: #393a3e;
          color: #ffffff;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;

          .nft-star {
            display: flex;

            span {
              width: 16px;
              height: 16px;
              background: url('~@/assets/images/nft-star.svg') no-repeat;
              background-size: contain;
            }
          }
        }

        .swiper-slide-info-selected {
          display: none;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          z-index: 999;
          border-radius: 10px;

          div {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: 'Lucida-Grande-Bold';
            height: 53px;
            background: rgba(255, 80, 62, 0.5);
            border-radius: 0px 0px 10px 10px;
            color: #ffffff;
            margin-top: 157px;
          }
        }
      }

      .swiper-slide-Id {
        @include font_color($font-color-s, $font-color-s1);
        font-size: 16px;
        line-height: 22px;
        padding-top: 8px;
      }
    }

    .cyrox-modal-btn {
      padding-top: 20px;

      button {
        border: none;
        height: 54px;
        background: #4f8fef;
        border-radius: 10px;
        font-size: 16px;
        font-family: 'Lucida-Grande-Bold';
        color: #ffffff;
        width: 100%;
      }
    }
  }
}

.cyrox-modal-mobile {
  .cyrox-modal-info {
    padding: 0.48rem 0.7rem 0.68rem;

    .cyrox-modal-btn {
      padding-top: 0.38rem;

      button {
        height: 1.08rem;
        font-size: 0.32rem;
      }
    }
  }
}

.mobile-style {
  overflow: hidden;

  .markets-banner {
    background: url('../../assets/images/nft_banner.png') no-repeat;
  }

  .title {
    font-size: 8vw !important;
  }

  .nft-mint-box {
    margin-top: 20px;

    .title.pc {
      display: none !important;
    }

    .mint-header {
      left: 40px;
    }

    .title.m {
      display: block;

      .share-btn {
        width: 50px;
        height: 50px;
        background: #ffffff;
        box-shadow: 0px 22px 109px 22px rgba(0, 0, 0, 0.05);
        border-radius: 50%;
        opacity: 1;
        border: 2px solid #eaeaea;
      }
    }

    .mint-op {
      margin-top: 20vh;
      width: var(--content-width);
    }
  }

  .usage {
    .usage-content {
      flex-direction: column;

      .usage-content-item {
        margin-left: 0;
        width: var(--content-width);

        &:last-child {
          margin-top: 20px;
        }
      }
    }
  }

  .properties {
    .content-list {
      width: var(--content-width);
      justify-content: space-between;

      .list-item {
        width: 30%;

        .list-icon {
          width: 50px;
          height: 50px;
        }

        .list-item-name {
          font-size: 6vw;
          font-family: Orelega One-Regular, Orelega One;
          font-weight: 400;
          color: $main-font-color;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
