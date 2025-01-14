<template>
  <div :class="{ 'predi-issue-mobile': device == 'mobile' }">
    <div class="add-header">
      <span>{{ $t('issue') }}</span>
    </div>
    <div class="add-box">
      <div class="add-tickets" v-if="ticketList.length === 0">
        <a href="/nft">
          Licenses
          <span>Go</span>
        </a>
      </div>
      <div v-else class="add-nft">
        <h3 class="title">
          {{ $t('verifiedNFT') }}（{{ ticketValid }}/{{ ticketList.length }}）
          <a href="/nft" class="add-nft-moreNFT">{{ $t('moreNFT') }} <span>Go</span>
            <i></i>
          </a>
        </h3>
        <div class="nft-swiper" v-swiper:mySwiper="swiperOption" ref="mySwiperBox">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in ticketList" :key="item.token_id">
              <div
                :data-id="item.token_id"
                :style="{
                  cursor: item.is_grey || item.balance <= 0 ? 'not-allowed' : 'pointer',
                }"
                class="swiper-slide-info"
              >
<!--                <div :class="'swiper-slide-info-title nft-title-start-' + item.total_supply">-->
<!--                  <div class="nft-star">-->
<!--                    <span-->
<!--                      v-for="i in item.total_supply"-->
<!--                      :key="i"-->
<!--                      :class="{-->
<!--                        grey: i > item.balance,-->
<!--                      }"-->
<!--                    ></span>-->
<!--                  </div>-->
<!--                  <div class="nft-star-number">-->
<!--                    <span>-->
<!--                      {{ item.chance }}-->
<!--                    </span>-->
<!--                  </div>-->
<!--                </div>-->
                <div class="swiper-slide-info-img">
