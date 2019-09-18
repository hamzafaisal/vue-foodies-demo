<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">All Admins</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-bordered table-sm table-striped dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Password</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Image</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody v-if="admins">
              <tr v-for="admin in admins" :key="admin.id">
                <td>{{admin.name}}</td>
                <td>{{admin.email}}</td>
                <td>{{admin.password}}</td>
                <td>{{admin.phone}}</td>
                <td>{{admin.address}}</td>
                <td>
                  <img :src="admin.image" width="50px" />
                </td>
                <td>2011/04/25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../../firebase/init";
export default {
  data() {
    return {
      admins: []
    };
  },
  created() {
    const ref = db.collection("users").where("type", "==", "admin");

    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.admins.push({
          name: doc.data().name,
          phone: doc.data().phone,
          email: doc.data().email,
          password: doc.data().password,
          address: doc.data().address,
          image: doc.data().image,
          id: doc.data().user_id
        });
      });
      $(document).ready(function() {
        $("table").DataTable();
      });
    });
  }
};
</script>

<style scoped>
</style>