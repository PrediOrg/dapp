<template>
  <div class="predi-box" :class="{ 'predi-mobile': device == 'mobile' }">
    <header style="position: relative; z-index: 1000">
      <div class="header-box">
        <div class="header-content">
          <router-link to="/">
            <img class="logo" src="@/assets/images/logo_header.webp" alt="" />
          </router-link>
          <template v-if="device != 'mobile'">
            <predi-nav></predi-nav>
          </template>
<!--          <div class="fund-box">-->
<!--            <div class="fund-item" @click="$router.push('/deposit')">-->
<!--              <div class="value">$ {{ statics.portfolio | decimals(2) }}</div>-->
<!--              <div class="name">Portfolio</div>-->
<!--            </div>-->
<!--            <div class="fund-item">-->
<!--              <div class="value">$ {{ statics.cash | decimals(2) }}</div>-->
<!--              <div class="name">Cash</div>-->
<!--            </div>-->
<!--          </div>-->
          <wallet></wallet>
        </div>
<!--        <div class="fund-box-m">-->
<!--          <div class="fund-item" @click="$router.push('/deposit')">-->
<!--            <div class="value">$ {{ statics.portfolio | decimals(2) }}</div>-->
<!--            <div class="name">Portfolio</div>-->
<!--          </div>-->
<!--          <div class="fund-item">-->
<!--            <div class="value">$ {{ statics.cash | decimals(2) }}</div>-->
<!--            <div class="name">Cash</div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </header>
    <div class="markets-banner-layout" />
    <section style="flex-grow: 1">
      <router-view />
    </section>
    <footer-content></footer-content>
    <template v-if="device == 'mobile'">
      <predi-nav></predi-nav>
    </template>
  </div>
</template>
<script>
import wallet from '@/views/App/components/wallet';
import prediNav from '@/views/App/components/nav';
import footerContent from '@/views/App/components/footer';
import { mapGetters, mapState, mapActions } from 'vuex';
import BigNumber from 'bignumber.js';

export default {
  name: 'AppLayout',
  components: {
    wallet,
    prediNav,
    footerContent,
  },
  data() {
    return {
      BigNumber,
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
  },
  computed: {
    ...mapState({
      statics: (state) => state.statics,
      device: (state) => state.device,
      account: (state) => state.account,
    }),
    ...mapGetters(['isConnected']),
  },
  async mounted() {
    if (this.account) {
      this.initData();
    }
  },
  methods: {
    ...mapActions(['getUserInfo']),
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
  },
};
</script>
<style lang="scss">
.predi-box {
  font-family: Orelega One-Regular, Orelega One;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.markets-banner-layout {
  width: 100%;
  height: 26vw;
  //background: url('../../assets/images/nft_banner.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 0;
}

.predi-mobile {
  .markets-banner-layout {
    top: 0px;
    height: 400px;
    //background: url('../../assets/images/nft_banner_m.png') no-repeat;
    background-size: 100% 100%;
  }
}

.predi-table {
  .ant-table-body {
    table {
      border-collapse: separate;
      border-spacing: 0 24px;
    }
  }

  .ant-table-thead {
    border-spacing: 0;

    tr {
      th {
        background: transparent;
        @include font_color($font-color-s2, $font-color-s3);
        font-size: 14px;
        border: none;
        padding: 0 0 0 24px;

        &:last-child {
          padding-right: 24px;
        }
      }
    }
  }

  .ant-table-tbody {
    tr {
      @include box_shadow_color;
      @include bg_color_change($background-color-change3, $background-color-change4);
      border-radius: 10px;

      td {
        @include font_color($font-color-s, $font-color-s1);
        text-align: center;
        font-size: 16px;
        border: none;
        text-align: left;
        padding: 24px 0 24px 24px;
        height: 114px;

        &:first-child {
          padding-left: 20px;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        &:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          padding-right: 24px;
        }
      }

      &.ant-table-row-shadow {
        opacity: 0.4;

        &:hover {
          td {
            background: transparent;
          }
        }
      }
    }

    tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-shadow) > td,
    .ant-table-row-hover,
    .ant-table-row-hover > td {
      cursor: pointer;
      @include bg_color_important($background-color-change9, $background-color-change1);
    }

    .rise_color {
      color: #1caa3d;
    }

    .fall_coolor {
      color: #0e1d51;
    }

    .table-item-span {
      &.bg-1CAA3D {
        background: #1caa3d;
      }

      &.bg-CC2929 {
        background: #e32a20;
      }

      color: #ffffff;
      text-align: center;
      width: 28px;
      display: inline-block;
      border-radius: 2px;
      font-size: 12px;
    }
  }

  .ant-table-placeholder {
    border: none !important;
    color: #e4e4e4 !important;
    @include bg_color_change($background-color-change3, $background-color-change4);
    display: none;
  }

  .ant-empty-description {
    color: #e4e4e4 !important;
  }

  .ant-table-pagination.ant-pagination {
    float: none;
    text-align: center;
  }
}

.ant-list-empty-text {
  display: none;
}
</style>
<style scoped lang="scss">
.predi-box {
  //padding-bottom: 60px;
  background: #fff;

  header {
    position: relative;
    z-index: 10;

    .header-content {
      padding-top: 20px;
      margin: 0 auto;

      .logo {
        width: 130px;
        height: 36px;
      }

      width: var(--content-width);
      justify-content: space-between;
      display: flex;
      align-items: center;
    }

    .fund-box,
    .fund-box-m {
      display: flex;

      .fund-item {
        text-align: center;
        cursor: pointer;

        &:nth-child(2) {
          margin-left: 20px;
        }

        .name {
          font-size: 16px;
          font-weight: 400;
          color: rgba(114, 55, 0, 0.5);
        }

        .value {
          font-weight: 400;
          color: #146e51;
        }
      }
    }
    .fund-box-m {
      display: none;
      margin-top: 10px;
      .value {
        font-size: 20px;
      }
    }
  }
}

.predi-mobile {
  header {
    margin: 0.2rem 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 23vw !important;
      height: 6vw !important;
    }

    .predi-logo {
      .predi-logo-img {
        width: 2.46rem;
        height: 0.88rem;
        margin-top: 0;
        @include bg_img_change('~@/assets/images/logo-light.svg', '~@/assets/images/logo-dark.svg');
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .fund-box {
    display: none !important;
  }
  .fund-box-m {
    display: flex !important;
  }
}
</style>
