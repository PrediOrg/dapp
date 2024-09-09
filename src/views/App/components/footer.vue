<template>
  <footer :class="{'predi-footer-mobile': device == 'mobile'}">
    <div class="footer-bg1"/>
    <div class="footer-bg2"/>
    <div class="footer-content">
      <div class="home-footer-con">
        <div class="left-part">
          <img src="@/assets/images/logo_header.webp" alt="" class="logo">
          <div class="info">
            Empowering Visionaries Predicting Futures
          </div>

        </div>
        <div class="right-part">
          <div class="home-footer-nav">
            <a @click.stop="$router.push('/')">Home</a>
            <a @click.stop="$router.push('/market')">Markets</a>
            <a @click.stop="$router.push('/portfolio')" >Portfilio</a>
          </div>
<!--          <div class="donate-box">-->
<!--            Donations:-->
<!--            <a href="https://etherscan.io/address/0xE0EfD1f4f59AAd8393CB8db322938f972e26C4cb" class="address" target="_blank">-->
<!--              0xE0EfD1...26C4cb-->
<!--            </a>-->
<!--            <img class="donate-icon" src="@/assets/images/donate-icon.png" alt="">-->
<!--          </div>-->
          <div class="icon-list">
            <a href="https://twitter.com/FairBetClub" target="_black">
              <img src="@/assets/images/twitter.svg" alt="" class="icon">
            </a>
            <a href="https://t.me/+n_g8Iq3BJrU5MDll" target="_black">
              <img src="@/assets/images/telegram.svg" alt="" class="icon">
            </a>
            <a href="https://discord.gg/UsVNfk36VK" target="_black">
              <img src="@/assets/images/discord.svg" alt="" class="icon">
            </a>
            <a href="https://github.com/FairBetClub" target="_black">
              <img src="@/assets/images/github.svg" alt="" class="icon">
            </a>
            <a href="https://medium.com/@predi" target="_black">
              <img src="@/assets/images/medium.svg" alt="" class="icon">
            </a>
            <a href="https://predi.gitbook.io/predi/" target="_black">
              <img src="@/assets/images/gitbook.svg" alt="" class="icon">
            </a>
          </div>
        </div>

      </div>

    </div>
  </footer>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "FooterView",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      device: (state) => state.device,
    }),
  },
  mounted() {

  },
  methods: {}
};
</script>

<style lang='scss' scoped>
@keyframes moveBottomIn {
  0% {
    transform: translateY(300px);
  }
  90% {
    transform: translateX(0);
  }
  100% {
    transform: translateY(300px);
  }
}

@keyframes moveBottomInMobile {
  0% {
    transform: translateY(100px);
  }
  90% {
    transform: translateX(0);
  }
  100% {
    transform: translateY(100px);
  }
}

footer {
  width: 100%;
  height: 228px;
  margin-top: 80px;
  position: relative;
  background: linear-gradient(0deg, rgba(255, 64, 64, 0.05) 0%, rgba(255, 64, 64, 0) 100%);
  position: relative;
  overflow: hidden;

  .footer-bg1 {
    background: rgba(241, 140, 24, 0.05);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 343px;
    height: 343px;
    z-index: 0;
    filter: blur(110px);
  }

  .footer-bg2 {
    position: absolute;
    right: 30px;
    width: 602px;
    height: 251px;
    bottom: 0;
    //background: url("../../../assets/images/nft-img.png") no-repeat;
    background-size: 100% auto;
    animation: moveBottomIn 10s infinite;
    animation-delay: 1500ms;
  }

  .footer-content {
    width: var(--content-width);
    margin: 0 auto;
    border-top: 1px solid #EAEAEA;
    padding-top: 32px;
  }


  .home-footer-con {
    width: 100%;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;

    .logo {
      width: 155px;
      height: 40px;
    }

    .left-part {
      width: 358px;
      font-size: 17px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #CCCCCC;

      .info {
        margin: 26px 0 10px;
      }
    }

    .right-part {

      .icon-list {
        display: flex;
        justify-content: flex-end;
        overflow: hidden;
        margin-top: 30px;

        a {
          margin-left: 10px;
          width: 30px;
          height: 30px;
          opacity: 0.5;

          .icon {
            width: 30px;
            height: 30px;
            filter: drop-shadow(1000px 0 #F28C18);
            transform: translateX(-1000px);

          }

          &:hover {
            opacity: 0.9;

            .icon {
              filter: drop-shadow(1000px 0 #F28C18);
            }
          }

          &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(6) {
            .icon {
              width: 26px;
              height: 26px;
              margin-top: 2px;
            }
          }
        }

      }
    }

    .home-footer-nav {
      a {
        font-size: 16px;
        color: #999999;
        font-family: "Lucida-Grande-Bold";
        padding-left: 48px;
      }
    }
    .donate-box{
      display: flex;
      align-items: center;
      font-size: 17px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      justify-content: flex-end;
      color: #333333;
      margin-top: 15px;
      .address{
        color: #F18C18;
        margin-left: 10px;
      }
      .donate-icon{
        width: 20px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
}

.predi-footer-mobile {
  margin-top: 0.56rem;
  height: auto;
  padding: 0 0.4rem 1.2rem;

  .footer-bg2 {
    position: absolute;
    right: 30px;
    width: 80vw;
    top: 100px;
    animation: moveBottomInMobile 10s infinite;
  }

  .home-footer-con {
    flex-direction: column;

    .left-part {
      text-align: center;
      margin-left: 0;
      width: var(--content-width);
      font-size: 14px;

      .logo {
        width: 23vw !important;
        height: 6vw !important;
        margin: 0 auto;
      }

      .home-footer-copy {
        text-align: center;
      }
    }

    .right-part {
      .home-footer-nav {
        display: none;
      }

      .icon-list {
        justify-content: center;
      }
    }
  }

  &:before {
    background: none;
    height: auto;
  }

  &:after {
    background: none;
    height: auto;
  }

  .home-footer-con {
    display: block;
    padding-top: 0.4rem;

    .home-footer-img {
      width: 2.46rem;
      height: 0.88rem;
      margin-top: 0;
      @include bg_img_change('~@/assets/images/logo-light.svg', '~@/assets/images/logo-dark.svg');
    }

    .home-footer-nav {
      padding-top: 0.48rem;

      a {
        font-size: 0.32rem;
        padding-left: 0.74rem;

        &:first-child {
          padding-left: 0;
        }
      }
    }
  }

  .home-footer-copy {
    padding-top: 0.48rem;
    text-align: left;

    a {
      padding-left: 0.48rem;
    }
  }
}
</style>
