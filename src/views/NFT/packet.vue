<template>
  <div :class="{ 'nft-packet-mobile': device == 'mobile' }">
    <!--        <div class="market-select">-->
    <!--            <p class="cursor" @click="clickShowHistory()">Transaction History</p>-->
    <!--        </div>-->
    <h1 class="title">My License</h1>
    <div v-infinite-scroll="handleInfiniteOnLoad" class="demo-infinite-container" :infinite-scroll-disabled="busy" :infinite-scroll-distance="10">
      <div class="header-part" v-if="device != 'mobile'" style="margin-top: -50px; padding-bottom: 20px; position: relative; z-index: 2">
        <div class="list-choose-box">
          <div class="list-choose" :class="{ active: listActive == 1 }" @click="listActive = 1">
            <img src="@/assets/images/list_gray.svg" alt="" />
          </div>
          <div class="list-choose" :class="{ active: listActive == 2 }" @click="listActive = 2">
            <img src="@/assets/images/listmenu_gray.svg" alt="" />
          </div>
        </div>
      </div>
      <a-list
        v-show="listActive == 2 || device == 'mobile'"
        class="markets-add-list"
        :grid="{
          gutter: device == 'mobile' ? 12 : 24,
          xs: 2,
          sm: 2,
          md: 2,
          lg: 4,
        }"
        :data-source="ticketList"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <!--          <router-link-->
          <!--              :to="{-->
          <!--                                      name: 'nft-detail',-->
          <!--                                      params: {-->
          <!--                                          id: item.token_id,-->
          <!--                                      },-->
          <!--                                  }"-->
          <!--          >-->
          <div class="markets-info">
            <div class="markets-info-img " >
<!--            <div class="markets-info-img " :class="{ 'markets-info-img-padding': !item.thumb_image_400 }">-->
<!--              <img :src="item.thumb_image_400" style="width: 100%; height: 100%" />-->
              <img class="logo" src="@/assets/images/nft.png" style="width: 70%" :alt="item.token_id" :title="item.token_id" />
            </div>
            <div class="markets-info-intro flex-box space-between">
              <div class="id-box">
                <label>Predi License&nbsp;</label>
                <p>#{{ item.token_id }}</p>
              </div>
            </div>
            <div class="markets-info-intro price-box flex-box">
              <label>Price</label>
              <p class="flex-box">
                <img class="trade-input-icon mg-r8" :src="payToken.icon" />
                {{ item.value | decimals }} {{ payToken.name }}
              </p>
            </div>
            <div class="markets-info-intro price-box flex-box">
              <label>Markets to Issue</label>
              <p class="flex-box">
                {{ item.balance }} Times
              </p>
            </div>
            <div class="markets-info-rent" v-if="item.is_owner != 1 && item.owner_status == 0">
              <count-down :value="availableTime(item.expired_at)" :hide-second="true"></count-down>
            </div>
            <div class="markets-info-button flex-box space-between">
              <button type="primary" :disabled="item.is_owner != 1 || (item.sale_info.pay_token && !item.sale_info.rental)" @click.stop.prevent="btnClick(item, 0)">Sell</button>
              <button type="primary" :disabled="item.is_owner != 1 || item.owner_status == 2 || (item.sale_info.pay_token && item.sale_info.rental)" @click.stop.prevent="btnClick(item, 1)">
                Rent
              </button>
            </div>
          </div>
          <!--          </router-link>-->
        </a-list-item>
      </a-list>
      <div class="list-box" v-show="listActive == 1" v-if="device != 'mobile'">
        <!--              @click="$router.push({name:'nft-detail',params:{id:item.token_id}})"-->
        <div class="list-list-item" v-for="(item, index) in ticketList" :key="index">
          <div class="main-content">
            <div class="logo-box">
              <div class="square">
