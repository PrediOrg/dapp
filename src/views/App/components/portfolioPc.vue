<template>
  <div class="predi-portfolio" :class="{ 'predi-portfolio-mobile': device == 'mobile' }">
    <a-row :gutter="24" v-if="typeIndex === 1">
      <a-col :xs="24" :sm="12" :md="12" :lg="8">
        <div class="portfolio-col">
          <p>Bought products</p>
          <p>{{ LP_statics.event_total }}</p>
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8">
        <div class="portfolio-col portfolio-col2">
          <p>Pending</p>
          <p>{{ LP_statics.wait_receive }}</p>
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8">
        <div class="portfolio-col portfolio-col3">
          <p>Total Payoff</p>
          <p>${{ LP_statics.received | decimals(0, false) }}</p>
        </div>
      </a-col>
    </a-row>
    <a-row v-else :gutter="24">
      <a-col :xs="24" :sm="12" :md="12" :lg="8">
        <div class="portfolio-col portfolio-col2">
          <p>Issued products</p>
          <p>{{ issued_statics.event_total }}</p>
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8">
        <div class="portfolio-col">
          <p>
            {{ $t('eventConfirming') }}
          </p>
          <p>{{ issued_statics.event_confirming }}</p>
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="8">
        <div class="portfolio-col portfolio-col3">
          <p>{{ $t('totalProfit') }}</p>
          <p>${{ issued_statics.total_profit | decimals(0, false) }}</p>
        </div>
      </a-col>
    </a-row>
    <div class="market-select">
      <div class="market-select-item flex-box">
        <div class="market-select-category">
          <label>{{ $t('category') }}</label>
          <a-select v-model="category" style="width: 140px" @change="selectChange($event, 'category')">
            <a-select-option v-for="(item, index) in categoryList" :key="index" :value="item.cat_id">{{ item.cat_name }}</a-select-option>
          </a-select>
        </div>
        <div class="market-select-sort">
          <label>{{ $t('sortBy') }}</label>
          <a-select v-model="sortBy" style="width: 140px" @change="selectChange($event, 'sortBy')">
            <a-select-option v-for="(item, index) in sortList" :key="index" :value="index">{{ item.name }}</a-select-option>
          </a-select>
        </div>
      </div>
      <ul class="liguidity-tabs flex-box cursor">
        <li :class="['tab', { active: typeIndex === 1 }]" @click="onChangeTab(1)">Bought</li>
        <li :class="['tab', { active: typeIndex === 2 }]" @click="onChangeTab(2)">
          {{ $t('issued') }}
        </li>
      </ul>
    </div>
    <div class="predi-table">
      <!-- bought -->
      <a-table
        :columns="getColumns(depositedData)"
        :data-source="depositedData.list"
        :pagination="depositedData.pagination"
        v-if="typeIndex === 1"
        @change="getRewardList"
        :type="1"
        :customRow="customRow"
        rowKey="id"
      >
        <template slot="underlying" slot-scope="text">
          {{ substrLen(text, 90) }}
        </template>
        <template slot="profit" slot-scope="text, record">
          <div class="table-amount">
            <div><img :src="record.token_icon" width="16" height="16" />{{ text | decimals }}</div>
          </div>
        </template>
        <template slot="positions" slot-scope="options, record">
          <div class="table-amount table-deposited">
            <div v-for="_option in options" :key="_option.id"><img :src="record.token_icon" width="16" height="16" /> {{ _option['name'] }}:{{ _option['amount'] | decimals(2) }}</div>
          </div>
        </template>
        <!-- status -->
        <template slot="status" slot-scope="status, record">
          <div class="table-status">
            <status :item="record"></status>
          </div>
        </template>
      </a-table>
      <!-- issued -->
      <a-table
        :columns="getColumns(issuedData)"
        :data-source="issuedData.list"
        :pagination="issuedData.pagination"
        v-if="typeIndex === 2"
        @change="getRewardList"
        :customRow="customRow"
        :rowClassName="customRowClassName"
        rowKey="id"
      >
        <template slot="underlying" slot-scope="text">
          {{ substrLen(text, 90) }}
        </template>
        <!-- <template slot="profit" slot-scope="profit, record">
          <div class="table-amount">
            <div><img :src="record.token_icon" width="16" height="16" />{{ record.occur_balance | decimals }}</div>
            <div><img :src="record.token_icon" width="16" height="16" />{{ record.not_occur_balance | decimals }}</div>
          </div>
        </template> -->
        <template slot="deposited" slot-scope="options, record">
          <div class="table-amount table-deposited">
            <div v-for="_option in options" :key="_option.id"><img :src="record.token_icon" width="16" height="16" /> {{ _option['name'] }}:{{ _option['amount'] | decimals(2) }}</div>
          </div>
        </template>
        <!-- issued status -->
        <template slot="status" slot-scope="status, item">
          <div v-if="item.audit_status == 0" class="table-status">
            <p class="table-status-opera">Audit:{{ $t('checking') }}</p>
          </div>
          <div v-else-if="item.audit_status == 2" class="table-status">
            <p>Audit:{{ $t('fail') }}</p>
          </div>
          <div v-else class="table-status">
            <status :item="item"></status>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import status from './status';
