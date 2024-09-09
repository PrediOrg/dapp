<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mobileRem } from "@/common/rem";
import { AppDeviceEnquire } from "@/utils/mixin";
export default {
  mixins: [AppDeviceEnquire],
  components: {},
  data() {
    return {};
  },
  mounted() {

  },
  methods: {},
  created() {
    this.$store.dispatch("updateTheme", "day");
    window.document.documentElement.setAttribute("data-theme", "day");
    mobileRem()
  }
};
</script>
