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
          url: '/market',
          text: 'Market',
          badge: false,
          enable: true,
        },
        {
          url: '/nft/packet',
          text: 'GET License',
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
    color: var(--FontColor1);
    padding: 8px 12px;
    span{
      font-family: "paralucent", sans-serif;
      font-weight: 600;
      font-style: normal;
    }
    &.active {
      opacity: 1;
      background: var(--NAVBGColor);
      border-radius: 6px 6px 6px 6px;
      span{
        font-weight: 700;
        color: var(--FontColor1);
      }
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

    padding: 8px 12px;
    word-break: break-word;
    white-space: nowrap;
    font-size: 16px;
    display: flex;
    align-items: center;
    &.active {
      .predi-nav-text {
        background: var(--NAVBGColor);
        -webkit-background-clip: text;
      }
    }
    .predi-nav-count {
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
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

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
     background: var(--BGColor2);
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
