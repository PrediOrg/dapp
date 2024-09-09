<template>
  <section class="predi-nav" :class="{ 'predi-nav-mobile': device == 'mobile' }">
<!--    <div>-->
      <!--                @click="navClick(item)"
-->
<!--      <a v-for="(item, index) in list" :key="index" class="nav-item" :class="{ active: $route.path == item.url }" @click="onBuild(item)">-->
<!--        {{ item.text }}-->
<!--        &lt;!&ndash;        <span v-if="item.badge" class="predi-nav-count">&ndash;&gt;-->
<!--        &lt;!&ndash;          <span class="predi-nav-count-text">&ndash;&gt;-->
<!--        &lt;!&ndash;            <span>{{ item.count }}</span>&ndash;&gt;-->
<!--        &lt;!&ndash;          </span>&ndash;&gt;-->
<!--        &lt;!&ndash;        </span>&ndash;&gt;-->
<!--      </a>-->
<!--    </div>-->
        <div>
          <a
            v-for="(item, index) in list"
            :key="index"
            :class="{ active: $route.path == item.url }"
            class="nav-item"
            @click="navClick(item)"
          >
            <span class="predi-nav-text pd-r4">{{ item.text }}</span>
            <span v-if="item.badge" class="predi-nav-count">
              <span class="predi-nav-count-text">
                <span>{{ item.count }}</span>
              </span>
            </span>
          </a>
        </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { message } from 'ant-design-vue';
export default {
  name: 'NavCom',
  data() {
    return {
      list: [
        // {
        //   url: '/bridge',
        //   text: 'Bridge',
        //   badge: false,
        //   enable: true,
        // },
        {
          url: '/nft/packet',
          text: 'NFT License',
          badge: false,
          enable: true,
        },
        {
          url: '/market',
          text: 'Market',
          badge: false,
          enable: true,
        },
        {
          url: '/portfolio',
          text: 'Portfolio',
          count: 2244,
          badge: false,
          enable: true,
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
  mounted() {},
  methods: {
    onBuild(item) {
      if (item.enable) {
        this.navClick(item);
      } else {
        message.warn('Coming Soon!');
      }
    },
    navClick(item) {
      this.$router.push(item.url);
    },
  },
};
</script>

<style lang="scss" scoped>
.predi-nav {
  .nav-item {
    font-size: 16px;
    font-family: Orelega One-Regular, Orelega One;
    font-weight: 400;
    color: #0E3757;
    padding: 5px 15px;

    &.active {
      background: rgba(255, 255, 255, 0.6)!important;
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      color: #EC1E79;
    }
  }
  div {
    border-radius: 16px;
    display: grid;
    width: fit-content;
    grid-auto-flow: column;
    align-items: center;
    gap: 10px;
    margin: 0 auto;
  }
  a {
    position: relative;
    @include font_color($font-color-s10, $font-color-s1);
    font-family: 'Lucida-Grande-Bold';
    padding: 8px 12px;
    word-break: break-word;
    white-space: nowrap;
    font-size: 16px;
    display: flex;
    align-items: center;
    &.active {
      color: #000000;
      .predi-nav-text {
        background: #EC1E79;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .predi-nav-count {
      background: $background-linear-color1;
      transition: ease-in-out, 0.2s, color;
      border-radius: 18px;
      font-size: 12px;
      height: 18px;
      min-width: 18px;
      padding: 1px;
      .predi-nav-count-text {
        padding: 0 4px;
        min-width: 16px;
        height: 16px;
        @include bg_color_change($background-color-theme, $background-color-night);
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          background: $background-linear-color1;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
}
.predi-nav-mobile {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0 0.4rem;
  width: 100%;
  z-index: 100;
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 0.8rem;
    padding: 0 0.06rem;
    @include bg_color_change($background-color-change3, $background-color-change4);
    @include box_shadow_color;
    border-radius: 0.2rem;
    width: auto;
    .nav-item {
      font-size: 14px;
    }
    a {
      font-size: 0.32rem;
      padding: 0.18rem;
    }
  }
}
</style>
