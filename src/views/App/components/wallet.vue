<!--  -->
<template>
  <div class="flex-box" :class="{ 'predi-wallet-mobile': device == 'mobile' }">
    <!-- moblie -->
    <template v-if="device == 'mobile'">
      <template v-if="w3Account">
        <template v-if="!isConnected">
          <a-button @click="switchNetwork(desireChainId)" :loading="connectedLoading">
            <span>Wrong Network</span>
          </a-button>
        </template>
        <template v-else>
          <a-button :loading="connectedLoading">
            <span>{{ w3Account | showAddress }}</span>
          </a-button>
        </template>
      </template>
      <a-button class="connection" v-else @click="w3mConnect" :loading="connectedLoading">
        <span>Connect Wallet</span>
      </a-button>

      <!-- 添加菜单按钮 -->
      <div class="menu-button" @click="showMenu = true">
        <a-icon type="menu" style="font-size: 20px; color: var(--FontColor1);" />
      </div>

      <!-- 菜单弹窗 -->
      <a-drawer
        placement="right"
        :visible="showMenu"
        @close="showMenu = false"
        :closable="false"
        width="80%"
        class="wallet-menu-drawer"
        @afterVisibleChange="handleDrawerVisibleChange"
          :afterVisibleChange="handleDrawerVisibleChange"
      >
        <div class="menu-content">
          <!-- 主题切换 -->
          <div class="menu-item theme-switch">
            <div class="item-title">Theme</div>
            <div class="theme-box">
              <svg t="1736430142309" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19319" width="26" height="26">
                <path d="M122.752 487.2H38.336c-12.896 0-23.264 10.336-23.264 23.264s10.368 23.232 23.264 23.232h84.416a23.232 23.232 0 1 0 0-46.496z m93.344-240.672c8.928 8.96 23.616 8.96 32.896 0a23.488 23.488 0 0 0 0-32.896L193.92 158.56a22.912 22.912 0 0 0-32.928 0 22.912 22.912 0 0 0 0 32.896l55.104 55.072z m6.816 521.056l-61.92 61.888a22.912 22.912 0 0 0 0 32.896 23.584 23.584 0 0 0 32.928 0l61.888-61.856a23.584 23.584 0 0 0 0-32.928 22.912 22.912 0 0 0-32.896 0z m290.016-636.224a23.2 23.2 0 0 0 23.264-23.232V35.872c0-12.896-10.368-23.264-23.264-23.264s-23.264 10.368-23.264 23.264v72.256c0 12.864 10.368 23.232 23.264 23.232z m474.24 355.84h-74.048c-12.896 0-23.264 10.336-23.264 23.264s10.368 23.232 23.264 23.232h74.048a23.232 23.232 0 1 0 0-46.496z m-474.24 388.032a23.456 23.456 0 0 0-23.264 23.264v86.176c0 12.896 10.368 23.264 23.264 23.264s23.264-10.368 23.264-23.264v-86.176a23.456 23.456 0 0 0-23.264-23.264z m319.008-716.672l-50.08 49.728a23.488 23.488 0 0 0 0 32.896c9.28 9.28 23.968 9.28 32.928 0l50.08-49.728a23.488 23.488 0 0 0 0-32.896 22.912 22.912 0 0 0-32.928 0z m-24.32 613.696a23.424 23.424 0 0 0-32.896 0 23.488 23.488 0 0 0 0 32.896l57.184 57.216a23.584 23.584 0 0 0 32.928 0 23.488 23.488 0 0 0 0-32.896l-57.216-57.216zM517.92 202.176c-166.304 0-301.504 134.816-301.504 301.12 0 166.656 135.2 301.472 301.504 301.472s301.12-134.816 301.12-301.472c0-166.304-134.848-301.12-301.12-301.12z m0 550.4a249.28 249.28 0 0 1-249.28-249.28 249.44 249.44 0 0 1 199.2-244.288 245.728 245.728 0 0 0-26.464 111.936 249.28 249.28 0 0 0 299.36 244.256 249.408 249.408 0 0 1-222.784 137.344z" fill="#98A2B3" p-id="19320"></path>
              </svg>
              <div class="framer-17uat6s-container" id="mobile-toggle-theme" style="opacity: 1;">
                <div data-framer-component-type="Frame" data-framer-cursor="pointer"
                     data-framer-highlight="true"
                     style="display: flex; flex: 0 0 auto; width: 50px; height: 26px; align-items: center; justify-content: space-between; background: rgb(102, 112, 133); border-radius: 15px; cursor: pointer; position: relative; padding: 0px 7.5px; transform: none;">
                  <div data-framer-component-type="Frame" id="mobile-tapLight"
                       style="display: flex; flex: 0 0 auto; pointer-events: none; width: 22.5px; height: 22.5px; background: rgb(255, 255, 255); border-radius: 50%; position: absolute; transition: left 0.2s; align-items: center; justify-content: center; transform: none;">
                    <div data-framer-component-type="Frame"
                         style="display: block; flex: 0 0 auto; pointer-events: none; width: 22.5px; height: 22.5px; background: transparent; overflow: hidden; transform: none;">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           fill="#000000" width="22.5" height="22.5"></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 网络切换 -->
          <div class="menu-item network-switch">
            <div class="item-title">Network</div>
            <a-select 
              class="change-network" 
              dropdownClassName="drop-network" 
              :value="desireChainId" 
              @change="handleNetworkSwitch"
            >
              <a-select-option 
                v-for="(value, key, index) in networkObj" 
                :key="index" 
                :value="key" 
                :disabled="networkObj[key].disabled"
              >
                <div class="flex-box">
                  <i class="network-icon" :class="`icon-${networkObj[key].icon}`"></i>
                  <span class="network-span">
                    {{ networkObj[key].chainNameMobile }}
                  </span>
                </div>
              </a-select-option>
            </a-select>
          </div>

          <!-- 其他菜单项 -->
          <div class="menu-item disconnect" @click="disConnect">
            <a-icon type="disconnect" style="color: var(--FontColor1);" />
            <span>Disconnect</span>
          </div>
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
      <a-button class="select-chain"   @click="switchNetwork(desireChainId)">
        <div class="flex-box choose-network" @click="showChooseNetWork = true">
          <i class="network-icon" :class="`icon-${networkObj[desireChainId].icon}`"></i>
          <span class="network-span">
            {{ networkObj[desireChainId].chainNameMobile }}
          </span>
          <div class="dot" :class="{ active: isConnected }">
            <div></div>
          </div>
          <img src="@/assets/images/down.png" style="margin-left: 15px" width="20" alt="">
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
          <a-button @click="switchNetwork(desireChainId)" :loading="connectedLoading">
            <span> Wrong Network</span>
          </a-button>
        </template>
        <template v-else>
          <a-button :loading="connectedLoading" @click="w3mConnect">
            <span>
              {{ w3Account | showAddress }}
            </span>
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
      <a-button class="connection" v-else @click="w3mConnect" :loading="connectedLoading">
        <span class="connect-content">Connect Wallet</span>
      </a-button>
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
import { bsc, } from '@wagmi/core/chains';

