<template>
  <div :class="{ 'nft-market-mobile': device == 'mobile' }">
    <h1 class="title">License Market</h1>

    <div class="header-content">

      <div class="market-select ">
        <div class="market-select-item ">
          <div class="market-select-category flex-box">
            <div class="type">Type</div>
            <a-select v-model="type" style="width: 140px" @change="selectChange($event, 'type')">
              <a-select-option v-for="(item, index) in typeList" :key="index" :value="item.cat_id">{{
                  item.cat_name
                }}
              </a-select-option>
            </a-select>
          </div>

        </div>
        <div class="market-select-item ">
          <div class="market-select-sort flex-box">
            <div class="type">{{ $t('sortBy') }}</div>
            <a-select v-model="sortBy" style="width: 140px" @change="selectChange($event, 'sortBy')">
              <a-select-option v-for="(item, index) in sortList" :key="index" :value="item.field">{{
                  item.name
                }}
              </a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div class="list-choose-box" v-if="device != 'mobile'">
        <div class="list-choose" :class="{active:listActive==1}" @click="listActive=1">
          <img v-show="listActive==1" src="@/assets/images/list.svg" alt="">
          <img v-show="listActive!=1" src="@/assets/images/list_gray.svg" alt="">
        </div>
        <div class="list-choose" :class="{active:listActive==2}" @click="listActive=2">

          <img v-show="listActive==2" src="@/assets/images/listmenu.svg" alt="">
          <img v-show="listActive!=2" src="@/assets/images/listmenu_gray.svg" alt="">
        </div>
      </div>
    </div>
    <div v-infinite-scroll="handleInfiniteOnLoad" class="demo-infinite-container" :infinite-scroll-disabled="busy"
         :infinite-scroll-distance="10">
      <a-list
          v-show="listActive==2||device == 'mobile'"
          class="markets-add-list"
          :grid="{
          gutter: device == 'mobile' ? 12 : 24,
          xs: 2,
          sm: 2,
          md: 2,
          lg: 4,
        }"
          :data-source="eventList"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <router-link
              :to="{
              name: 'nft-detail',
              params: {
                id: item.token_id,
              },
            }"
          >
            <div class="markets-info" :class="`markets-info-${item.total_supply}`">
              <div :class="'markets-info-title nft-star-' + item.total_supply">
                <div class="nft-star">
                  <span
                      v-for="i in item.total_supply"
                      :key="i"
                      :class="{
                      disabled: i > item['sale_info']['amount'],
                    }"
                  >
                  </span>
                </div>
              </div>
              <div class="markets-info-img" :class="{ 'markets-info-img-padding': !item.thumb_image_400 }">
                <img :src="item.thumb_image_400" style="width: 100%; height: 100%"/>
              </div>
              <div class="markets-info-intro">
                <div class="flex-box space-between">
                  <div class="id-box">
                    <label>Predi License&nbsp;</label>
                    <span>#{{ item.token_id }}</span>
                  </div>
                  <div class="status" :class="{rent:item.owner_status == 1}">
                    {{ item.owner_status == 1 ? 'Rent' : 'Sell' }}
                  </div>
                </div>
                <div class="flex-box space-between markets-info-intro-rent">
                  <p class="flex-box price-box">
                    <img class="trade-input-icon mg-r8" :src="payToken.icon"/>
                    {{ item.sale_info.price | decimals }} {{ payToken.name }}
                  </p>
                </div>
                <div class="flex-box time-box" style="height: 30px;">
                  <div>
                    <small v-if="item.owner_status == 1"
                    ><span>{{ item.sale_info.amount }} Times </span><span>{{ item.sale_info.term / 86400 }} Days</span></small>
                  </div>
                </div>
              </div>
              <div class="buy-now">
                Buy Now
              </div>
            </div>
          </router-link>
        </a-list-item>
      </a-list>

      <div class="list-box" v-show="listActive==1" v-if="device != 'mobile'">
        <div class="list-list-item"
             @click="$router.push({name:'nft-detail',params:{id:item.token_id}})"
             v-for="(item,index) in eventList" :key="index">
          <div class="main-content">
            <div class="logo-box">
              <div class="square">
                <img class="logo" :src="item.thumb_image_400" :alt="item.token_id" :title="item.token_id"/>
              </div>
              <div class="name">
                Predi License
                #{{ item.token_id }}
              </div>
            </div>
            <div class="position-info-box">
              <div class="position-info">
                <div class="in-line">
                  <div class="name">Price</div>
                  <div class="value">
                    <strong> {{ item.sale_info.price | decimals }} {{ payToken.name }}</strong>
                  </div>
                </div>
                <div class="in-line">
                  <div class="name">Issue Number</div>
                  <div class="value">
                    <strong> {{ item.sale_info.amount }} Times</strong>
                  </div>
                </div>
                <div class="in-line">
                  <div class="name">Available Times</div>
                  <div class="value">
                    <small v-if="item.owner_status == 1"
                    ><span>{{ item.sale_info.amount }} Times </span><span>{{ item.sale_info.term / 86400 }} Days</span></small
                    >
                    <strong v-else>- -</strong>
                  </div>
                </div>
                <div class="in-line">
                  <div class="name">
                    State
                  </div>
                  <div class="value status">
                    {{ item.owner_status == 1 ? 'Rent' : 'Sell' }}
                  </div>

                </div>
              </div>
            </div>
            <div class="btn-box">
              <a-button>Buy Now</a-button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="demo-loading-container">
        <a-spin/>
        loading
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
import {ticketMarket} from '@/api';

