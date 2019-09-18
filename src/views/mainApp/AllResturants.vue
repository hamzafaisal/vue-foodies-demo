<template>
  <div class="page-wrapper">
    <app-toplinks></app-toplinks>
    <app-show-resturant></app-show-resturant>
  </div>
</template>

<script>
import TopLinks from "../../components/mainApp/TopLinks";
import ShowResturants from "../../components/mainApp/allResturant/ShowResturants";
export default {
  components: {
    "app-toplinks": TopLinks,
    "app-show-resturant": ShowResturants
  }
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
}
</style>