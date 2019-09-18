<template>
  <div>
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">All Users</h6>
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
                <th>F-Name</th>
                <th>L-Name</th>
                <th>E-Mail</th>
                <th>Password</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody v-if="users">
              <tr v-for="user in users" :key="user.id">
                <td>{{user.fname}}</td>
                <td>{{user.lname}}</td>
                <td>{{user.email}}</td>
                <td>{{user.password}}</td>
                <td>2011/04/25}}</td>
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
      users: []
    };
  },
  created() {
    const ref = db.collection("users").where("type", "==", "user");

    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.users.push({
          fname: doc.data().fname,
          lname: doc.data().lname,
          email: doc.data().email,
          password: doc.data().password,
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