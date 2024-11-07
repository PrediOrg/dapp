<template>
  <div class="home-box">
    <!-- Header -->
    <div class="header-box">
      <header class="header">
        <div class="logo">
          <img src="./assets/logo.png" alt="Predi Logo" />
        </div>
        <button class="launch-button" @click="$router.push('/nft/')">Launch App</button>
      </header>
    </div>
    <div class="home-app">
      <!-- Main Section -->
      <section class="main-section">
        <div class="content">
          <h1 style="color: #fff;">Predi makes <span class="highlight">Rewards.</span></h1>
          <p>
            Predi is a community-driven prediction market contract framework designed to provide users with diverse and engaging prediction experiences. Predi aims to establish a fair, transparent, and efficient prediction market infrastructure, fostering the vibrant development of internet computer ecosystem.
          </p>
          <button class="cta-button" @click="$router.push('/nft/')">Launch App</button>
        </div>
        <div class="illustration-container">
          <img class="illustration1_bg" src="./assets/illustration1_bg.png"  alt="">
          <img class="illustration" src="./assets/illustration1.png" alt="Illustration">
        </div>
      </section>
      <section class="main-section">
        <div class="content">
          <h1 style="color: #fff;">Trending Creative Platform</h1>
          <p>
            Predi is a community-driven prediction market contract framework aimed at providing users with diverse prediction experiences across various domains like cryptocurrency prices, political elections, and sports events. With integrated DAO governance, Predi ensures fair and transparent platform operation, allowing community participation in project decisions. Users can convert their analytical skills into earnings through Predi's incentive model, which combines prediction rewards and activity mining.      </p>
        </div>
        <div class="illustration-container">
          <img class="illustration2_bg" src="./assets/illustration2_bg.png"  alt="">
          <img class="illustration" src="./assets/illustration2.png" alt="Illustration">
        </div>
      </section>


    </div>
    <!-- Features Section -->
    <div class=" bg">
      <div class="home-app">
        <section class="features-section bg pc">
          <div class="features-grid">
            <div class="feature-card" style="margin-bottom: 50px">
              <div class="icon-box">
                <img src="./assets/icon1.png" alt="" class="icon">
              </div>
              <h3>Community-Driven</h3>
              <p>A community-driven prediction market platform where users can participate in decision-making and share analyses to foster platform development.</p>
            </div>
            <div class="feature-card" style="margin-top: 50px">
              <div class="icon-box">
                <img src="./assets/icon2.png" alt="" class="icon">
              </div>
              <h3>Diverse Prediction Options</h3>
              <p>Predi offers a wide range of prediction experiences covering various fields such as cryptocurrency prices, political elections, sports events, and more.</p>
            </div>
            <div class="feature-card"  style="margin-bottom: 50px">
              <div class="icon-box">
                <img src="./assets/icon3.png" alt="" class="icon">
              </div>
              <h3>Innovative Incentive Model</h3>
              <p>Integration of a novel incentive model combining judgment monetization and behavior mining to transform users' analytical abilities into profits.</p>
            </div>
          </div>
        </section>
        <section class="features-section bg mobile">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="feature-card">
                  <div class="icon-box">
                    <img src="./assets/icon1.png" alt="" class="icon">
                  </div>
                  <h3>Community-Driven</h3>
                  <p>A community-driven prediction market platform where users can participate in decision-making and share analyses to foster platform development.</p>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="feature-card">
                  <div class="icon-box">
                    <img src="./assets/icon2.png" alt="" class="icon">
                  </div>
                  <h3>Diverse Prediction Options</h3>
                  <p>Predi offers a wide range of prediction experiences covering various fields such as cryptocurrency prices, political elections, sports events, and more.</p>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="feature-card">
                  <div class="icon-box">
                    <img src="./assets/icon3.png" alt="" class="icon">
                  </div>
                  <h3>Innovative Incentive Model</h3>
                  <p>Integration of a novel incentive model combining judgment monetization and behavior mining to transform users' analytical abilities into profits.</p>
                </div>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>

            <!-- Add Navigation -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>
        </section>
      </div>
    </div>
    <div class="home-app">
      <!-- SDK Section -->
      <section class="main-section">
        <div class="content">
          <h1 style="color: #fff;">Enhanced  <br/><span class="highlight" style="color:#E01F7A;">SDK and Customization Modules</span></h1>
          <p>
            Embark on a journey of endless possibilities with Predi's enriched SDK and customization modules. Empower your development and unleash your creativity to drive ecosystem growth and innovation!
          </p>
        </div>
        <div class="illustration-container">
          <img class="illustration" style="width: 200px;top: -50px" src="./assets/illustration3.png" alt="Illustration">
        </div>
      </section>

    </div>
    <!-- Footer -->
    <footer class="footer">
      <div class="logo">
        <img src="./assets/logo.png" alt="">
      </div>
      <div class="links">
        <ul class="wrapper">

          <li class="icon twitter" @click="goPage('https://x.com/prediorg')">
            <span class="tooltip">Twitter</span>
            <span><i class="fab fa-twitter"></i></span>
          </li>
          <li class="icon github"  @click="goPage('https://github.com/PrediOrg/dapp')">
            <span class="tooltip">Github</span>
            <span><i class="fab fa-github"></i></span>
          </li>

        </ul>
      </div>
      <div class="social-links">
        <p>
          © 2024 Predi.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import {Swiper} from "vue-awesome-swiper/src";
