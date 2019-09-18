<template>
  <div class="page-wrapper">
    <app-toplinks></app-toplinks>
    <app-chechout-details></app-chechout-details>
  </div>
</template>

<script>
import TopLinks from "../../components/mainApp/TopLinks";
import CheckoutDetails from "../../components/mainApp/checkout/CheckoutDetails";

export default {
  components: {
    "app-toplinks": TopLinks,
    "app-chechout-details": CheckoutDetails
  }
};
</script>

<style scoped>
</style>