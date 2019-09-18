<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
      <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
        <i class="fas fa-download fa-sm text-white-50"></i> Generate Report
      </a>
    </div>
    <app-dashboard-cards></app-dashboard-cards>
    <app-dashboard-charts></app-dashboard-charts>
  </div>
</template>

<script>
import Cards from "../../components/admin/dashboard/Cards";
import Charts from "../../components/admin/dashboard/Charts";
export default {
  components: {
    "app-dashboard-cards": Cards,
    "app-dashboard-charts": Charts
  },
  beforeCreate () {
    if (localStorage.getItem("refresh")) {
      localStorage.removeItem("refresh");
      this.$router.go();
    }
  },
};
</script>

<style scoped>
</style>