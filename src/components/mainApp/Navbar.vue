<template>
  <header id="header" class="header-scroll top-header headrom">
    <!-- .navbar -->
    <nav class="navbar navbar-dark">
      <div class="container">
        <button
          class="navbar-toggler hidden-lg-up"
          type="button"
          data-toggle="collapse"
          data-target="#mainNavbarCollapse"
        >&#9776;</button>
        <router-link class="navbar-brand" to="/" style="font-family: cursive;">Foodies</router-link>
        <div class="collapse navbar-toggleable-md float-lg-right" id="mainNavbarCollapse">
          <ul class="nav navbar-nav">
            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >Restaurants</a>
              <div class="dropdown-menu">
                <router-link class="dropdown-item" to="/resturants">All Resturants</router-link>
                <router-link class="dropdown-item" to>Nearby Resturants</router-link>
              </div>
            </li>-->
            <li class="nav-item">
              <router-link class="nav-link" to="/resturants">Resturants</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Contact Us</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >Profile</a>
              <div class="dropdown-menu">
                <router-link v-if="!user" class="dropdown-item" to="/signup">Signup</router-link>
                <router-link v-if="!user" class="dropdown-item" to="/login">Login</router-link>
                <a
                  v-if="user"
                  style="cursor: pointer;"
                  @click.prevent="logout()"
                  class="dropdown-item"
                  to
                >Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- /.navbar -->
  </header>
  <!-- banner part starts -->
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      // localStorage.removeItem("orders");
      // localStorage.removeItem("orders");
      this.$router.push("/");
      this.$router.go();
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser;
    }
  }
};
</script>

<style scoped>
</style>