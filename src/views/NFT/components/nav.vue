<template>
  <div class="nft-nav" :class="{ 'nft-nav-mobile': device == 'mobile' }">
    <a-tabs v-model="activeName" @change="navClick">
      <a-tab-pane v-for="item in list" :key="item.name" :tab="item.text"> </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { getStorage, setStorage } from '@/utils';
import { mapState } from 'vuex';
import { message } from 'ant-design-vue';

export default {
  name: 'nftNav',
  data() {
    return {
      activeName: getStorage('nftActiveName') || 'nftSale',
      list: [
        {
          name: 'nftSale',
          text: 'GET License',
          badge: false,
        },
        // {
        //   name: 'nftMarket',
        //   text: 'License Market',
        // },
        {
          name: 'nftPacket',
          text: 'My License',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
      account: (state) => state.account,
      chainId: (state) => state.chainId,
    }),
  },
  watch: {
    '$route.path'(value) {
      console.log(value);
      this.list.forEach((item) => {
        if (this.$route.name == item.name) {
          this.activeName = item.name;
          setStorage('nftActiveName', item.name);
        }
      });
    },
  },
  mounted() {
    this.list.forEach((item) => {
      if (this.$route.name == item.name) {
        this.activeName = item.name;
        setStorage('nftActiveName', item.name);
      }
    });
  },
  methods: {
    onBuild() {
      message.warn('Coming Soon!');
    },
    navClick(name) {
      this.activeName = name;
      console.log('22', { activeName: name });
      setStorage('nftActiveName', this.activeName);
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.nft-nav {
  margin: 0 auto;
  padding-top: 4px;
  position: relative;
  z-index: 10;
  width: var(--content-width);
  /deep/ .ant-tabs-bar {
    border-bottom: none;
    .ant-tabs-tab:hover {
      //@include font_color($main-font-color, #fff);
      color: #573EF3;
    }
    .ant-tabs-nav {
      font-size: 18px;
      margin-top: 80px;
      //@include font_color($main-font-color, #fff);
      color: #0E3757;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      .ant-tabs-tab {
        opacity: 0.9;
      }
      .ant-tabs-tab-active {
        font-size: 18px;
        color: #573EF3;
        opacity: 1;
      }

      .ant-tabs-ink-bar {
        background: #573EF3;
      }

      .ant-tabs-tab {
        margin-right: 20px;
        padding: 8px 4px 8px 0;
      }
    }
  }
}

.nft-nav-mobile {
  margin: 0 0.4rem;
  /deep/.ant-tabs-bar {
    .ant-tabs-nav {
      font-size: 16px;
      margin-top: 30px;
    }
  }
}
</style>
