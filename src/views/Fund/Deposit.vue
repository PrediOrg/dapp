<template>
  <div class="depositView">
    <div v-for="item in fundData" :key="item.asset_id">
      <deposit-item :item="item"></deposit-item>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import DepositItem from '@/views/Fund/components/DepositItem';
export default {
  name: 'depositView',
  components: { DepositItem },
  watch: {},
  computed: {
    ...mapState({
      fundData: (state) => state.fundData,
    }),
  },
};
</script>

<style scoped lang="scss">
.depositView {
  max-width: var(--content-width);
  min-height: 200px;
  margin: 24px auto 0;

  .deposit-panel {
    margin-top: 60px;
    position: relative;
    padding: 30px 20px;
    background: #ffffff;
    box-shadow: 0px 15px 50px 15px rgba(0, 0, 0, 0.05);
    border-radius: 20px 20px 20px 20px;
    opacity: 1;
    border: 1px solid #eaeaea;
    z-index: 1;

    .title {
      font-size: 30px;
      font-weight: 400;
      color: #333333;
      line-height: 35px;
    }

    .info-list {
      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        .name {
          color: #999999;
        }

        .value {
          color: #000000;
        }

        .value.orange {
          font-size: 30px;
          font-weight: 400;
          color: #f18c18;
        }
      }
    }

    .select-box {
      display: flex;

      background: #f4f4f4;
      width: 100%;
      border-radius: 10px;

      .select-item {
        padding: 16px;
        width: 50%;
        cursor: pointer;
        border-radius: 10px;
        text-align: center;

        &.active {
          background: linear-gradient( 270deg, #EC1E79 0%, #552683 100%);
          color: #FFFFFF;
        }
      }
    }

    .flex-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;

      .right {
        color: #f18c18;
      }
    }

    .input-box {
      margin: 0 0 13px 0;
      height: 60px;
      background: #f4f4f4;
      border-radius: 10px;

      input {
        border: none;
        height: 100%;
        padding: 0 20px;
        background: none;
        font-size: 30px;
      }
    }

    button {
      padding: 0 30px;
      min-width: 160px;
      height: 50px;
      background: $background-linear-color;
      border: none;
      border-radius: 10px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .depositView {
    display: flex;
    justify-content: center;
    .deposit-panel {
      width: var(--content-width);
      margin: 0 auto;
      overflow: hidden;
      padding: 0.4rem;
      .select-box {
        margin-top: 20px;
      }
      .info-list {
        .info-item {
          .value.orange {
            font-size: 26px;
          }
        }
      }
    }
  }
}
</style>