<!--                  <img style="width: 100%; height: 100%" :src="item.thumb_image_400" :data-id="item.token_id" />-->
                  <img  src="@/assets/images/nft.png" style="width: 100%; height: 100%" :data-id="item.token_id" />

                </div>
                <div class="swiper-slide-Id" :class="item.token_id == ticketId ? 'swiper-slide-selectId' : ''">
                  <span>Predi License </span>
                <strong>#{{ item.token_id }}</strong>
                </div>
                <div class="swiper-slide-Id" :class="item.token_id == ticketId ? 'swiper-slide-selectId' : ''">
                  <span>Issuable quantity</span>
                  <strong>
                    {{ item.balance}}
                  </strong>
                  </div>

                <div class="markets-info-rent">
                  <count-down v-if="item.is_owner != 1 && item.owner_status == 0" :value="availableTime(item.expired_at)" :hide-second="true"></count-down>
                </div>


                <div v-if="item.is_grey || item.balance <= 0" class="swiper-slide-info-selected swiper-slide-info-disabled">
                  <div>Disabled</div>
                </div>
                <div v-if="item.token_id == ticketId" class="swiper-slide-info-selected">
                  <div>Selected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="device == 'mobile'">
          <a href="/nft" class="add-nft-moreNFT">{{ $t('moreNFT') }} <span>Go</span><i></i></a>
        </div>
      </div>
      <div class="add-row" :class="{ 'add-row-shadow': ticketId == 0 }" @click="rowShadowClick">
        <a-row :gutter="device == 'mobile' ? 0 : 48">
          <a-col :xs="24" :sm="24" :md="12" :lg="12">
            <label> Battle Image</label>
            <a-upload
              v-model="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :action="baseURL + '/api/upload'"
              :before-upload="beforeUpload"
              @change="imageUpload"
            >
              <img width="200" height="200" v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <label>{{ $t('category') }}</label>
            <a-select v-model="form.category" style="width: 100%">
              <a-select-option v-for="item in categories" :key="item.cat_id" :value="item.cat_id">{{ item.cat_name }} </a-select-option>
            </a-select>
            <label class="flex-box space-between"
              >{{ $t('forecastEvent') }}
              <span class="pd-r8" style="color: var(--mainColor)" @click="showEvent = true">Show Sample</span>
            </label>
            <div class="add-row-textarea">
              <a-textarea v-model="form.content" :maxLength="140" :placeholder="$t('textareaInfo')" />
              <p>0/140</p>
            </div>
            <div>
              <br />
              <label>Options</label>
              <div v-for="(option, index) in form.options" :key="index">
                <br />
                <div class="add-option-textarea">
                  <a-textarea :maxLength="140" v-model="option.val" placeholder="option" />
                </div>
              </div>
              <br />
              <a-button @click="form.options.push({ val: '' })">Add</a-button>
              <a-button @click="form.options.pop()" style="margin-left: 5px">Del</a-button>
            </div>
            <label class="flex-box space-between"> Battle Information </label>
            <!--add additional_information-->
            <div class="add-row-textarea">
              <a-textarea v-model="form.additional_information" :maxLength="140" />
              <p>{{ form.additional_information.length }}/140</p>
            </div>
            <label>{{ $t('subscribeEndDate') }}</label>
            <a-date-picker v-model="form.subscribeEndDate" :disabledDate="disabledDate" placeholder="Select Time">
              <span class="add-row-date" :class="{ active: form.subscribeEndDate }">
                <template v-if="!form.subscribeEndDate">{{ $t('specifyExpiryDate') }}</template>
                <template v-else>{{ form.subscribeEndDate | timeFormat('MMM. DD,YYYY') }}</template>
                <span></span
              ></span>
            </a-date-picker>
            <label>{{ $t('validityPeriod') }}</label>
            <a-date-picker v-model="form.maturityDate" :disabledDate="disabledMaturityDate" placeholder="Select Time">
              <span class="add-row-date" :class="{ active: form.maturityDate }">
                <template v-if="!form.maturityDate">{{ $t('specifyExpiryDate') }}</template>
                <template v-else>{{ form.maturityDate | timeFormat('MMM. DD,YYYY') }}</template>
                <span></span
              ></span>
            </a-date-picker>
            <label>{{ $t('resolutionSource') }}</label>
            <a-input class="add-input" v-model="form.source" :placeholder="$t('uRLContent')" />
            <!--            <a-divider class="add-divider" orientation="left"> About this product</a-divider>-->
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12">
            <label>Base Token</label>
            <a-select v-model="form.asset_id" style="width: 100%" @change="getTokenBalance">
              <a-select-option v-for="item in tokens" :key="item.cat_id" :value="item.asset_id">{{ item.name }} </a-select-option>
            </a-select>
            <label>Collateral</label>
            <div class="add-staking">
              <p class="add-staking-p">{{ $t('stakingTypeInfo') }}</p>
              <a-row :gutter="24">
                <a-col :span="12">
                  <div
                    :class="{
                      'add-staking-button': true,
                      'add-staking-active': !form.isStakeNft,
                    }"
                    @click="form.isStakeNft = false"
                  >
                    <img class="logo" :src="payToken.icon ? payToken.icon : ''" width="22" height="22" />
                    <span class="pd-l8">{{ payToken.credit_amount | decimals(2) }}</span>
                  </div>
                </a-col>
                <a-col :span="12">
                  <div
                    :class="{
                      'add-staking-button': true,
                      'add-staking-active': form.isStakeNft,
                    }"
                    @click="clickStakeNft()"
                  >
                    Current License
                  </div>
                </a-col>
              </a-row>
            </div>
            <ul class="add-ul-info">
              <li>
                <p>{{ $t('totalPayment') }} / {{ $t('walletBalance') }}</p>
                <p>
                  {{ totalPayment | decimalsPrecision(payToken.decimals, 4) | decimalsUnit }}
                  {{ payToken.name }}/{{ tokenBalance | decimalsPrecision(payToken.decimals, 4) | decimalsUnit }}
                  {{ payToken.name }}
                </p>
              </li>
              <li>
                <p>Reward Rate</p>
                <p>{{ issuer_profit_rate | rate }} %</p>
              </li>
            </ul>
            <div class="add-issue-button">
              <a-button type="primary" :loading="connectedLoading" @click="clickIssue()" block> Issue</a-button>
            </div>
            <ul class="add-info">
              <li>{{ $t('cdsInfoOne') }}</li>
              <li>{{ $t('cdsInfoTwo') }}</li>
              <li>{{ $t('cdsInfoThree') }}</li>
            </ul>
            <div class="add-product">
              <h3>Betting Project: {{ form.content }}</h3>
              <div class="add-product-info">fund-box
                <p>
                  At the expiration date ( <u>{{ form.maturityDate | timeFormat('MMM. DD,YYYY') }}</u> ), those who have chosen the correct option will share tokens from the product pool based on
                  their participation shares.
                </p>
                <p>
                  Users can participate in this product until
                  <u>{{ form.subscribeEndDate | timeFormat('MMM. DD,YYYY') }}</u
                  >.
                </p>
                <p>The result can be confirmed in advance by Seller, if the event occurs before expiration date.</p>
                <p>If the participants disagree with the result of event confirmed by Seller, they can "Challenge" it within 7 days of confirmation.</p>
              </div>
              <div v-if="form.source" class="add-product-source">
                Resolution Source:(<span>{{ form.source }}</span
                >)
              </div>
              <!--              <div class="add-product-more">Please refer to the Twitter or Telegram for more details.</div>-->
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-modal v-model="showEvent" :centered="true" :footer="null" :width="device == 'mobile' ? '90%' : '500px'" class="cyrox-modal" :class="{ 'cyrox-modal-mobile': device == 'mobile' }">
      <div class="cyrox-modal-info">
        <div class="cyrox-modal-title">Event</div>
        <div class="cyrox-modal-body">
          <p>[<span class="color-FFB255">Crypto</span>] Bitcoin price falls below 30k.</p>
          <p>[<span class="color-FFB255">Crypto</span>] Shiba being delisted from coinbase.</p>
          <p>[<span class="color-FFB255">Crypto</span>] USDT price plunge below $0.85.</p>
          <p>[<span class="color-F23B97">Finance</span>] D.R. Horton's credit rating downgrade below BBB.</p>
          <p>[<span class="color-D434C4">Technology</span>] China achieving mass production of 7nm chips.</p>
          <p>[<span class="color-FF503E">Sports</span>] Paris failing to host 2024 Olympics.</p>
          <p>[<span class="color-8535D3">Society</span>] Vladimir Putin losing Russia's 2024 Election.</p>
          <p>[<span class="color-7DEBF4">Others</span>] Donald Trump's reopening his twitter account.</p>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { tickets, issueConfig } from '@/api/index';