const chains = [bsc, ];
const projectId = process.env.VUE_APP_ProjectId;
import { getAccount, watchAccount } from '@wagmi/core';
import { ChainIdMap } from '@/config/constants';

import ToggleTheme from '@/components/ToggleTheme.vue'

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
  components: {
    ToggleTheme
  },
  data() {
    return {
      Network,
      w3Account: '',
      drawerVisible: false,
      connectedLoading: false,
      networkObj: Network,
      downVisible: false,
      showChooseNetWork: false,
      showMenu: false
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
    handleNetworkSwitch(chainId) {
      this.switchNetwork(chainId);
      this.showMenu = false;
    },
    handleDrawerVisibleChange(visible) {
      if (visible) {
        this.$nextTick(() => {
          const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
          const div = document.getElementById("mobile-tapLight");
          const currentTheme = document.body.getAttribute("data-theme");

          // 切换主题
          if (isDarkMode || currentTheme === "dark") {
            div.style.left = "calc(100% - 26.25px)";  // 第一种样式的 left 值
            document.body.setAttribute("data-theme", "dark");
          }

          document.getElementById("mobile-toggle-theme").addEventListener("click", function() {
            const div = document.getElementById("mobile-tapLight");
            const currentTheme = document.body.getAttribute("data-theme");
            // 切换主题
            if (currentTheme === "dark") {
              document.body.setAttribute("data-theme", "light");
              div.style.left = "3.75px";  // 第二种样式的 left 值
            } else {
              document.body.setAttribute("data-theme", "dark");
              div.style.left = "calc(100% - 26.25px)";  // 第一种样式的 left 值
            }

            // 同步PC端按钮状态
            const pcLight = document.getElementById("tapLight");
            if (pcLight) {
              pcLight.style.left = currentTheme === "dark" ? "3.75px" : "calc(100% - 26.25px)";
            }
          });
        });
      }
    },
    beforeDestroy() {
      const mobileToggle = document.getElementById("mobile-toggle-theme");
      if (mobileToggle) {
        mobileToggle.removeEventListener("click", this.handleMobileThemeToggle);
      }
    }
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
  async mounted() {
    // 其他代码保持不变
  },
  beforeDestroy() {
    // 其他代码保持不变
  }
};
</script>
<style lang="scss" scoped>
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
      background: var(--ButtonBGColor4);
      padding: 0 30px;
      box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);
      border-radius: 20px 20px 20px 20px;
      border: 1px solid var(--LineColor2);
      animation-duration: 0.3s;
    }

    .choose-item {
      padding: 30px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:last-child {
        border-top: 1px var(--LineColor2) solid;
      }

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      strong {
        margin-left: 10px;
        font-size: 20px;

        font-weight: 400;
        color: var(--FontColor1);;
      }
    }
  }
}


