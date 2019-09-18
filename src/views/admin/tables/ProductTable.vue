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
                <th>Price</th>
                <th>Description</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Quantity</th>
                <th>Resturant</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{product.name}}</td>
                <td>Rs.{{product.price}}</td>
                <td>{{product.description}}</td>
                <td>{{product.type}}</td>
                <td>{{product.discount}}</td>
                <td>{{product.quantity}}</td>
                <td>{{product.resturant}}</td>
                <td>
                  <img :src="product.image" width="50px" />
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
      products: []
    };
  },
  created() {
    const ref = db.collection("products");
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.products.push({
          image: doc.data().image,
          name: doc.data().name,
          description: doc.data().description,
          type: doc.data().type,
          discount: doc.data().discount,
          quantity: doc.data().quantity,
          resturant: doc.data().resturant,
          price: doc.data().price,
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