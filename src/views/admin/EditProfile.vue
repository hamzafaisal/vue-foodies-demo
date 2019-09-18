<template>
  <div>
    <h1 class="h3 mb-4 text-gray-800">Edit Profile</h1>
    <div class="row">
      <div class="col-xl-8 col-lg-7 order-lg-2 order-md-1 card o-hidden border-0 mb-4 p-4">
        <h5 v-if="error" class="text-danger text-center m-3">. . . {{error}} . . .</h5>

        <form>
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group row">
                <div class="col-sm-12 col-md-6">
                  <label class="form-control-label">Name:</label>
                  <input type="text" class="form-control" v-model="name" />
                </div>
                <div class="col-sm-12 col-md-6">
                  <label class="form-control-label">Email:</label>
                  <input type="email" class="form-control" v-model="email" disabled />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12 col-md-6">
                  <label class="form-control-label">Password:</label>
                  <input type="password" class="form-control" v-model="password" disabled />
                </div>
                <div class="col-sm-12 col-md-6">
                  <label class="form-control-label">Re-Type Password:</label>
                  <input type="password" class="form-control" v-model="password" disabled />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <label class="form-control-label">Phone:</label>
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="phone" placeholder="Phone" />
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
            <div class="col-xl-6 col-lg-8 col-md-12">
              <div class="progress mb-3 text-dark" v-if="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated p-1"
                  role="progressbar"
                  :style="'width: ' + progress + '%'"
                >Image Uploading Progess. . . {{progress}}%</div>
              </div>
              <ul class="list-group row">
                <li class="list-group-item active p-md-2">
                  <h5>Update Profile Image</h5>
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
                      <label class="custom-file-label" for="thumbnail">Choose Image</label>
                    </div>
                  </div>
                  <div class="img-thumbnail text-center">
                    <img :src="image" id="imgthumbnail" class="img-fluid" alt />
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-lg-12 mt-2">
              <button @click.prevent="editAdmin()" class="btn btn-block btn-primary">Edit Admin</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-xl-4 col-lg-5 mb-4 order-lg-1 order-md-2">
        <div class="card card-profile" style="width: 18rem;">
          <img :src="image" alt="Image placeholder" class="card-img-top" />
          <div class="row justify-content-center">
            <div class="col-lg-3 order-lg-2">
              <div class="card-profile-image">
                <a href="#">
                  <img
                    :src="image"
                    class="rounded-circle imgthumbnail"
                    style="height: 100px; width:110px;"
                  />
                </a>
              </div>
            </div>
          </div>

          <div class="card-body mt-3 ml-2">
            <div class="row">
              <div class="col">
                <div class="card-profile-stats d-block justify-content-center">
                  <div>
                    <span class="heading">Name</span>
                    <span class="description">{{name}}</span>
                  </div>
                  <div>
                    <span class="heading">E-Mail</span>
                    <span class="description">{{email}}</span>
                  </div>
                  <div>
                    <span class="heading">Phone</span>
                    <span class="description">{{phone}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/init";
import firebase, { firestore } from "firebase";
import { uploadImgMixin } from "../../mixins/uploadImgMixin";

export default {
  mixins: [uploadImgMixin],
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      image: "",
      error: "",
      updateProfileId: null,
      progress: null
    };
  },
  methods: {
    editAdmin() {
      const ref = db.collection("users").doc(this.updateProfileId);
      if (this.email && this.password && this.name && this.image) {
        ref
          .update({
            image: this.image,
            name: this.name,
            phone: this.phone,
            address: this.address
          })
          .then(result => {
            this.error = "";
            this.$router.push("/admin/");
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
    const ref = db
      .collection("users")
      .where("user_id", "==", firebase.auth().currentUser.uid);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.name = doc.data().name;
        this.phone = doc.data().phone;
        this.email = doc.data().email;
        this.password = doc.data().password;
        this.address = doc.data().address;
        this.image = doc.data().image;
        this.updateProfileId = doc.id;
      });
    });
  }
};
</script>

<style scoped>
</style>