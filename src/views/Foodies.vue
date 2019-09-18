<template>
  <div class="home">
    <app-navbar></app-navbar>
    <div class="site-wrapper">
      <router-view class="animated fadeIn slow"></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Footer from "../components/mainApp/Footer";
import Navbar from "../components/mainApp/Navbar";
export default {
  components: {
    "app-footer": Footer,
    "app-navbar": Navbar
  },
  beforeCreate() {
    if (localStorage.getItem("refresh")) {
      localStorage.removeItem("refresh");
      this.$router.go();
    }
  },

  created() {
    import("../../public/appFiles/css/bootstrap.min.css");
    import("../../public/appFiles/css/font-awesome.min.css");
    import("../../public/appFiles/css/animsition.min.css");
    import("../../public/appFiles/css/animate.css");
    import("../../public/appFiles/css/style.css");

    // GET ORDER DATA FROM  STORE
    this.$store.commit("setOrders");
  }
};
</script>

<style scoped>
</style>