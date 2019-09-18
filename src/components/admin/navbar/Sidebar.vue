<template>
  <!-- Sidebar -->
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <router-link
      class="sidebar-brand d-flex align-items-center justify-content-center"
      to="/admin/"
    >
      <div class="sidebar-brand-icon">
        <i class="fas fa-user-shield"></i>
      </div>
      <div class="sidebar-brand-text ml-2">Admin Panel</div>
    </router-link>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link class="nav-link" to="/admin/">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Interface</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fab fa-fw fa-wpforms"></i>
        <span>Users</span>
      </a>
      <div
        id="collapseTwo"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Users:</h6>
          <router-link class="collapse-item" to="/admin/add/user">Add User</router-link>
        </div>
      </div>
    </li>
    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseThree"
        aria-expanded="true"
        aria-controls="collapseThree"
      >
        <i class="fab fa-fw fa-product-hunt"></i>
        <span>Products</span>
      </a>
      <div
        id="collapseThree"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Products:</h6>
          <router-link class="collapse-item" to="/admin/add/product">Add Product</router-link>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseFour"
        aria-expanded="true"
        aria-controls="collapseFour"
      >
        <i class="fas fa-fw fa-utensil-spoon"></i>
        <span>Resturants</span>
      </a>
      <div
        id="collapseFour"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Resturants:</h6>
          <router-link class="collapse-item" to="/admin/add/resturant">Add Resturant</router-link>
        </div>
      </div>
    </li>
    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseUtilities"
        aria-expanded="true"
        aria-controls="collapseUtilities"
      >
        <i class="fas fa-fw fa-table"></i>
        <span>Tables</span>
      </a>
      <div
        id="collapseUtilities"
        class="collapse"
        aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">All Tables:</h6>
          <router-link class="collapse-item" to="/admin/show/products">Products Table</router-link>
          <router-link class="collapse-item" to="/admin/show/resturants">Resturants Table</router-link>
          <router-link class="collapse-item" to="/admin/show/users">Users Table</router-link>
          <router-link class="collapse-item" to="/admin/show/admins">Admins Table</router-link>
          <router-link class="collapse-item" to="/admin/show/orders">Orders Table</router-link>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Addons</div>

    <!-- Nav Item - Charts -->
    <li class="nav-item">
      <router-link class="nav-link" to="/admin/charts">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Charts</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
  <!-- End of Sidebar -->
</template>

<script>
export default {};
</script>

<style scoped>
</style>