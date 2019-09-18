<template>
  <div>
    <h1 class="h3 mb-4 text-gray-800">Add Admin</h1>

    <form>
      <div class="row shadow-lg p-4">
        <div class="col-lg-8">
          <h5 v-if="error" class="text-danger text-center m-3">. . . {{error}} . . .</h5>

          <div class="form-group row">
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Name:</label>
              <input type="text" class="form-control" v-model="name" />
            </div>
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Email:</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Password:</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <div class="col-sm-12 col-md-6">
              <label class="form-control-label">Re-Type Password:</label>
              <input type="password" class="form-control" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-6">
              <label class="form-control-label">Phone:</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  name="phone"
                  placeholder="Phone"
                  v-model="phone"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <h4 class="title col-12">Address</h4>
          </div>
          <div class="form-group row">
            <div class="col-sm-12">
              <label class="form-control-label">Address:</label>
              <div class="input-group mb-3">
                <input type="text" name="address" class="form-control" v-model="address" />
              </div>
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
              <h5>Profile Image</h5>
            </li>
            <li class="list-group-item">
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input
                    @change="uploadImg($event)"
                    type="file"
                    class="custom-file-input"
                    id="thumbnail"
                  />
                  <label class="custom-file-label" for="thumbnail">Choose file</label>
                </div>
              </div>
              <div class="img-thumbnail text-center">
                <img :src="image" id="imgthumbnail" class="img-fluid" alt />
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-12 mt-2">
          <button
            @click.prevent="addAdmin()"
            :disabled="!image"
            class="btn btn-block btn-primary"
          >Add Admin</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../../../firebase/init";
import firebase from "firebase";
import { uploadImgMixin } from "../../../mixins/uploadImgMixin";

export default {
  mixins: [uploadImgMixin],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      type: "admin",
      error: ""
    };
  },
  methods: {
    addAdmin() {
      const ref = db.collection("users");
      if (this.email && this.password && this.name && this.image) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            ref
              .add({
                image: this.image,
                name: this.name,
                email: this.email,
                password: this.password,
                phone: this.phone,
                address: this.address,
                type: this.type,
                user_id: cred.user.uid
              })
              .then(result => {
                (this.name = ""),
                  (this.email = ""),
                  (this.password = ""),
                  (this.phone = ""),
                  (this.error = ""),
                  (this.image = ""),
                  (this.address = "");
              });
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