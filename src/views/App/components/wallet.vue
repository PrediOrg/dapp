<!--  -->
<template>
  <div class="flex-box" :class="{ 'predi-wallet-mobile': device == 'mobile' }">
    <!-- moblie -->
    <template v-if="device == 'mobile'">
      <template v-if="account">
        <template v-if="!isOnRightChain">
          <a-button @click="switchNetwork(desireChainId)" :loading="connectedLoading"> Wrong Network</a-button>
        </template>
        <template v-else>
          <a-popover placement="bottomRight">
            <a-button :loading="connectedLoading">
              {{ account | showAddress }}
            </a-button>
            <template slot="content">
              <p @click="disConnect" class="color-0E1D51 ts-16 cursor">
                <a-icon type="disconnect" />
                <span class="pd-l8">Disconnect wallet</span>
              </p>
            </template>
          </a-popover>
        </template>
      </template>
      <a-button class="connection" v-else @click="connect" :loading="connectedLoading"> Connect Wallet</a-button>
      <!--      <p class="header-more-title" @click="drawerClick">-->
      <!--        <span :class="{ 'header-more-close': drawerVisible }"></span>-->
      <!--      </p>-->
      <a-drawer wrapClassName="mobile-menu" :closable="false" :visible="drawerVisible" width="100%">
        <div class="mobile-drawer">
          <!--<div class="mobile-drawer-ticket">
            <a @click="ticketClick"
              ><span>{{ $t("ticket") }}<i></i></span
            ></a>
          </div>-->

          <!--          <a-select  class="change-network" dropdownClassName="drop-network" :value="chainId" @change="switchNetwork">-->
          <!--            <a-select-option  v-for="(value, key, index) in networkObj" :key="index" :value="key" :disabled="networkObj[key].disabled">-->
          <!--              <div class="flex-box">-->
          <!--                <i class="network-icon" :class="`icon-${networkObj[key].icon}`"></i>-->
          <!--                <span class="network-span">-->
          <!--                  {{ networkObj[key].chainNameMobile }}-->
          <!--                </span>-->
          <!--              </div>-->
          <!--            </a-select-option>-->
          <!--          </a-select>-->

          <a-menu class="mobile-drawer-menu">
            <!-- <a-menu-item key="0">
              <a class="header-more-a" @click="setTheme">
                Light/ Dark
                <span class="header-more-span header-more-theme"></span>
              </a>
            </a-menu-item> -->
            <!--<a-menu-item key="1">
              <a class="header-more-a">
                Language
                <span class="header-more-span header-more-language"></span>
              </a>
            </a-menu-item>-->
            <!--<a-menu-item key="1">
              <a href="https://docs.predi.io/about" target="_blank" class="header-more-a">
                About
                <a-icon type="info-circle" theme="filled" />
              </a>
            </a-menu-item>-->
            <!--<a-menu-item key="2">
              <a
                      href="https://docs.predi.io/faq"
                      target="_blank"
                      class="header-more-a"
              >FAQ<span class="header-more-span header-more-faq"></span
              ></a>
            </a-menu-item>-->
            <!--<a-menu-item key="3">
              <a href="https://docs.predi.io/disclaimer" target="_blank" class="header-more-a">Disclaimer<span class="header-more-span header-more-discord"></span></a>
            </a-menu-item>-->
          </a-menu>
        </div>
      </a-drawer>
    </template>
    <!-- desktop -->
    <template v-else>
      <!--      <a-select class="change-network" dropdownClassName="drop-network" :value="desireChainId" @change="switchNetwork">-->
      <!--        <a-select-option v-for="(value, key, index) in networkObj" :key="index" :value="key" :disabled="networkObj[key].disabled">-->
      <!--          <div class="flex-box">-->
      <!--            <i class="network-icon" :class="`icon-${networkObj[key].icon}`"></i>-->
      <!--            <span class="network-span">-->
      <!--              {{ networkObj[key].chainName }}-->
      <!--            </span>-->
      <!--          </div>-->
      <!--        </a-select-option>-->
      <!--      </a-select>-->
      <a-button class="select-chain" @click="switchNetwork(desireChainId)">
        <div class="flex-box choose-network" @click="showChooseNetWork = true">
          <i class="network-icon" :class="`icon-${networkObj[desireChainId].icon}`"></i>
          <span class="network-span">
            {{ networkObj[desireChainId].chainNameMobile }}
          </span>
          <div class="dot" :class="{ active: isConnected }">
            <div></div>
          </div>

          <div class="choose-box" v-show="showChooseNetWork">
            <div class="mask" @click.stop="showChooseNetWork = false"></div>
            <div class="choose-content animate__animated animate__fadeIn">

              <div
                class="choose-item"
                @click.stop="
                  switchNetwork(Object.keys(Network)[1]);
                  showChooseNetWork = false;
                "
              >
                <strong>BSC</strong>
              </div>
            </div>
          </div>
        </div>
      </a-button>
      <template v-if="w3Account">
        <template v-if="!isConnected">
          <a-button @click="switchNetwork(desireChainId)" :loading="connectedLoading"> Wrong Network</a-button>
        </template>
        <template v-else>
          <a-button :loading="connectedLoading" @click="w3mConnect">
            {{ w3Account | showAddress }}
          </a-button>
          <!--            <template slot="content">-->
          <!--              <p @click="disConnect" class="color-0E1D51 ts-16 cursor">-->
          <!--                <a-icon type="disconnect"/>-->
          <!--                <span class="pd-l8">Disconnect wallet</span>-->
          <!--              </p>-->
          <!--            </template>-->
        </template>
      </template>
      <!--      connect-->
      <a-button class="connection" v-else @click="w3mConnect" :loading="connectedLoading"> Connect Wallet</a-button>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { message } from 'ant-design-vue';