.select-chain {
  width: auto !important;
  margin-right: 10px;
  padding: 0 20px;


  &:active{
    border: 1px solid #FFFFFF;
  }
  .network-span{
    color:  var(--FontColor1);
  }
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
  font-size: 14px;

  background: var(--ButtonBGColor4);
  box-shadow: 0px 1px 2px 0px rgba(16,24,40,0.05);
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
  color: var(--FontColor1);
  span{
    color:  var(--FontColor1);
  }
  &:hover,
  &:focus,
  &:active {
    background: var(--ButtonBGColor4);
  }
}
.connect-content{
  color:  var(--FontColor1);
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
   background: var(--BGColor2);
  color: var(--FontColor1);
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
  color: var(--FontColor1);

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


  /deep/ .ant-select-focused {
    .ant-select-selection {
      border: none;
      box-shadow: none;
    }
  }

  /deep/ .ant-select-selection--single {
    height: 50px;
     background: var(--BGColor2);
    color: var(--FontColor1);
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
    color: var(--FontColor1);

    transition: ease-in-out, 0.2s, color;

    &:hover {
      color: #ddd;
    }

    span {
      height: 100%;
      padding: 0 0.24rem;
      @include bg_color_change($background-color-theme, $background-color-night);
      color: var(--FontColor1);
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
     background: var(--BGColor2);
    border-radius: 0.2rem;
    border: none;
  }

  p {
    background: red;
  }
}

.menu-button {
  width: 0.88rem;
  height: 0.72rem;
  margin-left: 0.22rem;
  background: var(--BGColor2);
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:active {
    opacity: 0.8;
  }
}

.wallet-menu-drawer {
  /deep/ .ant-drawer-content {
    background: var(--BGColor2);
  }

  /deep/ .ant-drawer-wrapper-body {
    background: var(--BGColor2);
  }

  .menu-content {
    padding: 20px;

    .menu-item {
      padding: 15px;
      margin-bottom: 10px;
      background: var(--ButtonBGColor4);
      border: 1px solid var(--LineColor2);
      border-radius: 10px;
      
      &.theme-switch {
        .item-title {
          font-size: 16px;
          margin-bottom: 15px;
          color: var(--FontColor1);
        }
        
        .theme-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }
      }
      
      &.network-switch {
        .item-title {
          font-size: 16px;
          margin-bottom: 15px;
          color: var(--FontColor1);
        }
        
        .change-network {
          width: 100%;
          margin: 0;
          
          /deep/ .ant-select-selection {
            background: var(--ButtonBGColor4);
            border: 1px solid var(--LineColor2);
          }
        }
      }
      
      &.disconnect {
        display: flex;
        align-items: center;
        cursor: pointer;
        
        .anticon {
          font-size: 18px;
          margin-right: 10px;
        }
        
        span {
          color: var(--FontColor1);
        }
        
        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
