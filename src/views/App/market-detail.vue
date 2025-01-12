<template>
  <div :class="{ 'market-detail-mobile': device == 'mobile' }">
    <div class="detail-row">
      <a-row :gutter="20">
        <a-col :xs="24" :sm="24" :md="16" :lg="12">
          <div class="detail-info">
            <div class="header-part">
              <div class="title-tip">Betting product</div>
              <div class="add-header">
                <div class="logo">
                  <img v-if="!detail.image" src="@/assets/images/battle-default.png" alt="" />
                  <img v-else :src="detail.image" alt="" />
                </div>
                <div class="title">
                  <span>{{ detail.underlying }}</span>
                  <div class="status detail-status">
                    <!-- status:guarantee -->
                    <div class="detail-status-info" v-if="detail.status == 0">
                      <div class="detail-status-text">
                        Betting in progress.
                        <span v-if="now > detail.close_date">Market Closed</span>
                      </div>
                      <!-- issuer -->
                      <div v-if="detail.issuer == account && !detail.activation" class="detail-status-btn-group">
                        <div class="flex-box">
                          <a-button type="primary" @click="showCancel = true" class=""> Cancel </a-button>
                        </div>
                      </div>
                    </div>
                    <!-- status:wait confirm -->
                    <div class="detail-status-info" v-if="detail.status == 1">
                      <span>Event is waiting for confirmation.</span>
                      <div class="detail-status-count">
                        <p>Complaint Countdown&nbsp;&nbsp;</p>
                        <count-down :value="detail.challenge_start - now"></count-down>
                      </div>
                      <div class="detail-status-btn-group" v-if="account == detail.issuer">
                        <div class="flex-box">
                          <a-button type="primary" @click="showSelectOption = true">Set result</a-button>
                        </div>
                      </div>
                    </div>
                    <!-- status:appeal -->
                    <div class="detail-status-info" v-if="detail.status == 2">
                      <span>Event is waiting for challenge.</span>
                      <div class="detail-status-count">
                        <p>Complaint Countdown&nbsp;&nbsp;</p>
                        <count-down :value="detail.challenge_end - now"></count-down>
                      </div>
                      <div class="detail-status-btn-group" v-if="userDealt.userBuy && userDealt.userBuy.length > 0 && !userDealt.challenge">
                        <div class="flex-box">
                          <a-button type="primary" @click="showAppeal = true">Challenge</a-button>
                        </div>
                      </div>
                    </div>
                    <!-- status:wait DAO result -->
                    <div class="detail-status-info" v-if="detail.status == 3">
                      <span>Event is waiting for governance mechanism results.</span>
                    </div>
                    <!-- status:end -->
                    <div class="detail-status-info" v-if="detail.status == 4">
                      Event is Finished.
                      <div v-if="detail.issuer == account && detail.status == 4 && !detail.confirm_trans_hash" class="detail-status-btn-group">
                        <div class="flex-box">
                          <a-button type="primary" :loading="loadingConfirm" @click="confirmRecycle()" class=""> Recycle ticket </a-button>
                        </div>
                      </div>
                    </div>
                    <!-- status:cancelled -->
                    <div class="detail-status-info" v-if="detail.status == 5">
                      <div class="detail-status-text">Event has been cancelled.</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="battle-info">
                {{ detail.additional_information }}
              </div>
              <div class="in-line mg-t10">
                <div class="name share-name" style="color: #999"></div>
                <div class="value share-icon-box">
                  <Twitter class="share-icon" :url="shareTwitterLink" :title="detail.underlying" scale="1.5" :image="detail.image"> </Twitter>
                  <Telegram class="share-icon" :url="shareTwitterLink" :title="detail.underlying" scale="1.5"> </Telegram>
                  <Reddit style="margin-left: 10px" :url="shareTwitterLink" :title="detail.underlying" scale="1.5"></Reddit>
                  <WhatsApp style="margin-left: 10px" :url="shareTwitterLink" :title="detail.underlying" scale="1.5"></WhatsApp>
                </div>
              </div>
            </div>
            <div class="detail-form">
              <div class="option-list">
                <div class="item" :class="{'active': option.name==selectValue}" v-for="option in detail.options" @click="handleChange(option.name)" :key="option.id">
                  <div class="left">
                    <div class="active-point">
                      <div class="active-point-content">
                      </div>
                    </div>
                    {{ option.name }}
                  </div>
                  <div class="right">
                    {{ BigNumber(option.amount).toFixed(2) }} {{ detail.base_token }}
                  </div>
                </div>
              </div>
              <div class="line" />
              <template v-if="now < detail.close_date && detail.status == 0">
