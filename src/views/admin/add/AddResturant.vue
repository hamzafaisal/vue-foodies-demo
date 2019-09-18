<template>
  <div>
    <h1 class="h3 mb-4 text-gray-800">Add Resturant</h1>

    <form>
      <div class="row shadow-lg p-4">
        <div class="col-lg-8">
          <h5 v-if="error" class="text-danger text-center m-3">. . . {{error}} . . .</h5>

          <div class="form-group row">
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Resturant Name:</label>
              <input type="text" class="form-control" v-model="name" />
            </div>
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Resturant Type:</label>
              <input type="text" class="form-control" v-model="type" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12 col-md-12">
              <label class="form-control-label">Resturant Description:</label>
              <textarea type="text" class="form-control" v-model="description"></textarea>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-6">
              <label class="form-control-label">Resturant Discount (%):</label>
              <div class="input-group">
                <input type="number" class="form-control" v-model="discount" />
              </div>
            </div>
            <div class="col-sm-6">
              <label class="form-control-label">Resturant Ratings:</label>
              <div class="input-group">
                <input type="number" class="form-control" v-model="rating" />
              </div>
            </div>
            <div class="col-sm-6 mt-3">
              <label class="form-control-label">Resturant City:</label>
              <select class="custom-select" v-model="city">
                <option selected disabled>Select City</option>
                <option value="lahore">Lahore</option>
                <option value="karachi">Karachi</option>
                <option value="multan">Multan</option>
              </select>
            </div>
            <div class="col-sm-6 mt-3">
              <label class="form-control-label">Resturant Status:</label>
              <select class="custom-select" v-model="status">
                <option selected value="open">Open</option>
                <option value="close">Close</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-12">
              <label class="form-control-label">Resturant Address:</label>
              <input type="text" class="form-control" v-model="address" />
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
            <li class="list-group-item active p-md-2 text-center">
              <h5>Upload Profile Image</h5>
            </li>
            <li class="list-group-item">
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input @change="uploadImg($event)" type="file" class="custom-file-input" />
                  <label class="custom-file-label" for="thumbnail">Choose file</label>
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
            <!-- // BAckgound Image 2 -->
            <li class="list-group-item active p-md-2 text-center">
              <h5>Upload Backgorund Image</h5>
            </li>
            <li class="list-group-item">
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    @change="uploadBackImg($event)"
                    type="file"
                    class="custom-file-input"
                    name="thumbnail"
                    id="thumbnail"
                  />
                  <label class="custom-file-label" for="thumbnail">Choose file</label>
                </div>
              </div>
              <div class="img-thumbnail text-center">
                <img :src="background" id="imgthumbnail" class="img-fluid" alt />
              </div>
            </li>
            <li class="list-group-item">
              <div class="form-group row">
                <div class="col-lg-12"></div>
              </div>
            </li>
          </ul>
          <div class="progress mt -3 text-dark" v-if="progressBack">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated p-1"
              role="progressbar"
              :style="'width: ' + progressBack + '%'"
            >Background Image Progess. . . {{progressBack}}%</div>
          </div>
        </div>
        <div class="col-lg-12 mt-2">
          <button
            @click.prevent="addResturant()"
            :disabled="!image"
            class="btn btn-block btn-primary"
          >Add Resturant</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { uploadImgMixin } from "../../../mixins/uploadImgMixin";
import { uploadBackImgMixin } from "../../../mixins/uploadBackImgMixin";
import db from "../../../firebase/init";

export default {
  mixins: [uploadImgMixin, uploadBackImgMixin],
  data() {
    return {
      name: null,
      description: null,
      type: null,
      address: null,
      status: null,
      city: null,
      discount: null,
      rating: 0,
      error: null
    };
  },
  methods: {
    addResturant() {
      const ref = db.collection("resturants");
      if (this.name && this.address && this.city && this.status) {
        ref
          .add({
            image: this.image,
            background: this.background,
            name: this.name,
            description: this.description,
            discount: this.discount,
            address: this.address,
            type: this.type,
            rating: this.rating,
            status: this.status,
            city: this.city
          })
          .then(result => {
            this.$router.push("/admin/show/resturants");
            (this.name = ""),
              (this.image = null),
              (this.background = null),
              (this.address = ""),
              (this.error = ""),
              (this.discount = ""),
              (this.type = ""),
              (this.status = ""),
              (this.rating = ""),
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
  }
};
</script>

<style scoped>
</style>