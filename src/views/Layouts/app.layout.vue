<template>
  <div class="predi-box" :class="{ 'predi-mobile': device == 'mobile' }">
    <header style="position: relative; z-index: 1000">
      <div class="header-box">
        <div class="header-content">
          <router-link to="/">
            <div class="logo-box">
              <img class="logo" src="@/assets/images/logo.svg" alt="" />
              <span>Predi</span>
            </div>
          </router-link>
          <template v-if="device != 'mobile'">
            <predi-nav></predi-nav>
          </template>

          <div class="fund-box">
            <div class="market-select-button">
              <a-button type="primary"  @click="issue">
                <a-icon type="plus" />
                Create New
              </a-button>
            </div>
            <div class="fund-item" @click="$router.push('/deposit')">
              <div class="value">$ {{ statics.portfolio | decimals(2) }}</div>
              <div class="name">Balance</div>
            </div>
            <div class="fund-item">
              <div class="value">$ {{ statics.cash | decimals(2) }}</div>
              <div class="name">Cash</div>
            </div>
          </div>
          <div class="theme-box" v-if="device !== 'mobile'">
            <svg t="1736430142309" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19319" width="26" height="26"><path d="M122.752 487.2H38.336c-12.896 0-23.264 10.336-23.264 23.264s10.368 23.232 23.264 23.232h84.416a23.232 23.232 0 1 0 0-46.496z m93.344-240.672c8.928 8.96 23.616 8.96 32.896 0a23.488 23.488 0 0 0 0-32.896L193.92 158.56a22.912 22.912 0 0 0-32.928 0 22.912 22.912 0 0 0 0 32.896l55.104 55.072z m6.816 521.056l-61.92 61.888a22.912 22.912 0 0 0 0 32.896 23.584 23.584 0 0 0 32.928 0l61.888-61.856a23.584 23.584 0 0 0 0-32.928 22.912 22.912 0 0 0-32.896 0z m290.016-636.224a23.2 23.2 0 0 0 23.264-23.232V35.872c0-12.896-10.368-23.264-23.264-23.264s-23.264 10.368-23.264 23.264v72.256c0 12.864 10.368 23.232 23.264 23.232z m474.24 355.84h-74.048c-12.896 0-23.264 10.336-23.264 23.264s10.368 23.232 23.264 23.232h74.048a23.232 23.232 0 1 0 0-46.496z m-474.24 388.032a23.456 23.456 0 0 0-23.264 23.264v86.176c0 12.896 10.368 23.264 23.264 23.264s23.264-10.368 23.264-23.264v-86.176a23.456 23.456 0 0 0-23.264-23.264z m319.008-716.672l-50.08 49.728a23.488 23.488 0 0 0 0 32.896c9.28 9.28 23.968 9.28 32.928 0l50.08-49.728a23.488 23.488 0 0 0 0-32.896 22.912 22.912 0 0 0-32.928 0z m-24.32 613.696a23.424 23.424 0 0 0-32.896 0 23.488 23.488 0 0 0 0 32.896l57.184 57.216a23.584 23.584 0 0 0 32.928 0 23.488 23.488 0 0 0 0-32.896l-57.216-57.216zM517.92 202.176c-166.304 0-301.504 134.816-301.504 301.12 0 166.656 135.2 301.472 301.504 301.472s301.12-134.816 301.12-301.472c0-166.304-134.848-301.12-301.12-301.12z m0 550.4a249.28 249.28 0 0 1-249.28-249.28 249.44 249.44 0 0 1 199.2-244.288 245.728 245.728 0 0 0-26.464 111.936 249.28 249.28 0 0 0 299.36 244.256 249.408 249.408 0 0 1-222.784 137.344z" fill="#98A2B3" p-id="19320"></path></svg>
            <div class="framer-17uat6s-container" id="toggle-theme" style="opacity: 1;">
              <div data-framer-component-type="Frame"   data-framer-cursor="pointer"
                   data-framer-highlight="true"
                   style="display: flex; flex: 0 0 auto; width: 50px; height: 26px; align-items: center; justify-content: space-between; background: rgb(102, 112, 133); border-radius: 15px; cursor: pointer; position: relative; padding: 0px 7.5px; transform: none;">
                <div data-framer-component-type="Frame"  id="tapLight"
                     style="display: flex; flex: 0 0 auto; pointer-events: none; width: 22.5px; height: 22.5px; background: rgb(255, 255, 255); border-radius: 50%; position: absolute;  transition: left 0.2s; align-items: center; justify-content: center; transform: none;">
                  <div data-framer-component-type="Frame"

                       style="display: block; flex: 0 0 auto; pointer-events: none; width: 22.5px; height: 22.5px; background: transparent; overflow: hidden; transform: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                         fill="#000000" width="22.5" height="22.5"></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <wallet style="position: relative;z-index: 1000"></wallet>
        </div>
        <div class="fund-box-m">
          <div class="fund-item" @click="$router.push('/deposit')">
            <div class="value">$ {{ statics.portfolio | decimals(2) }}</div>
            <div class="name">Balance</div>
          </div>
          <div class="fund-item">
            <div class="value">$ {{ statics.cash | decimals(2) }}</div>
            <div class="name">Cash</div>
          </div>
          <div class="market-select-button" style="margin-left: 10px">
            <a-button type="primary"  @click="issue">
              <a-icon type="plus" />
              Create New
            </a-button>
          </div>
        </div>
      </div>
    </header>
    <div class="markets-banner-layout" />
    <section style="flex-grow: 1;padding-bottom: 80px">
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

    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const div = document.getElementById("tapLight");
    const currentTheme = document.body.getAttribute("data-theme");

    // 切换主题
    if (isDarkMode||currentTheme === "dark") {
      div.style.left = "calc(100% - 26.25px)";  // 第一种样式的 left 值
      document.body.setAttribute("data-theme", "dark");
    }
    document.getElementById("toggle-theme").addEventListener("click", function() {
      const div = document.getElementById("tapLight");
      const currentTheme = document.body.getAttribute("data-theme");
      // 切换主题
      if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "light");
        div.style.left = "3.75px";  // 第二种样式的 left 值
      } else {
        document.body.setAttribute("data-theme", "dark");
        div.style.left = "calc(100% - 26.25px)";  // 第一种样式的 left 值
      }
    });
  },
  methods: {
    ...mapActions(['getUserInfo']),
    issue() {
      this.$router.push('/issue');
    },
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
<style lang="scss" scoped>
.theme-box{
  display: flex;
  align-items: center;
  svg{
    margin-right: 5px;
  }
}
header{
  border-bottom: 1px solid var(--LineColor2);
}
.predi-box {

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
        color: var(--FontColor1);
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
       background: var(--BGColor2);
      border-radius: 10px;

      td {
        color: var(--FontColor1);
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
       background: var(--BGColor2);
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

  /deep/.ant-table-placeholder {
    border: none !important;
    color: var(--LineColor) !important;
    background: var(--BGColor2);
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
  background: var(--BGColor0);

  header {
    position: relative;
    z-index: 10;

    .header-content {
      padding: 16px 0;
      margin: 0 auto;
      .logo-box{
        display: flex;
        align-items: center;
        span{
          font-size: 18px;
          color: var(--FontColor1);
          margin-left: 8px;
          font-weight: 500;
        }
      }
      .logo {
        width: 36px;
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
      align-items: center;
      .market-select-button .ant-btn{
        height: 40px;
       span{
         font-weight: 500;
       }
      }
      .fund-item {
        text-align: center;
        cursor: pointer;
        margin-left: 20px;

        .name {
          font-weight: 500;
          font-size: 14px;
          color: var(--FontColor3);
          text-align: center;
        }

        .value {
          font-size: 18px;
          color: #573EF3;
          text-align: center;
          font-family: "paralucent", sans-serif;
          font-weight: 600;
          font-style: normal;
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
    border: none;
    margin: 0.2rem 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 6vw !important;
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
