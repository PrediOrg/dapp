<template>
  <div>
    <portfolioMobile v-if="device == 'mobile'"></portfolioMobile>
    <portfolioPc v-else></portfolioPc>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import portfolioMobile from './components/portfolioMobile';
import portfolioPc from './components/portfolioPc';
export default {
  name: 'LiquidityView',
  components: {
    portfolioMobile,
    portfolioPc,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
    }),
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.predi-portfolio {
  max-width: var(--content-width);
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding-top: 30px;
  .portfolio-col {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    height: 108px;
    color: #ffffff;
    font-family: "Lucida-Grande-Bold";
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
  @include font_color($font-color-s2, $font-color-s3);
  .market-select-category {
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  .market-select-sort{
    margin-left: 10px;
  }

}
.predi-table {
  padding-top: 10px;
  .table-amount {
    div {
      display: flex;
      align-items: center;
      color: #00ffab;
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
    .table-status-button {
      width: 100px;
      height: 32px;
      background-color: #ff503e;
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
      color: #ff503e;
      [data-theme='night'] & {
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
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
    }
    .table-status-appealing {
      font-size: 14px;
      color: var(--mainColor);

    }
    .table-status-small {
      font-size: 12px;
      @include font_color($font-color-s4, $font-color-s3);
      line-height: 14px;
      text-align: left;
      padding-top: 4px;
    }

    .ant-statistic {
      /deep/.ant-statistic-content {
        font-size: 14px;
        @include font_color($font-color-s, $font-color-s1);
      }
    }
    &.table-status-appeal {
      .table-status-button {
        color: #ffffff;
        background: var(--mainColor);
      }
      .table-status-subText {
        color: var(--mainColor);
        display: flex;
        i {
          width: 20px;
          height: 20px;
          background: url("~@/assets/images/warning.svg") no-repeat;
          background-size: contain;
          margin-right: 4px;
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
      }
      .market-select-sort {

        order: 3;
        display: flex;
        justify-content: space-between;
        padding-top: 0.16rem;
      }
      .market-select-divide {
        display: none;
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
