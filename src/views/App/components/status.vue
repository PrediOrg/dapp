<template>
  <section>
    <!-- status:guaranteeing -->
    <template v-if="item.status == 0"> Prediction in progress. </template>
    <!-- status:seller confirmed -->
    <template v-else-if="item.status == 1">
      Event is waiting for confirmation.
      <count-down :value="detail.challenge_start - now"></count-down>
    </template>
    <!-- status:appeal -->
    <template v-else-if="item.status == 2">
      Event is waiting for challenge.
      <count-down :value="item.challenge_end - now"></count-down>
    </template>
    <!-- status:appeal -->
    <template v-else-if="item.status == 3"> Event is waiting for governance mechanism results. </template>
    <!--status:end -->
    <template v-else-if="item.status == 4"> Event is Finished. </template>
    <!-- status:cancelled -->
    <template v-else-if="item.status == 5">
      <p>Cancelled</p>
    </template>
  </section>
</template>
<script>
import countDown from './countDown';
export default {
  name: 'StatusCom',
  components: {
    countDown,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      now: parseInt(new Date().getTime() / 1000),
    };
  },
};
</script>
