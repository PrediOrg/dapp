<template>
  <div class="home-box">
    <!-- Header -->
    <div class="header-box">
      <header class="header">
        <div class="logo">
          <img src="./assets/logo.png" alt="Predi Logo" />
        </div>
        <button class="launch-button">Launch App</button>
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
          <button class="cta-button">Launch App</button>
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
        <section class="features-section bg">
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
      <div class="social-links">
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
.home-box{
  background-color: #1E1E2E;
  width: 100%;
}
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  background-color: #1E1E2E;
  color: white;
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
</style>