<!--                <div class="select-box">-->
<!--                  <a-select ref="select" v-model="selectValue" @change="handleChange" >-->
<!--                    <a-select-option :value="option.name" v-for="option in detail.options" :key="option.id">-->
<!--                      {{ option.name }}-->
<!--                    </a-select-option>-->
<!--                  </a-select>-->
<!--                </div>-->

                <label>Amount</label>
                <div class="add-input flex-box">
                  <a-input-number type="number" v-model="userBuyAmount" :min="1" placeholder="0.0" />
                  <div class="add-input-after">
                    <img style="border-radius: 50%" :src="`${detail.token_icon}`" width="22" height="22" />
                    <span class="pd-l8">{{ detail.base_token }}</span>
                  </div>
                </div>
                <div class="in-line">
                  <label>Balance</label>
                  <p class="detail-form-p detail-form-bigCoin">
                    <a href="#" class="normal" @click="$router.push('/deposit')">Deposit</a>
                    {{ balance | decimalsUnit }} {{ detail.base_token }}
                  </p>
                </div>
                <div class="add-issue-button">
                  <a-button v-if="now > detail.close_date || detail.status != 0" type="primary" shape="round" size="large" block disabled>{{ $t('marketClosed') }} </a-button>
                  <a-button v-else-if="detail.audit_status != 1" type="primary" shape="round" size="large" disabled block> Audit Checking </a-button>
                  <a-button v-else-if="insufficientFunds" type="primary" shape="round" size="large" disabled block> Insufficient Funds </a-button>
                  <a-button v-else-if="!userDealt.hasTicket" type="primary" shape="round" size="large" disabled block> Buy a Ticket </a-button>
                  <a-button v-else type="primary" shape="round" size="large" block :loading="connectedLoading" @click="userBuy()"> Buy </a-button>
                </div>
              </template>
            </div>
            <div class="detail-content">
              <div class="in-line">
                <label>{{ $t('validityPeriod') }}(UTC)</label>
                <p class="detail-common-p">
                  {{ detail.maturity_date | timeFormat('MMM. DD,YYYY') }}
                </p>
              </div>
              <div class="in-line">
                <label>{{ $t('subscribeEndDate') }}(UTC)</label>
                <p class="detail-common-p">
                  {{ detail.close_date | timeFormat('MMM. DD,YYYY') }}
                </p>
              </div>
              <div class="in-line" v-if="device != 'mobile'">
                <label>Collateral</label>
                <p class="detail-common-p" v-if="detail.is_stake_nft">NFT License</p>
                <p v-else class="flex-box detail-common-p detail-common-spe">
                  <span class="trade-input-icon mg-r8"></span>{{ detail.credit_margin | decimals(2) }}
                  {{ detail.base_token }}
                </p>
              </div>
              <div class="in-line" v-if="detail.issuer_result">
                <label>Issuer Result</label>
                <p class="detail-common-p">
                  <template v-for="option in detail.options">
                    <template v-if="option.id == detail.issuer_result">{{ option.name }}</template>
                  </template>
                </p>
              </div>
              <div class="in-line" v-if="detail.result">
                <label>DAO Result</label>
                <p class="detail-common-p">
                  <template v-for="option in detail.options">
                    <template v-if="option.id == detail.result">{{ option.name }}</template>
                  </template>
                </p>
              </div>
              <template v-if="device == 'mobile'">
                <div class="in-line">
                  <label>Collateral</label>
                  <p class="detail-common-p" v-if="detail.is_stake_nft">NFT License</p>
                  <p v-else class="flex-box detail-common-p detail-common-spe">
                    <span class="trade-input-icon mg-r8" :style="`background: url(${detail.token_icon}) no-repeat`"></span>{{ detail.credit_margin | decimals(2) }}
                    {{ detail.token_symbol }}
                  </p>
                </div>
                <div class="in-line">
                  <label>{{ $t('category') }}</label>
                  <div class="markets-info-img flex-box">
                    <img :src="detail.cat_icon" :alt="detail.cat_name" :title="detail.cat_name" />
                    <p
                      class="pd-l12"
                      :style="{
                        color: detail.color,
                      }"
                    >
                      {{ detail.cat_name }}
                    </p>
                  </div>
                </div>
              </template>
              <template v-if="device != 'mobile'">
                <div class="in-line">
                  <label>{{ $t('category') }}</label>
                  <div class="markets-info-img flex-box">
                    <img :src="detail.cat_icon" :alt="detail.cat_name" :title="detail.cat_name" />
                    <p>
                      {{ detail.cat_name }}
                    </p>
                  </div>
                </div>
              </template>
              <div class="in-line" v-if="detail.status == 2">
                <label>Challenge</label>
                <div class="flex-box">{{ detail.challenge_user }}/{{ detail.need_challenge_user }}</div>
              </div>
            </div>
            <div class="detail-bottom">
              <div v-if="detail.resolution_source" class="add-product-source mg-t12 in-line">
                <label>Resolution Source</label> <a target="_blank" :href="detail.resolution_source" class="address">{{ detail.resolution_source }}</a>
              </div>
              <div class="in-line">
                <label>Issuer</label>
                <a class="address" style="color: var(--mainColor)" :href="getAddressUrl(detail.issuer, detail.chain)" target="_blank">{{ detail.issuer | showAddress }}</a>
              </div>
              <div class="in-line" v-if="detail.is_cleared == 1">
                <label>Issuer profit</label>
                <div class="flex-box">
                  {{ detail.issuer_income | decimals(2) }}
                </div>
              </div>
            </div>
            <a-divider class="add-divider" orientation="left"> </a-divider>
            <div class="add-product">
              <div class="add-product-info">
                <p>
                  At the expiration date (
                  <u :class="{ red: BigNumber(new Date().getTime() / 1000).gt(detail.maturity_date) }">{{ detail.maturity_date | timeFormat('MMM. DD,YYYY') }}</u
                  >), those who have chosen the correct option will share tokens from the product pool based on their participation shares.
                </p>
                <p>
                  Users can participate in this product until
                  <u :class="{ red: BigNumber(new Date().getTime() / 1000).gt(detail.close_date) }">{{ detail.close_date | timeFormat('MMM. DD,YYYY') }}</u
                  >.
                </p>
                <p>If the event occurs before the expiration date, the result can be confirmed in advance by the issuer.</p>
                <p>If the participants disagree with the result of event confirmed by issuer, they can express their doubts by clicking "Challange".</p>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="12">
          <myPosition ref="scroll" @updateUserDealt="updateUserDealt" :detail="detail"></myPosition>
        </a-col>
      </a-row>
    </div>
    <a-modal v-model="showSelectOption" :centered="true" :footer="null" :width="device == 'mobile' ? '100%' : '500px'" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="cyrox-modal-info">
        <div class="cyrox-modal-title">Set Result:</div>
        <div class="cyrox-modal-body column">
          <a-radio-group v-model="optionId" style="margin-left: 10px">
            <a-radio v-for="option in detail.options" :key="option.name" :value="option.name" :style="radioStyle">{{ option.name }}</a-radio>
          </a-radio-group>
        </div>
        <div class="cyrox-modal-btn">
          <a-button type="primary" :loading="loadingConfirm" @click="confirmResult">
            <div class="flex-box justify-content_flex-center">
              {{ $t('confirm') }}
            </div>
          </a-button>
        </div>
      </div>
    </a-modal>
    <a-modal v-model="showCancel" :centered="true" :footer="null" :width="device == 'mobile' ? '100%' : '500px'" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="cyrox-modal-info">
        <div class="cyrox-modal-title">Cancel</div>
        <div class="cyrox-modal-body">
          <p>Cancellation is irreversible.</p>
        </div>
        <div class="cyrox-modal-btn">
          <a-button type="primary" :loading="loadingConfirm" @click="confirmCancel()">
            <div class="flex-box justify-content_flex-center">
              {{ $t('confirm') }}
            </div>
          </a-button>
        </div>
      </div>
    </a-modal>
    <a-modal v-model="showAppeal" :centered="true" :footer="null" :width="device == 'mobile' ? '100%' : '500px'" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="cyrox-modal-info">
        <div class="cyrox-modal-title">Challenge</div>
        <div class="cyrox-modal-body">
          <p>{{ $t('appealInfoOne') }}</p>
          <p>
            To prevent malicious appeal result, appeal need to stake
            {{ detail['challenge_amount'] | decimals(4, false) }}{{ detail.base_token }}, if there is deviation in fact, will be returned to you.
          </p>
        </div>
        <div class="cyrox-modal-btn">
          <a-button type="primary" :loading="loadingConfirm" @click="confirmAppeal">
            <div class="flex-box justify-content_flex-center">
              <img :src="`${detail.token_icon}`" width="20" height="20" class="mg-r8" />
              Pay {{ detail['challenge_amount'] | decimals(4, false) }} PRDS to Challenge
            </div>
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { eventDetail } from '@/api/index';
import BigNumber from 'bignumber.js';
import cdsSdk from '@/sdk';
import { Network } from '@/config/constants';
import { confirmTransaction } from '@/utils/trans';
import { constants } from 'ethers';
import countDown from './components/countDown';
import myPosition from './components/myPosition';
import { Twitter, Telegram, WhatsApp, Reddit } from 'vue-socialmedia-share';
import moment from 'moment';
import { signBuy, signChallenge, signCancel, signSetResult } from '@/api/signApi';
import { reactive } from 'vue';