<!--                <img class="logo" :src="item.thumb_image_400" :alt="item.token_id" :title="item.token_id" />-->
                <img class="logo" src="@/assets/images/nft.png" :alt="item.token_id" :title="item.token_id" />
              </div>
              <div class="name">Predi License #{{ item.token_id }}</div>
            </div>
            <div class="position-info-box">
              <div class="position-info">
                <div class="in-line">
                  <div class="name">Price</div>
                  <div class="value">
                    <strong> {{ item.value | decimals }} {{ payToken.name }}</strong>
                  </div>
                </div>
                <div class="in-line">
                  <div class="name">Issue Number</div>
                  <div class="value">
                    <strong> {{ item.balance }} Times</strong>
                  </div>
                </div>
                <div class="in-line">
                  <div class="name">Available Times</div>
                  <div class="value">
                    <div class="markets-info-rent" v-if="item.is_owner != 1 && item.owner_status == 0">
                      <count-down :value="availableTime(item.expired_at)" :hide-second="true"></count-down>
                    </div>
                    <strong v-else>- -</strong>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn-box">
              <a-button type="primary" :disabled="item.is_owner != 1 || (item.sale_info.pay_token && !item.sale_info.rental)" @click.stop.prevent="btnClick(item, 0)">Sell </a-button>
              <a-button type="primary" :disabled="item.is_owner != 1 || item.owner_status == 2 || (item.sale_info.pay_token && item.sale_info.rental)" @click.stop.prevent="btnClick(item, 1)">
                Rent
              </a-button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="demo-loading-container">
        <a-spin />
        loading
      </div>
    </div>
    <a-modal v-model="showHistory" :centered="true" :footer="null" :width="device == 'mobile' ? '90%' : '1200px'" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="cyrox-modal-info">
        <a-row class="cyrox-modal-th flex-box" v-if="device != 'mobile'">
          <a-col :span="2">ID</a-col>
          <a-col :span="3">Ticket ID</a-col>
          <a-col :span="4">Price</a-col>
          <a-col :span="3">Type</a-col>
          <a-col :span="4">From</a-col>
          <a-col :span="4">To</a-col>
          <a-col :span="4" align="center">Hash</a-col>
        </a-row>
        <a-list item-layout="horizontal" :data-source="historyList">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <template v-if="device == 'mobile'">
              <a-row class="cyrox-modal-content">
                <a-col :span="3">
                  <label>ID</label>
                  <p>{{ index + 1 }}</p>
                </a-col>
                <a-col :span="6">
                  <label>Ticket ID</label>
                  <p>#{{ item.token_id }}</p>
                </a-col>
                <a-col :span="10">
                  <label>Price</label>
                  <p>{{ item.amount | decimalsUnit }}{{ payToken.name }}</p>
                </a-col>
                <a-col :span="5">
                  <label>Type</label>
                  <p>{{ item.type == 1 ? 'Rented' : 'Sold' }}</p>
                </a-col>
                <a-col :span="9">
                  <label>From</label>
                  <p>
                    <template v-if="item.from.toLowerCase() == account"> Me</template>
                    <template v-else>
                      <a class="color-FF503E" :href="getAddressUrl(item.from)" target="_blank">
                        {{ item.from | showAddress }}
                      </a>
                    </template>
                  </p>
                </a-col>
                <a-col :span="15">
                  <label>To</label>
                  <p>
                    <template v-if="item.to.toLowerCase() == account"> Me</template>
                    <template v-else>
                      <a class="color-FF503E" :href="getAddressUrl(item.to)" target="_blank">
                        {{ item.to | showAddress }}
                      </a>
                    </template>
                  </p>
                </a-col>
                <a-col :span="24">
                  <a class="cyrox-modal-check" :href="getTxUrl(item.trans_hash)" target="_blank">Check</a>
                </a-col>
              </a-row>
            </template>
            <template v-else>
              <a-row class="cyrox-modal-content flex-box">
                <a-col :span="2">{{ index + 1 }}</a-col>
                <a-col :span="3">#{{ item.token_id }}</a-col>
                <a-col :span="4">{{ item.amount | decimals }}{{ payToken.name }}</a-col>
                <a-col :span="3">{{ item.type == 1 ? 'Rented' : 'Sold' }}</a-col>
                <a-col :span="4">
                  <template v-if="item.from.toLowerCase() == account"> Me</template>
                  <template v-else>
                    <a class="color-FF503E" :href="getAddressUrl(item.from)" target="_blank">
                      {{ item.from | showAddress }}
                    </a>
                  </template>
                </a-col>
                <a-col :span="4">
                  <template v-if="item.to.toLowerCase() == account"> Me</template>
                  <template v-else>
                    <a class="color-FF503E" :href="getAddressUrl(item.to)" target="_blank">
                      {{ item.to | showAddress }}
                    </a>
                  </template>
                </a-col>
                <a-col :span="4" align="center"><a class="cyrox-modal-check" :href="getTxUrl(item.trans_hash)" target="_blank">Check</a></a-col>
              </a-row>
            </template>
          </a-list-item>
        </a-list>
      </div>
    </a-modal>
    <a-modal v-model="showHint" :centered="true" :footer="null" :width="device == 'mobile' ? '80%' : '400px'" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="cyrox-modal-info">
        <div class="cyrox-modal-body">
          <p>This License is on renting，please cancel it and then you can sell it.</p>
        </div>
        <div class="cyrox-modal-btn">
          <a-button type="primary" @click="confirmCancel()">
            <div class="flex-box justify-content_flex-center">
              {{ $t('confirm') }}
            </div>
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import { Network } from '@/config/constants';
import { ticketPackets, ticketTransaction } from '@/api';
import countDown from '@/views/App/components/countDown';
import moment from 'moment';
import { message } from 'ant-design-vue';

