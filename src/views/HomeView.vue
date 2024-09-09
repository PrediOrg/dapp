<template>
  <div>
    <div class="home">
      <img id="backTop" @click="backTop" src="../assets/images/back_top.svg" alt="" />
      <div class="predi-header" id="Header">
        <div class="header">
          <div class="conainer">
            <div class="header-content">
              <div class="logo">
                <img src="../assets/images/logo_header.webp" alt="" />
              </div>
              <ul class="nav">
                <li><a href="#">Home</a></li>
                <li @click="$router.push('/nft')"><a href="#">NFT</a></li>
                <li @click="$router.push('/market')"><a href="#">Markets</a></li>
                <li @click="$router.push('/portfolio')"><a href="#">Portfolio</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="page1">
        <div class="page-box">
          <div class="home-img"></div>
          <div class="title">
            A fair, decentralized <br />
            social entertainment<br />
            platform.
          </div>
          <div class="btn-box">
            <!--            <div class="btn primary" @click="openUrl('https://v3.erc20.cash/')">-->
            <!--              Launch App-->
            <!--            </div>-->
            <div class="btn primary" @click="$router.push('/market')">Launch App</div>
            <div class="btn normal" @click="openUrl('https://drive.google.com/file/d/1zppe8BKjKEMietgRl0dFu8omza0Emedu/view?usp=sharing')">Whitepaper</div>
          </div>
          <div class="content content-box">
            <div class="title">positioning</div>
            <div class="content-list-box">
              <div class="content-list-bottom"></div>
              <div class="content-list">
                <div class="list-item">
                  <div class="list-header">Fairness</div>
                  <div class="list-content">
                    Fairness is at the heart of our platform, achieved through equitable token launches on the FERC platform, creating a transparent and unbiased betting environment.
                  </div>
                </div>
                <div class="list-item">
                  <div class="list-header">Social Entertainment</div>
                  <div class="list-content">Bet, connect, and have a blast! Betting is a fun, thrilling, and connecting activity. PREDI offers a fresh and engaging social experience.</div>
                </div>
                <div class="list-item">
                  <div class="list-header">Platform</div>
                  <div class="list-content">
                    PREDI's architecture is modular, personalized, and customizable, empowering media, communities, and social groups to create their own unique betting interfaces.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page2">
        <img src="../assets/images/float-icon1.webp" alt="" class="float-icon" />
        <img src="../assets/images/float-icon2.webp" alt="" class="float-icon" />
        <img src="../assets/images/float-icon3.webp" alt="" class="float-icon" />
        <div class="page-box">
          <div class="content-box">
            <div class="title">Profits</div>
            <div class="content-list">
              <div class="list-item">
                <div class="header-box">
                  <img src="../assets/images/list-icon1.webp" alt="" />
                </div>
                <div class="list-item-title">Bet Rewards</div>
                <div class="list-item-content">Join a betting and get a share of the prize pool when you predict correctly.</div>
              </div>
              <div class="list-item">
                <div class="header-box">
                  <img src="../assets/images/list-icon2.webp" alt="" />
                </div>
                <div class="list-item-title">Referral Incentives</div>
                <div class="list-item-content">Refer friends and earn a percentage of their NFT purchases.</div>
              </div>
              <div class="list-item">
                <div class="header-box">
                  <img src="../assets/images/list-icon3.webp" alt="" />
                </div>
                <div class="list-item-title">Issuance Bonuses</div>
                <div class="list-item-content">Earn rewards from product fees, with most going to the creators.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page3">
        <div class="page-box">
          <div class="left">
            <img src="../assets/images/page3-left.webp" alt="" />
          </div>
          <div class="right">
            <div class="content-box">
              <div class="title">features</div>
              <div class="features-list">
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon1.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Fair</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon2.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Social</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon3.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Diverse</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon4.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Dual Coin</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon5.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Simple UX</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon6.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Ecosystem</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon7.png" alt="" class="icon" />
                  </div>
                  <div class="name">Swarm Digital Freedom</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon8.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Community Governance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page4">
        <img src="../assets/images/float-icon4.webp" alt="" class="float-icon" />
        <img src="../assets/images/float-icon2.webp" alt="" class="float-icon" />
        <div class="page-box">
          <div class="content-box">
            <div class="title">Bridge</div>
            <div class="info">A Bridge from WEB2 to WEB3, Serving a Vast Number of WEB2 Users.</div>
            <div class="flex-box">
              <div class="left">
                <div class="bridge-list">
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon1.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Seamless User Transition</div>
                  </div>
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon2.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Social Platform Integration</div>
                  </div>
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon3.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Entertainment & Social Experience</div>
                  </div>
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon4.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Simplified Operations</div>
                  </div>
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon5.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Community Building & Development</div>
                  </div>
                </div>
              </div>
              <div class="right">
                <img src="../assets/images/page4-right.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page5">
        <img src="../assets/images/float-icon1.webp" alt="" class="float-icon" />
        <div class="page-box">
          <div class="content-box">
            <div class="title">How it works</div>
            <div class="hiw-list">
              <div class="list-item">
                <div class="icon-box">
                  <img src="../assets/images/hiw-icon1.webp" alt="" class="icon" />
                </div>
                <div class="name">Issue</div>
              </div>
              <div class="list-item">
                <div class="icon-box">
                  <img src="../assets/images/hiw-icon2.webp" alt="" class="icon" />
                </div>
                <div class="name">Betting</div>
              </div>
              <div class="list-item">
                <div class="icon-box">
                  <img src="../assets/images/hiw-icon3.webp" alt="" class="icon" />
                </div>
                <div class="name">Profit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="predi-footer">
        <footer>
          <div class="footer-content">
            <div class="left">
              <img src="../assets/images/logo_header.webp" alt="" class="logo" />
              <div class="info">Where fairness meets social entertainment.</div>
              <div class="copyright">Copyright© 2024 PREDI</div>
            </div>
            <div class="right">
              <ul class="nav">
                <li><a href="#">Home</a></li>
                <li @click="$router.push('/nft')"><a href="#">NFT</a></li>
                <li @click="$router.push('/market')"><a href="#">Markets</a></li>
                <li @click="$router.push('/portfolio')"><a href="#">Portfolio</a></li>
              </ul>
              <div class="icon-list">
                <a href="https://twitter.com/FairBetClub" target="_black">
                  <img src="../assets/images/twitter.svg" alt="" class="icon" />
                </a>
                <a href="https://t.me/+n_g8Iq3BJrU5MDll" target="_black">
                  <img src="../assets/images/telegram.svg" alt="" class="icon" />
                </a>
                <a href="https://discord.gg/UsVNfk36VK" target="_black">
                  <img src="../assets/images/discord.svg" alt="" class="icon" />
                </a>
                <a href="https://github.com/FairBetClub" target="_black">
                  <img src="../assets/images/github.svg" alt="" class="icon" />
                </a>
                <a href="https://medium.com/@predi" target="_black">
                  <img src="../assets/images/medium.svg" alt="" class="icon" />
                </a>
                <a href="https://predi.gitbook.io/predi/" target="_black">
                  <img src="../assets/images/gitbook.svg" alt="" class="icon" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
    <div class="home-m">
      <div class="m-header">
        <img src="../assets/images/logo_header.webp" alt="" class="logo" />
        <img src="../assets/images/menu.webp" alt="" class="menu" @click="showMenu = true" />
        <div class="mobile-menu animate__animated animate__bounceInRight" v-show="showMenu">
          <ul class="nav">
            <img class="close-icon" @click="showMenu = false" src="../assets/images/close.svg" alt="" />
            <li><a href="#">Home</a></li>
            <li @click="$router.push('/nft')"><a href="#">NFT</a></li>
            <li @click="$router.push('/market')"><a href="#">Markets</a></li>
            <li @click="$router.push('/portfolio')"><a href="#">Portfolio</a></li>
          </ul>
          <a class="email" href="mailto:prediclub@gmail.com">prediclub@gmail.com </a>
        </div>
      </div>
      <div class="page1-m">
        <div class="page-box">
          <div class="title">
            A fair, decentralized <br />
            social entertainment<br />
            platform.
          </div>
          <div class="btn-box">
            <!--            <div class="btn primary" @click="openUrl('https://v3.erc20.cash/')">-->
            <!--              Launch App-->
            <!--            </div>-->
            <div class="btn primary" @click="$router.push('/market')">Launch App</div>
            <div class="btn normal" @click="openUrl('https://drive.google.com/file/d/1zppe8BKjKEMietgRl0dFu8omza0Emedu/view?usp=sharing')">Whitepaper</div>
          </div>
        </div>
        <div class="content1-box content-box">
          <div class="title">positioning</div>
          <div class="content-list-box">
            <div class="content-list-bottom"></div>
            <div class="snap-box mySwiper">
              <div class="snap-item">
                <div class="list-item">
                  <div class="list-header">Fairness</div>
                  <div class="list-content">
                    Fairness is at the heart of our platform, achieved through equitable token launches on the FERC platform, creating a transparent and unbiased betting environment.
                  </div>
                </div>
              </div>
              <div class="snap-item">
                <div class="list-item">
                  <div class="list-header">Social Entertainment</div>
                  <div class="list-content">Bet, connect, and have a blast! Betting is a fun, thrilling, and connecting activity. FairBet offers a fresh and engaging social experience.</div>
                </div>
              </div>
              <div class="snap-item">
                <div class="list-item">
                  <div class="list-header">Platform</div>
                  <div class="list-content">
                    PREDI's architecture is modular, personalized, and customizable, empowering media, communities, and social groups to create their own unique betting interfaces.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page2">
        <img src="../assets/images/float-icon1.webp" alt="" class="float-icon" />
        <img src="../assets/images/float-icon2.webp" alt="" class="float-icon" />
        <img src="../assets/images/float-icon3.webp" alt="" class="float-icon" />
        <div class="page-box">
          <div class="content-box">
            <div class="title">Profits</div>
            <div class="content-list">
              <div class="list-item">
                <div class="header-box">
                  <img src="../assets/images/list-icon1.webp" alt="" />
                </div>
                <div class="list-content">
                  <div class="list-item-title">Bet Rewards</div>
                  <div class="list-item-content">Join a betting and get a share of the prize pool when you predict correctly.</div>
                </div>
              </div>
              <div class="list-item">
                <div class="header-box">
                  <img src="../assets/images/list-icon2.webp" alt="" />
                </div>
                <div class="list-content">
                  <div class="list-item-title">Referral Incentives</div>
                  <div class="list-item-content">Refer friends and earn a percentage of their NFT purchases.</div>
                </div>
              </div>
              <div class="list-item">
                <div class="header-box">
                  <img src="../assets/images/list-icon3.webp" alt="" />
                </div>
                <div class="list-content">
                  <div class="list-item-title">Issuance Bonuses</div>
                  <div class="list-item-content">Earn rewards from product fees, with most going to the creators.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page3">
        <div class="page-box">
          <div class="content-box">
            <div class="title">features</div>
            <div class="left">
              <img src="../assets/images/page3-left.webp" alt="" />
            </div>
            <div class="right">
              <div class="features-list">
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon1.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Fair</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon2.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Social</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon3.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Diverse</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon4.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Dual Coin</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon5.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Simple UX</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon6.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Ecosystem</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon7.png" alt="" class="icon" />
                  </div>
                  <div class="name">Swarm Digital Freedom</div>
                </div>
                <div class="list-item">
                  <div class="icon-box">
                    <img src="../assets/images/feat-icon8.webp" alt="" class="icon" />
                  </div>
                  <div class="name">Community Governance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page4">
        <img src="../assets/images/float-icon4.webp" alt="" class="float-icon" />
        <img src="../assets/images/float-icon2.webp" alt="" class="float-icon" />
        <div class="page-box">
          <div class="content-box">
            <div class="title">Bridge</div>
            <div class="info">
              A Bridge from WEB2 to WEB3,<br />
              Serving a Vast Number of WEB2 Users.
            </div>
            <div class="content-box">
              <div class="right">
                <img src="../assets/images/page4-right.webp" alt="" />
              </div>
              <div class="left">
                <div class="bridge-list">
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon1.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Seamless User Transition</div>
                  </div>
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon2.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Social Platform Integration</div>
                  </div>
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon3.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Entertainment & Social Experience</div>
                  </div>
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon4.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Simplified Operations</div>
                  </div>
                  <div class="list-item">
                    <div class="icon-box">
                      <img src="../assets/images/bridge-icon5.webp" alt="" class="icon" />
                    </div>
                    <div class="name">Community Building & Development</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page5">
        <img src="../assets/images/float-icon1.webp" alt="" class="float-icon" />
        <div class="page-box">
          <div class="content-box">
            <div class="title">How it works</div>
            <div class="hiw-list">
              <div class="list-item">
                <div class="icon-box">
                  <img src="../assets/images/hiw-icon1.webp" alt="" class="icon" />
                </div>
                <div class="name">Issue</div>
              </div>
              <div class="list-item">
                <div class="icon-box">
                  <img src="../assets/images/hiw-icon2.webp" alt="" class="icon" />
                </div>
                <div class="name">Betting</div>
              </div>
              <div class="list-item">
                <div class="icon-box">
                  <img src="../assets/images/hiw-icon3.webp" alt="" class="icon" />
                </div>
                <div class="name">Profit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="predi-footer">
        <footer>
          <div class="footer-content">
            <div class="right">
              <ul class="nav">
                <li><a href="#">Home</a></li>
                <li @click="$router.push('/nft')"><a href="#">NFT</a></li>
                <li @click="$router.push('/market')"><a href="#">Markets</a></li>
                <li @click="$router.push('/portfolio')"><a href="#">Portfolio</a></li>
              </ul>
              <div class="icon-list">
                <a href="https://twitter.com/FairBetClub" target="_black">
                  <img src="../assets/images/twitter.svg" alt="" class="icon" />
                </a>
                <a href="https://t.me/+n_g8Iq3BJrU5MDll" target="_black">
                  <img src="../assets/images/telegram.svg" alt="" class="icon" />
                </a>
                <a href="https://discord.gg/UsVNfk36VK" target="_black">
                  <img src="../assets/images/discord.svg" alt="" class="icon" />
                </a>
                <a href="https://github.com/FairBetClub" target="_black">
                  <img src="../assets/images/github.svg" alt="" class="icon" />
                </a>
                <a href="https://medium.com/@predi" target="_black">
                  <img src="../assets/images/medium.svg" alt="" class="icon" />
                </a>
                <a href="https://predi.gitbook.io/predi/" target="_black">
                  <img src="../assets/images/gitbook.svg" alt="" class="icon" />
                </a>
              </div>
            </div>
            <div class="left">
              <img src="../assets/images/logo.webp" alt="" class="logo" />
              <div class="info">Where fairness meets social entertainment.</div>
              <div class="copyright">Copyright© 2024 PREDI</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue';

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      showMenu: false,
    };
  },
  mounted() {
    window.onscroll = () => {
      const onTop = document.documentElement.scrollTop || document.body.scrollTop;
      const backTop = document.getElementById('backTop');
      if (onTop > document.documentElement.clientHeight) {
        backTop.style.display = 'block';
      } else {
        backTop.style.display = 'none';
      }
    };
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  methods: {
    onBuild() {
      message.warn('Coming Soon!');
    },
    openUrl(url) {
      window.open(url, '_black');
    },
    backTop() {
      document.documentElement.scrollTo({
        top: document.getElementById('Header').getBoundingClientRect().top,
        behavior: 'smooth',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
//.home {
//  scroll-snap-type: y proximity;
//  height: 100vh;
//  overflow-y: scroll;
//}
.home,
.home-m {
  background: #fff;
}
.snap-box {
  display: flex;
  width: 100vw;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  align-items: stretch !important;
  position: relative;
  z-index: 1;
  padding: 0 10px;
  .snap-item {
    width: auto;
    scroll-snap-align: center;
    margin-left: 10px;
    .list-item {
      height: 100%;
    }
    &:first-child {
      margin-left: 0;
    }
  }
}
#backTop {
  display: none;
  width: 40px;
  height: 40px;
  position: fixed;
  cursor: pointer;
  right: 8vw;
  bottom: 70px;
  transition: display 0.5s;
  z-index: 100;
  user-select: none;

  &:hover {
    transform: translate(0 -2px);
  }
}

.page1,
.page2,
.page3 {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

footer {
  background: #126e51;

  .footer-content {
    display: flex;
    width: var(--content-width);
    margin: 0 auto;
    padding: 60px 0 30px;
    justify-content: space-between;

    .left {
      .info,
      .copyright {
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.5);
      }

      .info {
        margin-top: 20px;
      }

      .copyright {
        margin-top: 8px;
      }
    }
  }

  .right {
    .icon-list {
      display: flex;
      justify-content: flex-end;

      a {
        margin-left: 10px;

        .icon {
          width: 30px;
          height: 30px;
          opacity: 0.5;

          &:hover {
            opacity: 0.9;
          }
        }

        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(6) {
          .icon {
            width: 26px;
            height: 26px;
            margin-top: 2px;
          }
        }
      }
    }
  }

  .nav li {
    display: inline-block;
    margin-left: 30px;
  }

  .nav li a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-size: 20px;
    font-family: Orelega One-Regular, Orelega One;
    display: block;
    padding: 30px 10px;
  }

  .nav li a:after {
    content: '';
    display: block;
    width: 0;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.5);
    transition: width 0.5s;
    margin-top: 3px;
  }

  .nav li a:hover:after {
    width: 100%;
  }
}

.page-box {
  height: 100vh;
  width: var(--content-width);
  margin: 0 auto;
  color: #333333;

  .content-box {
    height: 100%;

    .title {
      font-size: 3vw;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      color: #894900;
      text-align: center;
      text-transform: uppercase;
    }
  }
}

.page5 {
  position: relative;

  .float-icon {
    left: 30vw;
    top: 6vh;
  }

  .page-box {
    height: auto;
    padding: 80px 0;

    .hiw-list {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;

      .list-item {
        padding: 45px;
        background: rgba(242, 135, 24, 0.1);
        border-radius: 20px;
        width: 32%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .name {
          margin-top: 20px;
          font-size: 22px;
          font-family: Roboto-SemiBold, Roboto;
          font-weight: 600;
          color: #894900;
        }

        .icon-box {
          width: 100px;
          height: 100px;
          background: rgba(242, 135, 24, 0.2);
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            .icon {
              transform: scale(1.2);
            }
          }

          .icon {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
}

.page4 {
  position: relative;
  background: #fafafa;

  .float-icon {
    &:nth-child(1) {
      top: 3vh;
      left: 15.5vw;
    }

    &:nth-child(2) {
      top: 18vh;
      right: 18vw;
    }
  }

  .page-box {
    height: 90vh;
    padding: 10vh 0;

    .flex-box {
      display: flex;
    }

    .title {
      text-align: left;
    }

    .info {
      font-family: Roboto-SemiBold, Roboto;
      font-weight: 600;
      color: #333333;
      margin-top: 20px;
    }

    .left {
      width: 55%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .bridge-list {
        .list-item {
          background: #ffffff;
          box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          width: 70%;
          position: relative;
          margin-top: 20px;

          .icon-box {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            flex-shrink: 0;

            .icon {
              width: 20px;
            }
          }

          .name {
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: #000000;
          }

          &:nth-child(1) {
            left: 30%;

            .icon-box {
              background: #f28718;
            }
          }

          &:nth-child(1) {
            left: 20%;

            .icon-box {
              background: #f28718;
            }
          }

          &:nth-child(2) {
            left: 10%;

            .icon-box {
              background: #ec6fab;
            }
          }

          &:nth-child(3) {
            left: 0%;

            .icon-box {
              background: #ffd952;
            }
          }

          &:nth-child(4) {
            left: 10%;

            .icon-box {
              background: #4b95cb;
            }
          }

          &:nth-child(5) {
            left: 20%;

            .icon-box {
              background: #4b95cb;
            }
          }
        }
      }
    }

    .right {
      width: 45%;
      display: flex;
      align-items: center;

      img {
        width: 100%;
      }
    }
  }
}

.page3 {
  background: #fff;

  .page-box {
    height: 80vh;
    display: flex;
    padding: 10vh 0;

    .title {
      text-align: left;
    }

    .left {
      width: 45%;
      display: flex;
      align-items: center;

      img {
        width: 100%;
      }
    }

    .right {
      width: 55%;

      .content-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .features-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .list-item {
          width: 46%;
          background: #ffffff;
          box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);
          border-radius: 20px;
          display: flex;
          align-items: center;
          padding: 20px;
          margin-top: 20px;

          .icon-box {
            width: 36px;
            height: 36px;
            margin-right: 16px;
            background: #f28718;
            display: flex;
            align-items: center;
            border-radius: 10px;
            justify-content: center;
            overflow: hidden;
            flex-shrink: 0;

            .icon {
              width: 20px;
            }
          }

          .name {
            font-size: 16px;
            font-family: Roboto-Medium, Roboto;
            white-space: nowrap;
            font-weight: 500;
            color: #000000;
          }
        }
      }
    }
  }
}

.page1 {
  background: url('../assets/images/page1_bg.png');
  background-size: 100% 100%;
  width: 100%;
  position: relative;
  .home-img {
    position: absolute;
    background: url('../assets/images/home_img1.jpg');
    background-size: 100% 100%;
    right: 0;
    top: 20vh;
    width: 30vw;
    height: 30vw;
  }
  .page-box {
    padding-top: 200px;
    position: relative;

    .content {
      position: absolute;
      top: 70vh;

      .title {
        font-size: 3vw;
        font-family: Orelega One-Regular, Orelega One;
        font-weight: 400;
        color: #894900;
        text-align: center;
      }

      .content-list-box {
        padding: 20px 20px 60px;
        position: relative;

        .content-list-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70%;
          background: #126e51;
          border-radius: 0 0 20px 20px;
          z-index: 1;
        }
      }

      .content-list {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        width: 100%;

        .list-item {
          width: 32%;
          background: #ffffff;
          border-radius: 20px;
          padding: 20px;

          .list-header {
            height: 80px;
            background: #126e51;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            border-radius: 20px;
          }

          .list-content {
            margin-top: 20px;
          }
        }
      }
    }
  }

  .title {
    font-size: 3.2vw;
    font-family: Orelega One-Regular, Orelega One;
    font-weight: 400;
    color: #894900;
  }
}

.float-icon {
  width: 30px;
  height: 30px;
  position: absolute;
}

.page2 {
  position: relative;
  background: #fafafa;
  height: 80vh;

  .float-icon {
    &:nth-child(1) {
      top: 50vh;
      left: 14vw;
    }

    &:nth-child(2) {
      right: 10vw;
      top: 36vh;
    }

    &:nth-child(3) {
      bottom: 8vh;
      right: 13vw;
    }
  }

  .page-box {
    padding-top: 25vh;

    .content-list {
      display: flex;
      justify-content: space-between;

      .list-item {
        width: 32%;
        padding: 20px;
        border-radius: 20px;
        background: #ffffff;
        box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);

        &:nth-child(2) {
          position: relative;
          top: 80px;
        }

        .header-box {
          width: 50px;
          height: 50px;
          background: #f28718;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 20px;
            height: 20px;
          }
        }

        .list-item-title {
          margin-top: 30px;
          font-family: PingFang SC-Semibold, PingFang SC;
          font-weight: 600;
          font-size: 20px;
        }

        .list-item-content {
          margin-top: 30px;
          font-family: PingFang SC-Semibold, PingFang SC;
        }
      }
    }
  }
}

.btn-box {
  display: flex;
  margin-top: 7vh;

  .btn {
    cursor: pointer;
  }
}

.primary.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 50px;
  background: #f28c18;
  border-radius: 50px 50px 50px 50px;
  font-size: 24px;
  font-family: Orelega One-Regular, Orelega One;
  font-weight: 400;
  color: #ffffff;
}

