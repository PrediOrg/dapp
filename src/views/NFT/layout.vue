<template>
  <div class="layout" style="position: relative"  :class="{ 'mobile-style': device == 'mobile' }">
    <nft-nav></nft-nav>
    <router-view />
  </div>
</template>
<script>
  import nftNav from "@/views/NFT/components/nav";
  import { mapState} from "vuex";
  export default {
    name:"layoutView",
    components: {
      nftNav
    },
    computed: {
      ...mapState({
        device: (state) => state.device,
      }),

    },
  }
</script>
<style lang="scss" scoped>


</style>