export default {
  name: "App",
  methods:{
    goPage(url){
      window.open(url)
    }
  },
  mounted(){
    new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
.links{
  /*
     Auther: Abdelrhman Said
 */

  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:focus,
  *:active {
    outline: none !important;
    -webkit-tap-highlight-color: transparent;
  }

  margin-top: 20px;

  .wrapper {
    display: inline-flex;
    list-style: none;
  }

  .wrapper .icon {
    position: relative;
    background: #393E46;
    border-radius: 50%;
    padding: 15px;
    margin: 10px;
    width: 50px;
    height: 50px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .tooltip {
    position: absolute;
    top: 0;
    font-size: 14px;
    background: #ffffff;
    color: #ffffff;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .tooltip::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background: #ffffff;
    bottom: -3px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .icon:hover .tooltip {
    top: -45px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .wrapper .icon:hover span,
  .wrapper .icon:hover .tooltip {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
  }

  .wrapper .facebook:hover,
  .wrapper .facebook:hover .tooltip,
  .wrapper .facebook:hover .tooltip::before {
    background: #1877F2;
    color: #ffffff;
  }

  .wrapper .twitter:hover,
  .wrapper .twitter:hover .tooltip,
  .wrapper .twitter:hover .tooltip::before {
    background: #1DA1F2;
    color: #ffffff;
  }

  .wrapper .instagram:hover,
  .wrapper .instagram:hover .tooltip,
  .wrapper .instagram:hover .tooltip::before {
    background: #E4405F;
    color: #ffffff;
  }

  .wrapper .github:hover,
  .wrapper .github:hover .tooltip,
  .wrapper .github:hover .tooltip::before {
    background: #333333;
    color: #ffffff;
  }

  .wrapper .youtube:hover,
  .wrapper .youtube:hover .tooltip,
  .wrapper .youtube:hover .tooltip::before {
    background: #CD201F;
    color: #ffffff;
  }
}
.home-box{
  background-color: #1E1E2E;
  width: 100%;
}


.home-app {
  text-align: center;
  width: 1400px;
  margin:  0 auto;
}

/* Header */
.header-box{

  background-color: #141427;
}
.header {
  width: 1400px;
  margin:  0 auto;
  display: flex;
  padding: 20px 50px;
  align-items: center;

  justify-content: space-between;
}

.logo img {
  width: 150px;
}

.launch-button {
  background-color: #a649f7;
  border: none;
  padding: 12px 28px;
  color: #fff;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 8px 16px rgba(166, 73, 247, 0.4);
  transition: all 0.3s ease;
}

.launch-button:hover {
  transform: translateY(-3px);
}

/* Main Section */
.main-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 100px 50px;
  background-color: #1e1e2e;
  position: relative;
}

.content {
  max-width: 600px;
  text-align: left;

}

h1 {
  font-size: 64px;
  font-weight: bold;
  line-height: 1.2;
}

.highlight {
  color: #a649f7;
}

p {
  font-size: 18px;
  margin: 20px 0;
  line-height: 1.6;
  color: rgba(238,238,238,0.75);
}

.cta-button {
  background: linear-gradient( 270deg, #EC1E79 0%, #552683 100%);
  border: none;
  padding: 15px 50px;
  margin-top: 20px;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 8px 16px rgba(166, 73, 247, 0.4);
  transition: all 0.3s ease;
  text-shadow: 0px 4px 4px rgba(0,0,0,0.5);
  font-weight: bold;
}

.cta-button:hover {
  transform: translateY(-3px);
}

.illustration-container {
  position: relative;
  width: 450px;
}
.illustration1_bg{
  width: 100%;
  right: -100px;
  top: -100px;
  position: absolute;
  z-index: 1;
}
.illustration {
  width: 100%;
  position: relative;
  z-index: 1;
}
.illustration2_bg{
  width: 100%;
  position: absolute;
  z-index: 1;
}
/* Features Section */
.features-section {
  padding: 100px 50px;
  background-color: #1e1e2e;
  color: white;
}
.mobile{
  display: none;
}
.bg{
  background: url("./assets/bg.png");
}
h1,h2{
  color: #fff;
}
.features-section h2 {
  text-align: center;
  margin-bottom: 50px;
  font-size: 36px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  grid-auto-rows: minmax(100px, auto);
}

.feature-card {
  background-color: #2E333B;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.icon-box{
  width: 70px;
  height: 70px;
  background: linear-gradient( 270deg, #EC1E79 0%, #552683 100%);
  border-radius: 20px 20px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-box .icon{
  width: 30px;
}
.feature-card h3 {
  font-size: 24px;
  color: #fff;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 15px;
}

.feature-card p {
  font-size: 16px;
  line-height: 1.6;
  text-align: left;
}

/* SDK Section */
.sdk-section {
  padding: 100px 50px;
  background-color: #1e1e2e;
  text-align: center;
}

.sdk-section h2 {
  font-size: 36px;
  margin-bottom: 30px;
}

.stay-tuned-button {
  background-color: #a649f7;
  border: none;
  padding: 15px 35px;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 8px 16px rgba(166, 73, 247, 0.4);
  transition: all 0.3s ease;
}

.stay-tuned-button:hover {
  transform: translateY(-3px);
}

/* Footer */
.footer {
  padding: 40px 0;
  background-color: #141427;
  color: white;
  text-align: center;
}

.social-links a {
  color: #fff;
  margin: 0 15px;
  text-decoration: none;
  font-size: 14px;
}
@media (max-width: 1024px) {
  .home-app, .header {
    width: 100%;
    padding: 20px 20px;
  }
  .illustration{
    width: 60%;
  }
  .illustration1_bg{
    width: 70%;
  }
  .features-section{
    width: 100%!important;
    padding: 0;
  }
  .main-section {
    flex-direction: column;
    text-align: center;
    padding: 50px 20px;
  }

  h1 {
    font-size: 48px;
  }

  .illustration-container {
    width: 100%;
    margin-top: 40px;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .mobile{
    display: block;
  }
  .pc{
    display: none;
  }
}

</style>