.normal.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-family: Orelega One-Regular, Orelega One;
  font-weight: 400;
  color: #f28c18;
  width: 180px;
  height: 50px;
  border-radius: 50px 50px 50px 50px;
  opacity: 1;
  border: 1px solid #f28c18;
  margin-left: 20px;
}

/* Heder section */
.predi-header {
  .header {
    position: absolute;
    width: 100%;
    z-index: 10;
  }

  .header .logo {
    img {
      width: 155px;
      height: 40px;
    }
  }

  .header .nav {
    float: left;
    list-style: none;
  }

  .header .nav li {
    display: inline-block;
    margin-left: 30px;
  }

  .header .nav li a {
    color: var(--mainColor);
    text-decoration: none;
    font-size: 20px;
    font-family: Orelega One-Regular, Orelega One;
    display: block;
    padding: 30px 10px;
  }

  .header .nav li a:after {
    content: '';
    display: block;
    width: 0;
    height: 3px;
    background-color: var(--mainColor);
    transition: width 0.5s;
    margin-top: 3px;
  }

  .header .nav li a:hover:after {
    width: 100%;
  }

  .header-content {
    margin: 0 auto;
    width: var(--content-width);
    justify-content: space-between;
    display: flex;
    align-items: center;
  }
}

* {
  transition: 0.5s;
}

