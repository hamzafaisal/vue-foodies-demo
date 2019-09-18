<template>
  <div>
    <h1 class="h3 mb-4 text-gray-800">Add Product</h1>
    <form>
      <div class="row shadow-lg p-4">
        <div class="col-lg-8">
          <h5 v-if="error" class="text-danger text-center m-3">. . . {{error}} . . .</h5>

          <div class="form-group row">
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Product Name:</label>
              <input type="text" class="form-control" v-model="name" />
            </div>
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Product Type:</label>
              <input type="text" class="form-control" v-model="type" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Product Price:</label>
              <input type="number" class="form-control" v-model="price" />
            </div>
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Product Description:</label>
              <input type="text" class="form-control" v-model="description" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-6">
              <label class="form-control-label">Product Discount (%):</label>
              <div class="input-group">
                <input type="number" class="form-control" v-model="discount" />
              </div>
            </div>
            <div class="col-sm-6">
              <label class="form-control-label">Product Size / Quantity:</label>
              <select class="custom-select" v-model="quantity">
                <option selected disabled>Select Multiple</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
          <div class="row">
            <h4 class="title col-12">Resturant</h4>
          </div>
          <div class="form-group row">
            <div class="col-sm-12">
              <label class="form-control-label">Product Resturant:</label>
              <select class="custom-select" v-model="resturant">
                <option selected disabled>Select Resturant</option>
                <option
                  v-for="(resturant , i) in resturantsList"
                  :key="i"
                  :value="resturant.name"
                >{{resturant.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="progress mb-3 text-dark" v-if="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated p-1"
              role="progressbar"
              :style="'width: ' + progress + '%'"
            >Image Uploading Progess. . . {{progress}}%</div>
          </div>
          <ul class="list-group row">
            <li class="list-group-item active p-md-2">
              <h5>Product Image</h5>
            </li>
            <li class="list-group-item">
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    @change="uploadImg($event)"
                    type="file"
                    class="custom-file-input"
                    name="thumbnail"
                    id="thumbnail"
                  />
                  <label class="custom-file-label" for="thumbnail">Choose Image</label>
                </div>
              </div>
              <div class="img-thumbnail text-center">
                <img :src="image" id="imgthumbnail" class="img-fluid" alt />
              </div>
            </li>
            <li class="list-group-item">
              <div class="form-group row">
                <div class="col-lg-12"></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-12 mt-2">
          <button
            @click.prevent="addProduct()"
            :disabled="!image"
            class="btn btn-block btn-primary"
          >Add Food Item</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { uploadImgMixin } from "../../../mixins/uploadImgMixin";
import db from "../../../firebase/init";
export default {
  mixins: [uploadImgMixin],
  data() {
    return {
      resturantsList: [],
      name: null,
      description: null,
      type: null,
      discount: null,
      price: 0,
      quantity: null,
      resturant: null,
      error: null
    };
  },
  methods: {
    addProduct() {
      const ref = db.collection("products");
      if (this.name && this.price && this.resturant) {
        ref
          .add({
            image: this.image,
            name: this.name,
            type: this.type,
            discount: this.discount,
            description: this.description,
            quantity: this.quantity,
            resturant: this.resturant,
            price: this.price
          })
          .then(result => {
            this.$router.push("/admin/show/products");
            (this.name = ""),
              (this.image = null),
              (this.error = ""),
              (this.quantity = ""),
              (this.resturant = ""),
              (this.type = ""),
              (this.progress = ""),
              (this.progressBack = ""),
              (this.description = "");
          })
          .catch(err => {
            this.error = err.message;
          });
      } else {
        this.error = "Required All Fields";
      }
    }
  },
  created() {
    const ref = db.collection("resturants");
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.resturantsList.push({
          name: doc.data().name
        });
      });
    });
  }
};
</script>

<style scoped>
</style>