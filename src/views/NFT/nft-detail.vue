<template>
  <div :class="{ 'nft-detail-mobile': device == 'mobile' }">
    <!--    <div class="add-header">-->
    <!--      <p class="cursor" @click="goBack"><i></i>Back</p>-->
    <!--    </div>-->
    <div class="detail-row">
      <a-row :gutter="24" class="header-part">
        <a-col :xs="24" :sm="24" :md="9" :lg="14" style="margin-left: 0; padding-left: 0; padding-right: 0">
          <div class="detail-nft">
            <div class="detail-nft-img cursor">
              <img :src="detail.thumb_image_400" @click="showImage = true" />
            </div>
            <div class="right-part">
              <div class="flex-box">
                <div class="nft-star" :class="'nft-star-' + detail.total_supply">
                  <span
                    v-for="i in detail.total_supply"
                    :key="i"
                    :class="{
                      disabled: i > available,
                    }"
                  >
                  </span>
                </div>
                <div class="share-btn" @click="doCopy">
                  <!--          <img v-if="currentTheme == 'night'" src="/images/share.svg" alt="share" />-->
                  <!--          <img v-else src="/images/share-dark.svg" alt="share" />-->
                  <img src="@/assets/images/share-btn.png" alt="share" />
                  <span>Share</span>
                </div>
              </div>
              <div class="title-box">
                <div class="id-box">
                  <span>Predi License&nbsp;</span>
                  <span>#{{ detail.token_id }}</span>
                </div>
              </div>
              <div class="detail-status">
                <div class="detail-status-info">
                  <!-- rent -->
                  <template v-if="detail.owner_status == 1">
                    <div class="detail-status-text">
                      <p>NFT is on rent.</p>
                    </div>
                    <div class="detail-status-button" v-if="detail.user == account">
                      <a-button type="danger" @click="showCancel = true">Cancel</a-button>
                    </div>
                  </template>
                  <!-- sale -->
                  <template v-else-if="detail.owner_status == 2">
                    <div class="detail-status-text">
                      <p>NFT is on sale.</p>
                    </div>
                    <div class="detail-status-button" v-if="detail.user == account">
                      <a-button type="danger" @click="showCancel = true">Cancel</a-button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="detail-status-text" v-if="detail.balance > 0">
                      <p>Current NFT can be sold or rented.</p>
                    </div>
                    <div v-else class="detail-status-text">
                      <p>{{ detail.user == account ? 'NFT can sell.' : 'NFT is unsold.' }}</p>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="9" :lg="10">
          <div class="detail-action">
            <!-- status:idle -->
            <div class="detail-action-sell" v-if="detail.owner_status == 0">
              <!-- role:owner -->
              <template v-if="detail.user == account">
                <div class="detail-action-type flex-box">
                  <button type="primary" :class="{ active: type !== 'rent' }" :disabled="detail.is_owner != 1" @click="type = 'sell'">Sell</button>
                  <button type="primary" :class="{ active: type === 'rent' }" :disabled="!(detail.is_owner == 1 && detail.balance > 0)" @click="type = 'rent'">Rent</button>
                </div>
                <div class="detail-action-rent-box">
                  <a-row v-show="type === 'rent'" class="detail-action-rent" :gutter="16">
                    <a-col :span="12">
                      <label>Times</label>
                      <a-select v-model="times" default-value="1" style="width: 100%">
                        <a-select-option :key="i" v-for="i in detail.balance" :value="i">
                          {{ i }}
                        </a-select-option>
                      </a-select>
                    </a-col>
                    <a-col :span="12">
                      <label>Rent Date</label>
                      <a-input v-model="rentDate" class="add-input" placeholder="Minimum 10 Days" />
                    </a-col>
                  </a-row>
                </div>
                <div class="add-input add-input-margin flex-box">
                  <a-input-number :precision="4" v-model="price" placeholder="0.0000" />
                  <div class="add-input-after"><img class="trade-input-icon mg-r8" :src="payToken.icon" />{{ payToken.name }}</div>
                </div>
                <a-button class="detail-button" type="primary" shape="round" size="large" @click="clickRental" :loading="loadingConfirm" block>Confirm </a-button>
              </template>
              <!-- role:user -->
              <a-row v-else>
                <a-col :span="24">
                  <div class="sub-title">price</div>
                  <p class="detail-action-price flex-box">
                    <img class="trade-input-icon mg-r8" :src="payToken.icon" />
                    {{ detail.value | decimals }} {{ payToken.name }}
                  </p>
                </a-col>
                <a-col :span="24">
                  <a-button class="detail-button" type="primary" shape="round" :disabled="true" size="large" block> Unsold </a-button>
                </a-col>
              </a-row>
            </div>
            <!-- status:sale -->
            <a-row v-else>
              <a-col :span="24">
                <div class="sub-title">price</div>
                <p class="detail-action-price flex-box">
                  <img class="trade-input-icon mg-r8" :src="payToken.icon" />
                  {{ detail.sale_info.price | decimals }} {{ payToken.name }}
                </p>
              </a-col>
              <a-col v-if="detail.owner_status == 1" :xs="10" :sm="10" :md="10" :lg="6">
                <label>Available Times</label>
                <p>{{ detail.sale_info.amount }} Times</p>
              </a-col>
              <a-col v-if="detail.owner_status == 1" :xs="14" :sm="14" :md="14" :lg="18">
                <label>Period</label>
                <p>{{ detail.sale_info.term / 86400 }} Days</p>
              </a-col>
              <a-col :span="24">
                <a-button v-if="isTicketUser" class="detail-button" type="primary" :disabled="true" shape="round" size="large" block>Selling </a-button>
                <template v-else>
                  <a-button v-if="insufficientFunds" class="detail-button" type="primary" :disabled="true" shape="round" size="large" block>Insufficient funds </a-button>
                  <a-button v-else @click="clickBuy" :loading="loadingConfirm" class="detail-button" type="primary" shape="round" size="large" block
                    >{{ detail.owner_status == 1 ? 'Rent' : 'Buy' }}
                  </a-button>
                </template>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :xs="24" :sm="24" :md="12" :lg="11">
          <div class="rule-box">
            <div class="sub-title">Rules</div>
            <div class="detail-rules">
              <h3>Sell</h3>
              <p>The NFT owners have right to sell OWNERSHIP of the NFT on the market.</p>
              <p>2.5% fee will be charged on each transaction.</p>
              <h3>Rent</h3>
              <p>Owners with NFT can rent their NFT issue times on the market and renters can use the NFT to issue betting products during the lease period.</p>
              <p>The minimum rental period is 10 days.</p>
              <p>2.5% fee will be charged on each transaction.</p>
            </div>
          </div>
          <div class="panel-container">
            <div class="sub-title">Payoff</div>
            <div class="detail-details">Get rewards by issuing bettings and inviting friends to participate.</div>
          </div>
          <div class="panel-container">
            <div class="sub-title">Details</div>
            <div class="detail-nft-box">
              <div class="detail-nft-detail flex-box">
                <div class="detail-nft-img">
                  <div class="nft-star" :class="'nft-star-' + detail.total_supply">
                    <span
                      v-for="i in detail.total_supply"
                      :key="i"
                      :class="{
                        disabled: i > available,
                      }"
                    >
                    </span>
                  </div>
                  <img :src="detail.thumb_image_200" />
                </div>
                <div class="relative" style="flex: 1">
                  <div class="flex-box">
                    <label>NFT Owner</label>
                    <p class="detail-nft-p">
                      {{ detail.user | showAddress }}
                    </p>
                  </div>
                  <div class="flex-box">
                    <label>Token ID</label>
                    <p class="detail-nft-p">#{{ detail.token_id }}</p>
                  </div>
                  <router-link to="/nft">
                    <div class="detail-nft-link flex-box">
                      <p>Get Your NFT License</p>
                      <img class="right-icon" src="~@/assets/images/right-icon.svg" />
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="13">
          <div class="detail-intro">
            <div class="sub-title flex-box">
              Issue Times List
              <div class="times">Total {{ timesList.length }} Times</div>
            </div>
            <div class="detail-times">
              <a-row class="detail-times-th">
                <a-col :xs="3" :sm="3" :md="3" :lg="4">Time</a-col>
                <a-col :xs="5" :sm="5" :md="5" :lg="6">Status</a-col>
                <a-col :xs="8" :sm="8" :md="8" :lg="7">User</a-col>
                <a-col :xs="8" :sm="8" :md="8" :lg="7">Expiring Date</a-col>
              </a-row>
              <a-row class="detail-times-td" v-for="(item, index) in timesList" :key="index">
                <a-col :xs="3" :sm="3" :md="3" :lg="4">{{ index + 1 }}</a-col>
                <a-col :xs="5" :sm="5" :md="5" :lg="6">{{ item.status }}</a-col>
                <a-col :xs="8" :sm="8" :md="8" :lg="7">
                  <template v-if="item.event">
                    <router-link :to="'/market/' + item.event"> Check</router-link>
                  </template>
                  <template v-else>
                    <template v-if="account == item.user">You</template>
                    <template v-else>
                      <a :href="explorer + '/token/' + Ticket_CONTRACT + '?a=' + item.user" target="_blank">{{ item.user.substring(2, 4) }}..{{ item.user.substring(40, 42) }}</a>
                    </template>
                  </template>
                </a-col>
                <a-col :xs="8" :sm="8" :md="8" :lg="7">{{ item.expired_at | timeFormat('MMM. DD,YYYY', '-') }}</a-col>
              </a-row>
            </div>
          </div>

          <div class="trans-list">
            <div class="sub-title">Transaction History</div>
            <detail-scroll :detail="detail"></detail-scroll>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-modal v-model="showCancel" :centered="true" :footer="null" :width="device == 'mobile' ? '100%' : '500px'" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="cyrox-modal-info">
        <div class="cyrox-modal-body">
          <p>
            Confirm "Cancel" the
            {{ detail.owner_status == 2 ? 'sale' : 'rent' }} of current NFT
          </p>
        </div>
        <div class="cyrox-modal-btn">
          <a-button type="primary" :loading="loadingConfirm" @click="confirmCancel">
            <div class="flex-box justify-content_flex-center">
              {{ $t('confirm') }}
            </div>
          </a-button>
        </div>
      </div>
    </a-modal>
    <a-modal v-model="showImage" :centered="true" :footer="null" width="100%" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="flex-box space-center cyrox-modal-image">
        <img :src="detail.image" @click="showImage = false" />
      </div>
    </a-modal>
    <a-modal v-model="showSkyImage" :centered="true" :footer="null" width="100%" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="flex-box space-center cyrox-modal-image">
        <div style="position: relative">
          <img :src="detail.full_image" @click="showSkyImage = false" />
          <div class="detail-sky-x-line" :style="{ top: skyTop(detail.position) + '%' }">
            <div class="detail-sky-line-x">
              <span :style="skyLeftX(skyLeft(detail.position) + '%')"></span>
              <i class="detail-icon-star"></i>
              <span style="flex: 1"></span>
            </div>
          </div>
          <div class="detail-sky-y-line" :style="{ left: skyLeft(detail.position) + '%' }">
            <div class="detail-sky-line-y">
              <span :style="skyTopY(skyTop(detail.position) + '%')"></span>
              <i class="detail-icon-star"></i>
              <span style="flex: 1"></span>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import DetailScroll from '@/views/NFT/components/detailScroll';