let loadingPage = false;
export default {
  directives: {infiniteScroll},
  name: 'nftMarket',
  data() {
    return {
      listActive: 1,
      loading: false,
      busy: false,
      listTotal: 0,
      page_num: 1,
      selectIndex: null,
      type: 0,
      sortBy: 'issue_times',
      typeList: [
        {
          cat_id: 0,
          cat_name: 'All',
        },
        {
          cat_id: 1,
          cat_name: 'Rent',
        },
        {
          cat_id: 2,
          cat_name: 'Sell',
        },
      ],
      sortList: [
        {
          name: 'Issue Times',
          field: 'issue_times',
        },
        {
          name: 'Price',
          field: 'price',
        },
        {
          name: 'Newest',
          field: 'sale_time',
        },
      ],
      eventList: [],
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
      allowance: (state) => state.allowance,
    }),
    ...mapGetters(['chainType', 'payToken']),
    starNumber() {
      return function (item) {
        let startMap = [1, 3, 5];
        let cat_id = item.total_supply;
        return startMap[cat_id - 1];
      };
    },
  },
  watch: {
    account: function (val) {
      if (!val) {
        return;
      }
      this.getEventList(1);
    },
  },
  mounted() {
    this.getEventList(1);
  },
  methods: {
    selectChange(val, code) {
      this[code] = val;
      this.getEventList(1);
    },
    async handleInfiniteOnLoad() {
      if (this.loading) return;
      if (this.eventList.length >= this.listTotal) {
        this.busy = true;
        this.loading = false;
        return;
      }
      this.loading = true;
      await this.getEventList(this.page_num + 1);
      this.loading = false;
    },
    async getEventList(page_num) {
      if (loadingPage) {
        return;
      }
      if (!this.chainType) {
        return;
      }
      loadingPage = true;
      if (!page_num) {
        page_num = 1;
      }
      let {data, code, msg, extra} = await ticketMarket({
        page: page_num,
        limit: 8,
        order_by: this.sortBy,
        chain: this.chainType,
        is_sale: this.type,
      });
      loadingPage = false;
      if (code != 0) {
        console.log(msg);
        return;
      }
      if (data.length <= 0 && page_num > this.page_num) {
        return;
      }
      this.page_num = page_num;
      this.listTotal = extra.total;
      if (page_num == 1) {
        this.eventList = data;
      } else {
        this.eventList = this.eventList.concat(data);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.header-content {
  display: flex;
  width: var(--content-width);
  margin: 0 auto;
  justify-content: space-between;
  padding-bottom: 20px;
}
.title {
  width: var(--content-width);
  margin: 0 auto;
  position: relative;
  z-index: 1;
  margin-bottom: 10px;
  font-size: 43px;
  font-family: Orelega One-Regular, Orelega One;
  font-weight: 400;
  color: #333333;
  display: flex;
  justify-content: space-between;
}
.market-select {
  display: flex;
  position: relative;
  flex-grow: 1;
  z-index: 2;
  font-family: 'Lucida-Grande';
  align-items: center;
  font-size: 16px;

  .market-select-item {
    opacity: 1;

    &:last-child {
      margin-left: 10px;
    }

    .type {
      font-size: 14px;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      color: #CCCCCC;
      display: block;
      height: 100%;
      padding-right: 6px;
      border-right: 1px solid #ccc;
    }

    .ant-select {
      font-family: Orelega One-Regular, Orelega One;
    }

    /deep/ .ant-select .ant-select-selection {
      background: none !important;
    }
  }

  @include font_color($font-color-s10, $font-color-s3);


  .market-select-button {
    button {
      width: 122px;
      height: 54px;
      background: $background-linear-color;
      border: none;
      border-radius: 10px;
    }

    .market-select-ticket {
      display: none;
    }
  }

  .ant-input-search {
    width: 208px;
    height: 54px;
    margin-left: 12px;

    /deep/ .ant-input {
      height: 54px;
      @include bg_color_change($background-color-change3, $background-color-change4);
      @include font_color($font-color-s, $font-color-s1);
      font-size: 16px;
      border: none;
      border-radius: 10px;
    }

    /deep/ .ant-input-suffix {
      right: 16px;

      .ant-input-search-icon {
        @include font_color($font-color-s, $font-color-s1);
        font-size: 16px;
      }
    }
  }

  /deep/ .ant-select {
    margin-left: 12px;

    .ant-select-selection {
      border: none;
      background: transparent;
      color: #ffffff;
      font-size: 16px;
      @include font_color($font-color-s, $font-color-s1);

      .ant-select-arrow {
        width: 22px;
        height: 22px;
        right: 0;
        margin-top: -10px;
        background-size: contain;
        background-repeat: no-repeat;
        @include bg_img_change('~@/assets/images/down-dark.svg', '~@/assets/images/down-light.svg');

        i {
          display: none;
        }
      }
    }
  }
}

.markets-add-list {
  max-width: var(--content-width);
  margin: 24px auto 0;
  min-height: 200px;

  /deep/ .ant-list-item {
    margin-bottom: 24px;
  }

  .markets-info {
    @include bg_color_change($background-color-change3, $background-color-change4);
    @include box_shadow_color;
    border-radius: 17px;
    padding: 0 9px 10px;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #fff;

    .buy-now {
      position: absolute;
      bottom: 0;
      height: 40px;
      background: rgba(242, 140, 24, 0.1);
      width: 100%;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      color: #F18C18;
      display: flex;
      align-items: center;
      justify-content: center;
      visibility: hidden;
      left: 0;
      border-radius: 0 0 17px 17px;
    }

    &:hover {
      border: 1px solid #782581;

      .buy-now {
        visibility: visible;
      }
    }

    .markets-info-img {
      width: 100%;
      @include bg_color_change($background-color-change7, $background-color-change8);

      &.markets-info-img-padding {
        padding-bottom: 100%;
      }

      img {
        border-radius: 17px;
        width: 100%;
        aspect-ratio: 1;
      }
    }

    .markets-info-intro {
      padding: 14px 0 30px;

      .price-box {
        font-family: Orelega One-Regular, Orelega One;
      }

      .flex-box {
        align-items: center;
      }

      .time-box {
        color: var(--mainColor);
      }

      .id-box {
        display: flex;
        font-size: 18px;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: #000000;
        white-space: nowrap;
      }

      .status {
        width: 50px;
        padding: 4px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(20, 110, 81, 0.1);
        border-radius: 43px 43px 43px 43px;
        border: 1px solid #146E51;
        font-size: 12px;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: #146E51;
      }

      p {
        @include font_color($font-color-s, $font-color-s1);
        font-size: 16px;
        padding-top: 12px;
        line-height: 20px;

        small {
          font-size: 12px;
          line-height: 18px;
          @include font_color($font-color-s10, $font-color-s11);
        }

        //&.status {
        //  @include font_color($font-color-s10, $font-color-s11);
        //}
      }
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
          margin-left: 2px;
          height: 20px;
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

    &.markets-info-3 {
      border-color: #c300f2;
    }

    &.markets-info-5 {
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
  ::v-deep .ant-list-item{
    height: 100%;
  }
}

.list-box {
  width: var(--content-width);
  margin: 0 auto;
}

.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
  @include font_color($font-color-s, $font-color-s1);
}

.nft-market-mobile {
  .title {
    font-size: 8vw !important;
  }
  .market-select {
    flex-direction: column;
    align-items: normal;
    margin-top: 0;
    font-size: 0.32rem;
    display: flex;

    .market-select-button {
      order: 1;
      display: flex;

      button {
        width: 2.28rem;
        height: 0.92rem;
        margin-right: 0.28rem;
        border-radius: 0.2rem;
      }

      .market-select-ticket {
        display: block;
        width: 2.44rem;
        height: 0.92rem;
        border-radius: 0.2rem;
        background: $background-linear-color;
        padding: 1px;
        @include font_color($font-color-s, $font-color-s1);
        font-family: 'Lucida-Grande-Bold';
        transition: ease-in-out, 0.2s, color;

        &:hover {
          color: #ddd;
        }

        span {
          height: 100%;
          @include bg_color_change($background-color-theme, $background-color-night);
          border-radius: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        i {
          margin-left: 0.16rem;
          width: 22px;
          height: 22px;
          background: url('~@/assets/images/forward.svg') no-repeat;
          background-size: contain;
        }
      }
    }

    .market-select-item {
      margin-top: 0.16rem;
      margin-left: 0;
      order: 2;
      flex-direction: column;
      align-items: normal;

      .type {
        width: 80px;
      }

      border-bottom: none;

      .ant-input-search {
        order: 1;
        margin-left: 0;
        margin-top: 0.28rem;
        width: 100%;
        height: 0.92rem;

        /deep/ .ant-input {
          height: 0.92rem;
          font-size: 0.32rem;
        }
      }

      .market-select-category {
        order: 2;
        display: flex;
        justify-content: space-between;
      }

      .market-select-sort {
        order: 3;
        display: flex;
        justify-content: space-between;
        border: none;
        margin-left: 0;
      }

      .market-select-divide {
        display: none;
      }
    }

    /deep/ .ant-select-selection {
      .ant-select-selection__rendered {
        margin-right: 36px;

        .ant-select-selection-selected-value {
          float: right;
        }
      }
    }
  }

  .markets-info-intro {
    .id-box {
      font-size: 16px !important;
    }

    .status {
      display: none !important;
    }

  }

  .nft-star {
    span {
      width: 10px !important;
      height: 12px !important;
    }
  }

  .price-box {
    font-size: 12px !important;
    white-space: nowrap;

  }

  .markets-add-list {
    margin: 0.24rem 0.4rem 0;

    .markets-info {
      border: none;
      border-radius: 0.2rem;

      .buy-now {
        visibility: visible;
        border-radius: 0 0 12px 12px;
      }

      .markets-info-intro {
        padding: 0.24rem 0 0.5rem;

        p {
          font-size: 0.32rem;
          padding-top: 0;
          line-height: 0.4rem;

          small {
            font-size: 0.24rem;
            line-height: 0.36rem;
          }
        }

        .markets-info-intro-rent {
          display: block;

          p {
            margin-top: 0.16rem;

            small {
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }

      .markets-info-title {
        height: 0.76rem;
        border-top-right-radius: 0.2rem;
        border-top-left-radius: 0.2rem;
      }

      &.markets-info-1 {
        border-color: #979797;
      }

      &.markets-info-2 {
        border-color: #c300f2;
      }

      &.markets-info-3 {
        &:after {
          border-radius: 0.2rem;
        }
      }
    }
  }
}
</style>