export default {
  name: 'prediDetail',
  components: {
    myPosition,
    countDown,
    Twitter,
    Telegram,
    WhatsApp,
    Reddit,
  },
  data() {
    return {
      selectValue: undefined,
      BigNumber,
      radioStyle: reactive({
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      }),
      isMenuOpen: false,
      shareTwitterLink: window.location.href,
      activeKey: '1',
      showSelectOption: false,
      showAppeal: false,
      showCancel: false,
      connectedLoading: false,
      now: parseInt(new Date().getTime() / 1000),
      detail: {
        status: null,
        token_icon: '',
      },
      userDealt: {},
      loadingConfirm: false,
      userBuyAmount: '',
      optionId: '',
    };
  },
  filters: {
    showAddress(addr) {
      if (!addr) {
        addr = constants.AddressZero;
      }
      return addr.slice(0, 4) + '...' + addr.slice(38, 42);
    },
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
      currentTheme: (state) => state.currentTheme,
      ...mapGetters(['isConnected']),
    }),
    balance() {
      let fundData = this.$store.state.fundData;
      let base_token = this.detail.base_token;
      if (!fundData) {
        return 0;
      }
      if (!base_token) {
        return 0;
      }
      for (var i = 0; i < fundData.length; i++) {
        if (fundData[i]['name'] == base_token) {
          return fundData[i].balance;
        }
      }
      return 0;
    },
    ...mapGetters(['chainType']),
    insufficientFunds() {
      return BigNumber(this.userBuyAmount).gt(this.balance);
    },
  },
  watch: {},
  mounted() {
    window.scrollTo(0, 0);
    this.loadDetail();
  },
  methods: {
    ...mapActions(['connected', 'switchNetwork']),
    updateUserDealt(data) {
      this.userDealt = data;
    },
    handleChange(val) {
      this.selectValue = val;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    getAddressUrl(address, chain) {
      if (!address) {
        return '';
      }
      for (let chainId in Network) {
        let item = Network[chainId];
        if (chain == item.chainType) {
          if (item.blockExplorerUrls) {
            return item.blockExplorerUrls[0] + '/address/' + address;
          } else {
            return 'javascript:;';
          }
        }
      }
      return 'javascript:;';
    },
    async userBuy() {
      if (this.connectedLoading) {
        return;
      }
      if (!this.account) {
        await this.connected();
      }
      let { status } = this.detail;
      if (status != '0') {
        return;
      }
      let amount = BigNumber(this.userBuyAmount);
      if (amount.isNaN()) {
        this.$notification['error']({
          message: 'please input valid amount',
        });
        return;
      }
      if (amount.lt(1)) {
        this.$notification['error']({
          message: 'Minimum purchase amount 1' + this.detail.base_token,
        });
      }
      if (amount.lte(0)) {
        this.$notification['error']({
          message: 'amount is zero',
        });
        return;
      }
      let balance = this.balance;
      if (amount.gt(balance.toString())) {
        this.$notification['error']({
          message: 'greater than balance',
        });
        return;
      }
      this.connectedLoading = true;
      try {
        const product_id = this.detail.product_id;
        const option = this.selectValue;
        const underlying = this.detail.underlying;
        const timestamp = Math.floor(parseInt(Date.now().toString()) / 1000);
        const date = moment.unix(timestamp).utc().format('YYYY-MM-DD HH:mm:ss');
        const signature = await cdsSdk.getSigner().signMessage(`buy\nproduct_id:${product_id}\namount:${this.userBuyAmount}\nunderlying:${underlying}\noption:${option}\ndate:${date}`);
        const req = {
          product_id,
          user: this.account,
          amount: this.userBuyAmount,
          timestamp,
          signature,
          option,
        };
        const resp = await signBuy(req);
        this.connectedLoading = false;
        if (resp.code != 0) {
          this.$notification['error']({
            message: resp.msg,
          });
          return;
        }
        this.$notification['success']({
          message: 'Transaction success',
        });
        this.loadDetail();
        this.$store.dispatch('getUserInfo', this.account);
        this.$refs.scroll.loadData();
      } catch (err) {
        console.log(err);
        this.connectedLoading = false;
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation Cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation Failed',
        });
      }
    },
    async confirmResult() {
      if (!this.account) {
        let ret = await this.connected();
        if (!ret) {
          return;
        }
      }
      try {
        const product_id = this.detail.product_id;
        const option = this.optionId;
        if (!option) {
          this.$notification['error']({
            message: 'Select option',
          });
          return;
        }
        this.loadingConfirm = true;
        const underlying = this.detail.underlying;
        const timestamp = Math.floor(parseInt(Date.now().toString()) / 1000);
        const date = moment.unix(timestamp).utc().format('YYYY-MM-DD HH:mm:ss');
        const signature = await await cdsSdk.getSigner().signMessage(`setResult\nproduct_id:${product_id}\nunderlying:${underlying}\noption:${option}\ndate:${date}`);
        const req = {
          product_id,
          timestamp,
          signature,
          option,
        };
        const resp = await signSetResult(req);
        if (resp.code != 0) {
          this.loadingConfirm = false;
          this.$notification['error']({
            message: resp.msg,
          });
          return;
        }
        this.$notification['success']({
          message: 'Success',
        });
        this.loadDetail();
        this.showSelectOption = false;
      } catch (err) {
        console.log(err);
        this.loadingConfirm = false;
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation Cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation Failed',
        });
      }
    },
    async confirmRecycle() {
      if (!this.account) {
        let ret = await this.connected();
        if (!ret) {
          return;
        }
      }
      try {
        this.loadingConfirm = true;
        const tx = await cdsSdk.recycleTicket(this.detail.event_id, this.detail.result, this.detail.confirm_signature);
        await tx.wait();
        await confirmTransaction(tx.hash);
        this.$notification['success']({
          message: 'Success',
        });
        this.loadDetail();
        this.showSelectOption = false;
        this.loadingConfirm = false;
      } catch (err) {
        console.log(err);
        this.loadingConfirm = false;
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation Cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation Failed',
        });
      }
    },
    async confirmCancel() {
      if (!this.isConnected) {
        let ret = await this.switchNetwork();
        if (!ret) {
          return;
        }
      }
      if (!this.account) {
        let ret = await this.connected();
        if (!ret) {
          return;
        }
      }
      this.loadingConfirm = true;
      try {
        const product_id = this.detail.product_id;
        const underlying = this.detail.underlying;
        const timestamp = Math.floor(parseInt(Date.now().toString()) / 1000);
        const date = moment.unix(timestamp).utc().format('YYYY-MM-DD HH:mm:ss');
        const signature = await await cdsSdk.getSigner().signMessage(`cancel\nproduct_id:${product_id}\nunderlying:${underlying}\ndate:${date}`);
        const req = {
          product_id,
          timestamp,
          signature,
        };
        const data = await signCancel(req);
        if (data.code != 0) {
          this.loadingConfirm = false;
          this.$notification['error']({
            message: data.msg,
          });
          return;
        }
        const tx = await cdsSdk.cancelCDS(this.detail.event_id, timestamp + 4 * 60, data.data);
        await tx.wait();
        let { receipt } = await confirmTransaction(tx.hash);
        this.loadingConfirm = false;
        if (!receipt.status) {
          this.$notification['error']({
            message: 'Transcation failed',
          });
          return;
        }
        this.$notification['success']({
          message: 'Transaction success',
        });
        this.showCancel = false;
        this.loadDetail();
      } catch (err) {
        console.log(err);
        this.loadingConfirm = false;
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation Cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation Failed',
        });
      }
    },
    async confirmAppeal() {
      if (!this.isConnected) {
        let ret = await this.switchNetwork();
        if (!ret) {
          return;
        }
      }
      if (!this.account) {
        let ret = await this.connected();
        if (!ret) {
          return;
        }
      }
      this.loadingConfirm = true;
      try {
        const product_id = this.detail.product_id;
        const underlying = this.detail.underlying;
        const timestamp = Math.floor(parseInt(Date.now().toString()) / 1000);
        const date = moment.unix(timestamp).utc().format('YYYY-MM-DD HH:mm:ss');
        const signature = await await cdsSdk.getSigner().signMessage(`challenge\nproduct_id:${product_id}\nunderlying:${underlying}\ndate:${date}`);
        console.log(`challenge\nproduct_id:${product_id}\nunderlying:${underlying}\ndate:${date}`);
        const req = {
          product_id,
          user: this.account,
          timestamp,
          signature,
        };
        const resp = await signChallenge(req);
        this.loadingConfirm = false;
        if (resp.code != 0) {
          this.$notification['error']({
            message: resp.msg,
          });
          return;
        }
        this.$notification['success']({
          message: 'Transaction success',
        });
        this.showCancel = false;
        this.showAppeal = false;
        this.loadDetail();
        this.$refs.scroll.loadData();
      } catch (err) {
        console.log(err);
        this.loadingConfirm = false;
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
          this.$notification['error']({
            message: 'Transcation Cancelled',
          });
          return;
        }
        this.$notification['error']({
          message: 'Transcation Failed',
        });
      }
    },
    loadDetail() {
      eventDetail({
        product_id: this.$route.params.id,
      }).then(({ data, code }) => {
        if (code != 0) {
          return;
        }
        this.detail = data;
        this.selectValue = data.options[0].name;
      });
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
.ant-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  position: absolute;
  right: -80px;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  scale: 100%;
  top: -80px;

  .icon {
    width: 20px;
  }
}

