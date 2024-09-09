<template>
  <div :class="{ 'predi-market-mobile': device == 'mobile' }">
    <div class="markets-banner">
      <div class="markets-banner-text">
        <p><span>Betting Markets</span></p>
      </div>
      <div class="market-select">
        <div></div>
        <div class="market-select-item flex-box">
          <div class="market-select-category">
            <label>{{ $t('category') }}</label>
            <a-select v-model="category" style="width: 140px" @change="selectChange($event, 'category')">
              <a-select-option v-for="(item, index) in categoryList" :key="index" :value="item.cat_id">{{ item.cat_name }} </a-select-option>
            </a-select>
          </div>
          <div class="market-select-sort">
            <label>{{ $t('sortBy') }}</label>
            <a-select v-model="sortBy" style="width: 140px" @change="selectChange($event, 'sortBy')">
              <a-select-option v-for="(item, index) in sortList" :key="index" :value="index">{{ item.name }} </a-select-option>
            </a-select>
          </div>
          <div class="market-select-resolved">
            <a-checkbox @change="endChange">History</a-checkbox>
          </div>
          <a-input-search v-model="searchValue" placeholder="input search text" @search="onSearch" />
        </div>
        <div class="market-select-button">
          <a-button type="primary" size="large" @click="issue">
            {{ $t('issue') }}
            <a-icon type="plus" />
          </a-button>
          <!-- <router-link class="market-select-ticket" to="/nft"
            ><span>{{ $t('ticket') }}<i></i></span
          ></router-link> -->
        </div>
      </div>
    </div>
    <div v-infinite-scroll="handleInfiniteOnLoad" class="demo-infinite-container" :infinite-scroll-disabled="busy" :infinite-scroll-distance="10">
      <a-list class="markets-add-list" :grid="{ gutter: 12, xs: 1, sm: 1, md: 2, lg: 4 }" :data-source="eventList">
        <a-list-item slot="renderItem" slot-scope="item">
          <router-link
            :to="{
              name: 'market-detail',
              params: {
                id: item.id,
              },
            }"
          >
            <div class="markets-info">
              <div class="markets-info-title flex-box">
                <div class="logo">
                  <img v-if="!item.image" src="@/assets/images/battle-default.png" alt="" />
                  <img v-else :src="item.image" alt="" />
                </div>
                <p class="underlying">{{ item.underlying }}</p>
              </div>
              <div class="markets-info-row mg-t20">
                <label>Issuer</label>
                <div class="address">{{ item.issuer | showAddress }}</div>
              </div>
              <div class="markets-info-row">
                <label>{{ $t('subscribeEndDate') }}</label>
                <p class="markets-common-p" :class="{ red: BigNumber(new Date().getTime() / 1000).gt(item.close_date) }">
                  {{ item.close_date | timeFormat('MMM. DD,YYYY') }}
                </p>
              </div>
              <div class="markets-info-row">
                <label>{{ $t('marketEndDate') }}</label>
                <p class="markets-common-p" :class="{ red: BigNumber(new Date().getTime() / 1000).gt(item.maturity_date) }">
                  {{ item.maturity_date | timeFormat('MMM. DD,YYYY') }}
                </p>
              </div>
              <div class="markets-info-row">
                <label>{{ $t('category') }}</label>
                <div class="markets-info-img flex-box">
                  <img class="class-icon" :src="item.cat_icon" :alt="item.cat_name" :title="item.cat_name" />
                  <p
                    :style="{
                      color: item.color,
                    }"
                  >
                    {{ item.cat_name }}
                  </p>
                </div>
              </div>
              <div class="option-list">
                <div class="item" v-for="(option, index) in item.options" :key="index">
                  <div class="left">
                    {{ option.name }}
                  </div>
                  <div class="right">{{ BigNumber(option.amount).toFixed(2) }} {{ item.base_token }}</div>
                </div>
              </div>
            </div>
          </router-link>
        </a-list-item>
      </a-list>
      <div v-if="loading" class="demo-loading-container">
        <a-spin />
        loading
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import BigNumber from 'bignumber.js';
import infiniteScroll from 'vue-infinite-scroll';
import { eventMaket } from '@/api/index';
import { constants } from 'ethers';