import { constants } from 'ethers';
import BigNumber from 'bignumber.js';
import { Ticket_CONTRACT, TicketMarket_CONTRACT } from '@/config/constants';
import cdsSdk from '@/sdk';
import { confirmTransaction } from '@/utils/trans';
import { nftDetail, ticketBalance } from '@/api/index';

export default {
  components: { DetailScroll },
  data() {
    return {
      Ticket_CONTRACT,
      showCancel: false,
      showImage: false,
      showSkyImage: false,
      loadingConfirm: false,
      price: null,
      isSell: true,
      type: null,
      times: 1,
      insufficientFunds: false,
      rentDate: '',
      detail: {
        cat_id: 0,
        balance: 0,
        sale_info: {},
      },
      timesList: [],
      userTicket: {
        balance: 0,
        used: 0,
      },
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
      allowance: (state) => state.allowance,
      currentTheme: (state) => state.currentTheme,
    }),
    ...mapGetters(['chainType', 'isConnected', 'payToken', 'explorer']),
    isTicketUser() {
      let { balance, used } = this.userTicket;
      return balance + used > 0;
    },
    available() {
      let userTicket = this.userTicket;
      let detail = this.detail;
      if (detail['sale_info'] && detail['sale_info']['amount'] > 0) {
        return detail['sale_info']['amount'];
      }
      return userTicket.balance;
    },
    skyTop() {
      return function (val) {
        return (Math.ceil(val / 64) / 64) * 100;
      };
    },
    skyLeft() {
      return function (val) {
        return ((val - Math.floor(val / 64) * 64) / 64) * 100;
      };
    },
    skyLeftX() {
      return function (val) {
        return { width: `calc(${val} - 10px)` };
      };
    },
    skyTopY() {
      return function (val) {
        return { height: `calc(${val} - 10px)` };
      };
    },
  },
  watch: {
    account(val) {
      if (!val) {
        return;
      }
      // this.loadDetail();
      this.getUserTicket();
    },
  },
  filters: {
    showAddress(addr) {
      if (!addr) {
        addr = constants.AddressZero;
      }
      return addr.slice(0, 4) + '...' + addr.slice(38, 42);
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    let query = this.$route.query;
    if (query.type) {
      this.type = query.type;
    }
    this.loadDetail();
  },
  methods: {
    ...mapActions(['connected', 'switchNetwork']),
    loadDetail() {
      if (!this.chainType) {
        return;
      }
      nftDetail({
        token_id: this.$route.params.id,
        chain: this.chainType,
      }).then(({ data, code }) => {
        if (code != 0) {
          return;
        }
        this.detail = data;
        this.timesList = data.times;
        if (data.sale_info && data.sale_info.pay_token && this.$route.query.type) {
          this.$router.replace(this.$route.path);
        }
        this.getUserTicket();
      });
    },
    getUserTicket() {
      if (!this.account) {
        return;
      }
      if (!this.detail.token_id) {
        return;
      }
      ticketBalance({
        address: this.account,
        chain: this.chainType,
        token_id: this.detail.token_id,
      }).then(({ data, code }) => {
        if (code !== 0) {
          return;
        }
        if (!data) {
          data = {};
        }
        this.userTicket = data;
      });
      if (!this.detail['sale_info']) {
        return false;
      }
      cdsSdk.balanceOf(this.detail['sale_info']['pay_token'], this.account).then((tokenBalance) => {
        const price = this.detail['sale_info']['price'];
        let nftPrice = BigNumber(price).multipliedBy(BigNumber(10).pow(18));
        this.insufficientFunds = nftPrice.gt(tokenBalance.toString());
      });
    },
    async clickRental() {
      console.log('clickRental');
      if (!this.account) {
        console.log('account');
        await this.connected();
      }
      if (!this.isConnected) {
        console.log('switchNetwork');
        await this.switchNetwork();
      }
      let rentDate = BigNumber(this.rentDate);
      let times = BigNumber(this.times);
      let price = BigNumber(this.price);
      let isRent = this.type == 'rent';
      if (price.isNaN()) {
        this.$notification['error']({
          message: 'Please input valid price',
        });
        return;
      }
      if (isRent) {
        if (rentDate.isNaN()) {
          this.$notification['error']({
            message: 'Please input valid rent date',
          });
          return;
        }
        if (rentDate.lt(10)) {
          this.$notification['error']({
            message: 'Rent date less than minimum',
          });
          return;
        }
        if (times.isNaN() || times.lte(0)) {
          this.$notification['error']({
            message: 'Please input valid times',
          });
          return;
        }
        times = times.toFixed();
        rentDate = rentDate.multipliedBy(86400).toFixed(0);
      } else {
        rentDate = 1;
        times = 1;
      }
      try {
        this.loadingConfirm = true;
        let isApproved = await cdsSdk.isApprovedForAll(this.account, TicketMarket_CONTRACT);
        console.log({ isApproved });
        if (!isApproved) {
          let tx = await cdsSdk.setApprovalForAll(TicketMarket_CONTRACT, true);
          let receipt = await cdsSdk.waitForTransaction(tx.hash);
          if (!receipt.status) {
            this.$notification['error']({
              message: 'Transcation failed',
            });
            this.loadingConfirm = false;
            return;
          }
        }
        let tx = await cdsSdk.makeSale(Ticket_CONTRACT, this.detail.token_id, this.payToken.address, price.multipliedBy(BigNumber(10).pow(18)).toFixed(0), times, rentDate, isRent);
        let receipt = await confirmTransaction(tx.hash);
        this.loadingConfirm = false;
        if (receipt.status != 0) {
          this.$notification['success']({
            message: 'Transaction success',
          });
          this.$router.replace(this.$route.path);
          this.loadDetail();
        } else {
          this.$notification['error']({
            message: 'Transcation failed',
          });
          this.loadingConfirm = false;
        }
      } catch (err) {
        console.log(err);
        this.loadingConfirm = false;
        if (err.code == 4001||err.code==='ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation failed',
        });
      }
    },
    async clickBuy() {
      if (!this.account) {
        console.log('account');
        await this.connected();
      }
      if (!this.isConnected) {
        console.log('switchNetwork');
        await this.switchNetwork();
      }
      this.loadingConfirm = true;
      //ERC20 buy
      const address = this.detail['sale_info']['pay_token'];
      const price = this.detail['sale_info']['price'];
      console.log({ address, price });
      const allowance = await cdsSdk.allowance(address, this.account, TicketMarket_CONTRACT);
      const tokenBalance = await cdsSdk.balanceOf(address, this.account);
      let nftPrice = BigNumber(price).multipliedBy(BigNumber(10).pow(18));
      if (nftPrice.gt(tokenBalance.toString())) {
        this.$notification['error']({
          message: 'Not sufficient funds',
        });
        return;
      }
      try {
        if (BigNumber(allowance.toString()).gt(nftPrice)) {
          await this.buyNFT();
          return;
        }
        let tx = await cdsSdk.approve(address, TicketMarket_CONTRACT, tokenBalance);
        let receipt = await cdsSdk.waitForTransaction(tx.hash);
        if (receipt.status != 0) {
          await this.buyNFT();
        } else {
          this.$notification['error']({
            message: 'Transcation failed',
          });
          this.loadingConfirm = false;
        }
      } catch (err) {
        this.loadingConfirm = false;
        if (err.code == 4001||err.code==='ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation failed',
        });
      }
    },
    async buyNFT() {
      try {
        let tx = await cdsSdk.take(this.detail.user, Ticket_CONTRACT, this.detail.token_id);
        let { receipt } = await confirmTransaction(tx.hash, 1);
        if (receipt.status != 0) {
          this.loadDetail();
        } else {
          this.$notification['error']({
            message: 'Transcation failed',
          });
        }
        this.loadingConfirm = false;
      } catch (err) {
        this.loadingConfirm = false;
        console.log(err);
        if (err.code == 4001||err.code==='ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation failed',
        });
      }
    },
    async confirmCancel() {
      if (!this.account) {
        console.log('account');
        await this.connected();
      }
      if (!this.isConnected) {
        console.log('switchNetwork');
        await this.switchNetwork();
      }
      this.loadingConfirm = true;
      try {
        let tx = await cdsSdk.cancelSale(Ticket_CONTRACT, this.detail.token_id);
        await confirmTransaction(tx.hash);
        this.loadingConfirm = false;
        this.$notification['success']({
          message: 'Transaction success',
        });
        this.showCancel = false;
        this.loadDetail();
      } catch (err) {
        console.log(err);
        this.loadingConfirm = false;
        if (err.code == 4001||err.code==='ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation failed',
        });
      }
    },
    goBack() {
      this.$router.back();
    },
    doCopy() {
      const message = window.location.href;
      this.$copyText(message).then(
        () => {
          this.$notification['success']({
            message: 'Link copied!',
          });
        },
        () => {
          this.$notification['error']({
            message: 'Link copy failed',
          });
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
.add-header {
  position: relative;
  z-index: 1;
  max-width: var(--content-width);
  margin: 54px auto 24px;

  p {
    font-size: 16px;
    @include font_color($font-color-s, $font-color-s1);
    font-family: 'Lucida-Grande-Bold';
    display: flex;
    align-items: center;

    i {
      width: 14px;
      height: 14px;
      @include bg_img_change('~@/assets/images/backward-light.svg', '~@/assets/images/backward.svg');
      background-size: contain;
      margin-right: 8px;
    }
  }
}

.detail-row {
  position: relative;
  z-index: 1;
  max-width: var(--content-width);
  margin: 0 auto;

  .share-btn {
    background: none;
    box-shadow: none;
    border: none;
  }

  .id-box {
    display: flex;
    font-size: 26px;
    font-family: Orelega One-Regular, Orelega One;
    font-weight: 400;
    color: #333333;
    line-height: 50px;
  }

  label {
    @include font_color($font-color-s10, $font-color-s5);
    line-height: 16px;
    font-size: 12px;
    padding-bottom: 8px;
    padding-top: 14px;
    display: block;
  }

  .panel-container {
    padding: 10px 32px 24px;
    background: #ffffff;
    box-shadow: 0px 13px 43px 13px rgba(0, 0, 0, 0.05);
    border-radius: 17px;
    margin-top: 20px;

    .detail-nft-box {
      border-radius: 10px;

      label {
        padding-top: 0;
        padding-bottom: 8px;
        font-size: 12px;
        @include font_color($font-color-s10, $font-color-s5);
        display: block;
      }

      .detail-nft-img {
        border-radius: 10px;
        overflow: hidden;
        flex: none;

        .nft-star {
          display: flex;
          align-items: center;
          height: 20px;

          span {
            width: 12px;
            margin-right: 1px;
            height: 12px;
            background: url('~@/assets/images/nft-star.svg') no-repeat;
            background-size: contain;

            &.disabled {
              background: url('~@/assets/images/nft-star-grey.svg') no-repeat;
              background-size: cover;
            }
          }
        }

        img {
          width: 100px;
          height: 100px;
          aspect-ratio: 1;
          border-radius: 17px 17px 17px 17px;
        }
      }

      .relative {
        margin-top: 20px;
      }

      .flex-box {
        display: flex;
        justify-content: space-between;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;

        label {
          color: #999999;
        }
      }

      .detail-nft-p {
        font-size: 14px;
        @include font_color($font-color-s, $font-color-s1);
      }

      .detail-nft-id {
        padding-left: 14px;
      }

      .detail-nft-link {
        margin-top: 8px;

        .right-icon {
          width: 23px;
          height: 23px;
        }

        p {
          font-size: 14px;
          font-family: 'Lucida-Grande-Bold';
          background: #ffb356;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        img {
          padding-left: 8px;
        }
      }
    }

    .detail-details {
      font-size: 14px;
      font-family: Orelega One-Regular, Orelega One;
    }
  }

  .detail-status {
    padding: 24px 0 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .detail-status-text {
      font-family: Orelega One-Regular, Orelega One;
      font-size: 18px;
      color: var(--mainColor);

      small {
        font-size: 12px;
        line-height: 16px;
        padding-top: 8px;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .detail-status-info {
      .detail-status-button {
        color: #4f8fef;

        button {
          margin-top: 10px;
          border: none;
          width: 126px;
          height: 46px;
          @include bg_color_change($background-color-change3, $background-color-change12);
          @include box_shadow_color;
          @include font_color($font-color-s, $font-color-s1);
          border-radius: 10px;
          font-size: 16px;
          font-family: 'Lucida-Grande-Bold';
        }

        button[disabled] {
          background: gray;
          color: #b2b2b2;
        }
      }

      .detail-status-period {
        label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          padding-top: 20px;
          display: inline-block;
        }

        p {
          font-size: 16px;
          color: #ffffff;
        }
      }

      .detail-status-btn-group {
        max-width: 250px;

        button {
          padding: 0 16px;
          height: 54px;
          background: #393a3e;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          border: 2px solid #393a3e;
          font-size: 16px;
          font-family: 'Lucida-Grande-Bold';
          color: #ffffff;
          display: inline-block;

          &:first-child {
            border: 2px solid #4f8fef;
            margin-right: 32px;
          }
        }

        p {
          padding-top: 12px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }

  .sub-title {
    font-size: 21px;
    font-family: Orelega One-Regular, Orelega One;
    font-weight: 400;
    color: #333333;
    padding-bottom: 10px;

    &.flex-box {
      justify-content: space-between;

      .times {
        font-size: 14px;
      }
    }
  }

  .detail-intro {
    margin-top: 24px;
    padding: 10px 32px 24px;
    @include bg_color_change($background-color-change3, $background-color-change4);
    @include box_shadow_color_detail;
    border-radius: 10px;

    .detail-coordinate {
      padding: 14px;
      margin-top: 8px;
      height: 108px;
      border-radius: 10px;
      @include bg_color_change($background-color-change13, $background-color-change12);

      p {
        font-size: 12px;
        @include font_color($font-color-s, $font-color-s1);
      }

      div {
        margin-top: 24px;
        font-size: 16px;
        @include font_color($font-color-s, $font-color-s1);
      }
    }

    .detail-times {
      padding: 14px;
      border-radius: 10px;

      p {
        font-size: 12px;
        @include font_color($font-color-s, $font-color-s1);
      }

      .detail-times-th {
        padding-bottom: 8px;
        font-size: 14px;
        line-height: 16px;
        @include font_color($font-color-s10, $font-color-s5);
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: #999999;
        border-bottom: 1px solid #eaeaea;
      }

      .detail-times-td {
        padding: 6px 0;
        font-size: 12px;
        line-height: 20px;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: #000000;
        border-bottom: 1px solid #eaeaea;
        @include font_color($font-color-s, $font-color-s1);

        &:last-child {
          border-bottom: none;
        }

        a {
          color: var(--mainColor);
        }
      }
    }

    .detail-owner {
      padding: 14px;
      background: #393a3e;
      border-radius: 10px;

      p {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #ffffff;

        span:first-child {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }

        &:last-child {
          padding-top: 10px;
        }
      }
    }
  }

  .header-part {
    margin-top: 50px;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0px 13px 43px 13px rgba(0, 0, 0, 0.05);
    border-radius: 17px 17px 17px 17px;
    background: #ffffff;

    .detail-nft {
      overflow: hidden;
    }
  }

  .detail-nft {
    display: flex;

    .nft-star {
      width: 110px;
      height: 50px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;

      span {
        margin-right: 4px;
        width: 18px;
        height: 18px;
        background: url('~@/assets/images/nft-star.svg') no-repeat;
        background-size: contain;

        &.disabled {
          background: url('~@/assets/images/nft-star-grey.svg') no-repeat;
          background-size: cover;
        }
      }
    }

    .right-part {
      margin-left: 20px;
      .title-box {
        margin-top: 20px;
      }
      .flex-box {
        justify-content: space-between;
        .share-btn {
          margin-left: 10px;
        }
      }
    }

    .detail-nft-img {
      img {
        height: 250px;
        width: 100%;
        border-radius: 10px;
        aspect-ratio: 1;
      }
    }
  }

  .detail-share {
    padding-bottom: 10px;

    p {
      font-size: 26px;
      line-height: 32px;
      font-family: 'Lucida-Grande-Bold';
      @include font_color($font-color-s, $font-color-s1);
      padding: 12px 0;
    }
  }

  .detail-action {
    @include bg_color_change($background-color-change3, $background-color-change4);

    .name {
      font-size: 21px;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      color: #333333;
      padding-bottom: 15px;
    }

    p {
      @include font_color($font-color-s, $font-color-s1);
      line-height: 20px;
      font-size: 14px;
    }

    .detail-action-price {
      @include font_color($font-color-s, $font-color-s1);
      line-height: 26px;
      font-family: 'Lucida-Grande-Bold';
      font-size: 20px;
      padding-bottom: 10px;
    }

    .add-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 46px;
      font-size: 16px;
      @include bg_color_change($background-color-change13, $background-color-change12);
      @include font_color($font-color-s, $font-color-s1);
      color: #333 !important;

      border: none;
      border-radius: 10px;
      padding: 0 12px;

      .ant-input-number {
        flex: 1;
        font-size: 14px;
        border: none !important;
        background: none;
        box-shadow: none;
        @include font_color($font-color-s, $font-color-s1);
      }

      .add-input-after {
        padding: 0 12px;
        @include font_color($font-color-s, $font-color-s1);
      }

      &.add-input-margin {
        margin-top: 12px;
      }
    }

    .detail-action-sell {
      .detail-action-rent-box {
        height: 72px;
      }
      .detail-action-rent {
        label {
          font-family: Orelega One-Regular, Orelega One;
          font-weight: 400;
          color: #999999;
          padding: 10px 0 0;
        }

        /deep/ .ant-select-selection--single {
          padding-left: 12px;
          height: 46px;
          @include bg_color_change($background-color-change13, $background-color-change12);
          @include font_color($font-color-s, $font-color-s1);

          [data-theme='night'] & {
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
          }

          border: none;
          border-radius: 10px;

          .ant-select-selection__rendered {
            line-height: 46px;
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
            right: 24px;
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

      .detail-action-type {
        width: 100%;
        button {
          width: 50%;
          height: 42px;
          border: none;
          @include bg_color_change($background-color-change3, $background-color-change12);
          @include font_color($font-color-s, $font-color-s1);
          @include box_shadow_color;
          border-radius: 10px;
          font-size: 16px;

          &.active {
            background: var(--mainColor);
            color: #ffffff;
          }

          &:first-child {
            margin-right: 14px;
          }

          &[disabled] {
            @include bg_color_change($background-color-change13, $background-color-change12);
            @include font_color($font-color-s10, $font-color-s12);
            box-shadow: none;
          }
        }
      }
    }
  }

  .rule-box {
    padding: 10px 32px 24px;
    background: #ffffff;
    box-shadow: 0px 13px 43px 13px rgba(0, 0, 0, 0.05);
    border-radius: 17px 17px 17px 17px;
    margin-top: 20px;

    .rule-title {
      font-size: 21px;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      color: #333333;
    }

    .detail-rules {
      font-family: Orelega One-Regular, Orelega One;
      border-radius: 10px;
      @include bg_color_change($background-color-change3, $background-color-change4);

      h3 {
        @include font_color($font-color-s, $font-color-s1);
        font-family: 'Lucida-Grande-Bold';
        padding: 2px 0;
      }

      p {
        font-size: 12px;
        @include font_color($font-color-s10, $font-color-s5);
      }
    }
  }

  .trans-list {
    padding: 10px 32px 24px;
    background: #ffffff;
    box-shadow: 0px 13px 43px 13px rgba(0, 0, 0, 0.05);
    border-radius: 17px 17px 17px 17px;
    margin-top: 20px;

    .trans-title {
      font-size: 21px;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      color: #333333;
    }
  }

  .detail-button {
    border: none;
    background: none;
    margin-top: 28px;
    height: 46px;
    border-radius: 10px;
    background: #4f8fef;

    &[disabled] {
      @include bg_color_change($background-color-change13, $background-color-change12);
      @include font_color($font-color-s10, $font-color-s12);
      box-shadow: none;
    }
  }
}

.trade-input-icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
}

.cyrox-modal {
  /deep/ .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.72);
  }

  /deep/ .ant-modal {
    padding-bottom: 0;

    .ant-modal-content {
      background: transparent;
      box-shadow: none;

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
  }

  .cyrox-modal-info {
    @include bg_color_change($background-color-change3, $background-color-change4);
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 36px 48px 58px;

    .cyrox-modal-title {
      font-size: 18px;
      font-family: 'Lucida-Grande-Bold';
      text-align: center;
      color: #4f8fef;

      span {
        color: #ffffff;
        padding-bottom: 38px;
        display: block;
      }
    }

    .cyrox-modal-body {
      padding-top: 10px;
      font-size: 14px;
      line-height: 20px;
      @include font_color($font-color-s, $font-color-s1);

      p {
        padding-top: 20px;
      }
    }

    .cyrox-modal-btn {
      padding-top: 40px;

      button {
        border: none;
        height: 54px;
        @include bg_color_change($background-linear-color1, $background-color-change12);
        @include box_shadow_color;
        border-radius: 10px;
        font-size: 20px;
        font-family: 'Lucida-Grande-Bold';
        color: #ffffff;
        width: 100%;
      }
    }
  }

  .cyrox-modal-image {
    img {
      height: 86vh;
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

  .cyrox-modal-image {
    img {
      width: 100%;
      height: auto;
    }
  }
}

.nft-detail-mobile {
  .sub-title {
    font-size: 0.32rem !important;
  }

  .share-btn {
    width: 50px;
    height: 50px;
    background: #ffffff;
    box-shadow: 0px 22px 109px 22px rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    opacity: 1;
    border: 2px solid #eaeaea;

    span {
      display: none;
    }
  }

  .add-header {
    margin: 0.44rem 0.4rem 0;

    p {
      font-size: 0.32rem;
    }
  }

  .detail-row {
    margin: 0.28rem 0.4rem 0;

    label {
      line-height: 0.32rem;
      font-size: 0.24rem;
      padding-bottom: 0.16rem;
      padding-top: 0.28rem;
    }

    .detail-status {
      padding: 0.28rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      margin-bottom: 0;
      margin-top: 0;

      .detail-status-text {
        font-size: 0.32rem;
        @include font_color($font-color-s, $font-color-s1);
      }

      .detail-status-info {
        .detail-status-button {
          button {
            width: 1.74rem;
            height: 0.76rem;
            font-size: 0.32rem;
            border-radius: 0.2rem;
          }
        }
      }
    }

    .detail-intro {
      margin-top: 0.28rem;
      padding: 0.1rem 0.24rem 0.24rem;
      border-radius: 0.2rem;

      .detail-coordinate {
        margin-top: 0.16rem;
        height: 2.16rem;
        border-radius: 0.2rem;

        p {
          font-size: 0.24rem;
        }

        div {
          margin-top: 0.48rem;
          font-size: 0.32rem;
        }
      }

      .detail-times {
        padding: 0.24rem;
        border-radius: 0.2rem;

        p {
          font-size: 0.24rem;
        }

        .detail-times-th {
          padding-top: 0.16rem;
          font-size: 0.24rem;
          line-height: 0.32rem;
        }

        .detail-times-td {
          padding-top: 0.16rem;
          font-size: 0.24rem;
          line-height: 0.4rem;
        }
      }

      .detail-details {
        padding: 0.24rem;
        font-size: 0.28rem;
        line-height: 0.4rem;
        border-radius: 0.2rem;
      }

      .detail-nft-box {
        padding: 0.24rem;
        border-radius: 0.2rem;

        label {
          padding-bottom: 0.16rem;
          font-size: 0.24rem;
        }

        .detail-nft-img {
          border-radius: 0.2rem;
          margin-right: 0.24rem;

          .nft-star {
            padding-left: 0.16rem;
            height: 0.4rem;

            span {
              width: 0.24rem;
              height: 0.28rem;
            }
          }
        }

        .detail-nft-p {
          font-size: 0.28rem;
        }

        .detail-nft-id {
          padding-left: 0.28rem;
        }

        .detail-nft-link {
          margin-top: 0.16rem;

          p {
            font-size: 0.3rem;
          }

          img {
            padding-left: 0.16rem;
          }
        }
      }

      .detail-owner {
        padding: 0.24rem;
        border-radius: 0.2rem;

        p {
          font-size: 0.28rem;

          &:last-child {
            padding-top: 0.2rem;
          }
        }
      }
    }

    .detail-nft {
      padding: 0.24rem;
      display: block;
      border-radius: 0.2rem;
      position: relative;
      padding-top: 20px;

      .detail-nft-img {
        padding-top: 0.16rem;

        img {
          height: auto;
        }
      }

      .nft-star {
        position: absolute;
        top: 0px;
        width: 100%;
        left: 0;
      }
    }

    .detail-rules {
      padding: 0.24rem 0;
      border-radius: 0.2rem;

      p {
        font-size: 0.24rem;
      }
    }

    .detail-share {
      padding-top: 0.08rem;
      padding-bottom: 0.04rem;

      p {
        font-size: 0.52rem;
        line-height: 0.64rem;
        padding: 0.24rem 0;
      }
    }

    .header-part {
      background: none;
      padding: 0.1rem 0rem 0.42rem;
      box-shadow: none;
    }

    .detail-action {
      background: #ffffff;
      box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);
      margin-top: 0.28rem;
      border-radius: 0.2rem;
      padding: 0.1rem 0.24rem 0.42rem;

      p {
        line-height: 0.4rem;
        font-size: 0.28rem;
      }

      .detail-action-price {
        padding-top: 0.12rem;
        line-height: 0.52rem;
        font-size: 0.4rem;
        padding-bottom: 0.2rem;
      }

      .add-input {
        height: 0.92rem;
        font-size: 0.28rem;
        border-radius: 0.2rem;
        padding: 0 0.24rem;
        color: #ffffff;

        .ant-input-number {
          font-size: 0.28rem;
        }

        .add-input-after {
          padding: 0 0.24rem;
        }

        &.add-input-margin {
          margin-top: 0.48rem;
        }
      }

      .detail-action-sell {
        .detail-action-rent {
          /deep/ .ant-select-selection--single {
            padding-left: 0.24rem;
            height: 0.92rem;
            border-radius: 0.2rem;

            .ant-select-selection__rendered {
              line-height: 0.92rem;
            }

            .ant-select-arrow {
              right: 24px;
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

        ul {
          li {
            width: 2.4rem;
            height: 0.84rem;
            border-radius: 0.2rem;
            font-size: 0.32rem;

            &:first-child {
              margin-right: 0.28rem;
            }
          }
        }
      }
    }

    .detail-button {
      margin-top: 0.56rem;
      height: 0.92rem;
      border-radius: 0.2rem;
    }
  }
}

.detail-sky-x-line {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;

  .detail-sky-line-x {
    display: flex;
    align-items: center;
    width: 100%;
    transform: translateY(-50%);

    span {
      content: '';
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
    }

    .detail-icon-star {
      width: 16px;
      height: 16px;
      background: url('~@/assets/images/icon-star.png') no-repeat;
      background-size: contain;
      display: inline-block;
      margin: 2px;
      animation: flash 1s alternate infinite;
    }
  }
}

@keyframes flash {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 1;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(2);
  }
}

.detail-sky-y-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 20px;

  .detail-sky-line-y {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    transform: translateX(-50%);

    span {
      content: '';
      width: 1px;
      background: rgba(255, 255, 255, 0.2);
      content: '';
    }

    .detail-icon-star {
      width: 16px;
      height: 16px;
      display: inline-block;
      margin: 2px;
    }
  }
}
</style>