import { bought, issued } from '@/api/index';
import moment from 'moment';
const dateShow = function (timestamp) {
  return moment.unix(timestamp).utc().format('MMM. DD,YYYY');
};
export default {
  name: 'LiquidityPc',
  components: {
    status,
  },
  data() {
    return {
      now: parseInt(new Date().getTime() / 1000),
      showAppeal: false,
      issued_statics: {
        event_confirming: '',
        event_total: '',
        total_profit: '',
        profit_yesterday: '',
      },
      LP_statics: {
        event_confirming: '',
        event_total: '',
        total_profit: '',
      },
      category: 0,
      sortBy: 'total_margin_desc',
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
          field: 'total_margin',
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
      depositedData: {
        name: 'depositedData',
        list: [],
        pagination: {
          current: 1,
          total: 0,
          pageSize: 10,
          size: 'small',
        },
        columns: [
          {
            title: this.$t('forecastEvent'),
            dataIndex: 'underlying',
            key: 'underlying',
            scopedSlots: { customRender: 'underlying' },
            width: '26%',
          },
          {
            title: this.$t('marketEndDate') + ' (UTC)',
            dataIndex: 'maturity_date',
            key: 'maturity_date',
            customRender: dateShow,
            width: '16%',
          },
          {
            title: 'Positions',
            dataIndex: 'options',
            key: 'options',
            scopedSlots: { customRender: 'positions' },
            width: '17%',
          },
          // {
          //   title: this.$t("profit"),
          //   dataIndex: "profit",
          //   key: "profit",
          //   scopedSlots: { customRender: "profit" },
          //   width: "17%",
          // },
          {
            title: this.$t('status'),
            dataIndex: 'status',
            align: 'center',
            key: 'status',
            scopedSlots: { customRender: 'status' },
            width: '26%',
          },
        ],
        columnsMobile: [
          {
            title: this.$t('status'),
            dataIndex: 'status',
            key: 'status',
            scopedSlots: { customRender: 'status' },
            width: '40%',
          },
          {
            title: this.$t('forecastEvent'),
            dataIndex: 'underlying',
            key: 'underlying',
            scopedSlots: { customRender: 'underlying' },
            width: '60%',
          },
        ],
      },
      issuedData: {
        name: 'issuedData',
        list: [],
        pagination: {
          current: 1,
          total: 0,
          pageSize: 10,
          size: 'small',
        },
        columns: [
          {
            title: this.$t('forecastEvent'),
            dataIndex: 'underlying',
            key: 'underlying',
            width: '26%',
          },
          {
            title: this.$t('marketEndDate') + ' (UTC)',
            dataIndex: 'maturity_date',
            key: 'maturity_date',
            customRender: dateShow,
            width: '14%',
          },
          {
            title: 'Options',
            dataIndex: 'options',
            key: 'options',
            scopedSlots: { customRender: 'deposited' },
            width: '20%',
          },
          // {
          //   title: 'Rewards/EM Profit',
          //   dataIndex: 'profit',
          //   key: 'profit',
          //   scopedSlots: { customRender: 'profit' },
          //   width: '20%',
          // },
          {
            title: this.$t('status'),
            dataIndex: 'status',
            align: 'center',
            key: 'status',
            scopedSlots: { customRender: 'status' },
            width: '20%',
          },
        ],
        columnsMobile: [
          {
            title: this.$t('status'),
            dataIndex: 'status',
            key: 'status',
            scopedSlots: { customRender: 'status' },
            width: '40%',
          },
          {
            title: this.$t('forecastEvent'),
            dataIndex: 'underlying',
            key: 'underlying',
            scopedSlots: { customRender: 'underlying' },
            width: '60%',
          },
        ],
      },
      typeIndex: 1,
      statusDict: [],
      appealStatusDict: [],
      selectItem: {},
      // account: "0xc9715FBE2f64Aa57DD414fbAadDC8671a6aa57aD",
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
    }),
    ...mapGetters(['chainType']),
    deadline() {
      return function (val) {
        return parseInt(val.challenge_end) - parseInt(val.challenge_start);
      };
    },
    substrLen() {
      return function (val, len) {
        if (val.length >= len) {
          return val.substr(0, len) + '...';
        } else {
          return val;
        }
      };
    },
    getColumns() {
      return function (val) {
        if (this.device == 'mobile') {
          return val['columnsMobile'];
        } else {
          return val['columns'];
        }
      };
    },
  },
  watch: {
    account: function (val) {
      if (!val) {
        return;
      }
      this.getDepositedList();
    },
  },
  mounted() {
    let query = this.$router.history.current.query;
    if (query.type) {
      this.typeIndex = query.type === 'issued' ? 2 : 1;
    }
    this.getDepositedList();
  },
  methods: {
    async getDepositedList(pagination) {
      if (!this.account) return;
      if (this.typeIndex === 1) {
        if (!pagination) {
          pagination = this.depositedData.pagination;
        }
        let sort = this.sortList[this.sortBy];
        let { data, code, extra } = await bought({
          chain: this.chainType,
          page: pagination.current,
          limit: pagination.pageSize,
          order_field: sort.field,
          order_direction: sort.direction,
          cat_id: this.category,
          address: this.account,
        });
        if (code === 0) {
          this.depositedData.list = data;
          this.depositedData.pagination.total = extra.total;
          this.depositedData.pagination.current = pagination.current;
        }
        extra.category_list.unshift({ cat_id: 0, cat_name: 'All' });
        this.LP_statics = extra.statics;
        this.categoryList = extra.category_list;
        this.statusDict = extra.status_dict;
        this.appealStatusDict = extra.challenge_status_dict;
      } else {
        if (!pagination) {
          pagination = this.issuedData.pagination;
        }
        let sort = this.sortList[this.sortBy];
        let { data, extra, code } = await issued({
          user: this.account,
          chain: this.chainType,
          page: pagination.current,
          limit: pagination.pageSize,
          order_field: sort.field,
          order_direction: sort.direction,
          cat_id: this.category,
          address: this.account,
        });
        if (code === 0) {
          this.issuedData.pagination.total = extra.total;
          this.issuedData.pagination.current = pagination.current;
          this.issuedData.list = data;
        }
        extra.category_list.unshift({ cat_id: 0, cat_name: 'All' });
        this.issued_statics = extra.statics;
        this.categoryList = extra.category_list;
        this.statusDict = extra.status_dict;
        this.appealStatusDict = extra.challenge_status_dict;
      }
    },
    appealClick(record) {
      this.selectItem = record;
      this.showAppeal = true;
    },
    onChangeTab(type) {
      this.typeIndex = type;
      let newQuery = {
        type: type == 1 ? 'bought' : 'issued',
      };
      this.$router.replace({ query: newQuery });
      this.getDepositedList();
    },
    getRewardList(e) {
      this.getDepositedList(e);
    },
    onShowSizeChange(e) {
      console.log(e);
    },
    customRow(record, index) {
      return {
        on: {
          click: (event) => {
            console.log(record, index, event);
            this.$router.push({
              name: 'market-detail',
              params: {
                id: record.id,
              },
              query: {
                type: this.typeIndex == 1 ? 'deposit' : '',
              },
            });
          },
        },
      };
    },
    customRowClassName(record) {
      if (record.audit_status == 0) {
        return 'ant-table-row-shadow';
      }
    },
    selectChange(val, code) {
      this[code] = val;
      this.getDepositedList();
    },
  },
};
</script>
<style scoped lang="scss">
.predi-portfolio {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
  .portfolio-col {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    height: 108px;
    color: #ffffff;
    font-family: 'Lucida-Grande-Bold';
    background: var(--mainColor);
    border-radius: 10px;
    &.portfolio-col2 {
      background: var(--mainColor);
    }
    &.portfolio-col3 {
      background: var(--mainColor);
    }
    p:first-child {
      width: 45%;
      font-size: 16px;
    }
    p:last-child {
      font-size: 50px;
    }
  }
}
.market-select {
  display: flex;
  justify-content: space-between;
  font-family: 'Lucida-Grande';
  align-items: center;
  max-width: var(--content-width);
  margin: 54px 0 0;
  font-size: 16px;
  @include font_color($font-color-s10, $font-color-s3);
  .market-select-category {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    @include border_color($border-color-s9, $border-color-s10);
  }
  .market-select-sort {
    margin-left: 10px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    @include border_color($border-color-s9, $border-color-s10);
  }
  .liguidity-tabs {
    width: 242px;
    height: 54px;
    padding: 4px;
    @include bg_color_change($background-color-change15, $background-color-change14);
    @include box_shadow_color;
    border-radius: 10px;
    justify-content: space-between;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Lucida-Grande-Bold';
      @include font_color($font-color-s7, $font-color-s1);
      width: 50%;
      height: 46px;
      &.active {
        @include bg_color_change($background-color-change3, $background-color-change12);
        @include box_shadow_color;
        border-radius: 10px;
        @include font_color($font-color-s, $font-color-s1);
      }
    }
  }
}
.predi-table {
  padding-top: 10px;
  .table-amount {
    div {
      display: flex;
      align-items: center;
      @include font_color($font-color-s9, $font-color-s8);
      img {
        margin-right: 8px;
      }
    }
  }
  .table-deposited {
    div {
      @include font_color($font-color-s, $font-color-s1);
    }
  }
  .table-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
    .table-status-button {
      width: 100px;
      height: 32px;
      background-color: var(--mainColor);
      color: #ffffff;
      [data-theme='night'] & {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
      }
      border-radius: 6px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .table-status-subText {
      font-size: 14px;
      color: var(--mainColor);
      [data-theme='night'] & {
      }
      padding-top: 6px;
      display: flex;
      align-items: center;
      i {
        width: 20px;
        height: 20px;
        background: url('~@/assets/images/warning.svg') no-repeat;
        background-size: contain;
        margin-right: 4px;
      }
    }
    p {
      font-size: 14px;
      @include font_color($font-color-s, $font-color-s1);
      &.table-status-opera {
        color: var(--mainColor);
      }
    }
    .table-status-small {
      font-size: 12px;
      @include font_color($font-color-s4, $font-color-s3);
      line-height: 14px;
      text-align: left;
      padding-top: 4px;
    }
  }
}
.cyrox-modal {
  /deep/.ant-modal-content {
    background: transparent;
    .ant-modal-close {
      top: -12px;
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
    background: #2d2e32;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 36px 48px 58px;
    .cyrox-modal-title {
      font-size: 18px;
      font-family: 'Lucida-Grande-Bold';
      text-align: center;
      color: #ffffff;
    }
    .cyrox-modal-body {
      padding-top: 10px;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
      p {
        padding-top: 20px;
      }
    }
    .cyrox-modal-btn {
      padding-top: 40px;
      button {
        border: none;
        height: 54px;
        background: #2d2e32;
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        font-size: 20px;
        font-family: 'Lucida-Grande-Bold';
        color: #ffffff;
        width: 100%;
      }
    }
  }
}
.predi-portfolio-mobile {
  margin: 0 0.4rem;
  padding-top: 0.28rem;
  .portfolio-col {
    padding: 0.24rem;
    height: 1.56rem;
    margin-bottom: 0.16rem;
    flex-direction: column;
    align-items: flex-start;
    p:first-child {
      font-size: 0.24rem;
      width: 100%;
    }
    p:last-child {
      font-size: 0.6rem;
    }
  }
  .market-select {
    flex-direction: column;
    align-items: normal;
    margin-top: 0.12rem;
    font-size: 0.32rem;
    .liguidity-tabs {
      order: 1;
      width: 100%;
      height: 0.92rem;
      padding: 0.08rem;
      border-radius: 0.1rem;
      li {
        height: 0.76rem;
        border-radius: 0.1rem;
      }
    }
    .market-select-item {
      order: 2;
      flex-direction: column;
      align-items: normal;
      .market-select-category {
        order: 2;
        display: flex;
        justify-content: space-between;
        padding-top: 0.28rem;
        border-bottom: 1px solid #979797;
      }
      .market-select-sort {
        order: 3;
        display: flex;
        justify-content: space-between;
        padding-top: 0.16rem;
        border: none;
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
</style>
