<template>
  <div class="count-down time-box">
    <div class="time-item">{{ days }}days</div>
    <div class="time-item">{{ lefth }}h :</div>
    <div class="time-item">{{ leftm }}m</div>


<!--    <span v-if="days > 0">&nbsp;{{ days }} days&nbsp;</span>-->
<!--    <span>{{ lefth }}</span-->
<!--    >: <span>{{ leftm }}</span-->
<!--  >-->
    <div class="time-item" v-if="!hideSecond">
      <span>: {{ lefts }}s</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'countDown',
  props: {
    value: Number,
    hideSecond: Boolean,
  },
  data() {
    return {
      leftd: 0,
      lefth: 0,
      leftm: 0,
      days: 0,
      lefts: 0,
      timeTrend: null,
    };
  },
  mounted() {
    clearTimeout(this.timeTrend);
    this.showtime(this.value);
  },
  methods: {
    showtime(differTime) {
      let _differTime = differTime;
      if (_differTime <= 0) {
        this.leftd = 0;
        this.lefth = 0;
        this.leftm = 0;
        this.days = 0;
        this.lefts = 0;
        return;
      }
      this.days = Math.floor(_differTime / 86400);
      _differTime -= this.days * 86400;
      const sh = Math.floor(_differTime / 3600);
      this.lefth = sh < 10 ? '0' + sh : sh;
      _differTime -= sh * 3600;
      const sm = Math.floor(_differTime / 60);
      _differTime -= sm * 60;
      this.leftm = sm < 10 ? '0' + sm : sm;
      const ss = _differTime;
      this.lefts = ss < 10 ? '0' + ss : ss;
      --differTime;
      this.timeTrend = setTimeout(() => {
        this.showtime(differTime);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.time-box {
  display: flex;

  .time-item {
    height: 22px;
    font-size: 14px;
    margin-right: 4px;
    color: var(--mainColor);
    display: flex;
    align-items: center;
    font-family: Orelega One-Regular, Orelega One;
    font-weight: 400;
    &:first-child {
      margin-left: 0;
    }

  }
}
.count-down {
  display: flex;
  align-items: center;
  font-size: 7px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 14px;
    height: 14px;
    color: var(--mainColor);
    margin: 0 2px;
    border-radius: 5px;
  }
}

@media screen and (max-width: 1000px) {
  .count-down {
    transform: scale(0.8) translateX(-15px);
  }
}
</style>