import { Network } from '@/config/constants';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/html';
import { configureChains, createConfig } from '@wagmi/core';
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains';

const chains = [arbitrum, mainnet, polygon];
const projectId = process.env.VUE_APP_ProjectId;
import { getAccount, watchAccount } from '@wagmi/core';
import { ChainIdMap } from '@/config/constants';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  themeMode: 'dark',
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
const web3modal = new Web3Modal({ projectId }, ethereumClient);
export default {
  name: 'WalletCom',
  components: {},
  data() {
    return {
      Network,
      w3Account: '',
      drawerVisible: false,
      connectedLoading: false,
      networkObj: Network,
      downVisible: false,
      showChooseNetWork: false,
    };
  },
  filters: {
    showAddress: function (text) {
      return text.substring(0, 6) + '...' + text.substring(38, 42);
    },
  },

  computed: {
    isOnRightChain() {
      if (this.chainId == this.desireChainId) {
        return true;
      }
      return false;
    },
    ...mapState({
      device: (state) => state.device,
      chainId: (state) => state.chainId,
      desireChainId: (state) => state.desireChainId,
      account: (state) => state.account,
      currentTheme: (state) => state.currentTheme,
    }),
    ...mapGetters(['isConnected']),
  },
  watch: {
    desireChainId(val) {
      if (val == ChainIdMap['BSC']) {
        this.switchNetwork(val);
      } else {
        this.switchNetwork(val);
      }
    },
  },
  methods: {
    ...mapActions(['connected', 'updateAccount', 'updateChainId', 'updateDesireChainId', 'switchNetwork']),
    w3mConnect() {
      web3modal.openModal();
    },
    async getCon() {
      if (window.ethereum) {
        window.ethereum
          .request({ method: 'eth_accounts' })
          .then((accounts) => {
            if (accounts && accounts.length > 0) {
              this.updateAccount(accounts[0]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      watchAccount(async (account) => {
        if (window.ethereum.providers) {
          const provider = window.ethereum.providers[0];
          let chainId = await provider.request({ method: 'eth_chainId' });
          let first_chainId = Object.keys(this.networkObj)[0];
          if (this.networkObj[chainId]) {
            this.updateDesireChainId(this.chainId);
          } else {
            this.updateDesireChainId(first_chainId);
          }
          provider.on('chainChanged', (chainId) => {
            this.updateChainId(chainId);
          });
          if (chainId != this.chainId) {
            this.switchNetwork(this.chainId);
          }
        }
        this.w3Account = account.address;
        this.updateAccount(account.address);
      });
    },
    disConnect() {
      this.updateAccount(null);
    },
    dropClick(e) {
      e.preventDefault();
      this.downVisible = true;
    },
    drawerClick(e) {
      e.preventDefault();
      this.drawerVisible = !this.drawerVisible;
    },
    connect() {
      if (!window.ethereum) {
        message.error('install MetaMask first!');
        return;
      }
      let ethereum;
      if (window.ethereum.providers) {
        ethereum = window.ethereum.providers[0];
      } else {
        ethereum = window.ethereum;
      }
      this.connected()
        .then(() => {
          ethereum.request({ method: 'eth_chainId' }).then(({ chainId }) => {
            if (chainId != this.chainId) {
              this.switchNetwork(this.chainId);
            }
          });
        })
        .catch((err) => {
          if (err.code === -32002) {
            message.error(this.$t('wallet.openWallet'));
          }
        });
    },
  },
  async created() {
    const account = getAccount();
    this.w3Account = account.address;
    this.$store.commit('Set_Web3modal', web3modal);
    if (window.ethereum) {
      let chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId == Object.keys(Network)[1]) {
        this.$store.commit('SET_DESIRE_CHAINID', chainId);
      }
      this.updateChainId(chainId);
    }
    this.getCon(this.w3Account);
  },
};
</script>
<style lang="scss">
.choose-network {
  position: relative;

  .choose-box {
    position: absolute;
    left: 0;
    top: 0;

    .mask {
      z-index: 0;
      position: fixed;
      left: 0;
      width: 100vw;
      top: 0;
      height: 100vh;
    }

    .choose-content {
      width: 140px;
      position: absolute;
      overflow: hidden;
      top: 40px;
      left: -25px;
      z-index: 1000;
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
}

.select-chain {
  width: auto !important;
  margin-right: 10px;
  padding: 0 20px;

  .dot {
    margin-left: 10px;
    width: 8px;
    height: 8px;
    background: #d8d8d8;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      width: 4px;
      height: 4px;
      border-radius: 50%;
    }

    &.active {
      > div {
        background: #52df9b;
      }
    }
  }
}

.header-more-menu {
  min-width: 196px;
  top: 96px !important;
}

.mobile-menu {
  top: 1.22rem;

  .ant-drawer-content {
    @include bg_color_change($background-color-theme, $background-color-night);

    .ant-drawer-body {
      padding: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
button {
  width: 150px;
  height: 43px;
  color: white;
  border-radius: 10px;
  background: $background-linear-color;
  font-size: 14px;
  font-family: 'Lucida-Grande-Bold';
  border: none;

  &:hover,
  &:focus,
  &:active {
    background: $background-linear-color;
  }
}

.network-icon {
  width: 22px;
  height: 22px;
  background-repeat: no-repeat;
  background-size: contain;
}

.icon-ETH {
  background-image: url('~@/assets/images/u50.png');
}

.icon-KCS {
  background-image: url('~@/assets/images/kcc.png');
}

.icon-scroll {
  background-image: url('~@/assets/images/scoll.png');
}

.icon-BNB {
  background-image: url('~@/assets/images/bnb.png');
}

.network-span {
  padding-left: 16px;
}

.header-more-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 50px;
  @include bg_color_change($background-color-change3, $background-color-change4);
  @include font_color($font-color-s, $font-color-s1);
  border-radius: 10px;
  margin-left: 16px;

  span {
    width: 22px;
    height: 22px;
    background: url('~@/assets/images/mobile-home-sort-light.svg') no-repeat;

    [data-theme='night'] & {
      background: url('~@/assets/images/mobile-home-sort.svg') no-repeat;
    }

    background-size: contain;

    &.header-more-close {
      background-image: url('~@/assets/images/close-dark.svg');

      [data-theme='night'] & {
        background: url('~@/assets/images/close.svg') no-repeat;
      }
    }
  }
}

.header-more-a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include font_color($font-color-s, $font-color-s1);

  .header-more-span {
    width: 22px;
    height: 22px;
    background-repeat: no-repeat;
    background-size: contain;

    &.header-more-theme {
      background-image: url('~@/assets/images/light.svg');

      [data-theme='night'] & {
        background-image: url('~@/assets/images/dark.svg');
      }
    }

    &.header-more-language {
      background-image: url('~@/assets/images/language-dark.svg');

      [data-theme='night'] & {
        background-image: url('~@/assets/images/language-light.svg');
      }
    }

    &.header-more-faq {
      background-image: url('~@/assets/images/FAQ-dark.svg');

      [data-theme='night'] & {
        background-image: url('~@/assets/images/FAQ-light.svg');
      }
    }

    &.header-more-discord {
      background-image: url('~@/assets/images/discord-dark.svg');

      [data-theme='night'] & {
        background-image: url('~@/assets/images/discord-light.svg');
      }
    }
  }

  i {
    font-size: 20px;
    margin-right: 0;
  }
}

.change-network {
  margin-right: 16px;
  width: 160px;
  height: 50px;
  font-size: 16px;
  font-family: 'Lucida-Grande-Bold';

  /deep/ .ant-select-focused {
    .ant-select-selection {
      border: none;
      box-shadow: none;
    }
  }

  /deep/ .ant-select-selection--single {
    height: 50px;
    @include bg_color_change($background-color-change3, $background-color-change4);
    @include font_color($font-color-s, $font-color-s1);
    border: none;
    border-radius: 10px;

    .ant-select-selection__rendered {
      line-height: 50px;
      margin-right: 38px;
      display: flex;
      justify-content: center;
    }

    &.ant-select-selection:focus {
      border: none;
      box-shadow: none;
    }

    &.ant-select-selection:active {
      border: none;
      box-shadow: none;
    }

    .ant-select-arrow {
      right: 16px;
      width: 22px;
      height: 22px;
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

.predi-wallet-mobile {
  .header-more-title {
    width: 0.88rem;
    height: 0.72rem;
    border-radius: 0.2rem;
    margin-left: 0.22rem;

    span {
      width: 0.4rem;
      height: 0.4rem;
    }
  }

  button {
    width: auto;
    height: 0.72rem;
    border-radius: 0.2rem;
    font-size: 0.28rem;
  }
}

.mobile-drawer {
  padding: 0.2rem 0.4rem 0;

  .mobile-drawer-ticket {
    width: 100%;
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
      padding: 0 0.24rem;
      @include bg_color_change($background-color-theme, $background-color-night);
      @include font_color($font-color-s, $font-color-s1);
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    i {
      margin-left: 8px;
      width: 22px;
      height: 22px;
      background: url('~@/assets/images/forward.svg') no-repeat;
      background-size: contain;
    }
  }

  .change-network {
    margin-right: 0;
    margin-top: 0.28rem;
    height: 0.92rem;
    width: 100%;
    border-radius: 0.2rem;

    /deep/ .ant-select-selection--single {
      .ant-select-selection__rendered {
        margin-left: 0.24rem;
        margin-right: 0.24rem;
        justify-content: space-between;
      }
    }
  }

  .mobile-drawer-menu {
    margin-top: 0.28rem;
    @include bg_color_change($background-color-change3, $background-color-change4);
    border-radius: 0.2rem;
    border: none;
  }

  p {
    background: red;
  }
}
</style>