.toggle {
  width: 40px;
  height: 40px;

  img {
    width: 20px;
  }
}

.toggle:hover {
  background: #1298ff;
  box-shadow: 0 0 2px #1298ff, 0 0 2px #1298ff, 2px 2px 12px rgba(255,255,255,0.4);;

  img {
    transform: translateX(-8000px);
    filter: drop-shadow(#ffffff 8000px 0);
  }
}

.menu.active .toggle:hover {
  color: #fff;
  background: var(--mainColor);
  box-shadow: 0 0 3px var(--mainColor), 0 0 3px var(--mainColor), 0 0 3px var(--mainColor), 0 0 rgba(0, 0, 0, 0.2);
}

.menu li a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: #000;
  background: #fff;
  border-radius: 50%;
  transform: rotate(calc(360deg / -8 * var(--i)));
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  transition: 0.5s;
}

.menu li a:hover {
  color: var(--clr);
  /* box-shadow: 0 0 1em #111; */
  box-shadow: 0 0 0.5em var(--clr), 0 0 1em var(--clr), 0 0 1.5em var(--clr), 0 0 3em var(--clr), 0 0 6em var(--clr), inset 0 0 0.3em var(--clr);
}

.menu li {
  position: absolute;
  left: 0;
  list-style: none;
  transform-origin: 100px;
  transition: 0.5s;
  transition-delay: calc(0.1s * var(--i));
  transform: rotate(0deg) translateX(80px);
  opacity: 0;
}