import BigNumber from 'bignumber.js';
import { constants } from 'ethers';
import moment from 'moment';
import { Vault_CONTRACT } from '@/config/constants';
import cdsSdk from '@/sdk';
import { confirmTransaction } from '@/utils/trans';
import countDown from '@/views/App/components/countDown';
import { baseURL } from '@/config/constants';
import { message } from 'ant-design-vue';
let today = parseInt(new Date().getTime() / 1000);
today = today - (today % 86400) + 86400 - 1;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: 'PREDIView',
  data() {
    return {
      baseURL,
      imageUrl: undefined,
      fileList: [],
      loading: false,
      showEvent: false,
      ticketId: 0,
      tokenBalance: 0,
      ticketList: [],
      categories: [],
      connectedLoading: false,
      ticketValid: 0,
      issuer_profit_rate: 0,
      issuer_confirm_time: 0,
      early_challenge_time: 0,
      normal_challenge_time: 0,
      tokens: [],
      tokensKeyByAssetId: [],
      form: {
        asset_id: null,
        content: '',
        isStakeNft: false,
        subscribeEndDate: '',
        maturityDate: '',
        source: '',
        category: '',
        options: [],
        additional_information: '',
      },
      expired_at: null,
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 30,
        on: {
          click: (event) => {
            let ticketId = event.target.getAttribute('data-id');
            let ticketList = this.ticketList;
            let _index = ticketList.findIndex((element) => element.token_id == ticketId);
            if (_index === -1) {
              return false;
            }
            let ticket = ticketList[_index];
            this.updateExpired();
            if (ticket.is_grey) {
              return false;
            }
            if (ticket.balance <= 0) {
              return false;
            }
            this.ticketId = ticketId;
          },
        },
      },
    };
  },
  components: {
    countDown,
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      desireChainId: (state) => state.desireChainId,
      chainId: (state) => state.chainId,
    }),
    ...mapGetters(['chainType', 'isConnected']),
    payToken() {
      if (!this.form.asset_id) {
        return {};
      }
      return this.tokensKeyByAssetId[this.form.asset_id];
    },
    totalPayment() {
      let total = BigNumber(0);
      if (!this.form.isStakeNft) {
        total = total.plus(BigNumber(this.payToken.credit_amount).multipliedBy(1e18));
      }
      return total.toFixed(0);
    },
    availableTime() {
      return function (val) {
        return moment.utc(val).unix() - moment().format('X');
      };
    },
  },
  watch: {
    account: function (val) {
      if (!val) {
        return;
      }
      this.getTickets();
      this.getTokenBalance();
    },
    chainId: function (val) {
      if (!val) {
        return;
      }
      this.getTokenBalance();
    },
    desireChainId: function (val) {
      if (!val) {
        return;
      }
      this.getTickets();
      this.getTokenBalance();
    },
    device(val) {
      if (val == 'mobile') {
        this.mySwiper.params.spaceBetween = 8;
      } else {
        this.mySwiper.params.spaceBetween = 20;
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    if (this.device == 'mobile') {
      this.swiperOption.spaceBetween = 8;
    }
    this.getTickets();
  },
  methods: {
    ...mapActions(['switchNetwork']),
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg';
      if (!isJpgOrPng) {
        return this.$message.error('Please upload the correct image format!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        return this.$message.error('Picture size must be less than 2MB!');
      }
    },

    async imageUpload(info) {
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
        });
        this.imageUrl = window.URL.createObjectURL(info.file.originFileObj);
        const response = info.file.response;
        if (response.code == 0) {
          this.form.imageUrl = response.data.url;
        }
      }
      if (info.file.status === 'error') {
        message.error('upload error');
      }
    },

    updateExpired() {
      let ticketList = this.ticketList;
      let _index = ticketList.findIndex((element) => element.token_id == this.ticketId);
      if (_index === -1) {
        this.expired_at = null;
      } else {
        let ticket = ticketList[_index];
        if (ticket.expired_at) {
          if (this.early_challenge_time) {
            this.expired_at = moment.utc(ticket.expired_at).unix() - this.early_challenge_time - this.issuer_confirm_time;
          } else {
            this.expired_at = moment.utc(ticket.expired_at).unix();
          }
        } else {
          this.expired_at = null;
        }
      }
    },
    async getTokenBalance() {
      if (!this.account) {
        return;
      }
      if (!this.isConnected) {
        return;
      }
      if (!this.payToken.contract) {
        return;
      }
      const balance = await cdsSdk.balanceOf(this.payToken.contract, this.account);
      this.tokenBalance = balance.toString();
    },
    disabledDate(current) {
      if (!current) {
        return false;
      }
      const unix = current.unix();
      if (this.expired_at && unix > this.expired_at) {
        return true;
      }
      if (this.form.maturityDate) {
        let date = moment.utc(this.form.maturityDate).unix();
        return unix <= today || unix >= date;
      }
      return unix <= today;
    },
    disabledMaturityDate(current) {
      if (!current) {
        return false;
      }
      const unix = current.unix();
      if (this.form.subscribeEndDate) {
        let date = moment.utc(this.form.subscribeEndDate).unix();
        if (unix < date) {
          return true;
        }
      }
      if (this.expired_at) {
        return unix > this.expired_at;
      }
      return current.unix() <= today + 86400;
    },
    rowShadowClick() {
      if (this.ticketId == 0) {
        this.$notification['error']({
          message: 'Please select a License',
        });
      }
    },
    clickStakeNft() {
      if (this.availableStakeNft()) {
        this.form.isStakeNft = true;
      } else {
        this.$notification['error']({
          message: 'License can not be staked',
        });
      }
    },
    availableStakeNft(id) {
      let ticketList = this.ticketList;
      let ticketId = this.ticketId;
      if (id) ticketId = id;
      let _index = ticketList.findIndex((element) => element.token_id == ticketId);
      if (_index === -1) {
        return false;
      }
      let ticket = ticketList[_index];
      if (ticket.is_grey) {
        return false;
      }
      if (!ticket.is_owner) {
        return false;
      }
      if (ticket.is_staked) {
        return false;
      }
      return true;
    },
    getTickets() {
      if (!this.isConnected) {
        return;
      }
      issueConfig({ chain: this.chainType }).then(({ data }) => {
        this.categories = data.categories;
        this.issuer_profit_rate = data.ISSUER_PROFIT_RATE;
        this.normal_challenge_time = parseInt(data.NORMAL_CHALLENGE_TIME);
        this.early_challenge_time = parseInt(data.EARLY_CHALLENGE_TIME);
        this.issuer_confirm_time = parseInt(data.ISSUER_CONFIRM_TIME);
        this.tokens = data.tokens;
        let tokensKeyByAssetId = {};
        for (let i = 0; i < data.tokens.length; i++) {
          tokensKeyByAssetId[data.tokens[i]['asset_id']] = data.tokens[i];
        }
        this.tokensKeyByAssetId = tokensKeyByAssetId;
        this.form.asset_id = data.tokens[0].asset_id;
        if (data.categories.length > 0) {
          this.form.category = data.categories[0].cat_id;
        }
        this.updateExpired();
        this.getTokenBalance();
      });
      let account = this.account;
      if (!account) {
        return;
      }
      tickets({ address: account, chain: this.chainType }).then(({ extra, data, code }) => {
        if (code !== 0) {
          return;
        }
        this.ticketValid = extra.valid;
        this.ticketList = data;
        for (let i = 0; i < data.length; i++) {
          if (!data[i].is_grey) {
            this.ticketId = data[i].token_id;
            this.updateExpired();
            return;
          }
        }
      });
    },

    async clickIssue() {
      if (this.connectedLoading) {
        return;
      }
      // if (!this.isConnected) {
      //   await this.switchNetwork(this.desireChainId);
      // }
      if (!this.isConnected) {
        this.$notification['error']({
          message: 'Network not connected',
        });
        return;
      }
      let { content, isStakeNft, subscribeEndDate, maturityDate, source, category, imageUrl, additional_information } = this.form;
      content = content.trim();
      if (content === '') {
        this.$notification['error']({
          message: 'Event is empty',
        });
        return;
      }
      let ticketId = this.ticketId;
      if (!ticketId) {
        this.$notification['error']({
          message: 'Select a License',
        });
        return;
      }
      if (subscribeEndDate === '') {
        this.$notification['error']({
          message: 'Last trading date is empty',
        });
        return;
      }
      if (maturityDate === '') {
        this.$notification['error']({
          message: 'expiration date is empty',
        });
        return;
      }
      if (this.form.options.length == 0) {
        this.$notification['error']({
          message: 'Options cannot be empty',
        });
        return;
      }
      if (this.form.options.length < 2) {
        this.$notification['error']({
          message: 'There cannot be less than two options',
        });
        return;
      }
      let options = [];
      let map = {};
      for (let i = 0; i < this.form.options.length; i++) {
        const option = this.form.options[i].val.trim();
        if (option == '') {
          this.$notification['error']({
            message: 'Option content cannot be empty',
          });
          return;
        }
        if (map[option]) {
          this.$notification['error']({
            message: 'Option content cannot be repeated',
          });
          return;
        }
        map[option] = 1;
        options.push(option);
      }
      let _subscribeEndDate = subscribeEndDate.unix();
      _subscribeEndDate = _subscribeEndDate - (_subscribeEndDate % 86400);
      console.log({ _subscribeEndDate });
      if (_subscribeEndDate <= today) {
        this.$notification['error']({
          message: 'Last trading date must greater than today',
        });
        return;
      }
      let _maturityDate = maturityDate.unix();
      _maturityDate = _maturityDate - (_maturityDate % 86400);
      if (_maturityDate < _subscribeEndDate) {
        this.$notification['error']({
          message: 'Last trading date is greater than expiration date',
        });
        return;
      }
      if (isStakeNft) {
        if (this.availableStakeNft() === false) {
          this.$notification['error']({
            message: 'license can not be staked',
          });
          return;
        }
      } else {
        let ticketList = this.ticketList;
        let _index = ticketList.findIndex((element) => element.token_id == ticketId);
        if (_index === -1) {
          this.$notification['error']({
            message: 'license error',
          });
          return;
        }
        let ticket = ticketList[_index];
        if (ticket.is_grey) {
          this.$notification['error']({
            message: 'Ticket error',
          });
          return;
        }
        if (ticket.balance <= 0) {
          this.$notification['error']({
            message: 'license error',
          });
          return;
        }
        let endDate = BigNumber(_maturityDate).plus(this.early_challenge_time).plus(this.issuer_confirm_time);
        if (ticket.rent_owner !== constants.AddressZero && endDate.gt(ticket.maturity_date)) {
          this.$notification['error']({
            message: 'Event end date ' + moment.utc(endDate.toFixed(0)).format('YYYY-MM-DD') + ' is greater than rental end date' + moment.utc(ticket.maturity_date).format('YYYY-MM-DD'),
          });
          return;
        }
      }
      await this.getTokenBalance();
      if (BigNumber(this.totalPayment).gt(this.tokenBalance)) {
        this.$notification['error']({
          message: 'Insufficient balance',
        });
        return;
      }
      try {
        this.connectedLoading = true;
        let allowance = await cdsSdk.allowance(this.payToken.contract, this.account, Vault_CONTRACT);
        if (BigNumber(allowance.toString()).lt(this.totalPayment)) {
          let tx = await cdsSdk.approve(this.payToken.contract, Vault_CONTRACT, this.tokenBalance);
          let _receipt = await cdsSdk.waitForTransaction(tx.hash);
          if (!_receipt.status) {
            this.$notification['error']({
              message: 'Transcation failed',
            });
            this.connectedLoading = false;
            return;
          }
        }
        let tx = await cdsSdk.issueCDS(
          this.payToken.contract,
          this.chainType,
          category,
          ticketId,
          content,
          isStakeNft,
          [_subscribeEndDate, _maturityDate],
          source,
          additional_information,
          imageUrl,
          options
        );
        let { receipt, extra } = await confirmTransaction(tx.hash, 2);
        if (!receipt.status) {
          this.$notification['error']({
            message: 'Transcation failed',
          });
          this.connectedLoading = false;
          return;
        }
        this.connectedLoading = false;
        this.$notification['success']({
          message: 'Issue success',
        });
        setTimeout(() => {
          this.$router.push('/detail/' + extra.id);
        }, 2000);
      } catch (err) {
        console.log(err);
        this.connectedLoading = false;
        if (err.data) {
          console.log(err.data.message);
        }
        if (err.code == 4001 || err.code === 'ACTION_REJECTED') {
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
  },
};
</script>
<style scoped lang="scss">
::v-deep .ant-select-selection-selected-value {
  float: left !important;
}

.nft-swiper {
  &.swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-wrapper {
    padding: 0px 0 40px;
  }

  .swiper-slide {
    display: flex;
    width: 180px;
    flex-direction: column;
    align-items: center;

    .swiper-slide-info {
      width: 180px;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      padding: 0 9px;
      padding-bottom: 30px !important;
      border: 1px solid var(--LineColor2);

      .markets-info-rent {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
      }

      .swiper-slide-info-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        color: #ffffff;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;

        .nft-star span {
          background-image: url('~@/assets/images/nft-star.svg');

          &.grey {
            background-image: url('~@/assets/images/nft-star-grey.svg');
          }
        }

        .nft-star {
          display: flex;

          span {
            width: 10px;
            height: 10px;
            margin-right: 5px;
            background-size: contain;
          }
        }
      }

      .swiper-slide-info-img {
        min-height: 50px;
        img {
          border-radius: 10px;
        }
      }

      .swiper-slide-info-selected {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        z-index: 999;
        border-radius: 10px;
        border: 2px solid var(--mainColor);

        div {
          position: absolute;
          bottom: 0px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;

          height: 30px;
          background: rgba(87,62,243,.5);
          border-radius: 0px 0px 10px 10px;
          color: #ffffff;
          margin-top: 157px;
        }
      }

      .swiper-slide-info-disabled div {
        background: grey;
      }
    }

    .swiper-slide-Id {
      color: var(--FontColor1);
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      padding-top: 3px;
      display: flex;
      justify-content: space-between;
      span{
        opacity: 0.8;
      }
      &.swiper-slide-selectId {
        color: var(--FontColor1);
      }
    }
  }
}

