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
                <th>Name</th>
                <th>Address</th>
                <th>Description</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Rating</th>
                <th>Status</th>
                <th>City</th>
                <th>Image</th>
                <th>bg-img</th>
              </tr>
            </thead>
            <tbody v-if="resturants">
              <tr v-for="resturant in resturants" :key="resturant.id">
                <td>{{resturant.name}}</td>
                <td>{{resturant.address}}</td>
                <td>{{resturant.description}}</td>
                <td>{{resturant.type}}</td>
                <td>{{resturant.discount}}</td>
                <td>{{resturant.rating}}</td>
                <td>{{resturant.status}}</td>
                <td>{{resturant.city}}</td>
                <td>
                  <img :src="resturant.image" width="50px" />
                </td>
                <td>
                  <img :src="resturant.background" width="50px" />
                </td>
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
      resturants: []
    };
  },
  created() {
    const ref = db.collection("resturants");
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.resturants.push({
          image: doc.data().image,
          background: doc.data().background,
          name: doc.data().name,
          description: doc.data().description,
          discount: doc.data().discount,
          address: doc.data().address,
          type: doc.data().type,
          rating: doc.data().rating,
          status: doc.data().status,
          city: doc.data().city,
          id: doc.id
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