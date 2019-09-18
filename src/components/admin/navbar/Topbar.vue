<template>
  <div>
    <!-- Topbar -->
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <!-- Sidebar Toggle (Topbar) -->
      <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
        <i class="fa fa-bars"></i>
      </button>

      <!-- Topbar Search -->
      <form
        class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
      >
        <div class="input-group">
          <input
            type="text"
            class="form-control bg-light border-0 small p-4"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">
              <i class="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      <!-- Topbar Navbar -->
      <ul class="navbar-nav ml-auto">
        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
        <li class="nav-item dropdown no-arrow d-sm-none">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-search fa-fw"></i>
          </a>
          <!-- Dropdown - Messages -->
          <div
            class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form class="form-inline mr-auto w-100 navbar-search">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control bg-light border-0 small"
                  placeholder="Search for..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button">
                    <i class="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <!-- Nav Item - Alerts -->
        <li class="nav-item dropdown no-arrow mx-1">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-bell fa-fw"></i>
            <!-- Counter - Alerts -->
            <span class="badge badge-danger badge-counter">{{orders.length}}</span>
          </a>
          <!-- Dropdown - Alerts -->
          <div
            class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="alertsDropdown"
          >
            <h6 class="dropdown-header">New Orders</h6>
            <router-link
              v-for="order in orders"
              :key="order.id"
              class="dropdown-item d-flex align-items-center"
              to="/admin/show/orders"
            >
              <div class="mr-3">
                <img :src="order.image" style="width:20px; height: 20px; border-radius:50%;" />
              </div>
              <div>
                <li
                  v-for="item in order.itemsOrdered"
                  :key="item.name"
                  class="font-weight-bold"
                >{{item.name}} ({{item.quantity}})</li>
              </div>
            </router-link>
            <router-link
              class="dropdown-item text-center small text-gray-500"
              to="/admin/show/orders"
            >Show All Orders</router-link>
          </div>
        </li>

        <div class="topbar-divider d-none d-sm-block"></div>

        <!-- Nav Item - User Information -->
        <li class="nav-item dropdown no-arrow">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span v-if="email" class="mr-2 d-none d-lg-inline text-gray-600 small">{{email}}</span>
            <img v-if="image" class="img-profile rounded-circle" :src="image" />
          </a>
          <!-- Dropdown - User Information -->
          <div
            class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <router-link class="dropdown-item" :to="'/admin/edit/' + user_id">
              <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </router-link>

            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
              <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
    <!-- End of Topbar -->

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            class="modal-body"
          >Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button @click.prevent="logout()" data-dismiss="modal" class="btn btn-primary">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../../firebase/init";
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      user_id: null,
      image: null,
      orders: [],
      resImage: []
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push("/login");
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.user_id = firebase.auth().currentUser.uid;
      this.email = firebase.auth().currentUser.email;

      const ref = db
        .collection("users")
        .where("user_id", "==", firebase.auth().currentUser.uid);
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.image = doc.data().image;
        });
      });
    }

    // Realtime Orders Alert
    const ref = db.collection("orders");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let data = change.doc.data();
          data.id = change.doc.id;
          const ref = db
            .collection("resturants")
            .where("name", "==", data.resturant);
          ref.get().then(snapshot => {
            snapshot.forEach(doc => {
              data.image = doc.data().image;
              this.orders.push(data);
              console.log(this.orders);
            });
          });
        }
      });
    });

    // Orders Alert
    // const ref = db.collection("orders");
    // ref.get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     let data = doc.data();
    //     data.id = doc.id;

    //     const ref = db
    //       .collection("resturants")
    //       .where("name", "==", doc.data().resturant);
    //     ref.get().then(snapshot => {
    //       snapshot.forEach(doc => {
    //         data.image = doc.data().image;
    //         this.orders.push(data);
    //       });
    //     });
    //   });
    // });
  }
};
</script>

<style scoped>
</style>