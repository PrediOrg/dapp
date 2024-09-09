<template>
  <div
    class="detail-form-tabs"
    :class="{ 'mobile-form-tabs': device == 'mobile' }"
  >
    <div class="market-select">
      <a-select v-model="type" style="width: 100px" @change="selectChange">
        <a-select-option
          v-for="(item, index) in typeList"
          :key="index"
          :value="item.cat_id"
          >{{ item.cat_name }}</a-select-option
        >
      </a-select>
    </div>
    <div class="detail-form-tabs-table">
      <a-row>
        <a-col :span="4">
          <label>Type</label>
        </a-col>
        <a-col :span="7">
          <label>Price</label>
        </a-col>
        <a-col :span="5">
          <label>Time</label>
        </a-col>
        <a-col :span="8">
          <label>Action Time</label>
        </a-col>
      </a-row>
      <div class="claim-table-scroll">
        <a-list
          :data-source="mobileData.list"
          :pagination="mobileData.pagination"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-row class="cyrox-table-row">
              <a-col :span="4">
                <p>{{ typeDict[item.type] }}</p>
              </a-col>
              <a-col :span="7" align="center">
                <p class="flex-box">
                  <span
                    class="trade-input-icon mg-r4"
                    :style="{
                      background: 'url(' + detail.token_icon + ') no-repeat',
                    }"
                  ></span
                  >{{ item.amount | decimals(4) }}
                  {{payToken.name}}
                </p>
              </a-col>
              <a-col :span="5">
                <p>{{ item.balance }} Times</p>
              </a-col>
              <a-col :span="8">
                <p>{{ item.created_at | timeFormat("MMM. DD,YYYY") }}</p>
              </a-col>
            </a-row>
          </a-list-item>
          <div v-if="loading && !busy" class="loading-container">
            <a-spin />
          </div>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { ticketTransaction } from "@/api";
export default {
  name: "nftDetailScroll",
  props: {
    detail: Object,
  },
  data() {
    return {
      mobileData: {
        list: [],
        pagination: {
          current: 1,
          total: 0,
          pageSize: 5,
          size: "small",
          onChange: (page) => {
            this.mobileData.pagination.current = page;
            this.getHistory(this.mobileData.pagination);
          },
        },
      },
      activeKey: "1",
      loading: false,
      busy: false,
      scrollHeight: "auto",
      typeDict: {
        1: "Rent",
        2: "Sell",
      },
      type: 0,
      typeList: [
        {
          cat_id: 0,
          cat_name: "All",
        },
        {
          cat_id: 1,
          cat_name: "Rent",
        },
        {
          cat_id: 2,
          cat_name: "Sell",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
      ...mapGetters(["isConnected"]),
    }),
    ...mapGetters(["chainType",'payToken']),
  },
  watch: {
    detail: {
      immediate: true,
      handler() {
        if (this.detail.history) {
          this.mobileData.list = this.detail.history;
          this.mobileData.pagination.total = this.detail.history_total;
        }
      },
    },
  },
  methods: {
    getHistory(pagination) {
      ticketTransaction({
        chain: this.chainType,
        page: pagination.current,
        limit: pagination.pageSize,
        token_id: this.detail.token_id,
        type: this.type,
        address: this.account,
      }).then(({ data, code, extra }) => {
        if (code != 0) {
          return;
        }
        if (pagination.current == 1) {
          this.mobileData.list = data;
        } else {
          this.mobileData.list = this.mobileData.list.concat(data);
        }
        pagination.total = extra.total;
        this.mobileData.pagination = pagination;
      });
    },
    selectChange(type) {
      this.type = type;
      this.mobileData.pagination.current = 1;
      this.getHistory(this.mobileData.pagination);
    },
  },
};
</script>
<style lang="scss" scoped>
.detail-form-tabs {
  position: relative;
  border-radius: 10px;
  padding: 16px 0 24px;
  @include bg_color_change(
                  $background-color-change3,
                  $background-color-change4
  );
  .market-select {
    position: absolute;
    right: 0;
    top: -30px;
    /deep/.ant-select {
      background: #FFFFFF;
      border-radius: 9px 9px 9px 9px;
      border: 1px solid #EAEAEA;
      padding-left: 10px;
      font-weight: 400;
      color: #333333;
      font-family: Orelega One-Regular, Orelega One;
    }

    /deep/ .ant-select .ant-select-selection {
      background: none !important;
    }
    /deep/.ant-select {
      .ant-select-selection {
        border: none;
        box-shadow: none;
        background: transparent;
        @include font_color($font-color-s2, $font-color-s5);
        font-size: 12px;
        .ant-select-selection__rendered {
          margin-left: 0;
        }
      }
    }
  }
  .detail-form-tabs-table {
    label {
      font-size: 12px;
      @include font_color($font-color-s10, $font-color-s5);
    }
  }
  .cyrox-table-row {
    width: 100%;
    font-family: Orelega One-Regular, Orelega One;
    p {
      padding-top: 8px;
      font-size: 14px;
      line-height: 20px;
      @include font_color($font-color-s, $font-color-s1);
    }
  }

  /deep/.ant-list {
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
.mobile-form-tabs {
  border-radius: 0.2rem;
  padding: 0.16rem 0 0.24rem;
  .detail-form-tabs-table {
    label {
      font-size: 0.24rem;
    }
  }
  .cyrox-table-row {
    p {
      padding-top: 0.16rem;
      font-size: 0.24rem;
      line-height: 0.4rem;
    }
  }
}
</style>