.menu.active li {
  transform: rotate(calc(360deg / 4 * var(--i)));
  opacity: 1;
}

.toggle {
  position: absolute;
  width: 60px;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  font-size: 2em;
  transition: 0.5s;
  transition: transform 1.25s;
}

.menu.active .toggle {
  transform: rotate(315deg);
}
.battle-info {
  margin-top: 10px;
}
.add-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  @include border_color($border-color-s3, $border-color-s10);

  .share-btn {
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    box-shadow: none;
    background: transparent;
    height: 36px;
  }

  .title {
    .flex_none {
      font-size: 20px;
      padding-right: 24px;
      line-height: 40px;
      @include font_color($font-color-s10, $font-color-s6);
    }

    span {
      font-size: 20px;

      font-weight: 400;
      color: var(--FontColor1);;
      line-height: 26px;
    }
  }

  a {
    width: 32px;
    height: 32px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.header-part {
  border-bottom: 1px solid var(--LineColor2);
  padding-bottom: 10px;
  position: relative;

  .logo {
    margin-right: 20px;
    width: 100px;
    height: 100px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }

  .title-tip {
    font-size: 17px;

    font-weight: 400;
    color: #999999;
    padding-bottom: 10px;
  }

  .share-icon-box {
    cursor: pointer;

    .share-icon {
      width: 20px;
      border-radius: 50% !important;
      margin-left: 10px;
      overflow: hidden;

      svg {
        border-radius: 50% !important;
      }
    }
  }
}

.detail-row {
  max-width: var(--content-width);
  position: relative;
  z-index: 1;
  margin: 0 auto;
  margin-top: 50px;

  .detail-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 16px;
    color: var(--FontColor1);

    span {
      display: flex;
      align-items: center;
      color: #999999;
    }

    .status {
      width: 80px;
      height: 30px;
      display: block;
      background: rgba(20, 110, 81, 0.1);
      border-radius: 50px 50px 50px 50px;
      opacity: 1;
      border: 1px solid #146e51;
      font-size: 16px;

      font-weight: 400;
      color: #146e51;
      text-align: center;
      margin-left: 10px;
      line-height: 28px;
    }

    .detail-status-text {
      font-size: 16px;

      small {
        font-size: 12px;
        line-height: 16px;
        padding-top: 8px;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .detail-status-info {
      min-height: 54px;
      flex: 1;
      width: 100%;

      .detail-status-count {
        color: var(--mainColor);
        display: flex;
        justify-content: space-between;
        width: 100%;
        white-space: nowrap;

        p {
          font-size: 16px;
          line-height: 22px;
          padding-bottom: 4px;
        }

        /deep/ .count-down {
          span {
            color: var(--mainColor);
          }
        }
      }

      .detail-status-button {
        color: var(--mainColor);
        display: flex;
        justify-content: center;

        button {
          border: none;
          font-size: 16px;

          height: 46px;
          background: var(--mainColor);
          border-radius: 10px;
          color: #ffffff;
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
        margin-top: 10px;

        .flex-box {
        }

        button {
          padding: 0 16px;
          border: none;
          @include bg_color_change($background-color-change3, $background-color-change12);
          color: var(--FontColor1);
          @include box_shadow_color;
          border-radius: 10px;
          font-size: 16px;

          display: inline-block;
          height: 46px;

          &:first-child {
            background: #ff503e;
            color: #ffffff;
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

  .detail-info {
    padding: 20px 26px;
    background: var(--MintBGColor);
    @include box_shadow_color_detail;
    border-radius: 10px;
    color: var(--FontColor1);

    .detail-content {
      margin-top: 30px;
      padding-bottom: 10px;
    }

    .detail-bottom {
      padding-top: 10px;
      border-top: 1px solid var(--LineColor2);
    }

    .in-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .address {
        color: var(--mainColor);
      }
    }

    .rate-box {
      margin-top: 10px;
    }

    label {
      padding-top: 5px;
      padding-bottom: 5px;
      font-size: 12px;
      @include font_color($font-color-s10, $font-color-s5);
      display: block;
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
      padding-top: 8px;

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

    .detail-info-category {
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        width: 66px;
        height: 66px;
      }

      span {

        font-size: 16px;
        color: var(--mainColor);
      }
    }

    .detail-info-events {
      font-size: 16px;
      line-height: 22px;
      padding-top: 12px;
      padding-bottom: 10px;
    }

    .detail-info-row {
      .detail-odds-p {
        @include font_color($font-color-s9, $font-color-s8);
        line-height: 26px;
        font-size: 24px;

      }

      .detail-common-p {
        font-size: 14px;

        &.detail-common-spe {
          line-height: 26px;
        }
      }
    }

    .detail-total-p {
      font-size: 20px;

      span {
        font-size: 14px;
      }
    }

    .add-divider {
      margin-bottom: 0;

      /deep/ .ant-divider-inner-text {
        font-size: 12px;
        padding-left: 0;
        @include font_color($font-color-s10, $font-color-s5);
      }

      &:before {
        width: 0;
      }

      &:after {
        @include border-color($border-color-s2, $border-color-s10);
      }
    }

    .add-product {
      margin-top: 24px;
      padding-bottom: 10px;

      h3 {
        font-size: 14px;
        line-height: 20px;
        padding: 8px 0;

        color: var(--FontColor1);
      }

      .add-product-info {
        p {
          font-size: 12px;
          line-height: 18px;
          @include font_color($font-color-s10, $font-color-s3);

          u {
            color: var(--FontColor1);
            text-decoration: none;
            color: var(--mainColor);

            &.red {
              color: red;
            }
          }
        }
      }

      .add-product-source {
        span {
          color: var(--mainColor);
          word-break: break-all;
        }
      }

      .add-product-more {
        font-size: 12px;
        opacity: 0.7;
        @include font_color($font-color-s10, $font-color-s11);

        a {

          color: var(--FontColor1);
        }
      }
    }
  }

  .detail-nft-title {
    padding-top: 8px;
    padding-bottom: 14px;
    font-size: 12px;
    @include font_color($font-color-s10, $font-color-s5);
  }

  .detail-nft {
    padding: 24px 32px;
     background: var(--BGColor2);
    @include box_shadow_color_detail;
    border-radius: 10px;

    .in-line {
      display: flex;
      justify-content: space-between;
    }

    label {
      padding-top: 5px;
      padding-bottom: 5px;
      font-size: 12px;
      @include font_color($font-color-s10, $font-color-s5);
      display: block;
    }

    .detail-nft-detail {
      flex-grow: 1;
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
          height: 12px;
          margin-right: 2px;

          background: url('~@/assets/images/nft-star.svg') no-repeat;
          background-size: contain;

          &.disabled {
            background: url('~@/assets/images/nft-star-grey.svg') no-repeat;
          }
        }
      }

      margin-right: 14px;

      img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
    }

    .detail-nft-p {
      font-size: 14px;
      color: var(--FontColor1);
    }

    .detail-nft-id {
      padding-left: 14px;
    }

    .detail-nft-link {
      display: flex;
      justify-content: space-between;

      p {
        font-size: 16px;

        background: var(--mainColor);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      img {
        padding-left: 8px;
        width: 23px;
      }
    }
  }

  .detail-form {
    border-radius: 10px;
    margin-top: 24px;

    .line {
      width: 100%;
      height: 1px;
      margin: 10px 0 20px;
      background: var(--LineColor2);
      border-radius: 0px 0px 0px 0px;
    }

    .select-box {
      width: 100%;
      background: var(--BGColor2);
      height: 46px;
      font-size: 16px;
      border-radius: 9px 9px 9px 9px;
      padding: 0 10px;

      ::v-deep .ant-select-selection {
        height: 100%;
        padding-top: 10px;
      }

      ::v-deep .ant-select-selection-selected-value {
        font-size: 14px;
        font-weight: 400;
        color: var(--FontColor1);;
      }
    }

    .option-list {
      padding: 0 0px 5px;

      .item {
        display: flex;
        margin-bottom: 5px;
        justify-content: space-between;
        cursor: pointer;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: var(--FontColor1);;
        border: 2px solid var(--LineColor2);
        padding: 16px;
        border-radius: 12px;

        &.active{
          border: 2px solid var(--mainColor);
          .left{
            .active-point{
              background: #4F48EA;
              .active-point-content{
                background: #FFFFFF;
              }
            }
          }
        }

        .left {
          display: flex;
          position: relative;
          padding-left: 30px;
          .active-point{
            width: 20px;
            height: 20px;
            display: flex;
            border-radius: 50%;

            align-items: center;
            justify-content: center;
            position: absolute;
            border: 1px solid #D0D5DD;
            left: 0px;
            .active-point-content{
              width: 8px;
              height: 8px;

              border-radius: 50%;
            }
          }
        }

        .right {
          min-width: 100px;
          height: 30px;
          border: 1px solid;
          border-image: linear-gradient(90deg, rgba(54, 22, 147, 1), rgba(116, 60, 127, 1), rgba(209, 140, 76, 1)) 1 1;
          border-radius: 4px 4px 4px 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          line-height: 30px;
          font-weight: 400;
          color: var(--FontColor1);
        }
      }
    }

    label {
      padding-top: 5px;
      padding-bottom: 5px;
      font-size: 12px;
      @include font_color($font-color-s10, $font-color-s5);
      display: block;
    }

    .detail-form-p {
      color: var(--FontColor1);

      &.detail-form-bigCoin {
        font-size: 16px;
      }

      &.detail-form-total {
        @include font_color($font-color-s9, $font-color-s8);
      }
    }

    .liguidity-tabs {
      width: 100%;
      height: 46px;
      margin: 0 auto;
      @include bg_color_change($background-color-change15, $background-color-change14);
      border-radius: 10px;
      justify-content: space-between;
      background: var(--LineColor2);

      li {
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;

        @include font_color($font-color-s7, $font-color-s1);
        width: 50%;
        height: 100%;

        &.active {
          @include bg_color_change($background-color-change3, $background-color-change12);
          border-radius: 10px;
          color: #ffffff;
        }

        &.yes {
          background: #85c18b;
        }

        &.no {
          background: #e96e6e;
        }
      }
    }

    .add-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 46px;
      font-size: 16px;
      margin-bottom: 10px;
      @include bg_color_change($background-color-change13, $background-color-change12);
      border: none;
      border-radius: 10px;
      padding: 0 12px;

      .ant-input-number {
        flex: 1;
        font-size: 14px;
        border: none !important;
        background: none;
        box-shadow: none;
        color: var(--FontColor1);
      }

      .add-input-after {
        padding: 0 12px;
        color: var(--FontColor1);
      }
    }

    .add-issue-button {
      padding-top: 12px;

      button {
        border: none;
        height: 46px;
        background: var(--mainColor);
        border-radius: 10px;
        font-size: 16px;

        color: #ffffff;

        &[disabled] {
          @include bg_color_change($background-color-change13, $background-color-change12);
          box-shadow: none;
          color: #999999;
        }
      }

      &.detail-issue-button {
        button {
          background: var(--mainColor);

          &[disabled] {
            @include bg_color_change($background-color-change13, $background-color-change12);
            box-shadow: none;
          }
        }
      }
    }

    .add-ul-info {
      padding-top: 14px;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 4px;

        p:first-child {
          font-size: 12px;
          @include font_color($font-color-s10, $font-color-s5);
        }

        p {
          &:last-child {
            color: var(--FontColor1);

            &.detail-form-total {
              color: #00d871;
            }
          }

          &.detail-form-coin {
            font-size: 12px;

            img {
              width: 16px;
              height: 16px;
              margin-right: 8px;
            }
          }

          &.detail-form-bigCoin {
            max-width: 80%;
            font-size: 16px;

            img {
              width: 22px;
              height: 22px;
            }

            span {
              word-break: break-word;
            }
          }
        }
      }
    }

    .add-info {
      padding-top: 12px;

      li {
        position: relative;
        font-size: 12px;
        line-height: 16px;
        @include font_color($font-color-s2, $font-color-s5);
      }
    }
  }
}

.trade-input-icon {
  width: 20px;
  height: 20px;
  background-size: contain;
}

.cyrox-modal {
  .cyrox-modal-info {
    border-radius: 10px;
    padding: 10px;


    .cyrox-modal-title {
      font-size: 18px;

      color: var(--mainColor);
      display: flex;
      flex-direction: column;
      span {
        color: #ffffff;
        padding-bottom: 38px;
        display: block;
      }
    }

    .cyrox-modal-body {
      padding-top: 10px;
      font-size: 16px;
      text-align: center;
      line-height: 20px;
      color: var(--FontColor1);
      &.column {
        text-align: left;
      }
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

        color: #ffffff;
        width: 100%;
      }
    }
  }
}

.market-detail-mobile {
  margin: 0 0.4rem;

  .add-header {
    margin: 0.3rem 0 0;
    padding-bottom: 0.28rem;
    align-items: flex-start;
    border: none;

    .flex_none {
      font-size: 0.32rem;
    }

    p {
      flex-direction: column;
      font-size: 0.32rem;

      i {
        width: 0.44rem;
        height: 0.44rem;
        margin-right: 0.16rem;
      }

      small {
        font-size: 0.32rem;
        line-height: 0.8rem;
        @include font_color($font-color-s, $font-color-s6);
      }
    }
  }

  .detail-row {
    .detail-status {
      flex-direction: column;
      align-items: flex-start;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      margin-bottom: 0.28rem;
      font-size: 0.32rem;

      .detail-status-text {
        font-size: 0.32rem;

        small {
          font-size: 0.24rem;
          line-height: 0.32rem;
          padding-top: 0.16rem;
        }
      }

      .detail-status-info {
        flex-direction: column;
        align-items: flex-start;
        padding-left: 0;
        min-height: auto;

        .detail-status-box {
          display: block;
        }

        .detail-status-count {
          padding-left: 0;
          padding-top: 0.24rem;

          p {
            font-size: 0.32rem;
            line-height: 0.44rem;
            padding-bottom: 4px;
          }
        }

        .detail-status-button {
          margin-top: 0.4rem;

          button {
            height: 0.92rem;
            border-radius: 0.2rem;
          }

          /deep/ .count-down {
            padding-top: 0.28rem;
          }
        }

        .detail-status-period {
          label {
            font-size: 0.24rem;
            padding-top: 0.4rem;
          }

          p {
            font-size: 0.32rem;
          }
        }

        .detail-status-btn-group {
          max-width: 100%;
          margin-top: 0.4rem;

          button {
            height: 0.92rem;
            border-radius: 0.2rem;
            font-size: 0.32rem;
          }

          p {
            padding-top: 0.24rem;
            font-size: 0.24rem;
          }
        }
      }
    }

    .detail-nft-title {
      padding: 0.28rem 0 0.16rem;
      font-size: 0.24rem;
    }

    .detail-nft {
      padding: 0.24rem;
      flex-direction: column;
      border-radius: 0.2rem;
      position: relative;

      label {
        font-size: 0.24rem;
        padding-bottom: 0.16rem;
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

        img {
          width: 1.6rem;
          height: 1.6rem;
        }
      }

      .detail-nft-p {
        font-size: 0.28rem;
      }

      .detail-nft-detail {
        width: 100%;
        align-items: flex-start;

        .detail-nft-img {
          img {
            width: 1.6rem;
            height: 1.6rem;
          }

          margin-right: 0.24rem;
        }
      }

      .detail-nft-link {
        position: absolute;
        left: 2.08rem;
        bottom: 0.28rem;
        font-size: 0.32rem;
      }
    }

    .detail-info {
      padding: 0.24rem 0.24rem 0.48rem;
      border-radius: 0.2rem;

      label {
        font-size: 0.24rem;
        padding-top: 0.24rem;
        padding-bottom: 0.16rem;
      }

      /deep/ .ant-progress {
        padding-bottom: 0;
      }

      .detail-info-category {
        img {
          width: 1.32rem;
          height: 1.32rem;
        }

        span {
          font-size: 0.32rem;
        }
      }

      .detail-info-events {
        font-size: 0.32rem;
        line-height: 0.44rem;
        padding-top: 0.16rem;
        padding-bottom: 0;
      }

      .detail-info-row {
        .detail-odds-p {
          line-height: 0.52rem;
          font-size: 0.48rem;
        }

        .detail-common-p {
          font-size: 0.28rem;

          &.detail-common-spe {
            line-height: 0.52rem;
          }
        }
      }

      .detail-total-p {
        font-size: 0.44rem;
        line-height: 0.48rem;

        span {
          font-size: 0.28rem;
        }
      }
    }

    .add-divider {
      margin-top: 0.32rem;

      /deep/ .ant-divider-inner-text {
        font-size: 0.24rem;
      }
    }

    .add-product {
      h3 {
        font-size: 0.28rem;
        line-height: 0.4rem;
        padding: 0.16rem 0;
      }

      .add-product-info {
        p {
          font-size: 0.24rem;
          line-height: 0.36rem;
        }
      }

      .add-product-source {
        margin-top: 0.28rem;
        min-height: 0.88rem;
        padding: 0.24rem 0 0.24rem 0.4rem;
        border-radius: 0.2rem;
        font-size: 0.24rem;
      }

      .add-product-more {
        margin-top: 0.48rem;
        font-size: 0.24rem;
      }
    }

    .cyrox-table-scroll {
      height: 480px;

      .cyrox-table-row {
        p {
          font-size: 12px;
        }
      }
    }
  }

  .detail-form {
    margin-top: 1.76rem;
    padding: 0.08rem 0.24rem 0.24rem;
    border-radius: 0.2rem;
    position: relative;

    .liguidity-tabs {
      position: absolute;
      left: 0;
      top: -1.24rem;
      width: 100%;
      height: 1.08rem;
      padding: 0.08rem;
      border-radius: 0.2rem;

      li {
        height: 0.92rem;

        &.active {
          border-radius: 0.2rem;
        }
      }
    }

    label {
      padding: 0.16rem 0;
      font-size: 0.24rem;
    }

    .detail-form-p {
      &.detail-form-bigCoin {
        font-size: 0.32rem;
      }
    }

    .add-input {
      height: 0.92rem;
      font-size: 0.32rem;
      border-radius: 0.2rem;
      padding: 0 0.24rem;

      .ant-input-number {
        font-size: 0.28rem;
      }

      .add-input-after {
        padding: 0;
      }
    }

    .add-issue-button {
      padding-top: 0.2rem;

      button {
        height: 0.92rem;
        border-radius: 0.2rem;
        font-size: 0.32rem;
      }
    }

    .add-ul-info {
      padding-top: 0.14rem;

      li {
        padding-top: 0.08rem;

        p:first-child {
          font-size: 0.24rem;
        }

        p {
          &.detail-form-coin {
            font-size: 0.24rem;

            img {
              width: 0.32rem;
              height: 0.32rem;
              margin-right: 0.16rem;
            }
          }

          &.detail-form-bigCoin {
            font-size: 0.32rem;

            img {
              width: 0.44rem;
              height: 0.44rem;
            }
          }
        }
      }
    }

    .add-info {
      padding-top: 0.24rem;

      li {
        font-size: 0.24rem;
        line-height: 0.32rem;
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