let loadingPage = false;
export default {
  directives: { infiniteScroll },
  name: 'marketView',
  data() {
    return {
      BigNumber,
      loading: false,
      busy: false,
      page_num: 1,
      category: 0,
      sortBy: 'total_margin_desc',
      searchValue: '',
      categoryList: [
        {
          cat_icon: '',
          cat_id: 0,
          cat_name: 'All',
        },
      ],
      sortList: {
        total_margin_desc: {
          name: 'Volume',
          field: 'buy_sum',
          direction: 'desc',
        },
        created_at_desc: {
          name: 'Newest',
          field: 'created_at',
          direction: 'desc',
        },
        // price_desc: {
        //   name: "Price",
        //   field: "price",
        //   direction: "desc",
        // },
      },
      eventList: [],
      eventTotal: 0,
      isEnd: false,
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
    isApproved() {
      return new BigNumber(this.allowance).gt(1000000);
    },
  },
  watch: {
    account: function (val) {
      if (!val) {
        return;
      }
      this.getEventList(1);
    },
    chainType: function (val) {
      if (!val) {
        return;
      }
      this.getEventList(1);
    },
  },
  filters: {
    showAddress(addr) {
      if (!addr) {
        addr = constants.AddressZero;
      }
      return addr.slice(0, 4) + '...' + addr.slice(40, 42);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getEventList(1);
  },
  methods: {
    endChange(e) {
      this.isEnd = e.target.checked;
      this.getEventList(1);
    },
    selectChange(val, code) {
      this[code] = val;
      this.getEventList(1);
    },
    async handleInfiniteOnLoad() {
      if (this.loading) return;
      if (this.eventList.length >= this.eventTotal) {
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
        console.log('return loadingPage');
        return;
      }
      if (!this.chainType) {
        console.log('return chainType');
        return;
      }
      loadingPage = true;
      if (!page_num) {
        page_num = 1;
      }
      let sort = this.sortList[this.sortBy];
      let { data, code, msg, extra } = await eventMaket({
        chain: this.chainType,
        page: page_num,
        limit: 6,
        order_field: sort.field,
        order_direction: sort.direction,
        cat_id: this.category,
        is_end: this.isEnd ? '1' : '0',
        keyword: this.searchValue,
      });
      if (code != 0) {
        return;
      }
      extra.category_list.unshift({ cat_id: 0, cat_name: 'All' });
      this.categoryList = extra.category_list;
      if (code != 0) {
        console.log(msg);
        loadingPage = false;
        return;
      }
      if (data.length <= 0 && page_num > this.page_num) {
        loadingPage = false;
        return;
      }
      this.eventTotal = extra.total;
      this.page_num = page_num;
      if (page_num == 1) {
        this.eventList = data;
      } else {
        this.eventList = this.eventList.concat(data);
      }
      loadingPage = false;
    },
    issue() {
      this.$router.push('/issue');
    },
    onSearch() {
      this.getEventList(1);
    },
  },
};
</script>
<style scoped lang="scss">
.markets-banner {
  position: relative;

  &:before {
    content: '';
    width: 100%;
    height: 410px;
    position: absolute;
    left: 0;
    top: -118px;
    background: url('~@/assets/images/banner.svg') no-repeat top center;
    z-index: -1;
  }

  .markets-banner-text {
    max-width: var(--content-width);
    margin: 0 auto;

    p {
      padding-top: 50px;
      font-size: 40px;
      color: #333333;
      font-family: Orelega One-Regular, Orelega One;
    }
  }

  .market-select {
    display: flex;

    justify-content: space-between;
    align-items: center;
    max-width: var(--content-width);
    margin: 10px auto 0;
    font-size: 16px;
    @include font_color($font-color-s10, $font-color-s3);

    .market-select-category {
    }

    .market-select-sort {
      margin-left: 10px;
    }

    .market-select-resolved {
      margin-left: 20px;

      /deep/ .ant-checkbox-wrapper {
        .ant-checkbox {
          margin-right: 8px;
        }

        .ant-checkbox-inner {
          width: 22px;
          height: 22px;
          background: transparent;
          border-color: #979797;
        }

        .ant-checkbox-checked {
          .ant-checkbox-inner {
            &::after {
              border-color: #979797;
            }
          }
        }

        @include font_color($font-color-s, $font-color-s1);
        font-size: 16px;
      }
    }

    .market-select-button {
      button {
        padding: 0 30px;
        min-width: 160px;
        height: 50px;
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
  }
}

.markets-add-list {
  max-width: var(--content-width);
  min-height: 200px;
  margin: 24px auto 0;

  /deep/ .ant-list-item {
    padding-bottom: 24px;
    height: 100%;
  }

  /deep/ .ant-row {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;

    .ant-col {
    }
  }

  .markets-info {
    padding: 20px 0;
    font-size: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'Lucida-Grande';
    @include font_color($font-color-s, $font-color-s1);
    @include bg_color_change($background-color-change3, $background-color-change4);
    @include box_shadow_color;
    border-radius: 10px;
    position: relative;
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    @include border_color($background-color-change3, $background-color-change4);

    &:hover {
      border-color: var(--mainColor);
    }

    label {
      font-size: 12px;
      @include font_color($font-color-s10, $font-color-s2);
      line-height: 16px;
    }

    small {
      font-size: 12px;
      @include font_color($font-color-s2, $font-color-s3);
    }

    .markets-total-p {
      font-size: 20px;

      span {
        font-size: 14px;
      }
    }

    .markets-odds-p {
      font-size: 24px;
      font-family: 'Lucida-Grande-Bold';
      @include font_color($font-color-s9, $font-color-s8);
    }

    .markets-common-p {
      font-size: 14px;
      white-space: nowrap;

      &.red {
        color: red;
      }
    }

    /deep/ .ant-progress {
      .ant-progress-inner {
        display: block;
        background: transparent;
        border-width: 1px;
        border-style: solid;
        @include border_color($border-color-s9, $border-color-s10);
      }

      .ant-progress-bg {
        height: 10px !important;
      }
    }

    .markets-info-img {
      img {
        width: 30px;
        height: 30px;
      }

      p {
        font-size: 14px;
        margin-left: 4px;
        color: var(--mainColor);
      }
    }

    .option-list {
      height: 60px;
      mask-image: linear-gradient(white 65%, transparent 100%);
      -webkit-mask-image: linear-gradient(white 65%, transparent 100%);
      overflow: hidden;
      padding: 0 17px 5px;
      .item {
        display: flex;
        margin-bottom: 5px;
        justify-content: space-between;

        height: 30px;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #333333;

        .left {
          max-width: 130px;
          white-space: nowrap;
          overflow: hidden;
        }

        .right {
          width: 94px;
          height: 26px;
          background: #d0e2dc;
          border-radius: 4px 4px 4px 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          color: #146e51;
          overflow: hidden;
          white-space: nowrap;
        }

        &:nth-child(2) {
          .right {
            background: #d0d4e2;
            color: #14386e;
          }
        }
      }
    }

    .markets-info-row {
      padding: 5px 17px;
      display: flex;
      justify-content: space-between;
      font-family: Orelega One-Regular, Orelega One;

      label {
        font-size: 14px;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: #999999;
      }

      .address {
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: var(--mainColor);
      }

      .left,
      .right,
      .item {
        color: #146e51;
        font-size: 14px;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
      }

      .right {
        color: #db5959;
      }
    }

    .markets-info-title {
      align-items: flex-start;
      font-size: 15px;
      flex-grow: 1;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      color: #000000;
      padding: 0 17px 10px;
      border-bottom: 1px solid #eaeaea;

      .logo {
        width: 80px;
        height: 80px;
        margin-right: 10px;

        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          border-radius: 9px;
        }
      }
    }
  }
}

.trade-input-icon {
  width: 16px;
  height: 16px;
  background-size: contain;
}

.trade-input {
  border-width: 1px;
  border-style: solid;
  margin-left: 8px;
  border-color: #999999;
  border-radius: 18px;
  display: flex;
  height: 36px;
  align-items: center;

  .ant-input-number {
    flex: 2;
    border: none !important;
    background: none;
    box-shadow: none;

    .ant-input-number-input-wrap {
      margin-left: 20px;
    }
  }

  .trade-input-max {
    width: 68px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;

    div {
      p {
        font-size: 12px;
        line-height: 14px;
      }

      margin: 0 8px;
      padding-right: 8px;
      border-right: 1px solid #999999;
    }

    .trade-input-icon {
      flex: none;
    }
  }
}

.demo-infinite-container {
  position: relative;
}

.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
  @include font_color($font-color-s, $font-color-s1);
}

/deep/ .ant-select-selection {
  background: #fff !important;
}

.predi-market-mobile {
  .markets-banner {
    width: 100%;
    height: auto;
    background: url('~@/assets/images/nft-mobile-bg.png') no-repeat top center;
    background-size: contain;

    &:before {
      display: none;
    }

    .markets-banner-text {
      padding: 0.4rem 0 0;

      p {
        font-size: 0.48rem;
        line-height: 0.6rem;
        padding-top: 0;
      }
    }

    .market-select {
      flex-direction: column;
      align-items: normal;
      margin-top: 0.46rem;
      font-size: 0.32rem;

      .market-select-button {
        order: 1;
        display: flex;
        justify-content: space-between;

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
          padding: 1px;
          transition: ease-in-out, 0.2s, color;
          border: 1px solid var(--mainColor);
          color: var(--mainColor);

          span {
            height: 100%;
            border-radius: 0.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          i {
            margin-left: 0.16rem;
            width: 18px;
            height: 18px;
            background: url('~@/assets/images/right-icon.svg') no-repeat;
            background-size: contain;
          }
        }
      }

      .market-select-item {
        order: 2;
        flex-direction: column;
        align-items: normal;
        margin-top: 0.2rem;

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
          margin-top: 0.28rem;

          label {
            width: 100px;
          }
        }

        .market-select-sort {
          label {
            width: 100px;
          }

          order: 3;
          display: flex;
          justify-content: space-between;
          margin-top: 0.16rem;
          margin-left: 0;
          border: none;
        }

        .market-select-resolved {
          order: 4;
          font-size: 0.32rem;
          margin: 0.2rem 0;
          display: flex;
          justify-content: flex-end;
        }

        .market-select-divide {
          display: none;
        }
      }
    }
  }

  .markets-add-list {
    margin: 0.28rem 0.4rem;

    .markets-info {
      padding: 0.24rem 0 0.28rem;
      border: none;

      .markets-info-img {
        img {
          width: 0.56rem;
          height: 0.56rem;
        }

        p {
          font-size: 0.28rem;
          margin-left: 0.08rem;
        }
      }

      .markets-info-title {
        align-items: flex-start;

        p {
          font-size: 0.32rem;
          line-height: 0.44rem;
        }
      }

      .label {
        font-size: 0.24rem;
        line-height: 0.32rem;
      }

      .markets-odds-p {
        font-size: 0.48rem;
      }

      .markets-common-p {
        font-size: 0.28rem;
      }

      .markets-total-p {
        font-size: 0.44rem;

        span {
          font-size: 0.28rem;
        }
      }
    }
  }
}
</style>