let loadingPage = false;
export default {
  directives: { infiniteScroll },
  name: 'nftPacket',
  components: {
    countDown,
  },
  data() {
    return {
      listActive: 1,
      showHistory: false,
      showHint: false,
      currentItem: {},
      loading: false,
      busy: false,
      page_num: 1,
      ticketList: [],
      historyList: [],
      listTotal: 0,
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
    ...mapGetters(['chainType', 'payToken', 'isConnected']),
    availableTime() {
      return function (val) {
        return moment.utc(val).unix() - moment().format('X');
      };
    },
  },
  filters: {
    showAddress: function (text) {
      return text.substring(0, 6) + '...' + text.substring(38, 42);
    },
  },
  watch: {
    account: function (val) {
      if (!val) {
        return;
      }
      this.getTicketList(1);
    },
    desireChainId: function (val) {
      if (!val) {
        return;
      }
      this.getTicketList(1);
    },
  },
  mounted() {
    this.getTicketList(1);
  },
  methods: {
    clickShowHistory() {
      this.showHistory = true;
      ticketTransaction({
        address: this.account,
      }).then(({ code, data }) => {
        if (code !== 0) {
          this.showHistory = false;
          return;
        }
        this.historyList = data;
      });
    },
    getTxUrl(hash) {
      for (let i in Network) {
        if (Network[i].chainType == this.chainType) {
          let urls = Network[i].blockExplorerUrls;
          if (!urls || urls.length == 0) {
            return 'javascript:;';
          }
          return urls[0] + '/tx/' + hash;
        }
      }
    },
    getAddressUrl(address) {
      for (let i in Network) {
        if (Network[i].chainType == this.chainType) {
          let urls = Network[i].blockExplorerUrls;
          if (!urls || urls.length == 0) {
            return 'javascript:;';
          }
          return urls[0] + '/address/' + address;
        }
      }
    },
    onBuild() {
      message.warn('Coming Soon!');
      return;
    },
    //    btnClick(item, val) {
    btnClick() {
      this.onBuild();
      // if (val == 0 && item.owner_status == 1) {
      //   this.showHint = true;
      //   this.currentItem = item;
      //   return;
      // }
      // this.$router.push({
      //   name: 'nft-detail',
      //   params: {
      //     id: item.token_id,
      //   },
      //   query: {
      //     type: val == 1 ? 'rent' : 'sell',
      //   },
      // });
    },
    confirmCancel() {
      this.$router.push({
        name: 'nft-detail',
        params: {
          id: this.currentItem.token_id,
        },
        query: {
          type: 'sell',
        },
      });
    },
    async handleInfiniteOnLoad() {
      if (this.loading) return;
      if (this.ticketList.length >= this.listTotal) {
        this.busy = true;
        this.loading = false;
        return;
      }
      this.loading = true;
      await this.getTicketList(this.page_num + 1);
      this.loading = false;
    },
    async getTicketList(page_num) {
      if (!this.account) return;
      if (!this.isConnected) {
        return;
      }
      if (loadingPage) {
        return;
      }
      loadingPage = true;
      if (!page_num) {
        page_num = 1;
      }
      let { data, code, msg, extra } = await ticketPackets({
        user: this.account,
        page: page_num,
        limit: 8,
        chain: this.chainType,
      });
      if (code != 0) {
        console.log(msg);
        loadingPage = false;
        return;
      }
      // if (data.length <= 0) {
      //   loadingPage = false;
      //   return;
      // }
      this.page_num = page_num;
      this.listTotal = extra.total;
      if (page_num == 1) {
        this.ticketList = data;
      } else {
        this.ticketList = this.ticketList.concat(data);
      }
      loadingPage = false;
    },
  },
};
</script>
<style scoped lang="scss">
.title {
  width: var(--content-width);
  margin: 0 auto;
  position: relative;
  z-index: 1;
  font-size: 43px;
  font-weight: 600;
  color: var(--FontColor1);;
  display: flex;
  font-style: normal;
  justify-content: space-between;
}
.header-part {
  width: var(--content-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
}
.market-select {
  display: flex;
  justify-content: flex-end;
  max-width: var(--content-width);
  margin: 30px auto 0;
  font-size: 16px;
  @include font_color($font-color-s10, $font-color-s11);
}

.markets-add-list {
  max-width: var(--content-width);
  margin: 24px auto 0;
  min-height: 200px;

  /deep/ .ant-list-item {
    margin-bottom: 24px;
  }

  .markets-info {
    padding: 24px 24px;
    border-radius: 20px;
    overflow: hidden;
     background: var(--BGColor2);
    @include box_shadow_color;
    box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);
    position: relative;
    box-sizing: border-box;

    .ant-btn {
      span {
        color: #333;
      }
    }

    .markets-info-img {
      width: 100%;
      @include bg_color_change($background-color-change7, $background-color-change8);
      display: flex;
      justify-content: center;
      align-items: center;
      &.markets-info-img-padding {
        padding-bottom: 100%;
      }

      img {
        border-radius: 10px;
        aspect-ratio: 1;
        width: 80%;
      }
    }

    .price-box {
      justify-content: space-between;
      padding: 6px 0;

      label {
        color: #999;
      }
    }

    .markets-info-intro {
      .id-box {
        display: flex;
        margin-top: 10px;
        font-size: 20px;

        font-weight: 400;
        color: var(--FontColor1);
      }

      p {
        color: var(--FontColor1);

        small {
          font-size: 12px;
          line-height: 18px;
          color: rgba(255, 255, 255, 0.5);
        }

        &.status {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }

    .markets-info-button {
      padding-top: 10px;
      button {
        border: none;
        width: 46%;
        //@include bg_color_change($background-color-change3, $background-color-change12);
        //color: var(--FontColor1);
        @include box_shadow_color;
        background: #573EF3;

        border-radius: 10px;
        font-size: 16px;
        height: 42px;
        color: #fff;
        &[disabled] {
          @include bg_color_change($background-color-change13, $background-color-change12);
          //@include font_color($font-color-s10, $font-color-s12);
          box-shadow: none;
          cursor: not-allowed;
        }
      }
    }

    .markets-info-rent {
      position: absolute;
      border-radius: 0px 10px 0px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #ffffff;
      right: 10px;
    }

    .markets-info-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      color: #ffffff;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;

      .nft-star {
        display: flex;

        span {
          width: 18px;
          height: 18px;
          margin-left: 2px;
          background: url('~@/assets/images/nft-star.svg') no-repeat;
          background-size: contain;

          &.disabled {
            background: url('~@/assets/images/nft-star-grey.svg') no-repeat;
            background-size: contain;
          }
        }
      }
    }

    &.markets-info-1 {
      border-color: #979797;
    }

    &.markets-info-2 {
      border-color: #c300f2;
    }

    &.markets-info-3 {
      position: relative;
      border-color: transparent;
      background-clip: padding-box;

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
    }
  }
}

.trade-input-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.demo-infinite-container {
  position: relative;
}

.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
  color: var(--FontColor1);
}

.cyrox-modal {
  /deep/ .ant-modal-content {
    background: transparent;

    .ant-modal-body {
      padding: 0;
    }

    .ant-modal-close {
      top: -36px;
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
     background: var(--BGColor2);
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 36px 48px;

    /deep/ .ant-list-item {
      padding: 16px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);

      &:last-child {
        border: none;
      }
    }

    .cyrox-modal-title {
      font-size: 18px;

      text-align: center;
      color: #573EF3;

      span {
        color: var(--FontColor1);
        padding-bottom: 38px;
        display: block;
      }
    }

    .cyrox-modal-check {
      width: 100px;
      height: 46px;
      font-size: 16px;
      border-radius: 10px;
      @include bg_color_change($background-linear-color1, $background-color-change12);
      @include box_shadow_color;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cyrox-modal-content {
      font-size: 16px;
      color: var(--FontColor1);
      width: 100%;

      a:hover {
        color: #573EF3;
        opacity: 0.8;
      }
    }

    .cyrox-modal-th {
      font-size: 14px;
      color: #848484;
    }

    .cyrox-modal-btn {
      padding-top: 40px;

      button {
        border: none;
        height: 54px;
        @include bg_color_change($background-linear-color1, $background-color-change12);
        @include box_shadow_color;
        color: #ffffff;
        border-radius: 10px;
        font-size: 16px;
        width: 100%;
      }
    }

    .cyrox-modal-body {
      padding-top: 10px;
      font-size: 14px;
      line-height: 20px;
      color: var(--FontColor1);

      p {
        padding-top: 20px;
      }
    }
  }
}

.nft-packet-mobile {
  .market-select {
    max-width: 1200px;
    margin: 0 0.4rem;
    font-size: 0.28rem;
  }

  .markets-add-list {
    margin: 0.24rem 0.4rem 0;

    .markets-info {
      border-radius: 0.2rem;

      .markets-info-intro {
        flex-direction: column;
        align-items: flex-start;
        padding: 0.1rem 0;

        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;

          label {
            font-size: 0.24rem;
            line-height: 0.32rem;
          }

          p {
            font-size: 0.32rem;
            padding-top: 0;
            line-height: 0.4rem;

            small {
              font-size: 0.24rem;
              line-height: 0.36rem;
            }
          }

          &.text-right {
            display: block;
            text-align: left;

            p {
              padding-top: 0.08rem;
            }
          }
        }
      }

      .markets-info-button {
        padding: 0.6rem 0 0.28rem;

        button {
          width: 48%;
          border-radius: 0.2rem;
          font-size: 0.32rem;
          height: 0.72rem;
        }
      }
    }
  }
}

.cyrox-modal-mobile {
  /deep/ .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.7);
  }

  /deep/ .ant-modal {
    margin-top: 0.4rem;

    .ant-modal-content {
      background: transparent;

      .ant-modal-body {
        padding: 0.64rem 0 0;
      }

      .ant-modal-close {
        top: 0;
        right: 0;
      }
    }
  }

  .cyrox-modal-info {
    padding: 0;
    background: none;
    box-shadow: none;

    /deep/ .ant-list-item {
      border-bottom: none;
      padding: 0.12rem 0;
    }

    .cyrox-modal-check {
      width: 100%;
      height: 1.08rem;
      font-size: 0.32rem;
      border-radius: 0.2rem;
      margin-top: 0.24rem;
    }

    .cyrox-modal-content {
      padding: 0.04rem 0.24rem 0.28rem;
      background: #2d2e32;
      border-radius: 0.2rem;

      label {
        color: #848484;
        font-size: 0.28rem;
        line-height: 0.4rem;
        padding-top: 0.24rem;
        padding-bottom: 0.08rem;
        display: block;
      }

      p {
        font-size: 0.32rem;
        line-height: 0.36rem;
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .title {
    font-size: 8vw !important;
  }
  .price-box {
    font-size: 12px;
  }
  .nft-star-10 {
    height: 20px !important;
    .nft-star {
      span {
        width: 10px !important;
        height: 12px !important;
      }
    }
  }
}
</style>
