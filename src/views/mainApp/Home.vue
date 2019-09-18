<template>
  <div>
    <app-banner></app-banner>
    <app-add-resturant></app-add-resturant>
    <app-steps></app-steps>
    <app-featured-items></app-featured-items>
  </div>
</template>

<script>
import Banner from "../../components/mainApp/home/Banner";
import Steps from "../../components/mainApp/home/Steps";
import AddResturant from "../../components/mainApp/home/AddResturant";
import FeaturedItems from "../../components/mainApp/home/FeaturedItems";
export default {
  components: {
    "app-banner": Banner,
    "app-steps": Steps,
    "app-add-resturant": AddResturant,
    "app-featured-items": FeaturedItems
  }
};
</script>

<style scoped>
</style>