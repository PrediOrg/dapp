<template>
  <div class="detail-form-tabs" :class="{ 'mobile-form-tabs': device == 'mobile' }">
    <div class="banner-box">
      <img class="banner" src="@/assets/images/market-banner.png" alt="" />
      <div class="btn-box">
        <div class="btn" @click="$router.push('/nft')">Get License</div>
<!--        <a class="btn" :href="buyLink" target="_blank">Buy PRDS</a>-->
<!--        <a  class="btn"  target="_blank" href="https://medium.com/@predi/fbet-overview-1cf2bcc9e53d">-->
<!--          <Tooltip style="cursor: pointer"  title="PRDS token information"><svg t="1701762676678" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5925" width="20" height="64"><path d="M514.048 54.272q95.232 0 178.688 36.352t145.92 98.304 98.304 145.408 35.84 178.688-35.84 178.176-98.304 145.408-145.92 98.304-178.688 35.84-178.176-35.84-145.408-98.304-98.304-145.408-35.84-178.176 35.84-178.688 98.304-145.408 145.408-98.304 178.176-36.352zM515.072 826.368q26.624 0 44.544-17.92t17.92-43.52q0-26.624-17.92-44.544t-44.544-17.92-44.544 17.92-17.92 44.544q0 25.6 17.92 43.52t44.544 17.92zM567.296 574.464q-1.024-16.384 20.48-34.816t48.128-40.96 49.152-50.688 24.576-65.024q2.048-39.936-8.192-74.752t-33.792-59.904-60.928-39.936-87.552-14.848q-62.464 0-103.936 22.016t-67.072 53.248-35.84 64.512-9.216 55.808q1.024 26.624 16.896 38.912t34.304 12.8 33.792-10.24 15.36-31.232q0-12.288 7.68-30.208t20.992-34.304 32.256-27.648 42.496-11.264q46.08 0 73.728 23.04t25.6 57.856q0 17.408-10.24 32.256t-26.112 28.672-33.792 27.648-33.792 28.672-26.624 32.256-11.776 37.888l1.024 38.912q0 15.36 14.336 29.184t37.888 14.848q23.552-1.024 37.376-15.36t12.8-32.768l0-24.576z" p-id="5926" fill="#ffffff"></path></svg></Tooltip>-->
<!--        </a>-->

      </div>
    </div>
    <label>My Positions</label>
    <div class="in-line" v-for="(item, index) in userDealt.userBuy" :key="index">
      <label>{{ item.name }}</label>
      <p class="flex-box">
        <img width="20" height="20" style="border-radius: 50%; margin-right: 4px" :src="payToken.icon" alt="" />
        {{ item.amount | decimals(2) }}
        {{ payToken.symbol }}
      </p>
    </div>

    <div class="in-line" v-if="userDealt.challenge > 0">
      <label>Challenge credit</label>
      <p class="flex-box">
        <img width="20" height="20" style="border-radius: 50%; margin-right: 4px" :src="payToken.icon" alt="" />
        {{ userDealt.challenge | decimals(2) }}
        {{ payToken.symbol }}
      </p>
    </div>
    <div class="in-line" v-if="userDealt.challenge > 0">
      <label>Challenge status</label>
      <p class="flex-box">
        <template v-if="detail.status == 4">
          <template v-if="detail.issuer_result == detail.result"> Failed </template>
          <template v-else> Succeed </template>
        </template>
        <template v-else> Wait </template>
      </p>
    </div>
    <div class="in-line" v-if="userDealt.return > 0">
      <label>Return</label>
      <p class="flex-box">
        <img width="20" height="20" style="border-radius: 50%; margin-right: 4px" :src="payToken.icon" alt="" />
        {{ userDealt.return | decimals(2) }}
        {{ payToken.symbol }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import { getUserDealt } from '@/api/index';
import {ChainMapById} from "@/config/constants";
import {Tooltip} from "ant-design-vue";

export default {
  name: 'myPosition',
  directives: { infiniteScroll },
  components:{Tooltip},
  props: {
    detail: Object,
  },
  data() {
    return {
      buyLink:"https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x6F6A40a7149b4b4F6568c46A0C5A98927A00E9F1&chain=mainnet",
      sellerCollecting: false,
      userCollection: false,
      activeKey: 1,
      showAction: false,
      userDealt: {},
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
      ...mapGetters(['isConnected']),
    }),
    ...mapGetters(['chainType', 'payToken']),
  },
  watch: {
    account: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.loadData();
        }
      },
    },
    chainId(){
      if(ChainMapById[this.chainId] == 'ETH'){
        this.buyLink = "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x6F6A40a7149b4b4F6568c46A0C5A98927A00E9F1&chain=mainnet"
      }else{
        this.buyLink = "https://pancakeswap.finance/swap?outputCurrency=0xf926868FC2eFd41dabe94f8F1AAd85eF7E2d3dda"
      }
    }
  },
  created() {
    if(ChainMapById[this.chainId] == 'ETH'){
       this.buyLink = "https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x6F6A40a7149b4b4F6568c46A0C5A98927A00E9F1&chain=mainnet"
    }else{
      this.buyLink = "https://pancakeswap.finance/swap?outputCurrency=0xf926868FC2eFd41dabe94f8F1AAd85eF7E2d3dda"
    }

  },
  methods: {
    loadData() {
      if (!this.account) {
        return;
      }
      getUserDealt({
        id: this.$route.params.id,
        address: this.account,
        chain: this.chainType,
      }).then(({ data, code }) => {
        if (code !== 0) {
          return;
        }
        if (!data) {
          data = {};
        }
        this.userDealt = data;
        this.$emit('updateUserDealt', data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.detail-form-tabs {
  padding: 24px 32px;
  @include bg_color_change($background-color-change3, $background-color-change4);
  @include box_shadow_color_detail;
  border-radius: 10px;
  .banner-box {
    width: 100%;
    position: relative;
    .btn-box {
      display: flex;
      margin: 0;
      top: 0;
      align-items: center;
      position: absolute;
      border-radius: 10px;
      height: calc(100% - 10px);
      width: 100%;
      .btn {
        position: absolute;
        bottom: 26px;
        border-radius: 43px 43px 43px 43px;
        opacity: 1;
        border: 1px solid #ffffff;
        width: 120px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        cursor: pointer;

        &:nth-child(1) {
          left: calc(50% - 60px);
        }
        &:nth-child(2) {
          left: calc(50% + 10px);
        }
        &:nth-child(3) {
          border: none;
          width: 40px;
          left: calc(50% + 150px);
          &:focus,&:active{
            border: none!important;
          }
        }
      }
    }
  }
  .banner {
    width: 100%;
    margin-bottom: 10px;
    cursor: pointer;
    user-select: none;
  }
  label {
    padding-top: 14px;
    padding-bottom: 8px;
    font-size: 14px;
    @include font_color($font-color-s10, $font-color-s5);
    display: block;
  }
  .in-line {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    .collect-btn {
      color: var(--mainColor);
    }
  }
  /deep/ .ant-tabs {
    margin: 0;

    .ant-tabs-bar {
      border-color: transparent;
      margin: 0;

      .ant-tabs-tab {
        font-size: 16px;
        font-family: 'Lucida-Grande-Bold';
        @include font_color($font-color-s10, $font-color-s11);
        padding: 0 0 8px 0;

        &.ant-tabs-tab-active {
          color: #ffffff;
          @include font_color($font-color-s, $font-color-s1);
        }
      }

      .ant-tabs-ink-bar {
        background: $background-linear-color;
      }
    }
  }

  .detail-form-tabs-total {
    margin-top: 16px;
    width: 100%;
    padding: 16px 32px 16px 24px;
    @include bg_color_change($background-color-change13, $background-color-change12);
    border-radius: 10px;

    p {
      font-size: 14px;
      @include font_color($font-color-s, $font-color-s1);
    }

    a {
      border: 1px solid rgba(255, 255, 255, 0.6);
      padding: 4px 8px;
      border-radius: 6px;
      @include font_color($font-color-s, $font-color-s1);
    }

    /deep/ .ant-col {
      label {
        padding-top: 0;
      }
    }
  }

  .detail-form-tabs-button {
    padding-top: 8px;

    a {
      border-width: 1px;
      border-style: solid;
      @include border_color($border-color-s3, $border-color-s4);
      @include font_color($font-color-s, $font-color-s1);
      padding: 4px 8px;
      border-radius: 6px;
      display: inline-block;
    }
  }

  .detail-form-tabs-table {
    /deep/ .ant-list {
      .ant-list-item {
        border-bottom: none;
        padding: 0;

        &:last-child {
          border: none;
        }
      }

      .ant-list-pagination {
        margin-top: 0;
      }
    }

    .cyrox-table-row {
      width: 100%;
      padding-bottom: 6px;

      p {
        @include font_color($font-color-s, $font-color-s1);
      }
    }
  }
}

.mobile-form-tabs {
  margin-top: 0.48rem;
  padding: 0.08rem 0.24rem 0.24rem;
  padding-top: 0.36rem;
  border-radius: 0.2rem;
  position: relative;

  label {
    padding: 0.16rem 0;
    font-size: 0.24rem;
  }

  /deep/ .ant-tabs {
    .ant-tabs-bar {
      .ant-tabs-tab {
        font-size: 0.32rem;
      }
    }
  }

  .detail-form-tabs-total {
    margin-top: 0.32rem;
    padding: 0.22rem 0.24rem;
    border-radius: 0.2rem;

    p {
      font-size: 0.24rem;
    }

    a {
      margin-top: 0.24rem;
      border-radius: 0.12rem;
      display: inline-block;
    }
  }

  .detail-form-tabs-table {
    .cyrox-table-row {
      padding-bottom: 6px;

      p {
        font-size: 0.24rem;
      }
    }
  }
}

.loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

.trade-input-icon {
  width: 20px;
  height: 20px;
  background-size: contain;
}
</style>
