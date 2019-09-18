<template>
  <div id="page-top">
    <div id="wrapper">
      <app-sidebar></app-sidebar>
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <app-topbar></app-topbar>

          <div class="container-fluid">
            <!-- pagecontent -->
            <router-view class="animated slideInRight slow delay-1s"></router-view>
            <!-- pagecontent -->
          </div>
          <!-- container-fluid -->
        </div>
        <!-- content -->
        <app-footer></app-footer>
      </div>
      <!-- content-wrapper -->
    </div>
    <!-- wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
    <!-- angle-up -->
  </div>
  <!-- page-top -->
</template>


<script>
import Topbar from "../components/admin/navbar/Topbar";
import Sidebar from "../components/admin/navbar/Sidebar";
import Footer from "../components/admin/Footer";
export default {
  components: {
    "app-topbar": Topbar,
    "app-sidebar": Sidebar,
    "app-footer": Footer
  },
  data() {
    return {};
  },

  created() {
    // Import CSS files of Admin
    import("../../public/vendor/fontawesome-free/css/all.min.css");
    import("../../public/vendor/datatables/dataTables.bootstrap4.min.css");
    import("../../public/css/mystyles.css");
    import("../../public/css/sb-admin-2.min.css");
  }
};
</script>

<style scoped>
</style>