.ltr-effect,
.tb-effect {
  position: relative;
}

.ltr-effect:after,
.tb-effect:after {
  position: absolute;
  content: '';
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #bbb7b7;
  z-index: -1;
  border-radius: 20px;
}

.ltr-effect:after {
  width: 0;
  transition: width 0.5s;
}

.tb-effect:after {
  height: 0;
  transition: height 0.5s;
}

.ltr-effect:hover:after {
  width: 100%;
}

.tb-effect:hover:after {
  height: 100%;
}

.home-m {
  display: none;
}

@media screen and (max-width: 600px) {
  .home {
    display: none;
  }
  .home-m {
    display: block;
    position: relative;
  }
  .predi-header {
    display: none;
  }
  .m-header {
    width: 100vw;
    position: absolute;
    display: flex;
    justify-content: space-between;
    padding: 5vw;

    .logo {
      width: 23vw;
      height: 6vw;
    }

    .menu {
      width: 6.6vw;
    }
  }
  .page-box {
    height: auto;

    .content-box {
      height: 100%;

      .title {
        font-size: 8vw;
      }
    }
  }
  .page1-m {
    background: url('../assets/images/page1_bg_m.webp');
    background-size: 100% 100%;
    width: 100vw;
    height: 100vh;

    .title {
      font-size: 8vw;
      font-family: Orelega One-Regular, Orelega One;
      font-weight: 400;
      color: #894900;
      margin: 0 auto;

      line-height: 9vw;
    }

    .page-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 76vh;

      .btn-box {
        .btn {
          font-size: 4vw;
        }
      }
    }

    .content1-box {
      position: absolute;
      top: 80vh;

      .title {
        text-transform: uppercase;
      }

      .div {
        width: auto !important;
        margin-right: 10px !important;
      }

      .swiper-wrapper {
        margin-left: 5vw;
      }

      .title {
        text-align: center;
        width: 100%;
        margin-bottom: 3vh;
      }

      .content-list-box {
        position: relative;
        width: 100vw;
        padding-bottom: 15vw;

        .content-list-bottom {
          position: absolute;
          bottom: 0;
          left: 5vw;
          width: 90vw;
          height: 70%;
          background: #126e51;
          border-radius: 0 0 20px 20px;
          z-index: 1;
        }

        .list-item {
          width: 225px;
          text-align: justify;
          //min-height: 230px;
          background: #ffffff;
          border-radius: 20px;
          scroll-snap-stop: always;
          margin-left: 20px;
          scroll-snap-align: center;
          padding: 20px;
          font-family: Roboto-Medium, Roboto;
          flex-shrink: 0;

          &:first-child {
            margin-left: 0;
          }

          .list-header {
            height: 60px;
            background: #126e51;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            white-space: nowrap;
            font-family: PingFang SC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            border-radius: 15px;
          }

          .list-content {
            margin-top: 10px;
            font-size: 13px;
            font-weight: 500;
            color: #333333;
          }
        }
      }
    }
  }
  .page2 {
    height: 100vh !important;

    .float-icon {
      z-index: 2;

      &:nth-child(1) {
        top: 20vh;
      }
    }

    .page-box {
      height: 100vh !important;

      .content-box {
        padding-top: 10vh;

        .content-list {
          display: block;

          .list-item {
            width: 100%;
            top: 0;
            margin-top: 10px;
            display: flex;
            align-items: center;
            position: relative;
            z-index: 1;

            .header-box {
              height: 100%;
              padding: 10px;
              width: auto;

              img {
                width: 10vw;
                height: 10vw;
              }

              flex-shrink: 0;
            }

            .list-content {
              margin-left: 10px;
              font-size: 3vw;

              .list-item-title {
                margin-top: 0;
                font-size: 3.6vw;
              }

              .list-item-content {
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
  .page3 {
    .page-box {
      display: block;
      height: auto;
      padding: 5vh 0;

      .left,
      .right {
        width: 100%;
      }

      .left {
        display: flex;
        justify-content: center;

        img {
          width: 66vw;
        }
      }

      .right {
        .features-list {
          .list-item {
            padding: 10px;

            .icon-box {
              width: 8vw;
              height: 8vw;
              margin-right: 5px;

              .icon {
                width: 4vw;
                height: auto;
              }
            }

            .name {
              font-size: 3.3vw;
              white-space: normal;
            }
          }
        }
      }
    }
  }
  .page4 {
    .page-box {
      height: auto;

      .title {
        text-align: center;
      }

      .info {
        margin: 0 auto;
        text-align: center;
        font-size: 4vw;
        margin-top: 10px;
      }

      .content-box {
        .left,
        .right {
          width: 100%;
        }

        .right {
          display: flex;
          justify-content: center;

          img {
            width: 66.6vw;
          }
        }

        .left {
          .bridge-list {
            .list-item {
              width: 100%;
              left: 0;

              .icon-box {
                margin-right: 5px;
              }

              .name {
                font-size: 3.6vw;
              }
            }
          }
        }
      }
    }
  }
  .page5 {
    .page-box {
      height: auto;

      .hiw-list {
        .list-item {
          padding: 5vw;

          .icon-box {
            width: 20vw;
            height: 20vw;
          }

          .name {
            font-size: 5vw;
          }
        }
      }
    }
  }
  footer .nav li a:after {
    height: 0 !important;
  }
  .predi-footer {
    .footer-content {
      display: block;
      padding: 0;

      .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .logo {
          width: 40vw;
        }

        .info {
          text-align: center;
          font-size: 3vw;
        }

        .copyright {
          font-size: 3.8vw;
          padding-bottom: 20px;
        }
      }

      .right {
        .icon-list {
          justify-content: center;
          margin: 20px 0;
        }
      }

      .header .nav li a:after {
        display: none;
      }

      .nav {
        display: flex;
        flex-direction: column;

        li {
          text-align: center;
          margin-left: 0px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);

          a {
            padding: 20px;
          }
        }
      }
    }
  }
  .mobile-menu {
    position: fixed;
    width: 100vw;
    z-index: 1000;
    transition: 0.3s ease-in-out;

    .email {
      color: #fff;
      font-family: Orelega One-Regular, Orelega One;
      font-size: 18px;
      position: absolute;
      bottom: 15vw;
      text-align: center;
      width: 100vw;
    }

    left: 0;
    top: 0;
    height: 100vh;
    background: var(--mainColor);
    padding-top: 12vw;

    .close-icon {
      width: 10vw;
      height: 10vw;
      position: absolute;
      right: 5vw;
      top: 5vw;
    }

    .nav {
      display: flex;
      flex-direction: column;

      li {
        text-align: center;
        margin-left: 0px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        a {
          padding: 20px;
        }
      }
    }

    .nav li {
      display: inline-block;
    }

    .nav li a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-size: 20px;
      font-family: Orelega One-Regular, Orelega One;
      display: block;
      padding: 30px 10px;
    }

    .nav li a:hover:after {
      width: 100%;
    }
  }
}
@media screen and (max-width: 1000px) and (min-width: 600px) {
  .page-box {
    height: auto;
    padding: 30px 0;
    min-width: 800px;
  }
  .page2 {
    height: auto;

    .page-box {
      padding-top: 500px;
      padding-bottom: 150px;
      .content-box {
      }
    }
  }
  .features-list {
    .list-item {
      .name {
        font-size: 12px !important;
      }
    }
  }
  .content-list-box {
    .content-list {
      .list-item {
        .list-header {
          font-size: 18px !important;
        }
      }
    }
  }
}
</style>