.add-header {
  position: relative;
  z-index: 1;
  width: var(--content-width);
  color: var(--FontColor1);
  margin: 60px auto 0px;
  font-size: 43px;

  font-weight: 600;
  color: var(--FontColor1);;

  span {
    flex: 1;
    text-align: center;
  }
}

.add-box {
  width: var(--content-width);
  margin: 0 auto;
  position: relative;
  z-index: 1;

  .add-tickets {
    height: 180px;
    position: relative;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
   background: var(--MintBGColor);
    box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);

    a {
      font-size: 16px;
      color: var(--FontColor1);

      display: flex;
      align-items: center;

      span {
        width: 80px;
        height: 36px;
        background: #782581;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 24px;
        color: #ffffff;
      }
    }
  }

  .add-nft {
     background: var(--BGColor2);
    @include box_shadow_color;
    border-radius: 10px;
    padding: 32px 46px 0;

    h3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      //@include font_color($font-color-s10, $font-color-s6);
      font-size: 18px;
      padding-bottom: 14px;

      font-weight: 400;
      color: #999999;
    }

    .add-nft-moreNFT {
      font-size: 16px;
      color: var(--mainColor);
      display: flex;
      align-items: center;


      span {
        margin-left: 14px;
        background: var(--mainColor);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      i {
        width: 16px;
        height: 16px;
        background: url('~@/assets/images/right.png') no-repeat;
        background-size: contain;
        margin-left: 6px;
      }
    }
  }

  .avatar-uploader {
    ::v-deep .ant-upload {
      width: 200px;
      height: 200px;
      @include bg_color_change($background-color-change13, $background-color-change12);
      .ant-upload-text{
        color: var(--FontColor1);
      }
    }
  }

  .add-row {
    margin-top: 40px;
    width: 100%;
    height: 100%;
     background: var(--BGColor2);
    @include box_shadow_color;
    border-radius: 10px;
    padding: 8px 46px 40px;

    label {
      @include font_color($font-color-s10, $font-color-s5);
      padding-top: 24px;
      padding-bottom: 8px;
      display: flex;
      font-size: 16px;

      font-weight: 400;
    }

    /deep/ .ant-select-selection--single {
      padding-left: 12px;
      height: 54px;
      @include bg_color_change($background-color-change13, $background-color-change12);
      color: var(--FontColor1);

      [data-theme='night'] & {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
      }

      border: none;
      border-radius: 10px;

      .ant-select-selection__rendered {
        line-height: 54px;
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
    .add-option-textarea {
      position: relative;

      /deep/ textarea {
        &.ant-input {
          @include bg_color_change($background-color-change13, $background-color-change12);
          border: none;
          height: 50px;
          color: var(--FontColor1);
          border-radius: 10px;
        }

        &.ant-input:focus {
          box-shadow: none;
        }
      }

    }
    .add-row-textarea {
      position: relative;

      /deep/ textarea {
        &.ant-input {
          @include bg_color_change($background-color-change13, $background-color-change12);
          border: none;
          height: 100px;
          color: var(--FontColor1);
          border-radius: 10px;
        }

        &.ant-input:focus {
          box-shadow: none;
        }
      }

      p {
        position: absolute;
        right: 20px;
        bottom: 20px;
        font-size: 12px;
        @include font_color($font-color-s4, $font-color-s5);
      }
    }

    /deep/ .ant-calendar-picker {
      width: 100%;
    }

    .add-row-date {
      width: 100%;
      height: 54px;
      @include bg_color_change($background-color-change13, $background-color-change12);
      font-weight: 400;

      [data-theme='night'] & {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
      }

      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      color: #999999;
      font-size: 14px;

      &.active {
        color: var(--FontColor1);;
        font-weight: 400;
      }

      span {
        width: 16px;
        height: 16px;
        background-size: contain;
        background-repeat: no-repeat;
        background: url('~@/assets/images/right-icon.svg');
        background-size: 100% 100%;
        transform: rotate(90deg);
      }
    }

    .add-row-date-p {
      p {
        font-size: 12px;
        @include font_color($font-color-s10, $font-color-s5);
        padding-top: 16px;
      }

      p:last-child {
        font-size: 16px;
        color: var(--FontColor1);
      }
    }

    .add-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 54px;
      font-size: 16px;
      color: var(--FontColor1);
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

    .add-staking {
      .add-staking-p {
        font-size: 12px;
        @include font_color($font-color-s10, $font-color-s5);
        padding-bottom: 10px;
      }

      .add-staking-button {
        font-size: 16px;
        height: 54px;
        cursor: pointer;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        @include bg_color_change($background-color-change13, $background-color-change12);
        color: var(--FontColor1);

        .logo {
          border-radius: 50%;
        }

        [data-theme='night'] & {
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        }

        &.add-staking-active {
          background: #573EF3;
          color: #FFFFFF;
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

        p:last-child {
          font-size: 16px;
          color: var(--FontColor1);
          word-break: break-all;
        }
      }
    }

    .add-issue-button {
      padding-top: 20px;

      button {
        border: none;
        height: 54px;
        background: #573EF3;
        border-radius: 10px;
        font-size: 16px;

        color: #ffffff;
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
      h3 {
        font-size: 18px;
        line-height: 20px;
        padding: 8px 0;
        color: var(--FontColor1);

      }

      .add-product-info {
        p {
          font-size: 12px;
          line-height: 18px;

          font-weight: 400;
          color: #999999;

          u {
            color: var(--FontColor1);
            text-decoration: none;
            color: var(--mainColor);
          }
        }
      }

      .add-product-source {
        margin-top: 14px;
        min-height: 44px;
        padding: 12px 0 12px 20px;
        @include bg_color_change($background-color-change13, $background-color-change12);
        border-radius: 10px;
        font-size: 12px;
        @include font_color($font-color-s10, $font-color-s3);

        span {
          color: #573EF3;
          word-break: break-all;
        }
      }

      .add-product-more {
        margin-top: 24px;
        font-size: 12px;
        @include font_color($font-color-s10, $font-color-s11);

        u {

          color: var(--FontColor1);
        }
      }
    }
  }
}

.add-row-shadow {
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    z-index: 99;
    border-radius: 10px;
  }
}

.add-info {
  padding-top: 12px;

  li {
    position: relative;
    font-size: 12px;
    line-height: 16px;
    color: #999;
  }
}

.cyrox-modal {
  /deep/ .ant-modal-content {
    background: transparent;

    .ant-modal-body {
      padding: 0;
    }

    .ant-modal-close {
      top: -36px;
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
     background: var(--BGColor2);
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 36px 40px 48px;

    .cyrox-modal-title {
      font-size: 18px;

      text-align: center;
      color: var(--FontColor1);
    }

    .cyrox-modal-body {
      padding-top: 10px;
      font-size: 14px;
      line-height: 20px;
      color: var(--FontColor1);

      p {
        padding-top: 20px;
      }
    }
  }
}

.cyrox-modal-mobile {
  .cyrox-modal-info {
    padding: 0.48rem 0.56rem 0.68rem;
    border-radius: 0.2rem;

    .cyrox-modal-title {
      font-size: 0.36rem;
    }

    .cyrox-modal-body {
      padding-top: 0.2rem;
      font-size: 0.24rem;
      line-height: 0.4rem;

      p {
        padding-top: 0.2rem;
      }
    }
  }
}

.predi-issue-mobile {
  .nft-swiper {
    .swiper-slide {
      width: 3rem;

      .swiper-slide-info {
        width: 3rem;
        border-radius: 0.2rem;

        .swiper-slide-info-title {
          height: 0.4rem;
          border-top-right-radius: 0.2rem;
          border-top-left-radius: 0.2rem;

          .nft-star {
            display: flex;

            span {
              width: 0.2rem;
              height: 0.2rem;
              margin-right: 0;
            }
          }
        }

        .swiper-slide-info-selected {
          border-radius: 0.2rem;

          div {
            font-size: 0.28rem;
            height: 0.5rem;
            border-radius: 0 0 0.2rem 0.2rem;
            margin-top: 1.33rem;
          }
        }
      }

      .swiper-slide-Id {
        font-size: 0.28rem;
        line-height: 0.4rem;
        padding-top: 0.12rem;
      }
    }
  }

  .add-header {
    margin: 0.3rem 0.4rem;

    span {
      font-size: 0.4rem;
    }
  }

  .add-box {
    .add-tickets {
      margin: 0 0.4rem;
      height: 2rem;
      border-radius: 0.2rem;

      a {
        font-size: 0.32rem;

        span {
          width: 2.04rem;
          height: 0.92rem;
          border-radius: 0.2rem;
          margin-left: 0.24rem;
        }
      }
    }

    .add-nft {
      border-radius: 0.2rem;
      margin-top: 0.76rem;
      padding: 0.24rem 0.24rem 0.28rem;
      position: relative;

      h3 {
        position: absolute;
        top: -0.56rem;
        left: 0;
        @include font_color($font-color-s10, $font-color-s5);
        font-size: 0.24rem;

        a {
          display: none;
        }
      }

      .add-nft-moreNFT {
        margin-top: 0.12rem;
        font-size: 0.32rem;

        span {
          margin-left: 0.28rem;
        }

        i {
          width: 0.44rem;
          height: 0.44rem;
          margin-left: 0.12rem;
        }
      }
    }

    .add-row {
      margin-top: 0;
      padding: 0 0.4rem;
      border-radius: 0;
      background: none;
      box-shadow: none;

      label {
        font-size: 0.24rem;
        padding-top: 0.28rem;
        padding-bottom: 0.16rem;
      }

      /deep/ .ant-select-selection--single {
        padding-left: 0.24rem;
        height: 0.92rem;

        .ant-select-selection__rendered {
          line-height: 0.92rem;
          margin-left: 0;
        }

        .ant-select-arrow {
          right: 0.24rem;
        }
      }

      .add-row-textarea {
        /deep/ textarea {
          &.ant-input {
            height: 1.28rem;
            border-radius: 0.2rem;
          }
        }
      }

      .add-row-date {
        height: 0.92rem;
        border-radius: 0.2rem;
        padding: 0 0.24rem;
        font-size: 0.28rem;

        span {
          width: 0.44rem;
          height: 0.44rem;
        }
      }

      .add-row-date-p {
        p {
          font-size: 0.24rem;
          padding-top: 0.32rem;
        }

        p:last-child {
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
          padding: 0 0.24rem;
        }
      }

      .add-staking {
        .add-staking-p {
          font-size: 0.24rem;
          padding-bottom: 0.2rem;
        }

        .add-staking-button {
          font-size: 0.32rem;
          height: 0.92rem;
          border-radius: 0.2rem;
        }
      }

      .add-ul-info {
        padding-top: 0.28rem;

        li {
          padding-top: 0.04rem;

          p:first-child {
            font-size: 0.24rem;
          }

          p:last-child {
            font-size: 0.32rem;
          }
        }
      }

      .add-issue-button {
        padding-top: 0.4rem;

        button {
          height: 0.92rem;
          border-radius: 0.2rem;
          font-size: 0.32rem;
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
    }

    .add-row-shadow {
      &:before {
        top: 0.12rem;
        border-radius: 0;
      }
    }
  }
}
</style>
